import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import FormR from '../reusable/form/FormR';
import { signUpUser, userLogout } from '../redux/authentication/signUpReducer';
import './authentication.css';
import userIcon from '../images/user-show-icon.png';

const SignUp = (props) => {
  const navigate = useNavigate();
  const { reusable } = props;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const [useImage, setUserImage] = useState(userIcon);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [userAvatarFile, setUserAvatarFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0, 0]);
  const [loader, setLoader] = useState(false);
  const inputsArray = [
    {
      type: 'text',
      name: 'first_name',
      classInput: 'user-authentication-form-input',
      placeholder: 'First name',
    },
    {
      type: 'text',
      name: 'last_name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Last name',
    },
    {
      type: 'mail',
      name: 'email',
      classInput: 'user-authentication-form-input',
      placeholder: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      classInput: 'user-authentication-form-input',
      placeholder: 'Password',
    },
    {
      type: 'password',
      name: 'confirm_password',
      classInput: 'user-authentication-form-input',
      placeholder: 'Confirm Password',
    },
  ];

  const viewProfile = (state) => {
    setProfilePopUp(state);
  };

  const onSignup = (e) => {
    e.preventDefault();
    const firstName = e.target.first_name.value;
    const lastName = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {
      setMessage('Please! These marked fields are required');
      setInputErrorArr([1, 1, 1, 1, 1]);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please! Enter a valid email');
      setInputErrorArr([0, 0, 1, 0, 0]);
    } else if (password !== confirmPassword) {
      setMessage('Password confirmation do not Match');
      setInputErrorArr([0, 0, 0, 1, 1]);
    } else {
      const formData = {
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          avatar: userAvatarFile,
        },
      };
      dispatch(signUpUser(formData));
      setMessage(null);
      setLoader(true);
      setInputErrorArr([0, 0, 0, 0, 0]);
    }
  };

  useEffect(() => {
    if (userData.token) {
      setLoader(false);
      navigate('../home');
    }
  }, [userData]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="authentication-title">SignUp</h2>
      <div className="user-auth-image-wrap" onClick={() => viewProfile(true)}>
        <img src={useImage} alt="" className="user-image-preview" />
      </div>
      <input
        type="file"
        accept="image/*"
        id="user-avatar"
        className="user-authentication-input-file"
        onChange={(e) => {
          setUserImage(URL.createObjectURL(e.target.files[0]));
          setUserAvatarFile(e.target.files[0]);
        }}
      />
      <FormR
        classForm={reusable ? 'authentication-pop-up-form' : 'user-authentication-form'}
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton={!loader ? 'Signup' : <FiLoader className="button-loader white-loader" />}
        submitClass="user-authentication-form-button"
        errorMessage={message}
        inputErrorArr={inputErrorArr}
      />
      {
        !reusable ? (
          <p>
            Allready have an Account?
            <Link to="../login">Login</Link>
          </p>
        ) : <></>
      }

      <div className={profilePopUp ? 'image-pop-up-container' : 'hidden'}>
        <div className="w-full relative">
          <button type="button" onClick={() => setProfilePopUp(false)}>
            X
          </button>
        </div>

        <label htmlFor="user-avatar">
          <div className="image-pop-up-wrap">
            <img src={useImage} alt="" className="image-pop-up" onClick={() => setProfilePopUp(false)} />
          </div>
        </label>
      </div>

    </div>
  );
};

export default SignUp;
