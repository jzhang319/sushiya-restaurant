import React, { useEffect, useState } from "react";


const MenuPage = () => {
  const [menu, setMenu] = useState([]);

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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl text-red-500 text-center">Our Menu</h1>
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
