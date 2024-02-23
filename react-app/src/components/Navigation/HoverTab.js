import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const HoverTabs = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div
      className="p-4"
      // style={{
      //   backgroundImage: `url('https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <p className="mb-2 text-2xl font-semibold text-purple-900">
        {/* Sushi Ya Japanese Restaurant */}
      </p>
      <div className="flex flex-nowrap space-x-4 overflow-x-auto">
        <Card
          title="Sushi Ya Japanese Restaurant"
          subtitle="Home Page"
          href="/"
          Icon={AiFillHome}
        />
        <Card title="Menu" subtitle="Our Menu" href="/menu" Icon={MdMenu} />
        <Card
          title="About-Us"
          subtitle="Location and More"
          href="/about-us"
          Icon={FiUsers}
        />

        {/* <Card
          title="Profile"
          subtitle="Manage profile"
          href="#"
          Icon={FiUser}
        /> */}
        <DropDownCard
          title="Profile"
          subtitle="Manage profile"
          Icon={FiUser}
          user={user}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <NavLink
      to={href}
      className="font-roboto group relative w-full overflow-hidden rounded border-[1px] border-slate-200 bg-gray-100 p-4"
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        return location.pathname.includes(href);
      }}
    >
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-[0%]" />

      <Icon className="absolute -right-12 -top-12 z-10 text-9xl text-slate-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-violet-400" />
      <Icon className="relative z-10 mb-2 text-2xl text-violet-600 transition-colors duration-300 group-hover:text-white" />
      <h3 className="relative z-10 hidden text-lg font-medium text-slate-950 duration-300 group-hover:text-white sm:block">
        {title}
      </h3>
      <p className="relative z-10 hidden text-slate-400 duration-300 group-hover:text-violet-200 sm:block ">
        {subtitle}
      </p>
    </NavLink>
  );
};

const DropDownCard = ({ title, subtitle, Icon, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="group relative w-full overflow-hidden rounded border-[1px] border-slate-200 bg-gray-100 p-4"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-[0%]" />

      <Icon className="absolute -right-12 -top-12 z-10 text-9xl text-slate-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-violet-400" />
      <Icon className="relative z-10 mb-2 text-2xl text-violet-600 transition-colors duration-300 group-hover:text-white" />
      <h3 className="relative z-10 hidden text-lg font-medium text-slate-950 duration-300 group-hover:text-white sm:block ">
        {title}
      </h3>
      <p className="relative z-10 hidden text-slate-400 duration-300 group-hover:text-violet-200 sm:block ">
        {subtitle}
      </p>

      {dropdownOpen && (
        <div className="absolute right-0 top-0 z-50 h-full w-full divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg">
          {user ? (
            <>
              <div className="px-4 py-3">
                <p className="text-sm">Signed in as</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HoverTabs;
