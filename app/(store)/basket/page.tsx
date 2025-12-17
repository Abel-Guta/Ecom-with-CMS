"use client";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/addToBasket";
import { imageUrl } from "@/lib/imageUrl";
import { usebasketStore } from "@/zustandStore/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { set } from "sanity";

const BasketPage = () => {
  const groupedItems = usebasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  if (groupedItems.length === 0) {
    return (
      <div className="contsiner mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is currently empty.</p>
      </div>
    );
  }
  const handleCheckout = async () => {
    if (!isSignedIn) {
      return;
    }
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown User",
        customerEmail:
          user?.primaryEmailAddress?.emailAddress || "Unknown Email",
        clerkUserId: user?.id || "Unknown UserId",
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="grow">
          {groupedItems.map((item) => {
            return (
              <div
                key={item.product._id}
                className="mb-4 p-4 border rounded flex items-center justify-between"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 mr-4">
                  {item.product.image && (
                    <Link href={`/product/${item.product.slug?.current}`}>
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name!}
                        className="w-full h-full object-cover rounded"
                        width={96}
                        height={96}
                      />
                    </Link>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price:$
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <AddToBasketButton product={item.product} />
              </div>
            );
          })}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                ${usebasketStore((state) => state.getTotalPrice()).toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>

        <div className="h-64 lg:h-0">
          {/* Spacer for fixed Checkout on Mobile */}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
