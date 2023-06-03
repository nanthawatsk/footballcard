import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import { Navigate } from 'react-router-dom';

function Profile() {
  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }
  return (
    <>
    <Header />
    <UserProfile />
    <Footer />
    </>

  )
}

export default Profile