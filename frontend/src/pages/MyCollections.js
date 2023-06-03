import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateCollection from '../components/CreateCollections';
import DeleteCollection from '../components/DeleteCollection';



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


  return (
    <div>
    <Header/>
      <h2>My Collections</h2>
      <CreateCollection />
      {collections.map((collection) => (
        <div key={collection.id}>
          <Link to={`/mycollections/${collection.id}`}>
            <h3>{collection.name}</h3>
          </Link>
          <DeleteCollection collectionId={collection.id} />
          <div>
            {collection.cards && collection.cards.map((card) => (
              <p key={card.id}>{card.title}</p>
            ))}
          </div>
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default MyCollectionPage;
