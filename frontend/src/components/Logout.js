import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { Button } from '@mui/material';


const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button variant="outlined" color="error" onClick={handleLogout} >
  Logout
</Button>
  );
};

export default LogoutButton;
