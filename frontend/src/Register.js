import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './components/Login.css';
import logo from './imgs/logo-no-background.png';
 

function Register() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
    
          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <img src={logo} alt="Logo" />
              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
            <form>
                <MDBInput wrapperClass='mb-4 w-100' label='Username' id='formControlLg' type="text"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type="password"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Confirm Password' id='formControlLg' type="password"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Email' id='formControlLg' type="email"/>
                <MDBInput wrapperClass='mb-4 w-100' label='First name' id='formControlLg' type="text"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Last name' id='formControlLg' type="text"/>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn className='login' type="submit" size='lg'>
                Login
              </MDBBtn>
            </form>
            <h3>Have an account ? <a href='./Login'>Sign in</a></h3>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  )
}

export default Register