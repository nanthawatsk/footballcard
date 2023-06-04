import React from 'react';
import axios from 'axios';

const DeleteCardFromCollection = ({ itemId, onDelete }) => {
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/usercollectionitem/${itemId}/delete/`, { headers });
      console.log('Card deleted');
      window.location.reload();
      onDelete(); // Call the onDelete function passed as a prop to trigger the update in the parent component
      // Handle success response, e.g., show success message, update UI, etc.
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return ( 
    <>
      <button onClick={handleDelete}>Delete Card</button>
    </>
  );
};

export default DeleteCardFromCollection;
