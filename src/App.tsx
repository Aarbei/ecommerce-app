import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import CartPage from "./CartPage";

import "./index.css";
import { useCart } from "./CartContext";

import Header from "./Header";
//import { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  //const {cartItems} = useCart();

  return (
    <div>
      <Header onSearch={setSearchQuery}></Header>

      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center">
                <img src="/home.JPG" className="h-96 w-auto"></img>
                <h2 className="mt-5 font-inter">Welcome to our shop!</h2>
                <Link
                  to="/products"
                  className="bg-slate-400 m-1 p-2 rounded-md text-sm shadow-sm shadow-gray-600 text-white inline-block text-center"
                >
                  Shop now
                </Link>
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredProducts.length === 0 ? (
                  <p>No products found.</p>
                ) : (
                  filteredProducts.map((product) => (
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
