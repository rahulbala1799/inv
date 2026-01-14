"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { MousePointer2, Users, Table, Zap, Eye, ChevronDown } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const features = [
    { 
      icon: MousePointer2, 
      title: "Click anywhere on the invoice to edit",
      details: "No need to find the right form field or navigate through menus. Just click directly on the invoice where you want to make changes—like editing a document. Your invoice number, date, items, amounts—everything is editable right where you see it."
    },
    { 
      icon: Users, 
      title: "Customer details appear inline",
      details: "Start typing a customer name and their full details automatically populate—address, email, tax ID, payment terms. Previously used customers are saved and ready to reuse. No switching between screens or opening separate forms."
    },
    { 
      icon: Table, 
      title: "Line items work like a table, not a form",
      details: "Add products or services by typing directly into rows. Copy, paste, and rearrange items just like a spreadsheet. Descriptions, quantities, prices, and discounts are all editable in-place. It feels natural and fast."
    },
    { 
      icon: Zap, 
      title: "Totals update instantly",
      details: "Change a price, quantity, or discount and watch the subtotal, tax, and total update in real-time. No &apos;calculate&apos; button. No waiting. The invoice reflects your changes immediately as you type."
    },
    { 
      icon: Eye, 
      title: "What you see is what your client gets",
      details: "There&apos;s no separate &apos;preview&apos; mode because you&apos;re always looking at the final invoice. The PDF your client receives looks exactly like what you see on screen. No surprises, no formatting issues, no guesswork."
    }
  ];

  return (
    <section ref={ref} id="features" className="py-32 bg-white">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Edit the invoice itself
            </h2>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Most invoicing apps make you fill out forms and then preview an invoice.
            </p>

            <p className="text-xl text-gray-900 font-semibold mb-8">
              This works differently.
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
              <p className="text-lg text-gray-900 font-semibold mb-3">
                You edit the invoice directly — just like editing a document.
              </p>
              <p className="text-sm text-gray-600">
                No preview mode. No guessing.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="w-full flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-sm">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-900 font-medium flex-1">{feature.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-4 bg-gray-50 border-l-4 border-gray-900 ml-4 mt-2 rounded-r-lg">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {feature.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
