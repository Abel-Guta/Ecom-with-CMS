"use client";

import { Product } from "@/sanity.types";
import { usebasketStore } from "@/zustandStore/store";
import { get } from "http";
import { useEffect, useState } from "react";

const AddToBasketButton = ({
  product,
  disabled,
}: {
  product: Product;
  disabled: boolean;
}) => {
  const { addItem, removeItem, getItemCount } = usebasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount === 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
      >
        -
      </button>
      <span className="w-8  text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex  justify-center transition-colors duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
};

export default AddToBasketButton;

// build the header to show the item count on the basket
