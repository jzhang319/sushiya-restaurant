import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const handleItemClick = (category) => {
    setSelectedCategory(category.toUpperCase());
  };

  // const filteredMenu =
  //   selectedCategory === "ALL"
  //     ? Object.values(menu).flat()
  //     : menu[selectedCategory] || [];

  const filteredMenu =
    selectedCategory === "ALL"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);

  useEffect(() => {
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
      <div className="flex justify-center text-center text-5xl">Loading...</div>
    );
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-blue-800">
      <h1 className="mt-8 text-center text-5xl text-red-500">Our Menu</h1>
      <p className="mx-auto w-3/4 py-3 text-center font-thin leading-loose tracking-wider text-white">
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
            className={`cursor-pointer ${selectedCategory === "GRASS" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("GRASS")}
          >
            GRASS
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "FIRE" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("FIRE")}
          >
            FIRE
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "WATER" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("WATER")}
          >
            WATER
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "BUG" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("BUG")}
          >
            BUG
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "NORMAL" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("NORMAL")}
          >
            NORMAL
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "ELECTRIC" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("ELECTRIC")}
          >
            ELECTRIC
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "FAIRY" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("FAIRY")}
          >
            FAIRY
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "FIGHTING" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("FIGHTING")}
          >
            FIGHTING
          </li>
          <li
            className={`cursor-pointer ${selectedCategory === "DRAGON" ? "text-red-500 underline" : ""}`}
            onClick={() => handleItemClick("DRAGON")}
          >
            DRAGON
          </li>
        </ul>
      </span>
      <div className="grid grid-cols-3 gap-4 text-white">
        {/* {Object.values(filteredMenu).map((item, index) => (
          <div key={index}>
            <h2>{item.category}</h2>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))} */}
        {filteredMenu &&
          filteredMenu.map((item, index) => (
            <div key={index}>
              <h2>{item.category}</h2>
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
