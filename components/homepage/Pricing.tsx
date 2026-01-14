"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const features = [
    "Unlimited invoices",
    "Unlimited customers",
    "Unlimited products",
    "Peppol e-invoicing",
    "VAT calculations",
    "iOS & Android apps",
    "Cloud sync",
    "PDF export",
    "Email support"
  ];

  return (
    <section ref={ref} id="pricing" className="py-24 bg-black text-white">
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight mb-6">
            Simple, honest pricing
          </h2>
          <p className="text-xl text-gray-400">
            No tiers. No limits. No feature gates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/5 border-2 border-white/10 rounded-3xl p-12 backdrop-blur relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs font-medium text-white mb-6">
                MONTHLY
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-7xl font-light tracking-tight">€5</span>
                  <span className="text-2xl text-gray-400">/mo</span>
                </div>
                <p className="text-gray-400 text-lg">
                  Billed monthly
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/signup"
                  className="block w-full py-4 bg-white text-black rounded-xl text-center font-semibold hover:bg-gray-100 transition-colors mb-8 shadow-lg"
                >
                  Start Free Trial
                </Link>
              </motion.div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                {features.slice(0, 5).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-8">
                Cancel anytime, no questions asked
              </p>
            </div>
          </motion.div>

          {/* Yearly - Popular */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white text-black rounded-3xl p-12 relative overflow-hidden shadow-2xl border-4 border-white"
          >
            <div className="absolute top-8 right-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              SAVE 33%
            </div>
            
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-100 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 bg-black text-white rounded-full text-xs font-medium mb-6">
                YEARLY • BEST VALUE
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-7xl font-light tracking-tight">€40</span>
                  <span className="text-2xl text-gray-500">/yr</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg text-gray-400 line-through">€60</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Save €20</span>
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  Just €3.33/month
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/signup"
                  className="block w-full py-4 bg-black text-white rounded-xl text-center font-semibold hover:bg-gray-800 transition-colors mb-8 shadow-xl"
                >
                  Start Free Trial
                </Link>
              </motion.div>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                {features.slice(0, 5).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-8">
                One-time annual payment • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>

        {/* All Features list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur"
        >
          <h3 className="text-center text-2xl mb-10 text-white font-medium">Everything Included</h3>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-5">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur">
            <p className="text-white font-medium text-lg">14-day free trial</p>
            <p className="text-gray-400 text-sm">No credit card required • Start invoicing in minutes</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
