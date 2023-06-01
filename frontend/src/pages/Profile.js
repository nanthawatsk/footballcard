import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `token ${localStorage.getItem('auth token')}`,
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle network error
      }
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header />
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <p>First name: {userProfile.first_name}</p>
      <p>Last name: {userProfile.last_name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Add additional profile fields */}
    </div>
    <Footer/>
    </>
  );
};

export default UserProfile;
