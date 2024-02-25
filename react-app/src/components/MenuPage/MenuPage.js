import React, { useEffect, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleItemClick = (category) => {
    setSelectedCategory(category.toUpperCase());
    setSelectedSubCategory("ALL");
  };

  const handleSubItemClick = (selectedSubCategory) => {
    setSelectedCategory(hoveredCategory || "ALL");
    setSelectedSubCategory(selectedSubCategory);
  };

  // const handleSubItemClick = (selectedSubCategory) => {
  //   const categoryOfSelectedSubCategory = menu
  //     .find((item) => item["sub-category"] === selectedSubCategory)
  //     ?.category.toUpperCase();
  //   setSelectedCategory(categoryOfSelectedSubCategory || "ALL");
  //   setSelectedSubCategory(selectedSubCategory);
  // };

  const filteredMenu = menu.filter((item) => {
    if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
      return false;
    }
    if (
      selectedSubCategory !== "ALL" &&
      item["sub-category"] !== selectedSubCategory
    ) {
      return false;
    }
    return true;
  });

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
      const filteredItems = items.filter((item) => {
        if (selectedSubCategory !== "ALL") {
          return item["sub-category"] === selectedSubCategory;
        }
        return true;
      });
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
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
                menu
                  .filter((item) => item.category === uppercasedCategory)
                  .map((item) => item["sub-category"]),
              ),
            ];

            return (
              <div
                key={category}
                onMouseEnter={() => setHoveredCategory(uppercasedCategory)}
                className="group relative"
              >
                <li
                  className={`cursor-pointer border-transparent hover:rounded hover:bg-gray-300 ${selectedCategory === uppercasedCategory ? "rounded border-blue-500 text-yellow-600 underline" : ""}`}
                  onClick={() => handleItemClick(category)}
                >
                  {category}
                </li>
                {hoveredCategory === uppercasedCategory &&
                  uniqueSubcategories.length > 1 && (
                    <div
                      className="dropdown absolute left-0 mt-0 hidden transform rounded bg-white py-2 shadow-md transition-opacity duration-200 ease-in-out group-hover:block"
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {uniqueSubcategories.map((subCategory, index) => (
                        <div
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-200"
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

      {/* <div className="flex flex-col flex-wrap justify-center gap-4 px-20 font-abel font-normal text-gray-800">
        {Object.entries(filteredGroupedMenu).map(([category, items], index) => (
          <div key={index}>
            <h2 className="text-center text-3xl font-semibold">{category}</h2>
            <p className="text-gray-700 text-center">
              {items[0]["subcategory-description"]}
            </p>
            <div className="flex flex-wrap items-start justify-center">
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="m-2 w-64 rounded-lg bg-white p-4 shadow-md"
                >
                  <h3 className="text-xl font-bold">{item["category"]}</h3>
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
          </div>
        ))}
      </div> */}
      <div className="flex flex-col flex-wrap justify-center gap-4 px-20 font-abel font-normal text-gray-800">
        {Object.entries(filteredGroupedMenu).map(([category, items], index) => (
          <div key={index}>
            <h2 className="text-center text-3xl font-semibold">{category}</h2>
            <p className="text-center text-gray-700">
              {items[0]["subcategory-description"]}
            </p>
            <div className="flex flex-wrap items-start justify-center">
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="m-2 flex h-64 w-64 flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                >
                  <div>
                    <h3 className="text-xl font-bold">{item["category"]}</h3>
                    <h3 className="text-xl font-bold">
                      {item["sub-category"]}
                    </h3>
                    {/* <h3 className="text-xl font-bold">
                      {item["subcategory-description"]}
                    </h3> */}
                    <h3 className="text-xl font-bold">{item["name"]}</h3>
                  </div>
                  <div>
                    <p className="text-gray-700">{item["description"]}</p>
                    <p className="font-bold text-gray-800">{item["amount"]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
