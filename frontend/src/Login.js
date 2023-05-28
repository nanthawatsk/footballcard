import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './actions/auth';
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
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './components/Login.css';
import logo from './imgs/logo-no-background.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login(username, password))
      .then(() => {
        // Handle successful login
        console.log('Logged in');
        window.location.href = '/home';
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:', error);
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <img src={logo} alt="Logo" />
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>
              <form onSubmit={handleLogin}>
                <MDBInput wrapperClass='mb-4 w-100' label='Username' id='formControlLg' type="text" value={username} onChange={e => setUsername(e.target.value)} size="lg" />
                <MDBInput className='password' wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type="password" value={password} onChange={e => setPassword(e.target.value)} size="lg" />
                <h3>forgot password ?</h3>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                <MDBBtn className='login' type="submit" size='lg'>
                  Login
                </MDBBtn>
              </form>
              <h3>Don't have an account? <a href="./Register">Sign up</a></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
