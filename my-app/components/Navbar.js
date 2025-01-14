import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBalanceScale,
  FaHeart,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [isClient, setIsClient] = useState(false); // Flag to track if we're on the client
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling mobile menu
  const router = useRouter();

  // Initialize localStorage data after the component mounts
  useEffect(() => {
    setIsClient(true); // Ensures we're on the client side

    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const storedCompareList =
        JSON.parse(localStorage.getItem("compareList")) || [];

      setCartCount(storedCart.length);
      setWishlistCount(storedWishlist.length);
      setCompareCount(storedCompareList.length);
    }
  }, []);

  const updateLocalStorage = (type, updatedList) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(type, JSON.stringify(updatedList));

      // Update the corresponding state immediately
      if (type === "cart") setCartCount(updatedList.length);
      if (type === "wishlist") setWishlistCount(updatedList.length);
      if (type === "compareList") setCompareCount(updatedList.length);
    }
  };

  // Render only after the component has mounted on the client side
  if (!isClient) {
    return null; // Prevent hydration mismatch by not rendering anything on the server side
  }

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
            onClick={() => {
              const compareList =
                JSON.parse(localStorage.getItem("compareList")) || [];
              updateLocalStorage("compareList", compareList);
            }}
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
            onClick={() => {
              const wishlist =
                JSON.parse(localStorage.getItem("wishlist")) || [];
              updateLocalStorage("wishlist", wishlist);
            }}
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
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart")) || [];
              updateLocalStorage("cart", cart);
            }}
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
