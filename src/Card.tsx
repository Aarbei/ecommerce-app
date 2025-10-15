import "./Card.css";
import React, { useState } from "react";
import { useCart } from "./CartContext";

type Props = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
};

const Card = ({ id, title, thumbnail, price }: Props) => {
  const [likes, setLikes] = useState(0);
  const { addToCart } = useCart();

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddToCart = () => {
    addToCart({ id, title, thumbnail, price, quantity: 1 });
  };

  return (
    <div className="bg-white shadow-sm shadow-zinc-500 p-5 ">
      <img src={thumbnail} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <h3 className="card-price">{price} €</h3>
      <button className="like-button" onClick={handleLike}>
        {"\u2764"} {likes}
      </button>
      <button
        className="bg-slate-400 m-1 p-1 rounded-md text-sm shadow-sm shadow-gray-600 text-white"
        onClick={handleAddToCart}
      >
        Add to the cart
      </button>
    </div>
  );
};

export default Card;
