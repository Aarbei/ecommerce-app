import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
price: number;
};

type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};


export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Загружаем корзину из localStorage (один раз при монтировании)
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Функция добавления товара в корзину
  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Возвращаем провайдер с нужным значением
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
