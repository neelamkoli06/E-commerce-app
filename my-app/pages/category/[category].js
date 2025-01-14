import { useState } from "react";
import { useRouter } from "next/router";
import { fetchProducts } from "@/api/Api";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SortingSection from "@/components/SortingSection";

export async function getServerSideProps(context) {
  const { category } = context.params;
  try {
    const products = await fetchProducts(category);
    return {
      props: {
        category,
        products: products.products || [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        category,
        products: [],
      },
    };
  }
}

export default function CategoryPage({ category, products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 0]); // Default price range
  const itemsPerPage = 8;
  const router = useRouter();

  // Handle price filtering change
  const handlePriceFilterChange = (minPrice, maxPrice) => {
    setPriceRange([minPrice, maxPrice]);
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  // Handle price sorting change
  const handlePriceSortChange = (selectedSortOption) => {
    let sortedProducts = [...filteredProducts];
    if (selectedSortOption === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSortOption === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  // Handle rating sorting change
  const handleRatingSortChange = (selectedSortOption) => {
    let sortedProducts = [...filteredProducts];
    if (selectedSortOption === "ratingHighToLow") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (selectedSortOption === "ratingLowToHigh") {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    }
    setFilteredProducts(sortedProducts);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
        <button
          onClick={() => router.back()}
          className="text-white hover:bg-grey bg-gray-700 p-2 rounded mb-4 sm:mb-0"
        >
          Back
        </button>

        <div className="flex items-center w-full">
          <h1 className="text-3xl font-bold capitalize text-center flex-1 text-lg sm:text-3xl">
            Products for {category}
          </h1>

          <SortingSection
            onPriceSortChange={handlePriceSortChange}
            onRatingSortChange={handleRatingSortChange}
            onPriceFilterChange={handlePriceFilterChange} // Make sure this is passed correctly
            priceRange={priceRange} // Pass the current price range to SortingSection
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-red-500">No products found for this category.</p>
        )}
      </div>

      <Pagination
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
