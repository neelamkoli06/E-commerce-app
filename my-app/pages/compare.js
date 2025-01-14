import { useRouter } from "next/router"; // Import useRouter hook
import { useCart } from "../context/CartContext"; // Import useCart to access clearCompare function and compareList
import CompareTable from "../components/CompareTable";
import { useEffect, useState } from "react"; // Import useEffect and useState for managing the client-side state

export default function ComparePage() {
  const { compareList, clearCompare } = useCart(); // Access compareList and clearCompare function
  const [mounted, setMounted] = useState(false); // State to track if the component has mounted
  const router = useRouter(); // Initialize useRouter hook

  // Ensure client-side only rendering
  useEffect(() => {
    setMounted(true); // Set mounted to true after the component is mounted on the client
  }, []);

  if (!mounted) return null; // Avoid rendering the component on the server-side before the component is mounted

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")} // Navigate to the homepage
        className="text-white bg-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center">Compare Products</h1>
      
      {/* Add some padding to the bottom of the table to avoid overlap */}
      <div className="mb-16"> {/* Adjust this margin to create space between the table and button */}
        <CompareTable />
      </div>

      {/* Clear Comparison Button, visible only when compareList has items */}
      {compareList.length > 0 && (
        <div className="absolute bottom-6 right-6">
        <button
          onClick={clearCompare} // Call the clearCompare function to clear the table
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Clear Comparison
        </button>
      </div>
      
      )}
    </div>
  );
}
