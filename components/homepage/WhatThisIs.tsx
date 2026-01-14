"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Check, BarChart3, Settings, Layers } from "lucide-react";

export function WhatThisIs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-white to-gray-50">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Invoicing made beautifully simple
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Built for people who want powerful features without the complexity.
            </p>

            <p className="text-lg text-gray-700 font-medium">
              Clean interface. Smart features. Everything you need, nothing you don&apos;t.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {[
              { icon: BarChart3, title: "Brilliant reports & dashboards", desc: "Insights when you need them" },
              { icon: Settings, title: "Settings with helpful guides", desc: "Configure with confidence" },
              { icon: Layers, title: "No upsells or hidden features", desc: "Everything included" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg text-gray-900 font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
