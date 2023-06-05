import { useState } from 'react';
import axios from 'axios';

const Request = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [brand, setBrand] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [nationalteam, setNationalteam] = useState('');
  const [league, setLeague] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handleProgramChange = (event) => {
    setProgram(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleNationalteamChange = (event) => {
    setNationalteam(event.target.value);
  };
  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log(name, team, position, brand, program, year, nationalteam, league, image);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('team', team);
      formData.append('position', position);
      formData.append('brand', brand);
      formData.append('program', program);
      formData.append('year', year);
      formData.append('nationalteam', nationalteam);
      formData.append('league', league);
      formData.append('image', image);

      const response = await axios.post('http://localhost:8000/api/request/', formData, {
        headers,
      });
      console.log('Request created:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating request:', error);
      setErrorMessage('Failed to create request. Please try again.');
    }
  };

  return (
    <>
      <div>Request</div>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
        <br />
        <label>
          Team:
          <input type="text" value={team} onChange={handleTeamChange} required />
        </label>
        <br />
        <label>
          Position:
          <input type="text" value={position} onChange={handlePositionChange} required />
        </label>
        <br />
        <label>
          Brand:
          <input type="text" value={brand} onChange={handleBrandChange} required />
        </label>
        <br />
        <label>
          Program:
          <input type="text" value={program} onChange={handleProgramChange} required />
        </label>
        <br />
        <label>
          Year:
          <input type="text" value={year} onChange={handleYearChange} required />
        </label>
        <br />
        <label>
          National Team:
          <input type="text" value={nationalteam} onChange={handleNationalteamChange} required />
        </label>
        <br />
        <label>
          League:
          <input type="text" value={league} onChange={handleLeagueChange} required />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Request;
