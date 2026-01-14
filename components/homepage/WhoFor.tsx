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
    <section ref={ref} className="pt-12 pb-24 bg-black text-white">
      <motion.div style={{ y }} className="mx-auto max-w-5xl px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl tracking-tight mb-16 text-center"
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
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl">Perfect if you are:</h3>
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
                  className="flex items-center gap-3 text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
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
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl">Not for you if:</h3>
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
                  className="flex items-center gap-3 text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
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
          className="text-2xl text-center mt-16"
        >
          This app does one thing — and does it well.
        </motion.p>
      </motion.div>
    </section>
  );
}
