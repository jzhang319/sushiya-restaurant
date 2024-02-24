import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
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
  )
}

export default HomePage
