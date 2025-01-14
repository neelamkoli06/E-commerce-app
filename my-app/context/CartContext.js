import { createContext, useContext, useState, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart, Wishlist, and Compare state initialization
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  // Counts for cart, wishlist, and compare list
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  // Initialize cart, wishlist, and compare list from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const storedCompareList =
        JSON.parse(localStorage.getItem("compareList")) || [];

      setCart(storedCart);
      setWishlist(storedWishlist);
      setCompareList(storedCompareList);
      setCartCount(storedCart.length);
      setWishlistCount(storedWishlist.length);
      setCompareCount(storedCompareList.length);
    }
  }, []);

  // Update localStorage and counts whenever cart, wishlist, or compare list changes
  const syncLocalStorage = (key, value, updateCount) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
      updateCount(value.length); // Update count immediately
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      const updatedCart = existingProduct
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      syncLocalStorage("cart", updatedCart, setCartCount); // Sync cart and count
      return updatedCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      syncLocalStorage("cart", updatedCart, setCartCount);
      return updatedCart;
    });
  };

  // Update quantity of a product in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      syncLocalStorage("cart", updatedCart, setCartCount);
      return updatedCart;
    });
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existingProduct = prevWishlist.find((item) => item.id === product.id);
      const updatedWishlist = existingProduct
        ? prevWishlist
        : [...prevWishlist, product];

      syncLocalStorage("wishlist", updatedWishlist, setWishlistCount); // Sync wishlist and count
      return updatedWishlist;
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item.id !== productId);
      syncLocalStorage("wishlist", updatedWishlist, setWishlistCount);
      return updatedWishlist;
    });
  };

  // Add product to compare list
  const addToCompare = (product) => {
    setCompareList((prevCompareList) => {
      const existingProduct = prevCompareList.find((item) => item.id === product.id);
      const updatedCompareList = existingProduct
        ? prevCompareList
        : [...prevCompareList, product];

      syncLocalStorage("compareList", updatedCompareList, setCompareCount); // Sync compare list and count
      return updatedCompareList;
    });
  };

  // Remove product from compare list
  const removeFromCompare = (productId) => {
    setCompareList((prevCompareList) => {
      const updatedCompareList = prevCompareList.filter(
        (item) => item.id !== productId
      );
      syncLocalStorage("compareList", updatedCompareList, setCompareCount);
      return updatedCompareList;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    syncLocalStorage("cart", [], setCartCount); // Clear cart and reset count
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    syncLocalStorage("wishlist", [], setWishlistCount); // Clear wishlist and reset count
  };

  // Clear the entire compare list
  const clearCompare = () => {
    setCompareList([]);
    syncLocalStorage("compareList", [], setCompareCount); // Clear compare list and reset count
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        cartCount,
        wishlistCount,
        compareCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
