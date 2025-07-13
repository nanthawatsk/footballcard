import { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import '../css/request.css'
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';


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
      <h1>Request</h1>
      <div className='request-container'>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className='request-text'>
      <TextField className='textfield' id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleNameChange} required />
      </div>

        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" Team" variant="outlined" value={team} onChange={handleTeamChange} required  />
          </div>
        
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" Position" variant="outlined" value={position} onChange={handlePositionChange} required />
          </div>
        
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" Brand" variant="outlined" value={brand} onChange={handleBrandChange} required />
          </div>
        
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" Program" variant="outlined" value={program} onChange={handleProgramChange} required />
          </div>
        
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" Year" variant="outlined" value={year} onChange={handleYearChange} required />
          </div>
        
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" National Team" variant="outlined" value={nationalteam} onChange={handleNationalteamChange} required />
          </div>
          
        <br />
          <div className='request-text'>
        <TextField className='textfield' id="outlined-basic" label=" League" variant="outlined" value={league} onChange={handleLeagueChange} required />
          </div>

        <br />
        <div className='inputImage'>
          <input type="file"  onChange={handleImageChange} required />
        </div>
        
        <div className='sendBtn'>
        <Button id='sendBtn' type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
        </div>
      </form>
      </div>
    </>
  );
};

export default Request;
