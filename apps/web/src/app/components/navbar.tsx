'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between">
      {/* Left Section: Sunburst Icon */}
      <div className="flex items-center">
        <Link href="/" aria-label="Home" className="text-white hover:opacity-90 transition-opacity">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
          >
            <path
              d="M12 2V4.5M12 19.5V22M2 12H4.5M19.5 12H22M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Center Section: Navigation Links (hidden on mobile, visible md:flex) */}
      <div className="hidden md:flex items-center gap-8 font-['Instrument_Sans',sans-serif] text-sm font-medium">
        <div className="relative group cursor-pointer flex items-center gap-1 text-white/80 hover:text-white transition-colors">
          <span>Products</span>
          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
        </div>
        <Link href="#customer-stories" className="text-white/80 hover:text-white transition-colors">
          Customer Stories
        </Link>
        <Link href="#resources" className="text-white/80 hover:text-white transition-colors">
          Resources
        </Link>
        <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
          Pricing
        </Link>
      </div>

      {/* Right Section: Action Links & Button */}
      <div className="flex items-center gap-6 font-['Instrument_Sans',sans-serif]">
        <Link
          href="#demo"
          className="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Book A Demo
        </Link>
        <button
          type="button"
          className="bg-white text-black rounded-full px-5 py-2.5 font-semibold text-sm hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
        >
          Get Started
        </button>
      </div>
    </nav>
  )
}
