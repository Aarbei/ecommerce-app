import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./Card";
import CartPage from "./CartPage";


import "./index.css";
import { useCart } from "./CartContext";

//import { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  //return <div>{products.length} товаров</div>;

  /*const cardsData = [
    {
      image: "1.jpg",
      title: "Lake in the forest",
    },
    { image: "2.jpg", title: "Sandy beach" },
    {
      image: "3.jpg",
      title: "Rocky shore",
    },
  ];*/

  const {cartItems} = useCart(); 

  return (
    <div>
      <header className="bg-gray-500 h-16 flex justify-between items-center">
        <h1 className="ml-10 font-bold text-white">Online shop</h1>
        <nav className="flex">
          <ul className="flex gap-6 mr-40 font-bold text-white">
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

      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to our shop!</h2>}
          />
          <Route
            path="/products"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.length === 0 ? (
                  <p>Загрузка товаров...</p>
                ) : (
                  products.map((product) => (
                    <Card
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      thumbnail={product.thumbnail}
                      price={product.price}
                    />
                  ))
                )}
              </div>
            }
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
