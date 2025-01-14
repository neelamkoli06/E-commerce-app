// components/CartItem.js
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

export default function CartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart(); // Extract necessary functions from context

  return (
    <div className="bg-white border rounded-lg shadow-md p-3 flex flex-col h-full">
      {/* Display the first image in the product.images array */}
      <div className="w-full h-32 relative mb-3 mx-auto">
        <Image
          src={product.images && product.images[0]} // Access the first image in the array
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded"
        />
      </div>

      {/* Title and Price */}
      <div className="text-center mb-3">
        <h2 className="text-lg font-semibold truncate">{product.title}</h2>
        <p className="text-green-600 font-bold text-sm">${product.price}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center mb-3 space-x-4">
        <button
          className="px-2 py-1 bg-gray-300 rounded text-sm"
          onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
        >
          -
        </button>
        <span className="mx-2">{product.quantity}</span>
        <button
          className="px-2 py-1 bg-gray-300 rounded text-sm"
          onClick={() => updateQuantity(product.id, product.quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-auto">
        <Link href={`/products/${product.id}`}>
          <button className="bg-black text-white px-3 py-1.5 rounded text-sm hover:bg-gray-500 transition">
            View Details
          </button>
        </Link>
        <button
          onClick={() => removeFromCart(product.id)}
          className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
