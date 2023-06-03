import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h4>Create Collection</h4>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCollection;
