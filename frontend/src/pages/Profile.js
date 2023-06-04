import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import { Navigate } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
import { useState } from 'react';

function Profile() {
  const [changePassword, setChangePassword] = useState(false);

  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }
  const handleChangePassword = () => {
    setChangePassword(true);
  }
  return (
    <>
    <Header />
    <UserProfile />
    <button onClick={handleChangePassword}>Change Password</button>
    {changePassword && <ChangePassword />}
    <Footer />
    </>
  );
}

export default Profile