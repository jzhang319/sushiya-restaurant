import React from "react";
import ChipTabs from "./ChipTab";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import HoverTabs from "./HoverTab";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div
      className={`sticky top-0 z-50 grid grid-cols-1 items-center py-6 sm:grid-cols-3 ${user ? "bg-gradient-to-r from-black from-20% via-red-500 to-black to-80%" : "bg-black"}`}
    >
      <div className="col-start-1 col-end-2 flex items-center justify-center">
        {user ? (
          <button
            className="rounded bg-red-700 px-4 py-2 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : null}
      </div>
      <img
        src="/logo.png"
        alt="Sushiya Logo"
        className="col-start-1 col-end-2 justify-self-center sm:col-start-2 sm:col-end-3"
      />
      <ChipTabs className="col-start-1 col-end-2 items-center space-x-3 sm:col-start-3 sm:col-end-4 sm:justify-self-end sm:py-1 sm:pr-6" />
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
