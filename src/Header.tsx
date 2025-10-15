import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import Card from "./Card";
import CartPage from "./CartPage";

function Header({ onSearch }: { onSearch?: (query: string) => void }) {
  const { cartItems } = useCart();

  const [query, setQuery] = useState<string>(""); // query - current value of input field

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value); // inform parent about input
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50 flex items-center justify-between p-2">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto"></img>
        <h1 className="ml-1 text-xl font-semibold font-inter text-orange-400 drop-shadow-lg">
          Online shop
        </h1>
      </div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search"
        className=" bg-white text-gray-800 border border-gray-400 px-3 py-1.5 "
      />

      <nav className="flex">
        <ul className="flex gap-6 mr-40 font-bold font-inter text-gray-800">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <Link to="/cart">
            Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
