import Link from "next/link";
import {
  FaBalanceScale,
  FaHeart,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import { useCart } from "../context/CartContext"; // Import the CartContext

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling mobile menu
  const router = useRouter();

  // Access counts and actions from context
  const { cartCount, wishlistCount, compareCount } = useCart();

  return (
    <nav className="flex justify-between items-center bg-white text-black px-6 py-4 shadow-md border-b border-gray-200">
      {/* Logo */}
      <Link className="logo" href="/">
        <h2 className="text-2xl font-bold">MyStore</h2>
      </Link>

      {/* Hamburger Menu for Small Devices */}
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu for Small Devices */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 z-20 sm:hidden">
          <div className="mb-4">
            {/* Search Bar */}
            <SearchBar />
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/compare">
              <button
                className="relative text-black hover:text-yellow-500 transition"
                title="Compare"
              >
                <FaBalanceScale size={24} />
                {compareCount > 0 && (
                  <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </button>
            </Link>

            <Link href="/wishlist">
              <button
                className="relative text-black hover:text-red-500 transition"
                title="Favorites"
              >
                <FaHeart size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </Link>

            <Link href="/cart">
              <button
                className="relative text-black hover:text-blue-500 transition"
                title="Cart"
              >
                <FaShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Regular Navbar for Larger Screens (sm and up) */}
      <div className="hidden sm:flex flex-grow justify-center items-center relative">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>

      {/* For medium devices and up, keep the regular navigation */}
      <div className="hidden sm:flex space-x-6">
        <Link href="/compare">
          <button
            className="relative text-black hover:text-yellow-500 transition"
            title="Compare"
          >
            <FaBalanceScale size={24} />
            {compareCount > 0 && (
              <span className="absolute top-[-4px] left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
        </Link>

        <Link href="/wishlist">
          <button
            className="relative text-black hover:text-red-500 transition"
            title="Favorites"
          >
            <FaHeart size={24} />
            {wishlistCount > 0 && (
              <span className="absolute top-[-4px] left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </Link>

        <Link href="/cart">
          <button
            className="relative text-black hover:text-blue-500 transition"
            title="Cart"
          >
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-[-4px] left-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
}
