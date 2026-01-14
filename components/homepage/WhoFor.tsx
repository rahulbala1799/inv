"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Check, X } from "lucide-react";

export function WhoFor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-32 bg-white">
      <motion.div style={{ y }} className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16 text-center"
        >
          Who This Is For
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Perfect for */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Perfect if you are:</h3>
            </div>
            <div className="space-y-4">
              {[
                "A freelancer",
                "A consultant",
                "A contractor",
                "A solo business owner",
                "Someone who just wants invoicing to be easy"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 shadow-md"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Not for you if:</h3>
            </div>
            <div className="space-y-4">
              {[
                "You want full bookkeeping",
                "You need expense tracking",
                "You want reports and dashboards",
                "You&apos;re looking for an accounting system"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-600 font-medium"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl font-semibold text-gray-900 text-center mt-16"
        >
          This app does one thing — and does it well.
        </motion.p>
      </motion.div>
    </section>
  );
}
