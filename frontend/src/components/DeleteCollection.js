import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const DeleteCollection = ({ collectionId, onDelete }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/collections/${collectionId}/delete/`, { headers });
      console.log('Collection deleted');
      window.location.reload();
      onDelete(); // Call the onDelete function passed as a prop to trigger the update in the parent component
      // Handle success response, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error('Error deleting collection:', error);
      setErrorMessage('Failed to delete collection. Please try again.'); // Update error message state
    }
  };

  return (
    <div>
      <Button onClick={handleDelete} variant="outlined" color="error">
      Delete
      </Button>
        {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default DeleteCollection;
