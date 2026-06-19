'use client'

import { motion } from 'framer-motion'

export default function Card({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -3 }}
      className={`relative group rounded-sm border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 overflow-hidden transition-colors duration-300 hover:bg-white/[0.04] ${className}`}
    >
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none shadow-[inset_0_0_0_1px_rgba(16,185,129,0.25)]"
      />
      <span className="absolute top-0 left-0 w-6 h-px bg-emerald-500/0 group-hover:bg-emerald-500/60 transition-all duration-500" />
      <span className="absolute top-0 left-0 w-px h-6 bg-emerald-500/0 group-hover:bg-emerald-500/60 transition-all duration-500" />
      <span className="absolute bottom-0 right-0 w-6 h-px bg-emerald-500/0 group-hover:bg-emerald-500/60 transition-all duration-500" />
      <span className="absolute bottom-0 right-0 w-px h-6 bg-emerald-500/0 group-hover:bg-emerald-500/60 transition-all duration-500" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
