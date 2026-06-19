'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  {
    name: 'Agents Deployed',
    sub: 'Global Fleet',
    tag: 'Primary Hub',
    items: 500,
    status: 'Active',
    progress: 60,
    barLabel: '500+ Agents Deployed — Active',
    barLeft: '5%',
    barRight: '5%',
    highlight: '500+',
    children: [
      { name: 'Enterprise Agents', count: 320 },
      { name: 'Core Infrastructure', count: 180 },
    ],
  },
  {
    name: 'Uptime',
    sub: 'System Reliability',
    tag: 'Global Gateway',
    items: 99.9,
    status: 'Deployment',
    progress: 40,
    barLabel: '99.9% Uptime — Live',
    barLeft: '20%',
    barRight: '20%',
    highlight: '99.9%',
    children: [
      { name: 'SLA Compliance', count: 99.95 },
      { name: 'Redundancy Layers', count: 7 },
    ],
  },
  {
    name: 'Tasks Automated',
    sub: 'AI Operations',
    tag: 'Growth Region',
    items: 1000000,
    status: 'Planning',
    progress: 25,
    barLabel: '1M+ Tasks Automated',
    barLeft: '35%',
    barRight: '10%',
    highlight: '1M+',
    children: [
      { name: 'Daily Workflows', count: 650000 },
      { name: 'Autonomous Runs', count: 350000 },
    ],
  },
]

const subLinks = [
  { num: '1.1', label: 'Agents Deployed' },
  { num: '1.2', label: 'Uptime' },
  { num: '1.3', label: 'Tasks Automated' },
  { num: '1.4', label: '24/7 Monitoring' },
]

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']

const statusColor = { Active: 'bg-emerald-400', Deployment: 'bg-emerald-400/60', Planning: 'bg-emerald-400/35' }
const barBg = { Active: 'rgba(52,211,153,0.15)', Deployment: 'rgba(52,211,153,0.08)', Planning: 'rgba(52,211,153,0.05)' }
const barBorder = { Active: 'rgba(52,211,153,0.3)', Deployment: 'rgba(52,211,153,0.2)', Planning: 'rgba(52,211,153,0.12)' }
const fillBg = { Active: 'rgba(52,211,153,0.28)', Deployment: 'rgba(52,211,153,0.15)', Planning: 'rgba(52,211,153,0.1)' }
const textAlpha = { Active: 'text-emerald-400/60', Deployment: 'text-emerald-400/40', Planning: 'text-emerald-400/30' }

const dotTheme = [
  { bg: 'rgba(52,211,153,0.15)', dot: '#34d399' },
  { bg: 'rgba(52,211,153,0.1)', dot: '#34d399cc' },
  { bg: 'rgba(52,211,153,0.06)', dot: '#34d39977' },
]

export default function StatsSection() {
  const [selectedStat, setSelectedStat] = useState(0)
  const [selectedChild, setSelectedChild] = useState(null)

  const activeStat = stats[selectedStat]

  return (
    <section id="regions" className="py-24 relative overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-white/15" />
          <span className="text-[11px] tracking-[0.22em] text-white/25 uppercase font-mono">Stats Section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.05] font-display tracking-[-0.03em]">
              Present where<br />it matters most.
            </h2>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-body">
              Enterprise-grade AI agent platform delivering autonomous automation, intelligent infrastructure, 
              and 24/7 operational intelligence across global deployments.
            </p>
            <div className="mt-6">
              <a href="#" className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors font-body">
                <span className="font-mono text-white/25">1.0</span>
                <span>Performance</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative md:-mr-20">
          <div
            className="absolute inset-y-0 right-0 w-40 pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(7,7,7,0.97))' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="rounded-xl overflow-hidden bg-surface-700 border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-surface-600">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-4 text-[11px] text-white/20 font-mono">Aether AI — Live Performance</span>
              <div className="ml-auto hidden md:flex items-center gap-3">
                {MONTHS.map((m, i) => (
                  <span key={m} className={`text-[10px] font-mono ${i === 2 ? 'text-white/30 border-b border-white/20' : 'text-white/15'}`}>{m}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row" style={{ minHeight: 380 }}>
              {/* Left Sidebar with Dropdown */}
              <div className="shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] w-full md:w-[280px] bg-surface-400">
                <div className="px-4 py-3 border-b border-white/[0.05]">
                  <span className="text-[11px] text-white/40 font-body">Stats Section</span>
                </div>

                {stats.map((stat, i) => (
                  <div key={stat.name}>
                    <button
                      onClick={() => { setSelectedStat(i); setSelectedChild(null) }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04] text-left transition-all duration-200 outline-none cursor-pointer"
                      style={{
                        background: selectedStat === i ? 'rgba(52,211,153,0.06)' : 'transparent',
                        borderLeft: selectedStat === i ? '2px solid rgba(52,211,153,0.5)' : '2px solid transparent',
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-200"
                        style={{ background: selectedStat === i ? 'rgba(52,211,153,0.25)' : dotTheme[i].bg }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ background: dotTheme[i].dot }} />
                      </div>
                      <span
                        className="text-xs flex-1 transition-colors duration-200 font-body"
                        style={{ color: selectedStat === i ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}
                      >
                        {stat.name}
                      </span>
                      <span className="text-[11px] text-white/25 font-mono">
                        {stat.items}{stat.name === 'Uptime' ? '%' : '+'}
                      </span>
                    </button>

                    {/* Children Dropdown */}
                    {selectedStat === i && stat.children.map((child, j) => (
                      <motion.button
                        key={child.name}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        onClick={() => setSelectedChild(selectedChild === j ? null : j)}
                        className="w-full flex items-center gap-3 px-4 py-2 border-b border-white/[0.03] pl-10 text-left transition-all duration-200 outline-none cursor-pointer"
                        style={{ background: selectedChild === j ? 'rgba(52,211,153,0.04)' : 'transparent' }}
                      >
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                          style={{ background: selectedChild === j ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.04)' }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-sm"
                            style={{ background: selectedChild === j ? 'rgba(52,211,153,0.8)' : 'rgba(255,255,255,0.2)' }}
                          />
                        </div>
                        <span
                          className="text-[11px] flex-1 font-body"
                          style={{ color: selectedChild === j ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)' }}
                        >
                          {child.name}
                        </span>
                        <span className="text-[10px] text-white/20 font-mono">
                          {child.count}{child.name.includes('Uptime') ? '%' : ''}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Main Chart Area */}
              <div className="flex-1 overflow-hidden relative bg-surface-200">
                <div className="flex items-center border-b border-white/[0.05] px-6 py-2 bg-surface-400">
                  {MONTHS.map(m => (
                    <div key={m} className="flex-1 text-center">
                      <span className="text-[10px] font-mono text-white/20">{m}</span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 flex flex-col gap-6 relative">
                  <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: '35%', background: 'rgba(52,211,153,0.25)' }} />
                  <div className="absolute top-3 text-[8px] font-mono text-emerald-400/40" style={{ left: 'calc(35% + 4px)' }}>NOW</div>

                  {stats.map((stat, i) => {
                    const isSelected = selectedStat === i
                    return (
                      <motion.div key={stat.name} animate={{ opacity: isSelected ? 1 : 0.4 }} transition={{ duration: 0.2 }}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${statusColor[stat.status]}`} />
                          <span className="text-[11px] text-white/50 font-body">{stat.name}</span>
                          <span className="text-[9px] font-mono text-white/20 ml-auto">{stat.tag}</span>
                        </div>
                        <div className="relative h-6">
                          <div className="absolute inset-y-0 flex items-center" style={{ left: stat.barLeft, right: stat.barRight }}>
                            <div
                              className="h-5 rounded-md w-full relative overflow-hidden transition-shadow duration-300"
                              style={{
                                background: barBg[stat.status],
                                border: `1px solid ${barBorder[stat.status]}`,
                                boxShadow: isSelected ? `0 0 8px ${barBorder[stat.status]}` : 'none',
                              }}
                            >
                              <motion.div
                                className="absolute inset-y-0 left-0 rounded-l-md"
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.progress}%` }}
                                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                                style={{ background: fillBg[stat.status] }}
                              />
                              <div
                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300"
                                style={{
                                  left: `${stat.progress}%`,
                                  background: isSelected ? '#34d399' : 'rgba(52,211,153,0.4)',
                                  boxShadow: isSelected ? '0 0 6px rgba(52,211,153,0.8)' : 'none',
                                }}
                              />
                              <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-mono ${textAlpha[stat.status]}`}>
                                {stat.barLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Child Sub-bar */}
                        {isSelected && selectedChild !== null && stat.children[selectedChild] && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 ml-4">
                            <div
                              className="h-4 rounded-sm overflow-hidden"
                              style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)', marginLeft: stat.barLeft, marginRight: stat.barRight }}
                            >
                              <div className="h-full rounded-sm" style={{ width: `${stat.progress * 0.7}%`, background: 'rgba(52,211,153,0.2)' }} />
                            </div>
                            <div className="text-[9px] font-mono text-emerald-400/30 mt-1 ml-1">
                              {stat.children[selectedChild].name} — {stat.children[selectedChild].count}
                              {stat.name === 'Uptime' ? '%' : ''}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                <motion.div
                  key={selectedStat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-4 right-4 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}
                >
                  <div className="text-[9px] font-mono text-emerald-400/50 mb-0.5 uppercase tracking-wider">{activeStat.tag}</div>
                  <div className="text-[22px] font-bold text-white tracking-tighter font-display">
                    {activeStat.highlight}
                  </div>
                  <div className="text-[11px] text-white/60 font-body">{activeStat.sub}</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-3">
          {subLinks.map((link, i) => (
            <button
              key={link.num}
              onClick={() => i < 3 && setSelectedStat(i)}
              className="flex items-center gap-3 text-white/30 hover:text-white/60 transition-colors duration-200 group text-left bg-transparent border-none cursor-pointer outline-none font-body"
            >
              <span className="font-mono text-[11px] text-white/20 group-hover:text-white/40 transition-colors">{link.num}</span>
              <span className="text-sm">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}