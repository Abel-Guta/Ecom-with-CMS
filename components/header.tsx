"use client";

import { usebasketStore } from "@/zustandStore/store";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import Link from "next/link";
import React, { use } from "react";

const Header = () => {
  const { user } = useUser();
  const itemCount = usebasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 w-full">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          MENU
        </Link>

        <form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            name="query"
            type="text"
            placeholder="Search foods..."
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:ring-2 focus:ring-blue-500 w-full max-w-4xl"
          />
        </form>

        <div className="flex items-center justify-between mt-4 sm:mt-0 flex-1 sm:justify-end sm:space-x-8 pr-9">
          {/* Basket */}
          <Link
            href="/basket"
            className="flex  relative items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mx-4 mx-auto"
          >
            <TrolleyIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
            <span>choosen</span>
          </Link>

          <ClerkLoaded>
            {/* Orders link only when signed in */}
            <SignedIn>
              <Link
                href="/orders"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:mx-4 mx-auto"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {/* User button when signed in */}
            <SignedIn>
              <div className="hidden sm:flex text-xs gap-2 items-center">
                <UserButton />
                <div>
                  <p className="text-gray-400 hidden md:block">Welcome Back</p>
                  <p className="font-bold">{user?.fullName}</p>
                </div>
              </div>
            </SignedIn>

            {/* Sign In button when signed out */}
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
