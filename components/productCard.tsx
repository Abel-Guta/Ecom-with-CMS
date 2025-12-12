import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const isoutofstock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200  overflow-hidden ${isoutofstock ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product?.image).url()}
            alt={product.name!}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
          />
        )}

        {isoutofstock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 ">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description?.slice(0, 70)}
        </p>
        <p className="mt-3 text-lg  font-bold text-gray-900">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
