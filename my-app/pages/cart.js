import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem"; // Import the CartItem component
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter hook

export default function Cart() {
  const { cart, clearCart } = useCart(); // Get the clearCart method from the context
  const router = useRouter(); // Initialize useRouter hook

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")} // Navigate to the homepage
        className="text-white bg-gray-700 px-4 py-2 rounded-lg mb-4 hover:bg-gray-600 transition"
      >
        Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((product) => (
              <CartItem key={product.id} product={product} /> // Render CartItem for each product
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: ${calculateTotalPrice()}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <Link href="/checkout">
              <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          {/* Clear Cart Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={clearCart} // Call clearCart from the context
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 hover:shadow-xl focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
