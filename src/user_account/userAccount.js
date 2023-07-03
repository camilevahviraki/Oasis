import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { userLogout } from '../redux/authentication/signUpReducer';
import CheckValidImage from '../reusable/check-image/checkValidImage';
import defaultAvatar from '../images/user-show-icon.png';
import './userAccount.css';

const UserAccount = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);

  const { user } = userData;
  const userNames = `${user.first_name}-${user.last_name}`;
  const {
    first_name,
    last_name,
    avatar_url,
    email,
    updated_at,
    id,
  } = user;

  const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const onLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="w-full flex flex-col center user-account-page" style={{ padding: '20px 0' }}>
      <div className="logout-button-wrap">
        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          LogOut
        </button>
      </div>
      <div className="user-account-avatar-wrap">
        <img
          src={CheckValidImage({ avartarUrl: avatar_url, defaultImg: defaultAvatar })}
          alt=""
          className="user-account-avatar"
          style={{ backgroundImage: `url(${avatar_url})` }}
        />
      </div>
      <div className="user-account-edit-image">
        <Link to={`../${userNames}/edit-image`}>Edit image</Link>
      </div>
      <div className="user-account-details">
        <Link to={`../${userNames}/edit-names`}>
          <h4 className="user-account-name">
            {first_name}
            {' '}
            {last_name}
          </h4>
        </Link>
        <p>
          <span>{email}</span>
        </p>
        <p>
          Upated on:
          { ' ' }
          <span>{ transformDateFormat(updated_at) }</span>
        </p>

        <Link to="">+ Add social media</Link>
      </div>

    </div>
  );
};

export default UserAccount;
