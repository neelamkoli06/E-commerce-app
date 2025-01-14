import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify"; // Ensure toast is imported
import Image from "next/image";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa"; // Import heart icons

import { useState } from "react";

export default function WishlistItem({ product }) {
  const { removeFromWishlist, addToCart, toggleWishlist } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(true); // Initialize as true for red heart initially

  const handleRemove = () => {
    removeFromWishlist(product.id);
    setIsInWishlist(false); // Set state to false after removal
    toast.info("Removed from Wishlist");
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      setIsInWishlist(false); // Heart turns gray when removed
      toast.info("Removed from Wishlist");
    } else {
      toggleWishlist(product); // Add to wishlist
      setIsInWishlist(true); // Heart turns red when added
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-3 flex flex-col items-center h-full relative transition-transform duration-300 transform hover:scale-110">
      {/* Heart Icon */}
      <div
        className={`absolute top-2 right-2 cursor-pointer ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        }`}
        onClick={handleWishlistToggle}
      >
        {isInWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </div>

      {/* Product Image */}
      <Image
        src={product.images[0] || "/placeholder-image.png"}
        alt={product.title || "Wishlist Item"}
        width={500} // Adjust width as needed
        height={128} // Adjust height as needed
        className="w-full h-32 object-contain mb-3 rounded-md"
      />

      {/* Product Title */}
      <h2 className="text-lg font-semibold text-center mb-2">
        {product.title || "Unknown Product"}
      </h2>

      {/* Product Price */}
      <p className="text-green-600 font-bold text-sm mb-3">
        ${product.price || "N/A"}
      </p>

      <div className="flex space-x-4 mt-auto">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-3 py-1.5 rounded text-sm hover:bg-grey transition flex items-center space-x-2"
        >
          <span>Add to</span>
          <FaShoppingCart size={16} /> {/* Adjust the size of the icon */}
        </button>
      </div>
    </div>
  );
}
