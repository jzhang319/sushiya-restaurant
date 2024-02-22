import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers} from "react-icons/fi";
import {MdMenu} from "react-icons/md";
import {AiFillHome} from "react-icons/ai";
import { NavLink } from "react-router-dom";

const HoverTabs = () => {
  return (
    <div className="p-4">
      <p className="mb-2 text-xl font-semibold">Sushi Ya</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card title="Home" subtitle="Home Page" href="/" Icon={AiFillHome} />
        <Card title="Menu" subtitle="Our Menu" href="/menu" Icon={MdMenu} />
        <Card
          title="About-Us"
          subtitle="Location and More"
          href="/about-us"
          Icon={FiUsers}
        />

        <Card
          title="Profile"
          subtitle="Manage profile"
          href="#"
          Icon={FiUser}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <NavLink
      to={href}
      className="group relative w-full overflow-hidden rounded border-[1px] border-slate-400 bg-gray-100 p-4"
    >
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-[0%]" />

      <Icon className="absolute -right-12 -top-12 z-10 text-9xl text-slate-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-violet-400" />
      <Icon className="relative z-10 mb-2 text-2xl text-violet-600 transition-colors duration-300 group-hover:text-white" />
      <h3 className="relative z-10 text-lg font-medium text-slate-950 duration-300 group-hover:text-white">
        {title}
      </h3>
      <p className="relative z-10 text-slate-400 duration-300 group-hover:text-violet-200">
        {subtitle}
      </p>
    </NavLink>
  );
};

export default HoverTabs;
