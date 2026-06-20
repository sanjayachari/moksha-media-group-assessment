'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const metrics = [
  { value: '99.999%', label: 'Uptime SLA' },
  { value: '3', label: 'Continents' },
  { value: '24h', label: 'Quote Response' },
  { value: '50+', label: 'OEM Partners' },
]

export default function CTA() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold: 0.1 })

    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          }}
        >
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              {/* Section Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-white/15" />
                <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">
                  Enterprise AI Agents
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.08] mb-5 font-display tracking-[-0.03em]">
                AI Agents That Actually<br />
                Get Real Work Done
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg text-white/35 leading-relaxed mb-10 max-w-lg font-body">
                Deploy customer support, research, and workflow automation agents tailored to your business needs and goals.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                
                {/* Primary Button */}
                <button
                onClick={() => alert('Contact sales form coming soon!')}
                  className="relative inline-flex items-center justify-center p-[3px] rounded-full cursor-pointer outline-none border-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(52,211,153,0.35) 0%, rgba(16,185,129,0.15) 50%, rgba(52,211,153,0.08) 100%)',
                    boxShadow: '0 0 0 1px rgba(52,211,153,0.25)',
                  }}
                >
                  <span
                    className="flex items-center px-7 py-3 rounded-full text-white/95 text-sm font-semibold font-body"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(52,211,153,0.22) 0%, rgba(16,185,129,0.08) 100%)',
                      boxShadow:
                        'inset 0 1px 0 rgba(52,211,153,0.3), inset 0 -1px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    Get Started →
                  </span>
                </button>

                {/* Secondary Button */}
               <Link href="/ask-ai">
                <button
                  className="px-7 py-3 rounded-full text-white/45 text-sm font-medium hover:text-white/70 transition-all duration-200 cursor-pointer font-body bg-transparent border border-white/[0.08]"
                >
                  AI Chat
                </button></Link>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-white/80 font-mono tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/25 uppercase tracking-wider font-mono mt-1">
                      {m.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}