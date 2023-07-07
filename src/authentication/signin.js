import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthPopUp } from '../redux/authentication/reusableAuthReducer';
import FormR from '../reusable/form/FormR';
import { loginUser, userLogout } from '../redux/authentication/signUpReducer';

const SignIn = (props) => {
  const { reusable } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const reusableAuth = useSelector((state) => state.reusableAuth);

  const [message, setMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const inputsArray = [
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
  ];

  const onSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formData = {
      user: {
        email,
        password,
      },
    };

    setMessage(null);
    setLoader(true);
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (userData.message === 'Couldnt find user.') {
      setLoader(false);
      dispatch(userLogout());
      setMessage('Oops! Wrong combination of email/password!');
    } else if (userData.token && !reusable) {
      setLoader(false);
      navigate('../home');
    } else if (userData.token && reusable) {
      navigate(reusableAuth.link);
      dispatch(showAuthPopUp(false));
    }
  }, [userData]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="authentication-title">Sign In</h2>

      <FormR
        classForm={reusable ? 'authentication-pop-up-form' : 'user-authentication-form'}
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton={!loader ? 'Login' : <FiLoader className="button-loader white-loader" />}
        submitClass="user-authentication-form-button"
        errorMessage={message}
      />
      {
        !reusable ? (
          <>
            <p>
              Forgot Password?
              <Link to="../forgot-password">Reset Password</Link>
            </p>
            <p>
              Don't have an Account?
              <Link to="../signup">Sign Up</Link>
            </p>

          </>
        )
          : (<></>)
      }
    </div>
  );
};

export default SignIn;
