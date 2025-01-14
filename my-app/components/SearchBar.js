import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Holds the input search term
  const [searchSuggestions, setSearchSuggestions] = useState([]); // Stores the filtered suggestions
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false); // Determines if the suggestion dropdown should be visible
  const searchBarRef = useRef(null); // Ref for handling clicks outside the search bar
  const router = useRouter(); // Router for navigation

  // Function to fetch products from the API based on the search term
  const fetchSuggestions = async (query) => {
    if (!query) return setSearchSuggestions([]); // Don't fetch if query is empty

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = await response.json();
      setSearchSuggestions(data.products || []);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 1) {
      // Only fetch suggestions if the length is greater than or equal to 1
      fetchSuggestions(value);
      setIsSuggestionsVisible(true);
    } else {
      setIsSuggestionsVisible(false); // Hide suggestions if the input length is less than 3
    }
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title); // Set the search term to the selected suggestion
    setIsSuggestionsVisible(false); // Hide suggestions
    router.push(`/search?q=${product.title}`); // Navigate to the search page with the selected term
  };

  // Close suggestions when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      <div ref={searchBarRef} className="relative w-full max-w-4xl">
        {/* Search Input and Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${searchTerm}`);
          }}
          className="flex items-center w-full"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search products..."
            className="border px-6 py-2 rounded-l-md text-black focus:outline-none w-full text-lg"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-3 rounded-r-md hover:bg-grey transition"
          >
            <FaSearch size={24} />
          </button>
        </form>

        {/* Dropdown Suggestions */}
        {isSuggestionsVisible && (
          <ul className="absolute left-0 right-0 bg-gradient-to-b from-white to-gray-50 shadow-lg mt-2 rounded-lg max-h-80 overflow-y-auto z-10 border border-gray-200 sm:w-full lg:w-full text-lg">
            {searchSuggestions.length > 0 ? (
              searchSuggestions.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center p-4 hover:bg-blue-100 cursor-pointer transition-all duration-200"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="mr-4 rounded"
                  />
                  <span className="text-sm">{product.title}</span>
                </li>
              ))
            ) : (
              <li className="p-4 text-gray-500 text-center">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
