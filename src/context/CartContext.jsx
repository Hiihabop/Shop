import React, { createContext, useRef, useState, useEffect } from "react";
import { getProducts } from "../axios/Axios";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [products, setProducts] = useState([]); // Global products state
  const [sharedData, setSharedData] = useState({
    products: [],
    comments: [],
    profile: {},
  });
  const cartIconRef = useRef(null);

  // Fetch all shared data from db.json on mount
  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const res = await axios.get("http://localhost:3030");
        setSharedData(res.data);
        setProducts(res.data.products || []); // keep products in sync
      } catch (err) {
        console.log(err);
      }
    };
    fetchSharedData();
  }, []);

  // Sync cartCount with cartItems length
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = (productImageRef, product) => {
    if (productImageRef.current && cartIconRef.current) {
      const productImageRect = productImageRef.current.getBoundingClientRect();
      const cartIconRect = cartIconRef.current.getBoundingClientRect();

      const flyingImage = productImageRef.current.cloneNode(true);
      flyingImage.style.position = "fixed";
      flyingImage.style.top = `${productImageRect.top}px`;
      flyingImage.style.left = `${productImageRect.left}px`;
      flyingImage.style.width = `${productImageRect.width}px`;
      flyingImage.style.height = `${productImageRect.height}px`;
      flyingImage.style.transition =
        "top 1s, left 1s, width 1s, height 1s, opacity 1s";
      flyingImage.style.zIndex = "1000";
      flyingImage.style.borderRadius = "50%";
      flyingImage.style.objectFit = "cover";
      flyingImage.style.transform = "none";

      document.body.appendChild(flyingImage);

      setTimeout(() => {
        flyingImage.style.top = `${cartIconRect.top}px`;
        flyingImage.style.left = `${cartIconRect.left}px`;
        flyingImage.style.width = "50px";
        flyingImage.style.height = "50px";
        flyingImage.style.opacity = "0";
      }, 0);

      setTimeout(() => {
        document.body.removeChild(flyingImage);
        // setCartCount((prevCount) => prevCount + 1); // No longer needed, handled by useEffect
      }, 1000);
    }
    // Add product to cartItems and localStorage
    setCartItems((prevItems) => {
      const updated = [...prevItems, product];
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
        cartIconRef,
        setCartCount,
        cartItems,
        setCartItems,
        products,
        setProducts,
        sharedData,
        setSharedData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
