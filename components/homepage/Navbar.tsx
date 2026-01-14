"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl tracking-tight text-white">Invozify</Link>
          
          <div className="flex items-center gap-6">
            <a 
              href="#features" 
              className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <Link 
              href="/login" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
