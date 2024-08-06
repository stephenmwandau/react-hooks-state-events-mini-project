import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectedCategory}) => {
  const handleCategoryClick = (category) => {
    onSelectedCategory(category);
  };

  return (
    <div className="categories">
      <h5>Category filters</h5>
      {categories.map((category) => ( 
        <button
          key={category}
          className={`category ${selectedCategory === category? "selected" : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
