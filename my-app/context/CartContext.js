import { createContext, useContext, useState, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart and Wishlist state initialization
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Initialize cart and wishlist state after component mounts (to avoid SSR mismatch)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      const storedWishlist = localStorage.getItem("wishlist");

      setCart(JSON.parse(storedCart) || []);
      setWishlist(JSON.parse(storedWishlist) || []);
    }
  }, []);

  // Update localStorage whenever cart or wishlist changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
      if (wishlist.length > 0) localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity of a product in the cart
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existingProduct = prevWishlist.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevWishlist;
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  // Compare List code (keeping it the same as before)
  const [compareList, setCompareList] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCompareList = localStorage.getItem("compareList");
      return JSON.parse(storedCompareList) || [];
    }
    return [];
  });

  // Update compare list in localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && compareList.length > 0) {
      localStorage.setItem("compareList", JSON.stringify(compareList));
    }
  }, [compareList]);

  // Add product to compare list
  const addToCompare = (product) => {
    setCompareList((prevCompareList) => {
      const existingProduct = prevCompareList.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCompareList;
      } else {
        return [...prevCompareList, product];
      }
    });
  };

  // Remove product from compare list
  const removeFromCompare = (productId) => {
    setCompareList((prevCompareList) => prevCompareList.filter((item) => item.id !== productId));
  };

  // Clear the entire cart (with localStorage removal)
  const clearCart = () => {
    setCart([]); // Clear the cart state
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart"); // Remove the cart from localStorage
    }
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]); // Clear the wishlist state
    if (typeof window !== "undefined") {
      localStorage.removeItem("wishlist"); // Remove the wishlist from localStorage
    }
  };

  // Clear the entire compare list
  const clearCompare = () => {
    setCompareList([]); // Clear the compare list state
    if (typeof window !== "undefined") {
      localStorage.removeItem("compareList"); // Remove the compare list from localStorage
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
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
