import React from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import image2 from "./front-page-2.jpg";
// import image1 from "./front-page-1.jpg";
import image0 from "./front-page-0.jpg";
import EmailRegistration from "../EmailRegistration/EmailRegistration";

// const containerStyle = {
//   width: "50%",
//   height: "200px",
// };

// const center = {
//   lat: 40.727093,
//   lng: -73.634296,
// };

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="h-210 relative w-full">
        <img
          src={image0}
          alt="sushi-frontpage"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="absolute inset-0 flex flex-row items-center justify-center">
          <Link
            to="/about-us"
            className="btn-blue slide-up ml-6 bg-transparent font-abel text-2xl font-bold text-white hover:bg-transparent sm:text-4xl"
            style={{ textDecoration: "underline", width: "150px", zIndex: 1 }}
          >
            About Us
          </Link>
          <Link
            to="/menu"
            className="btn-blue slide-up ml-6 bg-transparent font-abel text-2xl font-bold text-white hover:bg-transparent  sm:text-4xl"
            style={{ textDecoration: "underline", width: "150px", zIndex: 1 }}
          >
            Our Menu
          </Link>
          <a
            href="https://direct.chownow.com/order/6593/locations/8738"
            className="slide-up ml-6 bg-transparent font-abel text-2xl font-bold text-white hover:bg-transparent sm:text-4xl"
            style={{ textDecoration: "underline", width: "150px", zIndex: 1 }}
          >
            Order Now
          </a>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col items-center justify-around bg-white p-6 shadow sm:flex-row">
        <div>
          <h1 className="text-4xl font-bold">WELCOME TO</h1>
          <h1 className="text-4xl font-bold">SUSHI YA</h1>
        </div>
        <img src={image2} alt="" className="w-full sm:w-1/2" />
      </div>
      <EmailRegistration />
    </div>
  );
}

export default HomePage;
