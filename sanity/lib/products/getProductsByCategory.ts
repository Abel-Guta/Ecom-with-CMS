import { defineQuery } from "next-sanity";
import React from "react";
import { sanityFetch } from "../live";

const getProductsByCategory = async (categorySlug: string) => {
  const CATEGORY_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product" && references(*[_type=="category" && slug.current == $categorySlug]._id)] | order(name asc)`
  );

  try {
    const products = await sanityFetch({
      query: CATEGORY_PRODUCTS_QUERY,
      params: { categorySlug },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};
export default getProductsByCategory;
