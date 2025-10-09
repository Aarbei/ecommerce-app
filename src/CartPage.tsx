import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <p>Cart is empty</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="mb-4 flex items-center gap-4 border p-2 rounded shadow">
            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <h3>{item.price}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
