import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FootballCard from '../components/FootballCard'


function Home() {
  return (
    <><Header />
    <FootballCard />
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <h1>Home</h1>
        </div>
      </div>
    </div>
    <Footer /></>
  )
}

export default Home