import React from 'react'
import { Link } from 'react-router-dom'


function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div
        className="mt-4 flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white p-6 shadow"
        style={{ backgroundImage: `url(${image1})`, backgroundSize: "cover" }}
      >
        <Link to="/about-us" className="btn-blue">
          <button className="rounded bg-transparent px-4 py-2 text-2xl font-bold text-white shadow-lg hover:bg-transparent sm:text-3xl">
            Location
          </button>
        </Link>
        <Link to="/menu" className="btn-blue">
          <button className="rounded bg-transparent px-4 py-2 text-2xl font-bold text-white shadow-lg hover:bg-transparent sm:text-3xl">
            Menu
          </button>
        </Link>
        <Link to="/about-us" className="btn-blue">
          <button className="rounded bg-transparent px-4 py-2 text-2xl font-bold text-white shadow-lg hover:bg-transparent sm:text-3xl">
            Contact Us
          </button>
        </Link>
      </div>
      <div className="mt-4 flex w-full items-center justify-around bg-white p-6 shadow">
        <div>
          <h1 className="text-4xl font-bold">WELCOME TO</h1>
          <h1 className="text-4xl font-bold">SUSHI YA</h1>
        </div>
        <img src={image2} alt="" className="w-1/2" />
      </div>
    </div>
  );
}

export default HomePage
