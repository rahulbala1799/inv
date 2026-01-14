"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Invozify</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <a 
              href="#features" 
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#testimonials" 
              className="hidden lg:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Testimonials
            </a>
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log In
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-sm"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
