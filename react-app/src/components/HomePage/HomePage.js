import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'
import image2 from './front-page-2.jpg'
import image1 from './front-page-1.jpg'
import EmailRegistration from '../EmailRegistration/EmailRegistration';



const containerStyle = {
  width: '50%',
  height: '200px'
}

const center = {
  lat: 40.727093,
  lng: -73.634296
};



function HomePage() {



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center space-y-4 w-full h-screen p-6 bg-white shadow sm:space-y-0 sm:flex-row sm:space-x-4"
        style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover' }}>
        <Link to="/about-us" className="btn-blue">
          <button className="bg-transparent hover:bg-transparent text-white text-2xl sm:text-3xl font-bold py-2 px-4 rounded shadow-lg slide-up">
            Location
          </button>
        </Link>
        <Link to="/menu" className="btn-blue">
          <button className="bg-transparent hover:bg-transparent text-white text-2xl sm:text-3xl font-bold py-2 px-4 rounded shadow-lg slide-up">
            Menu
          </button>
        </Link>
        <Link to="/about-us" className="btn-blue">
          <button className="bg-transparent hover:bg-transparent text-white text-2xl sm:text-3xl font-bold py-2 px-4 rounded shadow-lg slide-up">
            Contact Us
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-around items-center w-full bg-white shadow p-6 mt-4 sm:flex-row">
        <div>
          <h1 className="text-4xl font-bold">WELCOME TO</h1>
          <h1 className="text-4xl font-bold">SUSHI YA</h1>
        </div>
        <img src={image2} alt='' className="w-full sm:w-1/2" />
      </div>
      <EmailRegistration />
    </div>


  )
}

export default HomePage
