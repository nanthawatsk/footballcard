import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';



const ChangePassword = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const headers = {
        Authorization: `Token ${localStorage.getItem('auth token')}`,
    };

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
                'http://localhost:8000/api/change-password/',
                formData,
                { headers }
            );
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error(error);

        }
    };

    const handleCancel = () => {   
        window.location.reload();
    };
    
  return (
    <>
    <h1>Change Password</h1>
    <form onSubmit={handleSubmit}>
    <div>
        <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" 
        label="Old Password"
        type='password'
        name='old_password'
        value={formData.old_password}
        onChange={handleChange}
        />
    </div>
        <br />
    <div>
        <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" 
        label="New Password"
        type='password'
        name='new_password'
        value={formData.new_password}
        onChange={handleChange}
        />
    </div>

        <br />
    <div>
        <TextField className='textprofile' 
        id="outlined-basic"  variant="outlined" 
        label="Confirm Password"
        type='password'
        name='confirm_password'
        value={formData.confirm_password}
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

export default ChangePassword