import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
import ChipTabs from "./ChipTab";
import HoverTabs from "./HoverTab";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  // const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="sticky top-0 flex w-full justify-center bg-black px-4 py-4">

      {/* <HoverTabs /> */}

      <div className="flex-grow"></div>
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <img src="/logo.png" alt="" className="" />
      </div>
      
      <ChipTabs className="flex-shrink flex-grow" />
      {/* <NavLink exact to="/" className="hover:text-red-500">
        Home
      </NavLink>
      <NavLink exact to="/menu" className="hover:text-red-500">
        Menu
      </NavLink>
      <NavLink exact to="/about-us" className="hover:text-red-500">
        About-Us
      </NavLink> */}

      {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
    </div>
  );
}
export default Navigation;
