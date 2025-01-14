import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function CompareTable() {
  const { compareList, removeFromCompare, addToCart } = useCart();
  const [storedCompareList, setStoredCompareList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("compareList")) || [];
    setStoredCompareList(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
    setStoredCompareList(compareList);
  }, [compareList]);

  const handleRemove = (id) => {
    removeFromCompare(id);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (storedCompareList.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No products to compare.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              {/* Fixed heading column */}
              <th className="p-4 border border-gray-300 text-left">Features</th>
              {storedCompareList.map((product, index) => (
                <th
                  key={product.id}
                  className="p-4 border border-gray-300 text-center"
                >
                  Product {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Product Image */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300 font-bold">Image</td>
              {storedCompareList.map((product) => (
                <td
                  key={product.id}
                  className="p-4 border border-gray-300 text-center"
                >
                   <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="object-contain mx-auto"
                  />
                </td>
              ))}
            </tr>
            

            {/* Product Title */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Title</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.title}
                </td>
              ))}
            </tr>

            {/* Description */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300 font-bold">
                Description
              </td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.description.length > 100
                    ? `${product.description.slice(0, 200)}...`
                    : product.description}
                </td>
              ))}
            </tr>

            {/* Dimensions */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300 font-bold">
                Dimensions
              </td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.dimensions
                    ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                    : "Not Available"}
                </td>
              ))}
            </tr>
               {/* brand */}
               <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Brand</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.brand || "N/A"}
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300 font-bold">Price</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  ${product.price}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Rating</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.rating.toFixed(1)} ★
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Warranty</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.warrantyInformation || "N/A"}
                </td>
              ))}
            </tr>

            {/* Shipping */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Shipping</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.shippingInformation || "N/A"}
                </td>
              ))}
            </tr>
            {/* Availability Status */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Availability Status</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  {product.availabilityStatus || "N/A"}
                </td>
              ))}
            </tr>

            {/* Remove Button */}
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="p-4 border border-gray-300 font-bold">Remove</td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </td>
              ))}
            </tr>

            {/* Add to Cart Button */}
            <tr className="hover:bg-gray-50">
              <td className="p-4 border border-gray-300 font-bold">
                Add to Cart
              </td>
              {storedCompareList.map((product) => (
                <td key={product.id} className="p-4 border border-gray-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                  >
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
