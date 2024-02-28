import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './HomePage.css'
import image2 from './front-page-2.jpg'
import image1 from './front-page-1.jpg'




const containerStyle = {
  width: '50%',
  height: '200px'
}

const center = {
  lat: 40.727093,
  lng: -73.634296
};



function HomePage() {

  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center space-y-4 w-full h-screen p-6 mt-4 bg-white shadow"
        style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover' }}>
        <Link to="/about-us" className="btn-blue">
          <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-bold py-2 px-4 rounded">
            Location
          </button>
        </Link>
        <Link to="/menu" className="btn-blue">
          <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-bold py-2 px-4 rounded">
            Menu
          </button>
        </Link>
        <Link to="/about-us" className="btn-blue">
          <button className="bg-transparent hover:bg-blue-700 text-blue-700 font-bold py-2 px-4 rounded">
            Contact Us
          </button>
        </Link>
      </div>
      <div className="flex justify-around items-center w-full bg-white shadow p-6 mt-4">
        <div>
          <h1 className="text-4xl font-bold">WELCOME TO</h1>
          <h1 className="text-4xl font-bold">SUSHI YA</h1>
        </div>
        <img src={image2} className="w-1/2" />
      </div>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} onClick={handleMarkerClick}>
            {showInfoWindow && (
              <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                <div>
                  <h4>Sushi Ya</h4>
                  <p>949 Franklin Ave, Garden City, NY 11530</p>
                  <a href="https://www.google.com/maps/dir//Sushi+Ya/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x89c27d8f3c3feabb:0x53d8e7d6588a9a73?sa=X&ved=2ahUKEwiJotbB4PzvAhW1l-AKHQJiDzQQ9RcwFHoECAYQBA" target="_blank" rel="noopener noreferrer">Get Directions</a>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      </LoadScript>
    </div>


  )
}

export default HomePage
