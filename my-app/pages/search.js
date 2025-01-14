import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard"; // assuming you have a ProductCard component

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query; // Get the search query from the URL
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return; // If there is no search query, do nothing

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${q}`);
        const data = await res.json();
        setSearchResults(data.products); // Assuming the API returns products in a 'products' array
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [q]);

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Search Results for "{q}"</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : searchResults.length === 0 ? (
        <div className="text-center">No products found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
