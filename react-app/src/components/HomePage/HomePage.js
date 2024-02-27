import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './HomePage.css'
import image2 from './front-page-2.jpg'




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
    <div className='homepage'>
      <div className='panel-1'>
        <Link to="/about-us">
          <button>Location</button>
        </Link>
        <Link to="/menu">
          <button>Menu</button>
        </Link>
        <Link to="/about-us">
          <button>Contact Us</button>
        </Link>
      </div>
      <div className='panel-2'>
        <div>
          <h1>WELCOME TO</h1>
          <h1>SUSHI YA</h1>

        </div>
        <img src={image2} />
      </div>
      <div>
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
    </div>


  )
}

export default HomePage
