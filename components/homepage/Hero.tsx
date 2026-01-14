"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white pt-24 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>14-day free trial • No credit card required</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
        >
          Professional Invoicing
          <br />
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Made Simple</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Create, send, and track invoices in seconds. Built for freelancers, consultants, and small businesses who value simplicity.
        </motion.p>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12"
        >
          {[
            "Unlimited invoices",
            "WYSIWYG editor",
            "Multi-currency",
            "PDF export"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm md:text-base text-gray-700">
              <Check className="w-5 h-5 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-black rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Trial
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <a 
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Pricing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-500 text-sm"
        >
          Then just <span className="font-semibold text-gray-900">€5/month</span> • Cancel anytime
        </motion.p>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-6">Trusted by thousands of professionals worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
            {/* Placeholder for company logos - you can add real logos here */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
