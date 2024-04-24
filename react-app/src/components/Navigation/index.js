import React from "react";
import ChipTabs from "./ChipTab";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import HoverTabs from "./HoverTab";

function Navigation({ isLoaded }) {
  library.add(fab);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div
      className={`sticky top-0 z-50 grid grid-cols-1 items-center sm:grid-cols-3 sm:py-3 ${user ? "bg-gradient-to-r from-gray-100 from-20% via-red-500 to-gray-400 to-80%" : "bg-slate-100"} relative`}
    >
      <div className="col-start-1 col-end-2 flex flex-col items-start justify-between">
        <div className="absolute bottom-0 left-0 space-x-4 pl-6">
          <a
            href="https://www.instagram.com/sushiyagardencity/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={["fab", "instagram"]}
              className="fa-lg slide-up mb-4 cursor-pointer text-red-800"
            />
          </a>
          <a
            href="https://www.facebook.com/sushiyagc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon="fa-brands fa-square-facebook"
              className="fa-lg slide-up mb-4 cursor-pointer text-red-800"
            />
          </a>
        </div>
        {user ? (
          <button
            className="rounded bg-red-700 px-4 py-2 text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : null}
      </div>
      <Link
        to="/"
        className="col-start-1 col-end-2 justify-self-center sm:col-start-2 sm:col-end-3"
      >
        <img src="/logo1.png" alt="Sushiya Logo" className="w-40" />
      </Link>
      <ChipTabs className="col-start-1 col-end-2 flex h-full items-end justify-center space-x-3 py-1 sm:col-start-3 sm:col-end-4 sm:justify-self-end sm:pr-6" />
      {/* <NavLink exact to="/" className="hover:text-red-500">
        Home
        </NavLink>
        <NavLink exact to="/menu" className="hover:text-red-500">
        Menu
        </NavLink>
        <NavLink exact to="/about-us" className="hover:text-red-500">
        About-Usß
      </NavLink> */}

      {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
    </div>
  );
}
export default Navigation;
