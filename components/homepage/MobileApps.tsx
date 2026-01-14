"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Smartphone } from "lucide-react";

export function MobileApps() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="py-24 bg-black text-white overflow-hidden">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8">
              Mobile Apps Included
            </h2>
            
            <p className="text-xl text-gray-600 mb-12">
              Create invoices anywhere
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">iOS</h3>
                <p className="text-sm text-gray-600">iPhone & iPad</p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Android</h3>
                <p className="text-sm text-gray-600">All devices</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Same simple experience. Same invoice-first editor. Create, edit, and send invoices from your phone without sacrificing professionalism.
            </p>
          </motion.div>

          <motion.div
            style={{ y: phoneY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-sm mx-auto">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1740721610016-ce8577141b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBzY3JlZW4lMjBtb2NrdXB8ZW58MXx8fHwxNzY4MzQ5MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mobile app"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 backdrop-blur-xl border-2 border-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
