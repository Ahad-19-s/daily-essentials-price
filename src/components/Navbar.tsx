// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              বাজারদর
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-yellow-300">
              Home
            </Link>
            <Link href="/category" className="hover:text-yellow-300">
              Categories
            </Link>
            <Link href="/blog" className="hover:text-yellow-300">
              Blog
            </Link>
            <Link href="/support" className="hover:text-yellow-300">
              Support
            </Link>
            <Link href="/profile" className="hover:text-yellow-300">
              My Profile
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/signin"
              className="bg-yellow-400 text-black px-3 py-1 rounded-md"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-green-600 px-3 py-1 rounded-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 px-4 py-3 space-y-2">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/category" className="block">
            Categories
          </Link>
          <Link href="/blog" className="block">
            Blog
          </Link>
          <Link href="/support" className="block">
            Support
          </Link>
          <Link href="/profile" className="block">
            My Profile
          </Link>
          <Link href="/signin" className="block">
            Sign In
          </Link>
          <Link href="/signup" className="block">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
