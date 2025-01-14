import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Ensure the CartContext path is correct
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importing the toast notifications CSS
import Image from "next/image";

export default function ProductCard({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[1] || product.thumbnail
  ); // Set second image as thumbnail if available
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for the loader
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    addToCompare,
    compareList, // Assuming you have this from CartContext
  } = useCart();

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200); // 200ms delay for simulation
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart!");
  };

  const handleCompare = () => {
    if (compareList.length >= 3) {
      toast.error("You can only compare up to 3 products.");
      return;
    }

    // Check if the category of the product matches the category of the first product in the comparison list
    if (
      compareList.length > 0 &&
      compareList[0].category !== product.category
    ) {
      toast.error("Products must be from the same category to compare.");
      return;
    }

    addToCompare(product);
    toast.success("Product added to compare list!");
  };

  const handleWishlistToggle = () => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.error("Product removed from wishlist!");
    } else {
      addToWishlist(product);
      toast.success("Product added to wishlist!");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="bg-white border rounded-md shadow-md p-3 hover:shadow-lg transition flex flex-col justify-between relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mx-auto transition-transform duration-300 transform hover:scale-110"
      style={{ minHeight: "300px" }}
    >
      {/* New Tag with Blinking Animation */}
      <div className="absolute top-2 left-2 flex items-center">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-blink">
          NEW
        </span>
      </div>

      {/* Wishlist Icon */}
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleWishlistToggle}
      >
        <FaHeart
          size={20}
          className={isInWishlist ? "text-red-500" : "text-gray-300"}
        />
      </div>

      {/* Product Image */}
      <div className="mb-3">
        <Image
          src={selectedImage}
          alt={product.title}
          width={500} // Adjust the width as needed
          height={128} // Adjust the height as needed
          className="w-full h-32 object-contain rounded-md mb-3 cursor-pointer"
        />
      </div>

      {/* Product Title */}
      <h2 className="font-semibold text-sm truncate mb-1 text-center">
        {product.title}
      </h2>
      <p className="text-gray-500 text-xs mb-2 text-center">${product.price}</p>

      {/* Product Rating */}
      <div className="flex items-center justify-center mb-2">
        {renderStars(Math.round(product.rating))}
        <span className="ml-2 text-xs text-gray-500">
          ({product.rating.toFixed(1)})
        </span>
      </div>

      {/* Product Description */}
      <p className="text-gray-700 text-xs mb-3 text-center">
        {showFullDescription
          ? product.description
          : `${product.description.slice(0, 50)}...`}
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-500 ml-1 focus:outline-none text-xs"
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </p>

      {/* Product Images */}
      {product.images && product.images.length > 0 && (
        <div className="grid grid-cols-4 gap-1 mb-3">
          {product.images.map((image, index) => {
            if (index !== 1) {
              // Exclude the second image from the grid
              return (
                <Image
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  width={40} // Equivalent to h-10 in pixels
                  height={40} // Maintains aspect ratio
                  className="w-full h-10 object-contain cursor-pointer hover:opacity-75 border rounded-sm"
                  onClick={() => handleImageClick(image)}
                />
              );
            }
            return null; // Don't display the second image in the grid
          })}
        </div>
      )}

      {/* Action Buttons with Icons - Arrange Cart and Compare on the same row */}
      <div className="mt-3 space-y-2">
        <div className="flex space-x-2">
          {/* Add to Cart Button with Icon */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-700 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex items-center justify-center space-x-2 text-sm"
          >
            <span>Add to</span>
            <FaShoppingCart size={16} />
          </button>

          {/* Add to Compare Button with Icon */}
          <button
            onClick={handleCompare}
            className="w-full bg-green-800 text-white px-3 py-1 rounded hover:bg-green-600 transition flex items-center justify-center space-x-2 text-sm"
          >
            <span>Add to</span>
            <FaBalanceScale size={16} />
          </button>
        </div>

        {/* View Details Button */}
        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-black text-white px-3 py-1 rounded hover:bg-gray-700 transition flex items-center justify-center space-x-2 text-sm mt-1">
            <span>View Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
