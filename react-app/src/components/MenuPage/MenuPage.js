import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimationCategory from "./AnimationCategory";
// import { RefreshIcon } from "@heroicons/react/outline";
// import ScrollingImages from "./ScrollingImages";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import hibachiImage from "./images/hibachi.png";
import soupImage from "./images/soup.png";
import sushiImage from "./images/sushi.png";
import kitchenImage from "./images/kitchen.png";
import beverageImage from "./images/beverage.png";
import defaultImage from "./images/default.png";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSubCategory, setSelectedSubCategory] = useState("ALL");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("");
  const [imageSrc, setImageSrc] = useState("");

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
        setLoading(false);
      });
    switch (currentCategory) {
      case "Soup & Salad":
        setImageSrc(soupImage);
        break;
      case "Kitchen":
        setImageSrc(kitchenImage);
        break;
      case "Sushi Bar":
        setImageSrc(sushiImage);
        break;
      case "Hibachi":
        setImageSrc(hibachiImage);
        break;
      case "Beverages":
        setImageSrc(beverageImage);
        break;
      default:
        setImageSrc(defaultImage);
    }
  }, [currentCategory]);

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-8">
        {/* Menu Title */}
        <Skeleton variant="rounded" width={200} height={100} />
        <Skeleton variant="text" width={800} sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" width={500} sx={{ fontSize: "2rem" }} />
        {/* Menu Categories */}
        <div className="mt-6">
          <Skeleton variant="text" width={650} sx={{ fontSize: "2.5rem" }} />
        </div>
        {/* Menu Items */}
        <div className="hidden sm:ml-2 sm:mt-8 sm:flex">
          <div className="flex flex-col items-center justify-center">
            <Skeleton variant="text" width={300} sx={{ fontSize: "4rem" }} />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton variant="rounded" width={300} height={200} />
              <Skeleton variant="rounded" width={300} height={200} />
              <Skeleton variant="rounded" width={300} height={200} />
              <Skeleton variant="rounded" width={300} height={200} />
              <Skeleton variant="rounded" width={300} height={200} />
              <Skeleton variant="rounded" width={300} height={200} />
            </div>
          </div>
          <div className="ml-8 mr-2">
            <Skeleton variant="rounded" width={700} height={510} />
          </div>
        </div>
        <div className="block sm:hidden">
          <Skeleton variant="rounded" width={480} height={600} />
        </div>
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
    setCurrentCategory(category);
  };

  const handleSubItemClick = (category, selectedSubCategory) => {
    setSelectedCategory(hoveredCategory || "ALL");
    setSelectedSubCategory(selectedSubCategory);
    setHoveredCategory(null);
    setCurrentCategory(category);
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
      {/* <ScrollingImages /> */}
      <span className="py-1 sm:py-10">
        <ul className="z-10 flex flex-wrap items-center justify-center space-x-9 px-10 font-abel text-lg text-gray-800">
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
                          onClick={() =>
                            handleSubItemClick(category, subCategory)
                          }
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

      <div className="grid grid-cols-5 gap-4 px-4 font-abel font-normal text-gray-800">
        <div className="col-span-5 flex flex-wrap sm:col-span-3 ">
          {Object.entries(filteredGroupedMenu).map(
            ([category, items], index) => (
              <div key={index} className="w-full">
                <AnimationCategory category={category} items={items} />
              </div>
            ),
          )}
        </div>
        <div className="relative col-span-2 hidden items-start justify-center sm:flex">
          <motion.img
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              mass: 1,
            }}
            src={imageSrc}
            alt="restaurant"
            class="sticky top-0 transform rounded"
            style={{ width: "100vh ", height: "100vh" }}
          />
          {/* <motion.img
            initial={{ x: 0 }}
            animate={{ x: ["-10%", "30%", "-10%"], opacity: 1 }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              times: [0, 0.5, 1],
              duration: 5,
              loop: Infinity,
            }}
            src={imageSrc}
            alt="restaurant"
            className="diamond sticky top-1/2 w-96 -translate-y-1/2 transform rounded"
          /> */}
        </div>
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
