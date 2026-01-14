"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Sparkles, Zap } from "lucide-react";

export function ComingSoon() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-white to-gray-50">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            What&apos;s Next
          </h2>
          <p className="text-xl text-gray-500">
            Premium features launching soon
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI Feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200 rounded-full blur-3xl opacity-30" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-3xl tracking-tight text-gray-900 mb-4">
                AI Invoice Creation
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                Create invoices using plain language. Just describe what you need.
              </p>

              <div className="bg-white/80 backdrop-blur border border-violet-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500 mb-2">Type something like:</p>
                <p className="text-gray-900 font-mono text-sm">
                  &quot;Invoice John €500 for web design, due in 14 days&quot;
                </p>
              </div>

              <div className="flex items-center gap-2 text-violet-700">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">And the invoice fills itself</span>
              </div>
            </div>
          </motion.div>

          {/* Peppol Feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-3xl tracking-tight text-gray-900 mb-4">
                Peppol E-Invoicing
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                Send legally compliant electronic invoices to businesses across Europe.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Automatic compliance with EU regulations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Direct electronic delivery to recipients</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <p className="text-sm text-gray-700">Faster payment processing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          Available as premium add-ons when they launch
        </motion.p>
      </motion.div>
    </section>
  );
}
