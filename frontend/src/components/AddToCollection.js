import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddToCollectionButton = ({ cardId }) => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/collections/list/', { headers });
        setCollections(response.data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, []);

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const handleAddToCollection = async () => {
    setIsAdding(true);
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/usercollectionitem/create/',
        { card: cardId, user_collection: selectedCollection },
        { headers }
      );
  
      console.log('Item added to collection:', response.data);
      // Handle success response, e.g., show success message, update UI, etc.
    } catch (error) { 
      console.error('Error adding item to collection:', error);
      setErrorMessage('This card is already in collection.'); // Update error message state
    }
  
    setIsAdding(false);
  };
  

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <select value={selectedCollection} onChange={handleCollectionChange}>
        <option value="">Select Collection</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToCollection} disabled={isAdding || !selectedCollection}>
        {isAdding ? 'Adding...' : 'Add to Collection'}
      </button>
    </div>
  );
};

export default AddToCollectionButton;
