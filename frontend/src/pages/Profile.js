import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import { Navigate } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
import { useState } from 'react';
import '../css/profile.css';
import { Button } from '@mui/material';

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
    <div className='userprofile-container'>
    <UserProfile />
    <br />
    <Button variant="outlined" onClick={handleChangePassword}>Change Password</Button>
    {changePassword && <ChangePassword />}
    </div>
    <Footer />
    </>
  );
}

export default Profile