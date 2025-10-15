import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return <p className="mt-5">Cart is empty</p>;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="mb-4 flex items-center gap-4 border p-2 rounded shadow"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <h3>{item.price}</h3>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 mt-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
                className="w-12 text-center border rounded"
              />
              <button
                className="px-2 py-1 bg-gray-200 rounded"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-red-600"
              title="Remove from cart"
            >
              remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartPage;
