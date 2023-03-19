import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userResetPassword } from '../redux/authentication/signUpReducer';
import FormR from '../reusable/form/FormR';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const inputsArray = [
    {
      type: 'mail',
      name: 'email',
      classInput: 'user-authentication-form-input',
      placeholder: 'Email',
    },
  ];

  const onSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please! Enter a valid email');
    } else {
      const formData = {
        user: {
          email,
        },
        commit: 'Send me reset password instructions',
      };

      setMessage(null);

      dispatch(userResetPassword(formData));
      console.log(formData);
    }

    // const toChangePasswoed = {user:
    //   {reset_password_token: "[FILTERED]",
    //    password: "[FILTERED]",
    //    password_confirmation: "[FILTERED]"
    //   }
    //   }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="authentication-title">Reset Password</h2>
      <FormR
        classForm="user-authentication-form "
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton="Send Me Reset Instructions"
        submitClass="user-authentication-form-button"
        errorMessage={message}
      />

      <p>
        Back to login page?
        <Link to="../login">Sign In</Link>
      </p>

    </div>
  );
};

export default ForgotPassword;
