import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditProfile = () => {
  const headers = {
    Authorization: `Token ${localStorage.getItem('auth token')}`,
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers,
        });
        const userData = response.data;
        setFormData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/user/profile/update/',
        formData,
        { headers }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    setErrorMessage('Email already exists.');
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
    {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="first_name">First Name</label>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
        <br />
      <label htmlFor="last_name">Last Name</label>
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
        <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditProfile;
