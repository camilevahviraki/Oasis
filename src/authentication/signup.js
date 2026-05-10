import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiLoader, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';
import FormR from '../reusable/form/FormR';
import { signUpUser } from '../redux/authentication/signUpReducer';
import './authentication.css';
import userIcon from '../images/user-show-icon.png';
import { useTranslation } from 'react-i18next';

const SignUp = (props) => {
  const navigate = useNavigate();
  const { reusable } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userData = useSelector((state) => state.authenticationReducer);
  const [useImage, setUserImage] = useState(userIcon);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [userAvatarFile, setUserAvatarFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return Math.min(5, Math.ceil((strength / 6) * 5));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.first_name.trim()) {
      newErrors.first_name = t('validation.required_field');
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = t('validation.required_field');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('validation.required_field');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('validation.invalid_email');
    }
    if (!formData.password) {
      newErrors.password = t('validation.required_field');
    } else if (formData.password.length < 8) {
      newErrors.password = t('validation.password_min_length');
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = t('pages.signup.passwords_mismatch');
    }

    return newErrors;
  };

  const viewProfile = (state) => {
    setProfilePopUp(state);
  };

  const onSignup = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage(t('pages.signup.form_has_errors'));
      return;
    }

    const signupFormData = {
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        avatar: userAvatarFile,
        admin: 'yes',
      },
    };
    dispatch(signUpUser(signupFormData));
    setMessage(null);
    setLoader(true);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    // Decode JWT and extract user info
    const base64Url = credentialResponse.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);

    const signupFormData = {
      user: {
        first_name: decoded.given_name || '',
        last_name: decoded.family_name || '',
        email: decoded.email,
        password: Math.random().toString(36).slice(-12),
        avatar: decoded.picture,
        admin: 'yes',
      },
    };
    dispatch(signUpUser(signupFormData));
    setLoader(true);
  };

  useEffect(() => {
    if (userData.token) {
      setLoader(false);
      navigate('../home');
    }
  }, [userData, navigate]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 1) return t('pages.signup.weak');
    if (passwordStrength <= 2) return t('pages.signup.fair');
    if (passwordStrength <= 3) return t('pages.signup.good');
    if (passwordStrength <= 4) return t('pages.signup.strong');
    return t('pages.signup.very_strong');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pages.signup.title')}</h1>
          <p className="text-gray-600">{t('pages.signup.subtitle')}</p>
        </div>

        {/* Error Message */}
        {message && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <FiX className="text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-700">{message}</span>
          </div>
        )}

        {/* Social Login */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">{t('pages.signup.or')}</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage(t('errors.google_login_failed'))}
              text="signup_with"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500">{t('pages.signup.or_continue')}</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Avatar Upload */}
        <div className="mb-6">
          <div
            className="w-24 h-24 mx-auto rounded-full border-4 border-orange-200 cursor-pointer hover:border-orange-400 transition-colors overflow-hidden bg-gray-100"
            onClick={() => viewProfile(true)}
          >
            <img src={useImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            id="user-avatar"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) {
                setUserImage(URL.createObjectURL(e.target.files[0]));
                setUserAvatarFile(e.target.files[0]);
              }
            }}
          />
          <p className="text-center text-xs text-gray-500 mt-2">{t('pages.signup.click_to_upload')}</p>
        </div>

        {/* Form */}
        <form onSubmit={onSignup} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('inputs.first_name')}</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder={t('inputs.first_name')}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.first_name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.first_name && <p className="text-sm text-red-500 mt-1">{errors.first_name}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('inputs.last_name')}</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder={t('inputs.last_name')}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.last_name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.last_name && <p className="text-sm text-red-500 mt-1">{errors.last_name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('inputs.email')}</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('inputs.email')}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('inputs.password')}</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('inputs.password')}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

            {/* Password Strength */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{getStrengthText()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('inputs.confirm_password')}</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder={t('inputs.confirm_password')}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.confirm_password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirm_password && <p className="text-sm text-red-500 mt-1">{errors.confirm_password}</p>}
            {formData.confirm_password && formData.password === formData.confirm_password && (
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <FiCheck size={16} />
                <span>{t('pages.signup.passwords_match')}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loader}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loader ? (
              <>
                <FiLoader className="animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              t('buttons.signup')
            )}
          </button>
        </form>

        {/* Login Link */}
        {!reusable && (
          <p className="text-center text-gray-600 text-sm mt-6">
            {t('pages.signup.have_account')}{' '}
            <Link to="../login" className="text-orange-500 hover:text-orange-600 font-semibold">
              {t('buttons.login')}
            </Link>
          </p>
        )}
      </div>

      {/* Image Popup */}
      {profilePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <button
              type="button"
              onClick={() => setProfilePopUp(false)}
              className="float-right text-2xl font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <label htmlFor="user-avatar" className="block cursor-pointer">
              <div className="flex items-center justify-center">
                <img src={useImage} alt="Profile preview" className="max-w-full max-h-96 rounded-lg" />
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
