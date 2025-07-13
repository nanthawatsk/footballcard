import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/footballcard.css';
import LikeButton from '../components/Like';
import AddToCollectionButton from '../components/AddToCollection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';

const NewRelease = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/footballcard/newrelease/');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching football cards:', error);
      }
    };

    fetchCards();
  }, []);

  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }

  return (
    <>
    <Header />
    <h1>New Release</h1>
    <div className='football-container'>
      {cards.map(card => (
        <div className='footballcard' key={card.id}>
            <img src={card.image} alt={card.name}/>
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
      ))}
      </div>
      <Footer />
      </>
  );
};

export default NewRelease;
