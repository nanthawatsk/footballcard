import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from './Like';
import AddToCollectionButton from './AddToCollection';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../css/search.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchFilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [nationalteamFilter, setNationalteamFilter] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/footballcard/search/?search=${searchTerm}&position=${positionFilter}&team=${teamFilter}&brand=${brandFilter}&program=${programFilter}&year=${yearFilter}&nationalteam=${nationalteamFilter}&league=${leagueFilter}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error performing search:', error);
      }
    };

    if (searchTerm || positionFilter || teamFilter || brandFilter || programFilter || yearFilter || nationalteamFilter || leagueFilter) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, positionFilter, teamFilter, brandFilter, programFilter, yearFilter, nationalteamFilter, leagueFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePositionFilterChange = (event) => {
    setPositionFilter(event.target.value);
  };

  const handleTeamFilterChange = (event) => {
    setTeamFilter(event.target.value);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleProgramFilterChange = (event) => {
    setProgramFilter(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  const handleNationalteamFilterChange = (event) => {
    setNationalteamFilter(event.target.value);
  };

  const handleLeagueFilterChange = (event) => {
    setLeagueFilter(event.target.value);
  };

  return (
    <div className='search-container'>
      <h1>Search for Football Cards</h1>
      <div className='search'>
        <Box>
      <TextField fullWidth label="Search" type="text" id="searchInput" value={searchTerm} onChange={handleSearchChange} />
    </Box>
      </div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Position</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="positionFilter" 
          value={positionFilter} 
          onChange={handlePositionFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Forward">Forward</MenuItem>
          <MenuItem value="Midfielder">Midfielder</MenuItem>
          <MenuItem value="Defender">Defender</MenuItem>
          <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="brandFilter" 
          value={brandFilter} 
          onChange={handleBrandFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Panini">Panini</MenuItem>
          <MenuItem value="Donruss">Donruss</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Program</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="programFilter" 
          value={programFilter} 
          onChange={handleProgramFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Prizm">Prizm</MenuItem>
          <MenuItem value="Select">Select</MenuItem>
          <MenuItem value="Donruss">Donruss</MenuItem>
          <MenuItem value="Obsidian">Obsidian</MenuItem>
          <MenuItem value="Chronicles">Chronicles</MenuItem>
          <MenuItem value="FIFA">FIFA</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="yearFilter" 
          value={yearFilter} 
          onChange={handleYearFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="2022-2023">2022-2023</MenuItem>
          <MenuItem value="2021-2022">2021-2022</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Nationalteam</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="nationalteamFilter" 
          value={nationalteamFilter} 
          onChange={handleNationalteamFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Germany">Germany</MenuItem>
          <MenuItem value="France">France</MenuItem>
          <MenuItem value="Spain">Spain</MenuItem>
          <MenuItem value="Italy">Italy</MenuItem>
          <MenuItem value="England">England</MenuItem>
          <MenuItem value="Portugal">Portugal</MenuItem>
          <MenuItem value="Netherlands">Netherlands</MenuItem>
          <MenuItem value="Belgium">Belgium</MenuItem>
          <MenuItem value="Denmark">Denmark</MenuItem>
          <MenuItem value="Sweden">Sweden</MenuItem>
          <MenuItem value="Switzerland">Switzerland</MenuItem>
          <MenuItem value="Austria">Austria</MenuItem>
          <MenuItem value="Croatia">Croatia</MenuItem>
          <MenuItem value="Poland">Poland</MenuItem>
          <MenuItem value="Turkey">Turkey</MenuItem>
          <MenuItem value="Russia">Russia</MenuItem>
          <MenuItem value="Ukraine">Ukraine</MenuItem>
          <MenuItem value="Czech Republic">Czech Republic</MenuItem>
          <MenuItem value="Wales">Wales</MenuItem>
          <MenuItem value="Scotland">Scotland</MenuItem>
          <MenuItem value="Slovakia">Slovakia</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Uruguay">Uruguay</MenuItem>
          <MenuItem value="Norway">Norway</MenuItem>
          <MenuItem value="Brazil">Brazil</MenuItem>
          <MenuItem value="Korea">Korea</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">League</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="leagueFilter" 
          value={leagueFilter} 
          onChange={handleLeagueFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Premier League">Premier League</MenuItem>
          <MenuItem value="La Liga">La Liga</MenuItem>
          <MenuItem value="Serie A">Serie A</MenuItem>
          <MenuItem value="Bundesliga">Bundesliga</MenuItem>
          <MenuItem value="Ligue 1">Ligue 1</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">team</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="leagueFilter" 
          value={teamFilter} 
          onChange={handleTeamFilterChange}
          autoWidth
          label="team"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Arsenal">Arsenal</MenuItem>
          <MenuItem value="Aston Villa">Aston Villa</MenuItem>
          <MenuItem value="Brentford">Brentford</MenuItem>
          <MenuItem value="Brighton & Hove Albion">Brighton & Hove Albion</MenuItem>
          <MenuItem value="Burnley">Burnley</MenuItem>
          <MenuItem value="Chelsea">Chelsea</MenuItem>
          <MenuItem value="Crystal Palace">Crystal Palace</MenuItem>
          <MenuItem value="Everton">Everton</MenuItem>
          <MenuItem value="Leeds United">Leeds United</MenuItem>
          <MenuItem value="Leicester City">Leicester City</MenuItem>
          <MenuItem value="Liverpool">Liverpool</MenuItem>
          <MenuItem value="Manchester City">Manchester City</MenuItem>
          <MenuItem value="Manchester United">Manchester United</MenuItem>
          <MenuItem value="Newcastle United">Newcastle United</MenuItem>
          <MenuItem value="Norwich City">Norwich City</MenuItem>
          <MenuItem value="Southampton">Southampton</MenuItem>
          <MenuItem value="Tottenham Hotspur">Tottenham Hotspur</MenuItem>
          <MenuItem value="Watford">Watford</MenuItem>
          <MenuItem value="West Ham United">West Ham United</MenuItem>
          <MenuItem value="Wolverhampton Wanderers">Wolverhampton Wanderers</MenuItem>
          <MenuItem value="Atletico Madrid">Atletico Madrid</MenuItem>
          <MenuItem value="Barcelona">Barcelona</MenuItem>
          <MenuItem value="Real Madrid">Real Madrid</MenuItem>
        </Select>
      </FormControl>

      {searchResults.length > 0 ? (
        <div className="football-container">
          {searchResults.map((card) => (
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
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchFilterComponent;
