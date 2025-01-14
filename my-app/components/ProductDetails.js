import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext"; // Use the CartContext
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ProductDetails({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product?.images[0] || "/placeholder-image.png" // Fallback to placeholder image
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  const router = useRouter(); // Initialize the router

  // Context API
  const { addToCart, addToWishlist, addToCompare ,compareList} = useCart();

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

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success("Added to Wishlist");
  };

  const handleToCompare = () => {
    if (compareList.length >= 3) {
      toast.error("You can only compare up to 3 products.");
      return;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => router.push("/")} // Navigate to the homepage
        className="text-white bg-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center">
        {product?.title || "Product Details"}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Product Image */}
        <div className="flex-1 bg-white">
          <Image
            src={selectedImage}
            alt={product?.title || "Product"}
            width={600} // Add appropriate width
            height={384} // Add appropriate height (aspect ratio)
            className="w-full h-96 object-contain rounded-lg mb-4 shadow-lg"
          />
          {product?.images && product.images.length > 0 && (
            <div className="bg-white mt-4 grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder-image.png"}
                  alt={`image-${index}`}
                  width={64} // Set width for the image
                  height={64} // Set height for the image
                  className="w-16 h-16 object-contain cursor-pointer hover:opacity-75 border rounded-md"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          )}
          {/* QR Code Below Image */}
          {product?.meta?.qrCode && (
            <div className="mt-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Product QR Code</h2>
              <img
                src={product?.meta?.qrCode}
                alt="QR Code"
                className="w-24 h-24 mx-auto md:w-32 md:h-32"
              />
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="flex-1">
          <p className="text-gray-700 text-base mb-4">
            {product?.description
              ? showFullDescription
                ? product.description
                : `${product.description.slice(0, 100)}...`
              : "No description available"}
            {product?.description && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-500 ml-1 focus:outline-none"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
          <p className="font-bold text-xl text-green-600 mb-6">
            ${product?.price || "N/A"}
          </p>
          <div className="flex items-center mb-4">
            {renderStars(Math.round(product?.rating || 0))}
            <span className="ml-2 text-sm text-gray-500">
              ({product?.rating?.toFixed(1) || "0.0"} / 5)
            </span>
          </div>

          {/* Additional Product Information */}
          <div className="space-y-4">
            <p>
              <strong>Brand:</strong> {product?.brand || "N/A"}
            </p>
            <p>
              <strong>SKU:</strong> {product?.sku || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong> {product?.weight || "N/A"}g
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {product?.dimensions
                ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                : "N/A"}
            </p>
            <p>
              <strong>Warranty:</strong> {product?.warrantyInformation || "N/A"}
            </p>
            <p>
              <strong>Shipping:</strong> {product?.shippingInformation || "N/A"}
            </p>
            <p>
              <strong>Stock Status:</strong>{" "}
              {product?.availabilityStatus || "N/A"}
            </p>
            <p>
              <strong>Return Policy:</strong> {product?.returnPolicy || "N/A"}
            </p>
            <p>
              <strong>Minimum Order Quantity:</strong>{" "}
              {product?.minimumOrderQuantity || "N/A"}
            </p>
            <p>
              <strong>Discount Percentage:</strong>
              {product?.discountPercentage || "N/A"}%
            </p>
          </div>

          {/* Product Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleToCompare}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              Add to Compare
            </button>

            <button
              onClick={handleAddToWishlist}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Add to Wishlist
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section: Styled for Attraction */}
      {product?.reviews && product.reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b py-4 px-6 bg-gray-50 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-500">
                    {review.reviewerName} -{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
