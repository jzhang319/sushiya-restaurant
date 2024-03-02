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
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1211556699752628275/Kakitamajiru-Egg-Drop-Soup-1398-I.png?ex=65eea11a&is=65dc2c1a&hm=79f5002a4ebafed735b7ab553a09dac02409fc70fd1c5a53c584faae1dbd9183&",
        );
        break;
      case "Kitchen":
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1211556396445864006/2f5e3418-dabb-4591-8186-16e3d7272aa1.png?ex=65eea0d2&is=65dc2bd2&hm=d7c73f5ca69f8a7b356fabb1202164a170a9d57f9c704e46a2588406f65f052f&",
        );
        break;
      case "Sushi Bar":
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1211556461340135455/restaurant-6451.png?ex=65eea0e2&is=65dc2be2&hm=98fd6b865f0fec00d9b3570bc5b18b22a0abd3acef5a28691ba034e346a1aaa0&",
        );
        break;
      case "Hibachi":
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1211557163911086100/hibachi-restaurants-chef-1.png?ex=65eea189&is=65dc2c89&hm=34fd331aee891749acce7b8ccab44a8732e2f70f8d8580858a56ca2544015504&",
        );
        break;
      case "Beverages":
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1211557649628274718/38232178-1629-4365-a578-38c7ac678828.png?ex=65eea1fd&is=65dc2cfd&hm=b1ff6efa2b29610c14cbfd482e2fde41fde5d054ff5f9d2ed56de9c3349171d1&",
        );
        break;
      default:
        setImageSrc(
          "https://cdn.discordapp.com/attachments/885032629299212308/1212471830489595994/black-and-white-tuna-sashimi-lisa-top.png?ex=65f1f563&is=65df8063&hm=9aee96ffa6f000bc5cc18a65bd758ecb92163af488f1ba184f0271e2cb33a212&",
        );
    }
  }, [currentCategory]);

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
      <ScrollingImages />
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

        <div className="col-span-2 hidden items-start justify-center sm:flex">
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
            class="sticky top-1/2 -translate-y-1/2 transform rounded"
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
