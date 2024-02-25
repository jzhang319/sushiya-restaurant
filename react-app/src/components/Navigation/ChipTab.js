import { motion } from "framer-motion";
import { NavLink } from "react-router-dom"; // Import NavLink

const tabs = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About-Us", path: "/about-us" },
];

const ChipTabs = ({ className }) => {
  return (
    <div
      className={`${className}`}
    >
      {tabs.map((tab) => (
        <Chip text={tab.name} path={tab.path} key={tab.name} />
      ))}
    </div>
  );
};

const Chip = ({ text, path }) => {
  return (
    <NavLink
      exact
      to={path}
      activeClassName="text-white bg-gradient-to-r from-violet-600 to-indigo-600" // Add this line
      className={`relative rounded-md px-2.5 py-0.5 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-200`}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        layoutId="pill-tab"
        transition={{ type: "spring", duration: 0.5 }}
        className="absolute inset-0 z-0 rounded-md"
      ></motion.span>
    </NavLink>
  );
};

export default ChipTabs;
