import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleItemClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenu = selectedCategory
    ? menu[selectedCategory]
    : Object.values(menu).flat();

  useEffect(() => {
    fetch("/api/items/")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-blue-800">
      <h1 className="mt-8 text-center text-5xl text-red-500">Our Menu</h1>
      <p className="mx-auto w-3/4 py-3 text-center leading-loose tracking-wider text-white font-thin">
        * May contain raw or undercooked ingredients. Consuming raw or
        undercooked meats, poultry, seafood, shellfish, or eggs may increase
        your risk of food-borne illness, especially if you have certain medical
        conditions
      </p>
      <span className="py-10">
        <ul className="flex flex-row space-x-9 text-xl text-white">
          <li
            className={`cursor-pointer ${selectedCategory === "ALL" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("ALL")}
          >
            ALL
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "APPETIZERS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("APPETIZERS")}
          >
            APPETIZERS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "SALADS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("SALADS")}
          >
            SALADS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "SOUPS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("SOUPS")}
          >
            SOUPS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "ENTREES" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("ENTREES")}
          >
            ENTREES
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "DESSERTS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("DESSERTS")}
          >
            DESSERTS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "DRINKS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("DRINKS")}
          >
            DRINKS
          </li>
        </ul>
      </span>
      <div className="grid grid-cols-3 gap-4 text-white">
        {filteredMenu &&
          filteredMenu.map((item, index) => (
            <div key={index}>
              <h3>{item.category}</h3>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuPage;
