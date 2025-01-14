import { useState } from "react";

export default function Filters({ onFilterChange }) {
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (category) => {
    let updatedCategories;

    // Add or remove category based on the checkbox state
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((item) => item !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);

    // Pass the updated categories to the parent component
    if (onFilterChange) {
      onFilterChange(updatedCategories);
    }
  };

  return (
    <div className="relative flex justify-center">
      {/* Dropdown toggle */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter by Categories
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg"
          style={{ top: "100%" }} // Positioning the dropdown just below the button
        >
          <div className="p-4 max-h-64 overflow-y-auto text-center">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={category} className="text-sm capitalize">
                  {category.replace("-", " ")} {/* Convert hyphenated text to space-separated */}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
