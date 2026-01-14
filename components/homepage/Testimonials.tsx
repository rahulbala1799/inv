"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Star } from "lucide-react";

export function Testimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const testimonials = [
    {
      quote: "Finally, an invoicing app that doesn&apos;t feel like I need a degree in accounting to use it.",
      author: "Sarah Chen",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1560073743-0a45c01b68c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2ODI5NTE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "I was spending 20 minutes per invoice with my old software. Now it takes 2 minutes.",
      author: "Marcus Rivera",
      role: "Web Developer",
      image: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbnxlbnwxfHx8fDE3NjgyODUyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    },
    {
      quote: "No more wrestling with templates. Just clean, professional invoices every time.",
      author: "Emma Larsson",
      role: "Consultant",
      image: "https://images.unsplash.com/photo-1595436222774-4b1cd819aada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMHBlcnNvbnxlbnwxfHx8fDE3NjgyNDIxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <motion.div style={{ y }} className="mx-auto max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl tracking-tight text-gray-900 mb-4">
            Loved by freelancers
          </h2>
          <p className="text-xl text-gray-500">Join thousands of happy customers</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-lg text-gray-900 mb-8 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <ImageWithFallback 
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
            </div>
            <span className="text-sm text-gray-600">10,000+ happy customers</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
