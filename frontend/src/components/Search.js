import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/footballcard/search/?search=${searchTerm}&position=${positionFilter}&team=${teamFilter}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error performing search:', error);
      }
    };

    if (searchTerm || positionFilter || teamFilter) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, positionFilter, teamFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePositionFilterChange = (event) => {
    setPositionFilter(event.target.value);
  };

  const handleTeamFilterChange = (event) => {
    setTeamFilter(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="searchInput">Search cards:</label>
        <input type="text" id="searchInput" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        <label htmlFor="positionFilter">Filter by position:</label>
        <select id="positionFilter" value={positionFilter} onChange={handlePositionFilterChange}>
          <option value="">All</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>
      <div>
        <label htmlFor="teamFilter">Filter by team:</label>
        <select id="teamFilter" value={teamFilter} onChange={handleTeamFilterChange}>
          <option value="">All</option>
          <option value="Liverpool">Liverpool</option>
          <option value="Westham United">Westham United</option>
          <option value="Team C">Team C</option>
          {/* Add more options for teams */}
        </select>
      </div>
      <ul>
        {searchResults.map((card) => (
          <li key={card.id}>{card.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;
