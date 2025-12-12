import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";
import { act } from "react";

export async function getActiveSaleById(couponCode: CouponCode) {
  const ACTIVE_SALE_QUERY = defineQuery(
    `*[_type == "sale" && couponCode == $couponCode && isActive == true][0]`
  );
  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_QUERY,
      params: { couponCode },
    });

    return activeSale.data || null;
  } catch (error) {
    console.error("Error fetching active sale by Coupon Code:", error);
    return null;
  }
}
