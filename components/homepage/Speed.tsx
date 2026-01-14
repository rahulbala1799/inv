"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FileText, DollarSign, Receipt, Mail, TrendingUp } from "lucide-react";

export function Speed() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const cards = [
    { 
      icon: FileText, 
      title: "VAT Report Download", 
      desc: "Export detailed VAT reports ready for your accountant or tax filing"
    },
    { 
      icon: DollarSign, 
      title: "Multi-Currency Support", 
      desc: "Invoice in any currency with automatic conversion and exchange rates"
    },
    { 
      icon: Receipt, 
      title: "Multi Tax Rate Invoices", 
      desc: "Handle different tax rates on the same invoice with automatic calculations"
    },
    { 
      icon: Mail, 
      title: "Email & Track Payments", 
      desc: "Send invoices directly and track when they&apos;re viewed, paid, or overdue"
    },
    { 
      icon: TrendingUp, 
      title: "Part Payments", 
      desc: "Record partial payments and automatically track outstanding balances"
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
          >
            Powerful Features
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Everything you need for professional invoicing
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-700 font-medium">
            Professional features without the complexity
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
