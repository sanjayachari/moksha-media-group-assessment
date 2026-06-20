"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    title: 'Customer Support Agents',
    description: 'AI-powered support agents that handle queries, tickets, and customer interactions efficiently.',
    stats: [
      { value: '24/7', label: 'Availability' },
      { value: 'Fast', label: 'Response' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 14.5l2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Research Agents',
    description: 'Intelligent agents that gather, analyze, and summarize complex information in real time.',
    stats: [
      { value: 'Deep', label: 'Analysis' },
      { value: 'AI', label: 'Powered' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="14" cy="14" rx="4" ry="10" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 14h20" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: 'Workflow Automation',
    description: 'Automate repetitive business workflows across tools, teams, and systems.',
    stats: [
      { value: '70%+', label: 'Efficiency' },
      { value: 'No-Code', label: 'Setup' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M16 4l-4 10h6l-4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Integrations',
    description: 'Seamlessly connect with CRMs, ERPs, Slack, Teams, and internal systems.',
    stats: [
      { value: '50+', label: 'Systems' },
      { value: 'Secure', label: 'Sync' },
    ],
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-4z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10 14l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ServicesPreview() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">
            Why aether-ai
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10">
       <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] font-display tracking-[-0.03em] line-clamp-2">
  Built for teams<br />
  who build AI systems.
</h2>

          <div className="flex flex-col justify-end">
            <p className="text-base md:text-lg text-white/40 leading-relaxed font-body">
              We design and deploy AI agents that automate support, research, workflows, and enterprise systems.
            </p>

            <Link href="/services">
              <button className="mt-5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Learn More →
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative p-6 rounded-2xl overflow-hidden bg-white/[0.018] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 cursor-default"
            >
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 group-hover:bg-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-base font-semibold text-white/80 mb-2.5 font-display tracking-[-0.01em] group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-xs text-white/30 leading-relaxed mb-4 font-body line-clamp-2">
                  {feature.description}
                </p>

                <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06]">
                  {feature.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="text-sm font-bold text-white/70 font-mono">{stat.value}</div>
                      <div className="text-[10px] text-white/25 uppercase tracking-wider font-mono mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}