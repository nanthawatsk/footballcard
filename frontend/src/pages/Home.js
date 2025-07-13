import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FootballCard from '../components/FootballCard';
import '../css/home.css';
import { Navigate } from 'react-router-dom';
import Slideshow from '../components/slideshow';

function Home() {
  if(!localStorage.getItem('auth token')) {
    return<Navigate replace to = '/login'/>;
  }
  return (
    <>
      <Header />
      <Slideshow />
      <div className="home-container">
        <h1 className='trending'>Trending Card</h1>
        <div className="cards">
            <FootballCard />
          </div>
        </div>
      <Footer />
    </>
  );
}

export default Home;
