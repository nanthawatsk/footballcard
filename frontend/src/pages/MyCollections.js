import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateCollection from '../components/CreateCollections';
import DeleteCollection from '../components/DeleteCollection';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import '../css/collection.css'



const MyCollectionPage = () => {
  const [collections, setCollections] = useState([]);
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

  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }


  return (
    <div>
    <Header/>
    <div className='myCollectionContainer'>
      <h1>My Collections</h1>
      <CreateCollection />
        <div class="collection-grid">
          {collections.map((collection) => (
            <div class="collection-card" key={collection.id}>
              <Link to={`/mycollections/${collection.id}`}>
                <h3>{collection.name}</h3>
              </Link>
              <div class="card-content">
                {collection.cards && collection.cards.map((card) => (
                  <p key={card.id}>{card.title}</p>
                ))}
                </div>
                <DeleteCollection collectionId={collection.id} />
              </div>
          ))}
        </div>
      <Footer/>
    </div>
  </div>
  );
};

export default MyCollectionPage;
