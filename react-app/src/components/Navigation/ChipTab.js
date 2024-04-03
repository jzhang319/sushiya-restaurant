import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Our Menu", path: "/menu" },
  {
    name: "Order Now",
    path: "https://direct.chownow.com/order/6593/locations/8738",
  },
  { name: "About-Us", path: "/about-us" },
];

const ChipTabs = ({ className }) => {
  return (
    <div className={` ${className}`}>
      {tabs.map((tab) => (
        <Chip text={tab.name} path={tab.path} key={tab.name} />
      ))}
    </div>
  );
};

const Chip = ({ text, path }) => {
  const isExternalLink = path.startsWith("http");

  if (isExternalLink) {
    return (
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative w-24 rounded-md px-2.5 py-0.5 text-center text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-200`}
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md"
        ></motion.span>
      </a>
    );
  } else {
    return (
      <NavLink
        exact
        to={path}
        activeClassName="text-white bg-gradient-to-r from-yellow-700 via-red-500 to-yellow-600"
        className={`relative w-24 rounded-md px-2.5 py-0.5 text-center text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-200`}
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 rounded-md"
        ></motion.span>
      </NavLink>
    );
  }
};

export default ChipTabs;
