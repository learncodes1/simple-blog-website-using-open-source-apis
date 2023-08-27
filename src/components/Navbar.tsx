import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";

import Toggler from "./Toggler";

const Navbar = () => {
  const pathname = usePathname();

  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = String(searchQuery).trim();
    trimmedValue !== ""
      ? router.push({
          pathname: `/search/${searchQuery.split(" ").join("-")}`,
        })
      : "";
    setSearchQuery("");
  };

  return (
    <header className="fixed top-0 z-10 w-full bg-[#154360] p-[15px] xs:relative">
      <div className="container relative xs:static">
        <nav className="flex flex-wrap items-center justify-between">
          <Link href="/">
            <img
              alt="logo"
              src="https://source.unsplash.com/45x45"
              width={45}
              height={45}
            />
          </Link>

          <div className="flex items-center ">
            <ul
              className={`left-0 mr-[15px] flex gap-x-6 overflow-hidden  sm:absolute sm:top-[120%] sm:w-full sm:flex-col sm:gap-y-4 sm:rounded-[15px] sm:bg-gray-900 sm:p-[25px]${
                toggle
                  ? " sm:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
                  : " sm:[clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
              }`}
            >
              <li>
                <Link
                  href="/"
                  className={`font-medium${
                    pathname === "/" ? " active text-white" : " text-mediumgray"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create-post"
                  className={`font-medium${
                    pathname === "/create-post/"
                      ? " text-white"
                      : " text-[#828282]"
                  }`}
                >
                  Create post
                </Link>
              </li>
            </ul>
            <form
              className="w-[325px] xs:absolute xs:left-0 xs:top-full xs:w-full"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400 xs:h-3 xs:w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-300 bg-[#2471A3] p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-darkgray dark:placeholder:text-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 xs:p-3 xs:pl-9"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 xs:px-2 xs:py-1"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <Toggler
            className="hidden sm:flex"
            onChange={(val: boolean) => setToggle(val)}
          />
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
