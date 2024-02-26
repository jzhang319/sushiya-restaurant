import React, { useEffect, useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import AnimationCategory from "./AnimationCategory";
import ScrollingImages from "./ScrollingImages";

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
        const uppercasedData = data
          .map((categoryData) => ({
            ...categoryData,
            category: categoryData.category.toUpperCase(),
            items: categoryData.items.map((item) => ({
              ...item,
              category: item.category.toUpperCase(),
            })),
          }))
          .flat();
        setMenu(uppercasedData);
        // console.log(uppercasedData, " <--- uppercasedData");
        setLoading(false);
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
    setHoveredCategory(null);
  };

  const filteredMenu = menu.flatMap((categoryData) => {
    return categoryData.items.filter((item) => {
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
      <h1 className="pt-3 text-center text-3xl text-gray-800 sm:mt-8 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        Our Menu
      </h1>
      <p className="mx-auto hidden w-3/4 py-3 text-center font-abel font-thin leading-loose tracking-wide text-gray-700 sm:block">
        * May contain raw or undercooked ingredients. Consuming raw or
        undercooked meats, poultry, seafood, shellfish, or eggs may increase
        your risk of food-borne illness, especially if you have certain medical
        conditions
      </p>
      <ScrollingImages />
      <span className="py-4 sm:py-10">
        <ul className="flex flex-wrap items-center justify-center space-x-9 px-10 font-abel text-lg text-gray-800">
          {categories.map((category) => {
            const uppercasedCategory = category.toUpperCase();

            const uniqueSubcategories = [
              ...new Set(
                menu
                  .flatMap((categoryData) => categoryData.items)
                  .filter((item) => item.category === uppercasedCategory)
                  .map((item) => item["sub-category"]),
              ),
            ];

            return (
              <div
                key={category}
                onMouseEnter={() => setHoveredCategory(uppercasedCategory)}
                className="group relative py-2"
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
                      className="dropdown absolute left-0 z-10 mt-0 hidden transform rounded bg-white py-2 shadow-md transition-opacity duration-200 ease-in-out group-hover:block"
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
      <div className="flex flex-col flex-wrap justify-center gap-4 px-4 font-abel font-normal text-gray-800 sm:px-60">
        {/* <motion.img
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, duration: 2.0 }}
          src="https://cdn.discordapp.com/attachments/885032629299212308/1211556825863028787/97159fad-a505-4b38-b337-1b1ec14b06c5.png?ex=65eea138&is=65dc2c38&hm=6de26adb459fdb4627977272a71db31f7c0e3080e3f1947642cbc54893741ec8&"
          alt="restaurant"
          class="w-96"
        /> */}
        {Object.entries(filteredGroupedMenu).map(([category, items], index) => (
          <>
            <AnimationCategory key={index} category={category} items={items} />
          </>
        ))}
      </div>
      {/* <div className="flex flex-col flex-wrap justify-center gap-4 px-4 font-abel font-normal text-gray-800 sm:px-60">
        {Object.entries(filteredGroupedMenu).map(([category, items], index) => (
          <div className="transform transition-all duration-500 ease-in-out">
            <h2 className="text-center text-3xl font-semibold">{category}</h2>
            <p className="text-center text-gray-700">
              {items[0]["subcategory-description"]}
            </p>
            <div className="flex flex-wrap items-start justify-center">
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="h-42 m-4 flex w-full flex-col justify-between rounded-lg bg-white p-4 shadow-md sm:h-52 sm:w-60"
                >
                  <div>
                    <h3 className="text-2xl font-bold">{item["name"]}</h3>
                    <h2 className="text-gray-700">{item["description"]}</h2>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-xl font-bold">
                      {item["sub-category"]}
                    </h3>
                    <p className="font-bold text-gray-800">{item["amount"]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MenuPage;
