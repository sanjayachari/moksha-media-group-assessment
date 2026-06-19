'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    tag: '01',
    title: 'Custom Agent Development',
    subtitle: '',
    description: 'Build AI agents tailored to your business workflows.',
    items: ['Agent Design', 'Workflow Mapping', 'Tool Integration', 'Deployment'],
    color: 'rgba(52,211,153,1)',
    colorHex: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
    dim: 'rgba(52,211,153,0.05)',
    specs: [
      { label: 'Scalability', value: 'High' },
      { label: 'Flexibility', value: 'Modular' },
      { label: 'Speed', value: 'Fast' },
    ],
  },
  {
    tag: '02',
    title: 'Agent Hosting & Monitoring',
    subtitle: '',
    description: 'Monitor performance, uptime, and usage in real time.',
    items: ['Uptime Monitoring', 'Logs & Tracing', 'Usage Analytics', 'Alerts'],
    color: 'rgba(163,230,53,1)',
    colorHex: '#a3e635',
    glow: 'rgba(163,230,53,0.15)',
    dim: 'rgba(163,230,53,0.05)',
    specs: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Latency', value: '<50ms' },
      { label: 'Observability', value: 'Full Stack' },
    ],
  },
  {
    tag: '03',
    title: 'Workflow Automation',
    subtitle: '',
    description: 'Automate repetitive tasks across teams and systems.',
    items: ['Task Automation', 'Integrations', 'Scheduling', 'Orchestration'],
    color: 'rgba(110,231,183,1)',
    colorHex: '#6ee7b7',
    glow: 'rgba(110,231,183,0.15)',
    dim: 'rgba(110,231,183,0.05)',
    specs: [
      { label: 'Efficiency Gain', value: '+70%' },
      { label: 'Setup Time', value: 'Quick' },
      { label: 'Coverage', value: 'End-to-End' },
    ],
  },
  {
    tag: '04',
    title: 'Enterprise Integrations',
    subtitle: '',
    description: 'Connect with CRMs, ERPs, Slack, Teams, and more.',
    items: ['CRM Sync', 'ERP Integration', 'Slack & Teams', 'API Connectors'],
    color: 'rgba(134,239,172,1)',
    colorHex: '#86efac',
    glow: 'rgba(134,239,172,0.15)',
    dim: 'rgba(134,239,172,0.05)',
    specs: [
      { label: 'Systems Supported', value: '50+' },
      { label: 'Setup Time', value: 'Fast' },
      { label: 'Reliability', value: 'Enterprise Grade' },
    ],
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const cur = features[active]

  return (
    <section id="features" className="py-28 relative overflow-hidden border-t border-white/[0.04]">

      <AnimatePresence>
        <motion.div
          key={`bg-${active}`}
          className="absolute pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            top: '0%', right: '0%',
            width: '500px', height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${cur.glow} 0%, transparent 65%)`,
            filter: 'blur(80px)',
          }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">Features</span>
        </div>

        <div className="w-full mb-12 border-b border-white/[0.06]">

          {/* Scroll container */}
          <div className="flex overflow-x-auto no-scrollbar md:justify-center">

            <div className="flex items-center gap-1 min-w-max">
              {features.map((s, i) => (
                <button
                  key={s.tag}
                  onClick={() => setActive(i)}
                  className="relative px-4 md:px-5 py-3 text-sm font-medium font-body transition-colors duration-200 whitespace-nowrap"
                  style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.3)' }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        color: active === i
                          ? s.colorHex
                          : 'rgba(255,255,255,0.18)'
                      }}
                    >
                      {s.tag}
                    </span>
                    {s.title}
                  </span>

                  {active === i && (
                    <motion.div
                      layoutId="tab-line"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${s.colorHex}, transparent)`
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid md:grid-cols-[1fr_380px] gap-10 items-start"
          >
            <div className="relative">
              <div
                className="absolute -top-4 -left-2 text-[130px] font-bold leading-none select-none pointer-events-none font-display tracking-[-0.05em]"
                style={{ color: cur.glow }}
              >
                {cur.tag}
              </div>

              <div className="relative z-10 pt-16">
                <h3 className="text-5xl md:text-6xl font-bold leading-none mb-2 font-display tracking-[-0.04em]">
                  <span
                    className="inline-block bg-clip-text text-transparent"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.82) 45%, #e2fdf4 75%, #ffffff 100%)',
                      WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    }}
                  >{cur.title}</span>
                  <br />
                  <span className="text-white/20">{cur.subtitle}</span>
                </h3>

                <p className="text-sm text-white/40 mt-6 max-w-md leading-relaxed font-body">
                  {cur.description}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3">
                  {cur.items.map((item, i) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: cur.colorHex }} />
                      <span className="text-sm text-white/45 font-body">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/solutions">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-10 flex items-center gap-2 text-sm font-medium bg-transparent border-none cursor-pointer font-body p-0"
                    style={{ color: cur.colorHex }}
                  >
                    Explore {cur.title} Solutions <span>→</span>
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div
                className="relative rounded-2xl p-6 overflow-hidden animate-border-pulse"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)',
                  border: `1px solid ${cur.colorHex}30`,
                }}
              >
                <div className="absolute top-0 left-[10%] right-[10%] h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${cur.colorHex}90, transparent)` }}
                />

                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div
                    className="absolute inset-0 animate-shimmer-slide"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${cur.colorHex}18 50%, transparent 60%)`,
                      animationDelay: '0.5s',
                    }}
                  />
                </div>

                <div className="absolute top-0 right-0 w-36 h-24 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top right, ${cur.colorHex}20 0%, transparent 65%)` }}
                />
                <div className="absolute bottom-0 left-0 w-28 h-20 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at bottom left, ${cur.colorHex}10 0%, transparent 65%)` }}
                />

                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-5">Key Specs</p>

                <div className="flex flex-col gap-4">
                  {cur.specs.map((spec, i) => (
                    <motion.div key={spec.label}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-white/30 font-body">{spec.label}</span>
                      <span
                        className="text-sm font-bold font-mono inline-block bg-clip-text text-transparent"
                        style={{
                          background: `linear-gradient(135deg, ${cur.colorHex} 0%, #fff 60%, ${cur.colorHex} 100%)`,
                          WebkitBackgroundClip: 'text', backgroundClip: 'text',
                        }}
                      >
                        {spec.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {cur.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="group relative flex items-center justify-between px-4 py-3 rounded-xl overflow-hidden bg-white/[0.018] border border-white/[0.05]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute inset-0 animate-shimmer-slide-2"
                      style={{ background: `linear-gradient(105deg, transparent 30%, ${cur.colorHex}12 50%, transparent 70%)` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <span className="font-mono text-[9px] text-white/15">{active + 1}.{i + 1}</span>
                    <span className="text-xs text-white/40 font-body">{item}</span>
                  </div>
                  <span className="text-white/15 text-xs group-hover:text-white/40 transition-colors relative z-10">→</span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}