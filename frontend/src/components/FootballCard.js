import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Football Cards</h2>
      {cards.map(card => (
        <div key={card.id}>
            <img src={card.image} alt={card.name} style={{width:"200px"}} />
          <h3>{card.name}</h3>
            <p>Team: {card.team}</p>
            <p>Position: {card.position}</p>
            <p>Brand: {card.brand}</p>
            <p>Program: {card.program}</p>
            <p>Year: {card.year}</p>
            <p>League: {card.league}</p>
          {/* Render additional card data */}
        </div>
      ))}
    </div>
  );
};

export default FootballCard;
