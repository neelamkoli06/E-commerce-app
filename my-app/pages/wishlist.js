import { useCart } from "../context/CartContext"; // Import the CartContext
import WishlistItem from "../components/WishlistItem"; // Import WishlistItem component
import { useRouter } from "next/router"; // Import useRouter hook

export default function Wishlist() {
  const { wishlist, clearWishlist } = useCart(); // Use the wishlist from context and clearWishlist function
  const router = useRouter(); // Initialize useRouter hook

  // Check if wishlist is an array before rendering
  if (!Array.isArray(wishlist)) {
    return (
      <p className="text-center text-red-500">
        There was an error loading your wishlist.
      </p>
    );
  }

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")} // Navigate to the homepage
        className="text-white bg-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Clear Wishlist Button, visible only when wishlist is not empty */}
      {wishlist.length > 0 && (
        <div className="flex justify-end mt-4">
        <button
          onClick={clearWishlist} // Call the clearWishlist function
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Clear Wishlist
        </button>
      </div>
      
      )}
    </div>
  );
}