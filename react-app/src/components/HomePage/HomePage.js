import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import image2 from './front-page-2.jpg'
function HomePage() {
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
        <img src={image2}  />
      </div>
    </div>


  )
}

export default HomePage
