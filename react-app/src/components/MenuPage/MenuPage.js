import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const handleItemClick = (category) => {
    setSelectedCategory(category.toUpperCase());
  };

  const filteredMenu =
    selectedCategory === "ALL"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    setLoading(true);
    fetch("/api/items/")
      .then((response) => response.json())
      .then((data) => {
        const uppercasedData = Object.values(data)
          .flat()
          .map((item) => ({
            ...item,
            category: item.category.toUpperCase(),
          }));
        setMenu(uppercasedData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center text-center text-5xl text-orange-600">
        Loading...
      </div>
    );
  }

  const categories = [
    "ALL",
    "GRASS",
    "FIRE",
    "WATER",
    "BUG",
    "NORMAL",
    "ELECTRIC",
    "FAIRY",
    "FIGHTING",
    "DRAGON",
    "GHOST",
    "POISON",
    "GROUND",
    "PSYCHIC",
    "ROCK",
    "STEEL",
    "ICE",
    "FLYING",
    "DARK",
  ];

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-gradient-to-r from-violet-900 to-blue-600">
      <h1 className="font-pacifico mt-8 text-center text-5xl text-orange-600">
        Our Menu
      </h1>
      <p className="mx-auto w-3/4 py-3 text-center font-thin leading-loose tracking-wider text-white">
        * May contain raw or undercooked ingredients. Consuming raw or
        undercooked meats, poultry, seafood, shellfish, or eggs may increase
        your risk of food-borne illness, especially if you have certain medical
        conditions
      </p>

      <span className="py-10">
        <ul className="flex flex-wrap items-center justify-center space-x-9 px-10 text-xl text-white">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer border-transparent hover:rounded hover:bg-gray-900 ${selectedCategory === category ? "rounded border-orange-600 text-orange-600 underline" : ""}`}
              onClick={() => handleItemClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </span>

      <div className="grid grid-cols-3 gap-4 text-white">
        {filteredMenu &&
          filteredMenu.map((item, index) => (
            <div key={index}>
              <h2>{item.category}</h2>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuPage;
