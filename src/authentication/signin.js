import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormR from '../reusable/form/FormR';
import { loginUser } from '../redux/authentication/signUpReducer';

const SignIn = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

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
    dispatch(loginUser(formData));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="authentication-title">Sign In</h2>

      <FormR
        classForm="user-authentication-form "
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton="Login"
        submitClass="user-authentication-form-button"
        errorMessage={message}
      />
      <p>
        Forgot Password?
        <Link to="../forgot-password">Reset Password</Link>
      </p>
      <p>
        Don't have an Account?
        <Link to="../signup">Sign Up</Link>
      </p>

    </div>
  );
};

export default SignIn;
