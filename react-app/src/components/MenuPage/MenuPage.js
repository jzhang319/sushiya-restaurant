import React, { useEffect, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleItemClick = (category) => {
    setSelectedCategory(category.toUpperCase());
  };

  const handleSubItemClick = (item) => {
    setSelectedSubCategory(item["sub-category"]);
  };

  const filteredMenu =
    selectedCategory === "ALL"
      ? menu
      : menu.filter(
          (item) =>
            item.category === selectedCategory &&
            (selectedSubCategory
              ? item["sub-category"] === selectedSubCategory
              : true),
        );

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

  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const filteredGroupedMenu = Object.entries(groupedMenu).reduce(
    (acc, [category, items]) => {
      if (selectedCategory === "ALL" || category === selectedCategory) {
        acc[category] = items.filter(
          (item) =>
            !selectedSubCategory ||
            item["sub-category"] === selectedSubCategory,
        );
      }
      return acc;
    },
    {},
  );

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
          {categories.map((category) => {
            const uppercasedCategory = category.toUpperCase();

            const uniqueSubcategories = [
              ...new Set(
                (groupedMenu[uppercasedCategory] || []).map(
                  (item) => item["sub-category"],
                ),
              ),
            ];

            return (
              <div
                key={category}
                onMouseEnter={() => setHoveredCategory(uppercasedCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group relative" // Add group class
              >
                <li
                  className={`cursor-pointer border-transparent hover:rounded hover:bg-gray-300 ${selectedCategory === uppercasedCategory ? "rounded border-blue-500 text-yellow-600 underline" : ""}`}
                  onClick={() => handleItemClick(category)}
                >
                  {category}
                </li>
                {hoveredCategory === uppercasedCategory &&
                  uniqueSubcategories.length > 1 && ( // Only show the dropdown if there's more than one unique subcategory
                    <div className="absolute left-0 mt-1 hidden translate-y-1 transform rounded bg-white py-2 shadow-md group-hover:block">
                      {" "}
                      {/* Modify this line */}
                      {uniqueSubcategories.map((subCategory, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200"
                          onClick={() => handleSubItemClick(subCategory)}
                        >
                          {subCategory}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </ul>
      </span>

      <div className="flex flex-col flex-wrap justify-center gap-4 px-20 font-abel font-normal text-gray-800">
        {Object.entries(filteredGroupedMenu).map(([category, items], index) => (
          <div key={index}>
            <h2 className="text-3xl font-semibold">{category}</h2>
            {items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="w-64 rounded-lg bg-white p-4 shadow-md"
              >
                <h3 className="text-xl font-bold">{item["sub-category"]}</h3>
                <h3 className="text-xl font-bold">
                  {item["subcategory-description"]}
                </h3>
                <h3 className="text-xl font-bold">{item["name"]}</h3>
                <p className="text-gray-700">{item["description"]}</p>
                <p className="font-bold text-gray-800">{item["amount"]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
