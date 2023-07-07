import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import './Authentication.css';
import { showAuthPopUp } from '../../redux/authentication/reusableAuthReducer';
import SignIn from '../../authentication/signin';
import SignUp from '../../authentication/signup';
import ForgotPassword from '../../authentication/forgotPassword';

const Authentication = () => {
  const dispatch = useDispatch();
  const reusableAuth = useSelector((state) => state.reusableAuth);
  const [pageShown, setPage] = useState('signin');
  const { showPopUp } = reusableAuth;

  const pages = [
    {
      path: 'signin',
      output: <SignIn reusable />,
      buttons: <>
        <div className="redirect-phrases">
          Forgot Password?
          <button onClick={() => setPage('forgot')}>Reset Password</button>
        </div>
        <div className="redirect-phrases">
          Don't have an Account?
          <Link to="../signup" onClick={() => dispatch(showAuthPopUp(false))}>Sign Up</Link>
        </div>
      </>,
    },
    {
      path: 'signup',
      output: <SignUp reusable />,
      buttons: <>
        <div className="redirect-phrases">
          Allready have an Account?
          <button onClick={() => setPage('signin')}>Login</button>
        </div>
      </>,
    },
    {
      path: 'forgot',
      output: <ForgotPassword reusable />,
      buttons: <>
        <div className="redirect-phrases">
          Back to login page?
          <button onClick={() => setPage('signin')}>Login</button>
        </div>
      </>,
    },
  ];

  if (showPopUp) {
    return (
      <div className="authentication-reusable-container">
        <div className="authentication-form-container">
          <MdClose className="close-authentication" onClick={() => dispatch(showAuthPopUp(false))} />
          {
            pages.map((page) => {
              const { path, output, buttons } = page;
              if (path === pageShown) {
                return (
                  <>
                    {' '}
                    {output}
                    {buttons}
                  </>
                );
              }
              return null;
            })
          }
        </div>
      </div>
    );
  }
  return <></>;
};

export default Authentication;
