import React from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import UserAccount from './userAccount';
import UserEditAccount from './userEditAccount';

const UserRoutes = () => {

  const userData = useSelector(state => state.authenticationReducer);
  const userNames = userData.user.first_name + '-' + userData.user.last_name;
    
  return (
    <Routes>
        <Route path={userNames} element={(<UserAccount/>)}/>
        <Route path={`${userNames}/account-edit`} element={(<UserEditAccount/>)}/>
    </Routes>
  )
}

export default UserRoutes;