import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleItemClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenu = selectedCategory
    ? menu.filter((item) => item.category === selectedCategory)
    : menu;

  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenu(groupedData);
      });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center bg-blue-800">
      <h1 className="text-5xl text-center text-red-500 mt-8">Our Menu</h1>
      <p className="w-3/4 mx-auto text-center text-white tracking-wider py-3 leading-loose">
        * May contain raw or undercooked ingredients. Consuming raw or
        undercooked meats, poultry, seafood, shellfish, or eggs may increase
        your risk of food-borne illness, especially if you have certain medical
        conditions
      </p>
      <span className="py-10">
        <ul className="flex flex-row space-x-9">
          <li
            className={`cursor-pointer ${selectedCategory === "APPETIZERS" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("APPETIZERS")}
          >
            APPETIZERS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "SALADS" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("SALADS")}
          >
            SALADS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "SOUPS" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("SOUPS")}
          >
            SOUPS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "ENTREES" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("ENTREES")}
          >
            ENTREES
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "DESSERTS" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("DESSERTS")}
          >
            DESSERTS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "DRINKS" ? "text-red-500" : ""}`}
            onClick={() => handleItemClick("DRINKS")}
          >
            DRINKS
          </li>
        </ul>
      </span>
      {Object.entries(menu).map(([category, items]) => (
        <section key={category}>
          <h2>{category}</h2>
          {items.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default MenuPage;
