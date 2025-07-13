import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LikeButton from '../components/Like';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';
import DeleteCardFromCollection from '../components/DeleteCardFromCollection';

const CollectionDetailPage = () => {
  const { collectionId } = useParams();
  const [collectionItems, setCollectionItems] = useState([]);
  const [cards, setCards] = useState([]);

  const headers = { 
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  useEffect(() => {
    const fetchCollectionItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usercollectionitem/${collectionId}/`, { headers });
        setCollectionItems(response.data);
      } catch (error) {
        console.error('Error fetching collection items:', error);
      }
    };

    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/footballcard/');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching football cards:', error);
      }
    };

    fetchCollectionItems();
    fetchCards();
  }, [collectionId]);


  const getCardDetails = (cardId) => {
    const card = cards.find((card) => card.id === cardId);
    return card ? (
      <div>
        <img src={card.image} alt={card.name} />
        <h3>{card.name}</h3>
        <p>Team: {card.team}</p>
        <p>National team: {card.nationalteam}</p>
        <p>Position: {card.position}</p>
        <p>Brand: {card.brand}</p>
        <p>Program: {card.program}</p>
        <p>Year: {card.year}</p>
        <p>League: {card.league}</p>
        <LikeButton cardId={card.id} />
      </div>
    ) : null;
  };
  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }


  return (
    <>
    <div>
        <Header/>
      <h2>Collection Detail</h2>
      <div className='football-container'>
        {collectionItems.map((item) => (
          <div className='footballcard' key={item.id}>{getCardDetails(item.card)}
           <DeleteCardFromCollection itemId={item.id} />
          </div>
        
        ))}
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default CollectionDetailPage;
