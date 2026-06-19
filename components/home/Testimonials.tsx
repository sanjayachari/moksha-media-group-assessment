'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "Aether AI reduced support workload by 70% within the first month.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "Nexlify",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "We automated onboarding and saved 25 hours weekly.",
    author: "Marcus Okoro",
    role: "CTO",
    company: "Vellum Dynamics",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Deployment was completed in less than a week.",
    author: "Elena Rodriguez",
    role: "VP Engineering",
    company: "PulseForge",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "The autonomous agents handle 80% of our routine infrastructure tasks.",
    author: "James Kim",
    role: "Infrastructure Lead",
    company: "Stratum Labs",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleSelect = (index) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
  }

  const active = testimonials[activeIndex]

  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">Testimonials</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] font-display tracking-[-0.03em] mb-16">
          Trusted by teams<br />who move fast.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT - List */}
          <div className="space-y-3">
            {testimonials.map((t, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleSelect(idx)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-6 rounded-2xl border transition-all group ${
                  idx === activeIndex
                    ? 'border-emerald-200/[0.3] bg-emerald-400/[0.03]'
                    : 'border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-white/60 text-[15px] leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors">
                      “{t.quote}”
                    </p>
                    <div className="mt-4 text-xs text-emerald-600">
                      {t.author} • {t.company}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT - Featured Card */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="bg-surface-700 border border-white/[0.08] rounded-3xl p-10 md:p-12 min-h-[460px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="text-emerald-400/20 text-7xl font-serif mb-6">“</div>
                    
                    <p className="text-xl md:text-2xl leading-tight text-white/60 flex-1">
                      {active.quote}
                    </p>

                    <div className="mt-12 flex items-center gap-4">
                      <img
                        src={active.avatar}
                        alt={active.author}
                        className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="font-medium text-white">{active.author}</div>
                        <div className="text-sm text-emerald-400">{active.role}</div>
                        <div className="text-[10px] font-mono text-emerald-400/70 tracking-wider">
                          {active.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress + Controls */}
              <div className="flex justify-between items-center mt-6 px-1">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? 'bg-emerald-400 w-8' : 'bg-white/20 w-4 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white/70 transition-colors"
                >
                  {isAutoPlaying ? 'PAUSE' : 'PLAY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}