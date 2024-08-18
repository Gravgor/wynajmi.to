"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-500 fixed top-0 inset-x-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between sm:items-stretch">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-2xl font-bold">Wynajmi.to</Link>
            </div>
            <div className="hidden sm:flex sm:ml-auto sm:space-x-4">
              <Link href="/" className="text-white hover:bg-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/about" className="text-white hover:bg-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="/listings" className="text-white hover:bg-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">Listings</Link>
              <Link href="/contact" className="text-white hover:bg-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="text-white hover:bg-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link href="/about" className="text-white hover:bg-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium">About</Link>
          <Link href="/listings" className="text-white hover:bg-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium">Listings</Link>
          <Link href="/contact" className="text-white hover:bg-gray-700 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
