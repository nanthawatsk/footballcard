import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/like.css'

const LikeButton = ({ cardId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/favorites/?card=${cardId}`, { headers });
        const userFavorites = response.data;
        if (userFavorites.length > 0) {
          const userFavorite = userFavorites.find(favorite => favorite.card === cardId);
          if (userFavorite) {
            setIsLiked(true);
            setFavoriteId(userFavorite.id);
          }
        }
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    };

    checkFavorite();
  }, [cardId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        // If already liked, update the state immediately and send a delete request to remove the favorite
        setIsLiked(false);
        await axios.delete(`http://localhost:8000/api/favorites/${favoriteId}/delete/`, { headers });
        setFavoriteId(null);
      } else {
        // If not liked, update the state immediately and send a post request to create the favorite
        setIsLiked(true);
        const response = await axios.post(
          'http://localhost:8000/api/favorites/create/',
          { card: cardId },
          { headers }
        );
        setFavoriteId(response.data.id);
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  return (
    <i className="like" onClick={handleLike}>
      {isLiked ? <i id='like' className="fa-solid fa-heart"></i> : <i id='unlike' className="fa-regular fa-heart"></i>}
    </i>
  );
};

export default LikeButton;
