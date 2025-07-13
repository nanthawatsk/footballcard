import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../imgs/logo-no-background.png';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/auth';
import '../css/register.css';
import { Navigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const dispatch = useDispatch();
  const registrationStatus = useSelector(state => state.auth.registrationStatus);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      // Display error message or handle mismatched passwords
      return;
    }

    // Dispatch registration action
    dispatch(register(username, first_name, last_name, email, password, confirm_password));

  };

  if (registrationStatus === 'success') {
    return <Navigate to="/" replace />;
  }

  if (localStorage.getItem('auth token')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="register">
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <img src={logo} alt="Logo" />
              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
              {registrationStatus === 'success' && <p>Registration successful!</p>}
              {registrationStatus === 'error' && <p>Registration failed. Please try again.</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Username'
                  id='formControlLg'
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='First name'
                  id='formControlLg'
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Last name'
                  id='formControlLg'
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Email'
                  id='formControlLg'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Password'
                  id='formControlLg'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label='Confirm Password'
                  id='formControlLg'
                  type="password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                <MDBBtn className="registerBtn" type="submit" size='lg'>
                  Register
                </MDBBtn>
              </form>
              <h3>Have an account? <a href='./login'>Sign in</a></h3>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
};

export default Register;
