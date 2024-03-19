import React from "react";
import hibachiImage from "./images/hibachi.png";
import soupImage from "./images/soup.png";
import sushiImage from "./images/sushi.png";
import kitchenImage from "./images/kitchen.png";
import beverageImage from "./images/beverage.png";
import defaultImage from "./images/default.png";

function ScrollingImages() {
  const images = [
    hibachiImage,
    soupImage,
    sushiImage,
    kitchenImage,
    beverageImage,
    defaultImage,
    hibachiImage,
    soupImage,
    sushiImage,
    kitchenImage,
    beverageImage,
    defaultImage,
  ];

  return (
    <div className="image-scroller hidden sm:block">
      <div className="space-x-1">
        {images.concat(images).map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="w-30 h-20 flex-shrink-0 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollingImages;
