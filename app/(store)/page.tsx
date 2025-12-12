import ProductsView from "@/components/productsView";
import SaleBanner from "@/components/saleBanner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log("Products:", products);
  console.log("Categories:", categories);
  return (
    <div>
      <div className="flex flex-col justify-start items-center bg-gray-100 min-h-screen p-4 ">
        <SaleBanner />
        <ProductsView products={products!} categories={categories!} />
      </div>
    </div>
  );
}
