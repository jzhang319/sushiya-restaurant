import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineContactPhone } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

// updating all 3 different card's styles at once
// with these universal variables
const divClassName =
  "absolute inset-0 translate-y-[100%] bg-gradient-to-r from-gray-400 to-white transition-transform duration-300 group-hover:translate-y-[0%]";
const smallIconClassName =
  "absolute -right-12 -top-12 z-10 text-9xl text-yellow-600 opacity-0 transition-transform duration-300 group-hover:rotate-12 group-hover:text-yellow-700 group-hover:opacity-100";
const bigIconClassName =
  "relative z-10 mb-2 text-2xl text-red-500 transition-colors duration-300 group-hover:text-white";
const h3TagClassName =
  "relative z-10 hidden text-lg font-medium text-black duration-300 group-hover:text-yellow-900 sm:block";
const pTagClassName =
  "relative z-10 hidden text-gray-400 duration-300 group-hover:text-gray-200 sm:block ";

const HoverTabs = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="p-4">
      <p className="mb-2 text-2xl font-semibold text-black">
        {/* Sushi Ya Japanese Restaurant */}
      </p>
      <div className="flex flex-nowrap space-x-4 overflow-x-auto">
        <Card
          title="Sushi Ya"
          subtitle="Japanese Restaurant"
          href="/"
          Icon={AiFillHome}
        />
        <Card title="Menu" subtitle="Our Menu" href="/menu" Icon={BiFoodMenu} />
        <Card
          title="About-Us"
          subtitle="Location and More"
          href="/about-us"
          Icon={MdOutlineContactPhone}
        />

        <OrderCard
          title="Online Ordering"
          subtitle="Order Online"
          href="https://direct.chownow.com/order/6593/locations/8738"
          Icon={FaPhoneFlip}
        />
        <DropDownCard
          title="Staff"
          subtitle="Management"
          Icon={FiUsers}
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
      className="group relative w-full overflow-hidden rounded border-[1px]  border-gray-300 bg-white p-4 font-roboto"
      activeClassName="border-[1px] border-b-4 border-yellow-600 z-50"
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        return location.pathname === href;
      }}
    >
      <div className={divClassName} />
      <Icon className={smallIconClassName} />
      <Icon className={bigIconClassName} />
      <h3 className={h3TagClassName}>{title}</h3>
      <p className={pTagClassName}>{subtitle}</p>
    </NavLink>
  );
};

const OrderCard = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full overflow-hidden rounded border-[1px] border-gray-300 bg-white p-4 font-roboto"
    >
      <div className={divClassName} />
      <Icon className={smallIconClassName} />
      <Icon className={bigIconClassName} />
      <h3 className={h3TagClassName}>{title}</h3>
      <p className={pTagClassName}>{subtitle}</p>
    </a>
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
      className={`group relative w-full overflow-hidden rounded border-[1px]  border-gray-300 bg-white p-4 ${
        dropdownOpen ? "border-yellow-700" : ""
      }`}
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <div className={divClassName} />
      <Icon className={smallIconClassName} />
      <Icon className={bigIconClassName} />
      <h3 className={h3TagClassName}>{title}</h3>
      <p className={pTagClassName}>{subtitle}</p>

      {dropdownOpen && (
        <div className="absolute right-0 top-0 z-50 h-full w-full divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg">
          {user ? (
            <>
              <div className="px-4 py-2 text-center">
                <p className="text-sm">Signed in as:</p>
                <p className="text-sm font-medium text-gray-900">
                  - {user?.username}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  - {user?.email}
                </p>
              </div>
              <div className="">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                  }}
                  className="text-bol mx-auto block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-red-700 hover:text-white"
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
