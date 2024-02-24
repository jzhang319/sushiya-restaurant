import React, { useEffect, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

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
        // console.log(data, " <--- data");
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-40">
        <RefreshIcon className="h-24 w-24 animate-spin text-yellow-700" />
      </div>
    );
  }

  const categories = [
    "ALL",
    "Soup & Salad",
    "Kitchen",
    "Sushi Bar",
    "Hibachi",
    "Beverages",
  ];

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-white font-abel">
      <h1 className="mt-8 text-center text-6xl text-gray-800">Our Menu</h1>
      <p className="mx-auto w-3/4 py-3 text-center font-abel font-thin leading-loose tracking-wide text-gray-700">
        * May contain raw or undercooked ingredients. Consuming raw or
        undercooked meats, poultry, seafood, shellfish, or eggs may increase
        your risk of food-borne illness, especially if you have certain medical
        conditions
      </p>

      <span className="py-10">
        <ul className="flex flex-wrap items-center justify-center space-x-9 px-10 font-abel text-lg text-gray-800">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer border-transparent hover:rounded hover:bg-gray-300 ${selectedCategory === category ? "rounded border-blue-500 text-yellow-600 underline" : ""}`}
              onClick={() => handleItemClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </span>

      <div className="flex flex-wrap justify-center gap-8 px-20 font-abel font-normal text-gray-800">
        {filteredMenu &&
          filteredMenu.map((item, index) => {
            console.log(item, " <--- item");
            return (
              <div
                key={index}
                className="w-64 rounded-lg bg-white p-4 shadow-md"
              >
                <h2 className="text-lg font-semibold">{item["category"]}</h2>
                <h3 className="text-xl font-bold">{item["sub-category"]}</h3>
                <h3 className="text-xl font-bold">
                  {item["subcategory-description"]}
                </h3>
                <h3 className="text-xl font-bold">{item["name"]}</h3>
                <p className="text-gray-700">{item["description"]}</p>
                <p className="font-bold text-gray-800">{item["amount"]}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MenuPage;
