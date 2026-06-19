'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import RequestQuoteModal from '../modal/RequestQuoteModal'
import { useState } from 'react'



const timeline = [
  { year: '2023', title: 'Founded', desc: 'Aether AI was founded with a mission to build truly autonomous AI agents that solve real business problems.' },
  { year: '2024', title: 'First Deployments', desc: 'Launched our initial suite of customer support and workflow agents with early enterprise partners.' },
  { year: '2025', title: 'Global Expansion', desc: 'Scaled to multi-region hosting and began supporting complex enterprise integrations across industries.' },
  { year: '2025', title: 'Enterprise Traction', desc: 'Partnered with leading organizations for large-scale custom agent development and deployment.' },
  { year: '2026', title: 'Today', desc: 'Powering hundreds of autonomous agents that handle support, research, automation, and enterprise operations worldwide.' },
]

const pillars = [
  { number: '01', title: 'Autonomous First', desc: 'We build agents that can think, decide, and act independently — not just follow scripts or answer questions.' },
  { number: '02', title: 'Enterprise Ready', desc: 'Built with security, compliance, and scalability at the core. SOC2, GDPR, and on-premise deployment options available.' },
  { number: '03', title: 'Deep Integration', desc: 'Seamlessly connects with your existing tools — CRMs, ERPs, internal databases, Slack, Teams, and custom APIs.' },
  { number: '04', title: 'Continuous Improvement', desc: 'Agents learn from real usage while maintaining strict data privacy and human oversight where needed.' },
]

const stats = [
  { value: '500+', label: 'Agents Deployed' },
  { value: '4.8x', label: 'Avg ROI' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<2s', label: 'Avg Response' },
]

const regionCards = [
  
  {
    name: 'India - North & Central',
    sub: 'Delhi NCR, Uttar Pradesh, Madhya Pradesh',
    tag: 'Government & Enterprise Hub',
    coords: '28°N 77°E',
    detail: 'Strong enterprise adoption, government digital initiatives, and rapidly growing AI infrastructure across key northern regions.'
  },

  {
    name: 'India - West',
    sub: 'Maharashtra, Gujarat',
    tag: 'Business & Finance Hub',
    coords: '19°N 72°E',
    detail: 'Major financial and startup ecosystem including Mumbai and Pune, driving fintech and enterprise AI adoption.'
  },

  {
    name: 'India - South',
    sub: 'Karnataka, Telangana, Tamil Nadu',
    tag: 'Tech & Innovation Hub',
    coords: '13°N 77°E',
    detail: 'India’s largest tech and AI talent hub with Bengaluru, Hyderabad, and Chennai powering global engineering and AI development.'
  },
]

/* ── Desktop alternating timeline item ── */
function TimelineItem({ year, title, desc, index }) {
  const isLeft = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative grid grid-cols-[1fr_40px_1fr] items-start"
    >
      {/* left */}
      <div className={`py-6 ${isLeft ? 'pr-10 text-right' : ''}`}>
        {isLeft && (
          <>
            <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">{year}</div>
            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Syne,sans-serif' }}>{title}</h3>
            <p className="text-sm text-white/[0.35] leading-relaxed" style={{ fontFamily: 'DM Sans,sans-serif' }}>{desc}</p>
          </>
        )}
      </div>

      {/* center dot */}
      <div className="flex flex-col items-center">
        <div className="w-px bg-white/[0.06] min-h-[24px] flex-1" />
        <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        <div className="w-px bg-white/[0.06] min-h-[24px] flex-1" />
      </div>

      {/* right */}
      <div className={`py-6 ${!isLeft ? 'pl-10' : ''}`}>
        {!isLeft && (
          <>
            <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-2">{year}</div>
            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Syne,sans-serif' }}>{title}</h3>
            <p className="text-sm text-white/[0.35] leading-relaxed" style={{ fontFamily: 'DM Sans,sans-serif' }}>{desc}</p>
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ── Mobile stacked timeline item ── */
function MobileTimelineItem({ year, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative pl-7 pb-8 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />
      <div className="absolute left-[-5px] top-[22px] w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
      <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-1.5">{year}</div>
      <h3 className="text-base font-semibold text-white mb-1.5" style={{ fontFamily: 'Syne,sans-serif' }}>{title}</h3>
      <p className="text-sm text-white/[0.35] leading-relaxed" style={{ fontFamily: 'DM Sans,sans-serif' }}>{desc}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  return (
    <main className="min-h-screen bg-[#070707] relative overflow-x-hidden">


      {/* ── HERO ── */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-5 text-center">

          <div className="opacity-0 animate-fade-up-custom inline-flex items-center gap-2 mb-6" style={{ animationDelay: '0.05s' }}>
            <span className="h-px w-8 bg-white/20" />
            <span className="text-xs tracking-[0.2em] text-white/[0.40] uppercase" style={{ fontFamily: 'DM Sans,sans-serif' }}>
              About Aether AI
            </span>
            <span className="h-px w-8 bg-white/20" />
          </div>

          <h1
            className="opacity-0 animate-fade-up-custom text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-[-0.03em] bg-clip-text text-transparent bg-[linear-gradient(135deg,#ffffff_0%,rgba(255,255,255,0.82)_45%,#e2fdf4_75%,#ffffff_100%)]"
            style={{ fontFamily: 'Syne,sans-serif', animationDelay: '0.12s' }}
          >
            AI Agents that<br />
            <span className="font-medium bg-clip-text text-transparent bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.18)_55%,rgba(255,255,255,0.28)_100%)]">
              actually get work done.
            </span>
          </h1>

          <p
            className="opacity-0 animate-fade-up-custom text-base md:text-lg text-white/[0.40] max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed font-body"
            style={{ fontFamily: 'DM Sans,sans-serif', animationDelay: '0.22s' }}
          >
            We design and deploy intelligent autonomous agents that transform customer support, research, workflow automation, and enterprise operations.
          </p>

          {/* stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden mx-auto w-full sm:w-auto"
          >
            {stats.map(s => (
              <div key={s.label} className="flex flex-col items-center py-5 px-6 sm:px-8 text-center bg-[#0c0c0c]">
                <div
                  className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-[linear-gradient(135deg,#34d399_0%,#fff_60%,#34d399_100%)]"
                  style={{ fontFamily: 'Syne,sans-serif' }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] text-white/[0.25] uppercase tracking-widest font-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="mt-16 sm:mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-4xl mx-auto px-5">

          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 bg-emerald-400/[0.08] border border-emerald-400/[0.2]">
              <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest">Our Journey</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]"
              style={{ fontFamily: 'Syne,sans-serif' }}
            >
              Built to solve real problems.
            </h2>
          </div>

          {/* Desktop alternating — hidden on mobile */}
          <div className="relative hidden sm:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(52,211,153,0.2)_10%,rgba(52,211,153,0.2)_90%,transparent)]" />
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </div>

          {/* Mobile stacked — hidden on desktop */}
          <div className="relative sm:hidden pl-3">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[linear-gradient(180deg,transparent,rgba(52,211,153,0.2)_10%,rgba(52,211,153,0.2)_90%,transparent)]" />
            {timeline.map((item, i) => (
              <MobileTimelineItem key={item.year} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5">

          <div className="flex items-center gap-3 mb-10 sm:mb-12">
            <span className="h-px w-8 bg-white/15" />
            <span className="text-[11px] tracking-[0.22em] text-white/[0.25] uppercase font-mono">How We Work</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="group relative p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 bg-[#090909] hover:bg-[rgba(52,211,153,0.04)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.6),transparent)]" />
                <div className="text-[10px] font-mono text-white/15">{p.number}</div>
                <div>
                  <div className="text-base font-semibold text-white mb-2" style={{ fontFamily: 'Syne,sans-serif' }}>{p.title}</div>
                  <div className="text-xs text-white/[0.30] leading-relaxed" style={{ fontFamily: 'DM Sans,sans-serif' }}>{p.desc}</div>
                </div>
                <div
                  className="absolute bottom-4 right-4 text-white/[0.04] font-bold font-mono text-6xl leading-none select-none"
                  style={{ fontFamily: 'Syne,sans-serif' }}
                >
                  {p.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGIONS ── */}
      <section className="py-20 sm:py-24 border-t border-white/[0.04] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 mb-10 sm:mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-white/15" />
                <span className="text-[11px] tracking-[0.22em] text-white/[0.25] uppercase font-mono">Where We Operate</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]"
                style={{ fontFamily: 'Syne,sans-serif' }}
              >
                Global reach.<br />Local expertise.
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-[15px] text-white/[0.35] leading-relaxed max-w-sm" style={{ fontFamily: 'DM Sans,sans-serif' }}>
                Whether you're a fast-growing startup or a large enterprise, our agents are built to perform anywhere in the world.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-5">
          {regionCards.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden p-6 border border-white/[0.07] min-h-[220px] bg-[linear-gradient(145deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)]"
            >
              <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.07]" viewBox="0 0 128 128" fill="none">
                <circle cx="100" cy="100" r="70" stroke="rgba(52,211,153,1)" strokeWidth="0.8" strokeDasharray="4 6" />
                <circle cx="100" cy="100" r="45" stroke="rgba(52,211,153,1)" strokeWidth="0.6" strokeDasharray="2 8" />
              </svg>

              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.6),transparent)]" />

              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-1 rounded-full text-emerald-400/70 bg-emerald-400/[0.08] border border-emerald-400/[0.15]">
                  {r.tag}
                </span>
                <span className="text-[9px] font-mono text-white/[0.20]">{r.coords}</span>
              </div>

              <div className="relative z-10">
                <p className="text-[10px] text-white/[0.25] mb-1" style={{ fontFamily: 'DM Sans,sans-serif' }}>{r.sub}</p>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-[-0.02em]" style={{ fontFamily: 'Syne,sans-serif' }}>{r.name}</h3>
                <p className="text-xs text-white/[0.35] leading-relaxed" style={{ fontFamily: 'DM Sans,sans-serif' }}>{r.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-emerald-400/[0.18] bg-[linear-gradient(145deg,rgba(52,211,153,0.06)_0%,rgba(52,211,153,0.02)_100%)] shadow-[0_0_80px_rgba(52,211,153,0.06)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.7),transparent)]" />

            <div className="relative z-10">
              <div className="text-[10px] font-mono text-emerald-400/50 uppercase tracking-widest mb-3">Next Step</div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-[-0.03em]"
                style={{ fontFamily: 'Syne,sans-serif' }}
              >
                Ready to deploy<br />intelligent agents?
              </h2>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={() => setQuoteOpen(true)} 
                className="relative inline-flex items-center justify-center p-[3px] rounded-full no-underline border border-emerald-400/[0.25] bg-[linear-gradient(135deg,rgba(52,211,153,0.35)_0%,rgba(16,185,129,0.15)_50%,rgba(52,211,153,0.08)_100%)]"
              >
                <span
                  className="flex items-center justify-center px-7 py-[11px] rounded-full text-[14px] font-semibold text-white/[0.95] whitespace-nowrap tracking-[0.02em] bg-[linear-gradient(135deg,rgba(52,211,153,0.22)_0%,rgba(16,185,129,0.08)_100%)] shadow-[inset_0_1px_0_rgba(52,211,153,0.3),inset_0_-1px_0_rgba(0,0,0,0.3)]"
                  style={{ fontFamily: 'DM Sans,sans-serif' }}
                >
                  Get in Touch →
                </span>
              </button>

              <Link
                href="/solutions"
                className="relative inline-flex items-center justify-center p-[2px] rounded-full no-underline border border-white/[0.10] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_100%)]"
              >
                <span
                  className="flex items-center gap-2 px-6 py-[10px] rounded-full text-[14px] font-semibold text-white/[0.70] whitespace-nowrap tracking-[0.01em] bg-[linear-gradient(180deg,#2c2c2c_0%,#1c1c1c_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.13),inset_0_-1px_0_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: 'DM Sans,sans-serif' }}
                >
                  View Solutions
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <RequestQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

    </main>
  )
}