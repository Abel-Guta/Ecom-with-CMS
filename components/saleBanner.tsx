import { getActiveSaleById } from "@/sanity/lib/sale/getActiveSaleById";
import React from "react";

const SaleBanner = async () => {
  const sale = await getActiveSaleById("BFRIDAY");
  if (!sale?.isActive) {
    return null;
  }
  console.log("Active Sale:", sale);

  return (
    <div className="bg-linear-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      SaleBanner
    </div>
  );
};

export default SaleBanner;
