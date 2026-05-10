import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { userResetPassword } from '../redux/authentication/signUpReducer';
import FormR from '../reusable/form/FormR';

const ForgotPassword = (props) => {
  const { reusable } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [message, setMessage] = useState(null);

  const inputsArray = [
    {
      type: 'mail',
      name: 'email',
      classInput: 'user-authentication-form-input',
      placeholder: t('inputs.email'),
    },
  ];

  const onSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage(t('validation.invalid_email'));
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
      <h2 className="authentication-title">{t('pages.forgot_password.title')}</h2>
      <FormR
        classForm={reusable ? 'authentication-pop-up-form' : 'user-authentication-form'}
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton={t('buttons.send_reset_instructions')}
        submitClass="user-authentication-form-button"
        errorMessage={message}
      />

      {
        !reusable ? (
          <p>
            {t('pages.signin.no_account')}
            <Link to="../login">{t('buttons.login')}</Link>
          </p>
        ) : (<></>)
      }

    </div>
  );
};

export default ForgotPassword;
