import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import '../css/addcollection.css'


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
      <FormControl className='select-collection'>
        <InputLabel id="demo-simple-select-autowidth-label">Collection</InputLabel>
        <Select
          className='select'
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedCollection}
          onChange={handleCollectionChange}
          autoWidth
          label="Collection"
        >
          <MenuItem value="">
            <em>Select Collection</em>
          </MenuItem>
          {collections.map((collection) => (
          <MenuItem key={collection.id} value={collection.id}>{collection.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <div className='addBtnContainer'>
      <Button className='addBtn' id='addBtn' variant="contained" onClick={handleAddToCollection} disabled={isAdding || !selectedCollection}>
        {isAdding ? 'Adding...' : 'Add'}
      </Button>
      </div>
    </div>
  );
};

export default AddToCollectionButton;
