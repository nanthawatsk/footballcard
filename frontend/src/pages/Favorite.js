import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LikeButton from '../components/Like';
import { Navigate } from 'react-router-dom';
import AddToCollectionButton from '../components/AddToCollection';



const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [cards, setCards] = useState([]);
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/favorites/', { headers });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
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

    fetchFavorites();
    fetchCards();
  }, []);

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
        <AddToCollectionButton cardId={card.id} />
      </div>
    ) : null;
  };
  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }

  return (
    <>
    <Header />
    <div>
      <h1>My Favorite Cards</h1>
      {favorites.length > 0 ? (
        <div className='football-container'>
          {favorites.map((favorite) => (
            <div className='footballcard' key={favorite.id}>
              {getCardDetails(favorite.card)}
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite cards found.</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default UserFavorites;
