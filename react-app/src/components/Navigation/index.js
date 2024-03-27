import React from "react";
import ChipTabs from "./ChipTab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import HoverTabs from "./HoverTab";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div
      className={`sticky top-0 z-50 grid grid-cols-1 items-center py-2 sm:grid-cols-3 sm:py-3 ${user ? "bg-gradient-to-r from-gray-100 from-20% via-red-500 to-gray-400 to-80%" : "bg-slate-100"}`}
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
        src="/logo1.png"
        alt="Sushiya Logo"
        className="col-start-1 col-end-2 w-40 justify-self-center sm:col-start-2 sm:col-end-3 sm:w-40"
      />
      <ChipTabs className="col-start-1 col-end-2 flex h-full items-end justify-center space-x-3 py-1 sm:col-start-3 sm:col-end-4 sm:justify-self-end sm:pr-6" />
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
