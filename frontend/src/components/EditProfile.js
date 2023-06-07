import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


const EditProfile = () => {
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers,
        });
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/user/profile/update/',
        formData,
        { headers }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    setErrorMessage('Email already exists.');
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <>
    <h1>Edit Profile</h1>
    <form onSubmit={handleSubmit}>
    {errorMessage && <p>{errorMessage}</p>}
    
    <div>
    <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" type="text" 
        name="email"
        value={formData.email}
        onChange={handleChange}/>
    </div>
      
      <br />
      <div>
      <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" 
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        />
      </div>
      
        <br />
        <div>
        <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" 
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        />
        </div>
     
        <br />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
  
      <Button variant="outlined" color="error" type="button" onClick={handleCancel}>
          Cancel
      </Button>
    </form>
    </>
  );
};

export default EditProfile;
