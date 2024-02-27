import { useInView } from "react-intersection-observer";

function AnimationCategory({ category, items }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-in-out ${inView ? "translate-x-0" : "-translate-x-full"}`}
    >
      <h2 className="pt-4 text-center text-3xl font-semibold">{category}</h2>
      <p className="text-center text-gray-700">
        {items[0]["subcategory-description"]}
      </p>
      <div className="mx-auto flex w-full max-w-screen-lg flex-wrap items-start justify-between ">
        {items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="h-42 m-2 flex w-full flex-col justify-around rounded-lg bg-white p-4 shadow-md sm:h-64 md:m-0 md:mb-2 md:w-64 lg:w-80"
          >
            <div>
              <h3 className="text-2xl font-bold">{item["name"]}</h3>
              <h2 className="text-gray-700">{item["description"]}</h2>
            </div>
            <div className="flex justify-between">
              <h3 className="text-xl font-bold text-gray-400">
                {item["sub-category"]}
              </h3>
              <p className="font-bold text-gray-800">{item["amount"]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimationCategory;
