import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userResetPassword } from '../redux/authentication/signUpReducer';
import FormR from '../reusable/form/FormR';

const ForgotPassword = (props) => {
  const { reusable } = props;
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
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="authentication-title">Reset Password</h2>
      <FormR
        classForm={reusable ? 'authentication-pop-up-form' : 'user-authentication-form'}
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton="Send Me Reset Instructions"
        submitClass="user-authentication-form-button"
        errorMessage={message}
      />

      {
        !reusable ? (
          <p>
            Back to login page?
            <Link to="../login">Sign In</Link>
          </p>
        ) : (<></>)
      }

    </div>
  );
};

export default ForgotPassword;
