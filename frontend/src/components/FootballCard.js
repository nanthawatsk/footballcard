import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/footballcard.css';
import LikeButton from './Like';
import AddToCollectionButton from './AddToCollection';

const FootballCard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/footballcard/');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching football cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
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
  );
};

export default FootballCard;
