import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import '../css/collection.css'


const CreateCollection = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/collections/',
        { name },
        { headers }
      );

      console.log('Collection created:', response.data);
      window.location.reload();
      // Handle success response, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error('Error creating collection:', error);
      setErrorMessage('Failed to create collection. Please try again.'); // Update error message state
    }
  };

  return (
    <div className='collection-container'>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='createCtn'>
      <TextField className='textfield' id="outlined-basic" label="Create Collection" variant="outlined" value={name} onChange={handleNameChange}  />
    </div>
    <br />
        <div className='createContainer'>
        <Button className='createBtn' id='createBtn' variant="contained" type="submit">Create</Button>
        </div>
      </form>
    </div>
    
  );
};

export default CreateCollection;
