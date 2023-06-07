import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';
import { Button } from '@mui/material';



const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('auth token')}`,
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

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axios.put('http://localhost:8000/api/user/profile/update/', updatedData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('auth token')}`,
        },
      });

      if (response.status === 200) {
        setUserProfile(response.data);
        setIsEditing(false);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  };


  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {isEditing ? (
          <EditProfile
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onCancelEdit={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h1>User Profile</h1>
            <p>Username: {userProfile.username}</p>
            <p>First name: {userProfile.first_name}</p>
            <p>Last name: {userProfile.last_name}</p>
            <p>Email: {userProfile.email}</p>
            {/* Add additional profile fields */}
            <Button variant="outlined" onClick={handleEditProfile}>Edit Profile</Button>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
