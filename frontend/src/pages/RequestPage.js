import React from 'react'
import Header from '../components/Header'
import Request from '../components/Request'
import Footer from '../components/Footer'
import { Navigate } from 'react-router-dom'


function RequestPage() {
    if (!localStorage.getItem('auth token')) {
        return <Navigate to='/login' />
    }
  return (
    <>
    <Header/>
    <Request/>
    <Footer/>
    </>
  )
}

export default RequestPage;