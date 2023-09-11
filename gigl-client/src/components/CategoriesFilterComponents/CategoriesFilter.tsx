import React, { useEffect, useState } from "react";
import { gigl } from "../../api/gigl";

interface CategoriesFilterProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ setCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All jokes");

  useEffect(() => {
    gigl.get("/ListJokeTypes").then((res) => setCategories(res.data));
  }, []);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCategory(category);
    console.log(category);
  };

  return (
    <div className="scroll-container">
      <div className="overflow-x-scroll whitespace-nowrap py-2 bg-gray-800 sticky top-0 z-10 border-b border-gray-700">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`inline-block px-4 py-1 mx-2 rounded-full ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
