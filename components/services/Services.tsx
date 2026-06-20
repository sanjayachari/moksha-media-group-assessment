'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap, Wind, Network, Box, Bell, Package, LayoutDashboard, Users, BarChart3, Bot, Globe, Check } from 'lucide-react'
const UNS = 'https://images.unsplash.com/'

const SOLUTIONS = [
  {
    id: 'support-agents',
    num: '01',
    title: 'Support Agents',
    icon: Users,
    sub: 'Customer Support Agents that never sleep.',
    body: '24/7 autonomous agents that handle inquiries, resolve tickets, and deliver exceptional customer experiences with human-like intelligence.',
    items: [
      'Multi-Channel Support',
      'Ticket Automation',
      'Knowledge Base Agents',
      'Sentiment Analysis',
      'Escalation Management',
      'Performance Analytics'
    ],
    products: [
      { slug: 'multi-channel', name: 'Multi-Channel Support', range: 'Email • Chat • Voice', spec: 'Contextual & empathetic', badge: 'High Demand', },
      { slug: 'ticket-automation', name: 'Ticket Automation', range: 'Tier 1 & 2', spec: 'Smart escalation', badge: 'Popular', },
      { slug: 'knowledge-base', name: 'Knowledge Agents', range: 'Self-service', spec: 'Real-time answers', badge: 'Efficient', },
      { slug: 'sentiment-analysis', name: 'Sentiment Analysis', range: 'Real-time', spec: 'Emotion detection', badge: 'Smart', },
    ],
    specs: [
      { l: 'Availability', v: '24/7' },
      { l: 'Response Time', v: '< 2s' },
      { l: 'Customer Satisfaction', v: '94%' }
    ],
  },
  {
    id: 'research-agents',
    num: '02',
    title: 'Research Agents',
    icon: BarChart3,
    sub: 'Intelligent Research & Analysis Agents.',
    body: 'Agents that gather, summarize, and synthesize complex information from multiple sources in real-time.',
    items: [
      'Market Research',
      'Data Analysis',
      'Competitive Intelligence',
      'Trend Forecasting',
      'Report Generation',
      'Sentiment Tracking'
    ],
    products: [
      { slug: 'market-research', name: 'Market Research', range: 'Competitor + Trend', spec: 'Automated reports', badge: 'Enterprise', },
      { slug: 'data-analysis', name: 'Data Analysis', range: 'Business Intelligence', spec: 'Insight generation', badge: 'Smart', },
      { slug: 'competitive-intel', name: 'Competitive Intelligence', range: 'Daily briefings', spec: 'Automated tracking', badge: 'Premium', },
    ],
    specs: [
      { l: 'Sources Processed', v: 'Real-time' },
      { l: 'Report Generation', v: 'Automated' },
      { l: 'Accuracy Rate', v: '95%+' }
    ],
  },
  {
    id: 'workflow-agents',
    num: '03',
    title: 'Workflow Agents',
    icon: Zap,
    sub: 'End-to-End Workflow Automation.',
    body: 'Autonomous agents that orchestrate complex business processes across tools and teams.',
    items: [
      'Employee Onboarding',
      'Approval Workflows',
      'Lead Management',
      'Invoice Processing',
      'HR Automation',
      'Compliance Checks'
    ],
    products: [
      { slug: 'onboarding', name: 'Employee Onboarding', range: 'HR Systems', spec: 'Multi-step workflows', badge: 'Fast', },
      { slug: 'approval', name: 'Approval Workflows', range: 'Finance & Ops', spec: 'Decision engines', badge: 'Popular', },
      { slug: 'lead-management', name: 'Lead Management', range: 'Sales Pipeline', spec: 'End-to-end automation', badge: 'High ROI' },
    ],
    specs: [
      { l: 'Automation Coverage', v: 'End-to-End' },
      { l: 'Integrations', v: '50+' },
      { l: 'Time Saved Weekly', v: '25+ hours' }
    ],
  },
  {
    id: 'enterprise-agents',
    num: '04',
    title: 'Enterprise Agents',
    icon: ShieldCheck,
    sub: 'Secure & Scalable Enterprise Agents.',
    body: 'Custom-built agents for complex internal systems with full compliance and security requirements.',
    items: [
      'Custom Enterprise Agents',
      'Enterprise Integrations',
      'Compliance Agents',
      'Security Monitoring',
      'Audit & Reporting',
      'Resource Optimization'
    ],
    products: [
      { slug: 'custom-agents', name: 'Custom Enterprise Agents', range: 'Tailor-made', spec: 'On-prem / VPC', badge: 'Premium', },
      { slug: 'integration', name: 'Enterprise Integrations', range: 'CRM • ERP • Internal', spec: 'Secure connectors', badge: 'Compliant', },
      { slug: 'compliance', name: 'Compliance Agents', range: 'Regulatory', spec: 'Audit ready', badge: 'Secure', },
    ],
    specs: [
      { l: 'Deployment Options', v: 'Cloud' },
      { l: 'Compliance', v: 'SOC2, GDPR' },
      { l: 'SLA Guarantee', v: '99.9%' }
    ],
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started with AI automation',
    price: '₹499',
    period: '/month',
    featured: false,
    features: ['Up to 5 AI Agents', 'Basic Integrations', 'Community Support', '24/7 Monitoring', 'Standard Analytics'],
    cta: 'Get Started',
    href: '/register',
  },
  {
    name: 'Professional',
    description: 'Best for growing companies with complex workflows',
    price: '₹999',
    period: '/month',
    featured: true,
    badge: 'MOST POPULAR',
    features: ['Up to 25 AI Agents', 'Advanced Integrations', 'Priority Support', 'Custom Training', 'Advanced Analytics', 'Dedicated Success Manager'],
    cta: 'Start Free Trial',
    href: '/register',
  },
  {
    name: 'Enterprise',
    description: 'For large organizations needing full-scale deployment',
    price: 'Custom',
    period: '',
    featured: false,
    features: ['Unlimited AI Agents', 'Custom Development', 'On-Premise Option', 'SSO & Compliance', 'SLA Guarantee', 'White-Glove Onboarding'],
    cta: 'Contact Sales',
    href: null,
  },
]

function AppWindow() {
  const [activeCat, setActiveCat] = useState(0)

  const statsData = [
    { label: 'Agents Deployed', value: '500+', sub: 'Across clients' },
    { label: 'Avg ROI', value: '4.8x', sub: 'Within 90 days' },
    { label: 'Uptime', value: '99.9%', sub: 'SLA Guaranteed' },
    { label: 'Response Time', value: '< 2s', sub: 'Average' },
  ]

  return (
    <div className="float-y w-full rounded-[20px] overflow-hidden border border-white/[0.09] bg-[#0e0e0e] shadow-[0_40px_120px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between px-5 h-[52px] bg-white/[0.025] border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-[7px] bg-white/[0.06] border border-white/[0.12] flex items-center justify-center">
            <Bot size={12} className="text-white/60" />
          </div>
          <span className="text-[13px] font-bold text-white/[0.88] tracking-[-0.01em]" style={{ fontFamily: 'Syne, sans-serif' }}>Aether AI</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.07]">
            <Bell size={12} className="text-white/30" />
          </div>
          <div className="flex items-center gap-2 px-2.5 py-[5px] bg-white/[0.04] border border-white/[0.07] rounded-lg">
            <div className="w-[22px] h-[22px] rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white/70" style={{ fontFamily: 'Syne, sans-serif' }}>RD</div>
            <div>
              <div className="text-[11px] font-semibold text-white/[0.75] leading-[1.2]" style={{ fontFamily: 'DM Sans, sans-serif' }}>Aether AI</div>
              <div className="text-[9px] text-white/30" style={{ fontFamily: 'DM Sans, sans-serif' }}>Services Portal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[420px]">
        <div className="w-[186px] shrink-0 border-r border-white/[0.05] p-4 flex flex-col gap-0.5">
          <span className="sw-item"><LayoutDashboard size={13} />Dashboard</span>
          <Link href="/products" className="sw-item active"><Package size={13} />All Services</Link>
          {SOLUTIONS.map(c => {
            const Icon = c.icon
            return (
              <Link key={c.id} href={`/services?category=${c.id}`} className="sw-item">
                <Icon size={13} />{c.title}
              </Link>
            )
          })}
          <div className="mt-auto p-3.5 rounded-[10px] bg-white/[0.04] border border-white/[0.08]">
            <div
              className="text-[12px] font-semibold text-white leading-[1.3] mb-1.5"
              style={{ fontFamily: 'Syne, sans-serif' }}
              onClick={() => alert('Stay tuned! Demo request feature coming soon.')}

            >
              Request a Demo ✦
            </div>

            <div
              className="text-[10px] text-white/[0.35] leading-[1.5] mb-2.5"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              See our agents in action within 24h.
            </div>

            <button
              type="button"
              className="text-[10px] font-bold text-white bg-white/10 border border-white/[0.16] rounded-[6px] px-2.5 py-[5px] inline-block"
              onClick={() => alert('Stay tuned! Demo request feature coming soon.')}
            >
              Book Demo
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-4 gap-2.5 p-4 pb-0">
            {statsData.map((s, i) => (
              <div key={i} className="p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.06]">
                <div className="text-[9px] text-white/[0.25] uppercase tracking-[0.1em] mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{s.label}</div>
                <div className="text-[18px] font-bold text-white leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
                <div className="text-[9px] text-white/[0.28] mt-1 font-mono">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 p-4 flex flex-col overflow-hidden">
            <div className="flex gap-1.5 mb-3">
              {SOLUTIONS.map((c, i) => (
                <button key={c.id} onClick={() => setActiveCat(i)}
                  className={`text-[10px] px-3 py-1 rounded-md border transition-all cursor-pointer outline-none ${activeCat === i
                    ? 'border-white/[0.22] bg-white/[0.08] text-white/[0.85]'
                    : 'border-white/[0.07] bg-white/[0.02] text-white/30'
                    }`}
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {c.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeCat}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
                className="grid grid-cols-3 gap-2">
                {SOLUTIONS[activeCat].products.slice(0, 5).map((p, i) => (
                  <Link key={i} href={`/services/${p.slug}`}
                    className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] no-underline block transition-all hover:border-white/[0.14] hover:bg-white/[0.04]">
                    <div className="text-[11px] font-semibold text-white/[0.75] mb-0.5 leading-[1.3]" style={{ fontFamily: 'Syne, sans-serif' }}>{p.name}</div>
                    <div className="text-[9px] font-mono text-white/30">{p.range}</div>
                    <div className="flex items-center justify-between mt-[7px]">
                      <span className="text-[8px] text-white/20" style={{ fontFamily: 'DM Sans, sans-serif' }}>{p.spec}</span>
                      <span className="text-[8px] px-[5px] py-px rounded-[3px] text-white/40 bg-white/[0.05] border border-white/[0.09] font-mono">{p.badge}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Services() {

  return (
    <main className="min-h-screen bg-[#070707] overflow-x-hidden">


      <div className="fixed top-[-8%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />


      <section className="relative z-[1] pt-36 pb-0">
        <div className="max-w-[1100px] mx-auto px-5 text-center">

          <div className="opacity-0 animate-fade-up-custom flex items-center justify-center gap-3 mb-[22px]" style={{ animationDelay: '0.05s' }}>
            <span className="h-px w-6 bg-white/20" />
            <span className="text-[10px] font-mono text-emerald-400 tracking-[0.2em] uppercase">Our Services</span>
            <span className="h-px w-6 bg-white/20" />
          </div>

          <h1 className="opacity-0 animate-fade-up-custom text-4xl md:text-6xl lg:text-[4.5rem] font-bold mb-5 leading-[1.04] font-display tracking-[-0.04em]" style={{ animationDelay: '0.12s' }}>
            <span className="block bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.82) 50%, #fff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              AI Agents that
            </span>
            <span className="block font-medium tracking-[-0.03em] bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              actually get work done.
            </span>
          </h1>

          <p className="opacity-0 animate-fade-up-custom text-[15px] text-white/[0.32] max-w-[520px] mx-auto leading-[1.8] mb-10 font-body" style={{ animationDelay: '0.2s' }}>
            Custom autonomous agents for customer support, research, workflow automation, and enterprise operations.
          </p>

          <div className="opacity-0 animate-fade-up-custom flex items-center justify-center gap-2 flex-wrap mb-12" style={{ animationDelay: '0.26s' }}>
            {SOLUTIONS.map(c => {
              const Icon = c.icon
              return (
                <Link key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/40 no-underline border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 rounded-full transition-all hover:text-white/80 hover:border-white/20 hover:bg-white/[0.06]"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  <Icon size={11} />{c.title}
                </Link>
              )
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="relative hidden sm:block">
            <div className="absolute bottom-[-1px] left-0 right-0 h-[90px] z-[2] pointer-events-none bg-gradient-to-t from-[#070707] to-transparent" />
            <AppWindow />
          </motion.div>
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {SOLUTIONS.map((sol, i) => (
        <SolutionSection key={sol.id} sol={sol} idx={i} />
      ))}

      {/* PRICING */}
      <section id="pricing" className="relative z-[1] py-24 border-t border-white/[0.05] bg-white/[0.015]">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="text-center mb-3">
            <span className="text-[10px] font-mono text-emerald-400 tracking-[0.2em] uppercase">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white/90 text-center mb-4 tracking-[-0.02em]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Simple, transparent pricing.
          </h2>
          <p className="text-[14px] text-white/35 text-center max-w-[480px] mx-auto leading-[1.8] mb-3">
            Scale confidently with flexible plans designed for every stage of growth.
          </p>
          <p className="text-[11px] font-mono text-white/25 text-center mb-12 uppercase tracking-[0.1em]">All prices in INR • Cancel anytime</p>

          <div className="grid sm:grid-cols-3 gap-5 items-start">
            {pricingPlans.map(plan => (
              <div key={plan.name}
                className={`relative rounded-2xl p-7 border ${plan.featured ? 'border-white/25 bg-white/[0.05] sm:-translate-y-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]' : 'border-white/[0.08] bg-white/[0.02]'}`}>
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.1em] uppercase bg-white text-[#070707] px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className="text-[16px] font-bold text-white/90 mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</div>
                <p className="text-[12px] text-white/35 leading-[1.6] mb-5 min-h-[36px]">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[30px] font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.price}</span>
                  {plan.period && <span className="text-[12px] text-white/30">{plan.period}</span>}
                </div>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[12.5px] text-white/55">
                      <Check size={13} className="text-emerald-400 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.href ? (
                  <button
                    onClick={() => alert('coming soon!')}
                    className={`w-full inline-flex items-center justify-center text-[12.5px] font-semibold rounded-full px-5 py-2.5 no-underline transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-2 ${plan.featured ? 'bg-white text-[#070707] hover:bg-white/85' : 'bg-white/[0.06] text-white/80 border border-white/[0.14] hover:bg-white/10'}`}>
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => alert('coming soon!')}
                    className="w-full inline-flex items-center justify-center text-[12.5px] font-semibold rounded-full px-5 py-2.5 transition-all bg-white/[0.06] text-white/80 border border-white/[0.14] hover:bg-white/10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-2">
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}


function SolutionSection({ sol, idx }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const even = idx % 2 === 0

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const fadeItem = (i) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.55s ${0.08 + i * 0.07}s ease, transform 0.55s ${0.08 + i * 0.07}s cubic-bezier(0.21,0.47,0.32,0.98)`,
  })

  return (
    <section
      id={sol.id}
      ref={ref}
      style={{
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: '#070707',
      }}
    >
      {/* subtle ambient per section */}
      <div style={{
        position: 'absolute',
        top: even ? '-20%' : 'auto', bottom: even ? 'auto' : '-20%',
        [even ? 'right' : 'left']: '-10%',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(52,211,153,0.04) 0%,transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* grid — same as site */}
      <div className="absolute inset-0 opacity-[0.018]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)`,
        backgroundSize: '60px 60px', zIndex: 1,
      }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32" style={{ zIndex: 10 }}>
        <div className={`flex flex-col ${even ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-24 items-start`}>

          {/* ── LEFT (or RIGHT when odd) : TEXT ── */}
          <div className="flex-1 min-w-0">

            {/* index + category label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, ...fadeItem(0) }}>
              <span style={{ fontFamily: 'DM Mono,monospace', fontSize: 11, color: 'rgba(52,211,153,0.6)', letterSpacing: '0.12em' }}>{sol.num}</span>
              <span style={{ height: 1, width: 32, background: 'rgba(52,211,153,0.25)', display: 'block' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'DM Mono,monospace' }}>
                {sol.title.split(' ')[0]} Solutions
              </span>
            </div>

            {/* title */}
            <h2 style={{
              fontFamily: 'Syne,sans-serif',
              fontSize: 'clamp(32px,3.8vw,52px)',
              fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05,
              marginBottom: 14,
              background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              ...fadeItem(1)
            }}>
              {sol.title}
            </h2>

            {/* subtitle */}
            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.38)', fontStyle: 'italic', fontWeight: 300,
              fontFamily: 'DM Sans,sans-serif', marginBottom: 18,
              ...fadeItem(2)
            }}>
              {sol.sub}
            </p>

            {/* body */}
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8,
              maxWidth: 440, marginBottom: 36, fontFamily: 'DM Sans,sans-serif',
              ...fadeItem(3)
            }}>
              {sol.body}
            </p>

            {/* specs row — same card style as Solutions.jsx */}
            <div
              className="grid grid-cols-1 md:grid-cols-4 mb-9 border border-white/[0.06] rounded-[14px] overflow-hidden"
              style={fadeItem(4)}
            >
              {sol.specs.map((sp, i) => (
                <div
                  key={sp.l}
                  className="
        p-4 md:px-[18px]
        border-b border-white/[0.06]
        md:border-b-0
        md:border-r
        md:border-white/[0.06]
        last:border-r-0
      "
                >
                  <div
                    className="font-mono text-[20px] font-medium tracking-[-0.02em] mb-1"
                    style={{
                      background:
                        'linear-gradient(135deg,rgba(52,211,153,1) 0%,#fff 55%,rgba(52,211,153,0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {sp.v}
                  </div>

                  <div className="text-[10px] text-white/25 tracking-[0.1em] uppercase font-mono">
                    {sp.l}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — same style as hero buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', ...fadeItem(5) }}>
              <button style={{
                position: 'relative', display: 'inline-flex', alignItems: 'center', padding: '3px',
                borderRadius: 9999, cursor: 'pointer', outline: 'none', border: 'none',
                background: 'linear-gradient(135deg,rgba(52,211,153,0.35) 0%,rgba(16,185,129,0.15) 50%,rgba(52,211,153,0.08) 100%)',
                boxShadow: '0 0 0 1px rgba(52,211,153,0.25)',
              }}>
                <span style={{
                  display: 'flex', alignItems: 'center', padding: '10px 26px', borderRadius: 9999,
                  background: 'linear-gradient(135deg,rgba(52,211,153,0.22) 0%,rgba(16,185,129,0.08) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(52,211,153,0.3),inset 0 -1px 0 rgba(0,0,0,0.3)',
                  color: 'rgba(255,255,255,0.95)', fontSize: 13, fontWeight: 600,
                  letterSpacing: '0.02em', fontFamily: 'DM Sans,sans-serif',
                }}
                  onClick={() => alert('Stay tuned! Quote request feature coming soon.')}
                >
                  Request Quote
                </span>
              </button>
              <button style={{
                padding: '10px 22px', borderRadius: 9999, cursor: 'pointer', outline: 'none',
                border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.35)', fontSize: 13, fontFamily: 'DM Sans,sans-serif',
              }}
                onClick={() => alert('Stay tuned! Datasheet coming soon.')}
              >
                View Datasheet
              </button>
            </div>
          </div>

          {/* ── RIGHT (or LEFT when odd) : CAPABILITY CARD ── */}
          <div style={{ width: '100%', maxWidth: 440, flexShrink: 0, ...fadeItem(2) }}>

            {/* card — matches your Solutions.jsx spec card */}
            <div style={{
              position: 'relative', borderRadius: 20, overflow: 'hidden',
              background: 'linear-gradient(145deg,rgba(255,255,255,0.045) 0%,rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(52,211,153,0.12)',
              animation: 'borderPulse 4s ease-in-out infinite',
            }}>
              {/* shimmer sweep */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 20, pointerEvents: 'none' }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg,transparent 35%,rgba(52,211,153,0.06) 50%,transparent 65%)',
                  animation: 'shimmerSlide 5s ease-in-out infinite',
                  animationDelay: `${idx * 0.6}s`,
                }} />
              </div>
              {/* top highlight line */}
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(52,211,153,0.4),transparent)' }} />
              {/* corner glow */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 120, background: 'radial-gradient(ellipse at top right,rgba(52,211,153,0.08) 0%,transparent 65%)', pointerEvents: 'none' }} />

              <div style={{ padding: '24px 24px 8px' }}>
                <p style={{ fontSize: 10, fontFamily: 'DM Mono,monospace', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 20 }}>
                  What We Supply
                </p>

                {sol.items.map((item, i) => (
                  <ItemRow key={item} label={item} i={i} visible={visible} />
                ))}
              </div>

              {/* footer badges */}
              <div style={{
                display: 'flex', borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                {['Authorized Partner', 'Warranty Backed', 'Global Supply'].map((b, i) => (
                  <div key={b} style={{
                    flex: 1, padding: '11px 8px', textAlign: 'center',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontSize: 9, color: 'rgba(255,255,255,0.2)',
                    fontFamily: 'DM Mono,monospace', letterSpacing: '0.04em',
                  }}>{b}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function ItemRow({ label, i, visible }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'default',
        paddingLeft: hov ? 6 : 0,

        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(8px)',
        transition: `opacity 0.4s ${0.15 + i * 0.06}s ease, transform 0.4s ${0.15 + i * 0.06}s ease, padding-left 0.18s ease`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: 'DM Mono,monospace', fontSize: 9,
          color: hov ? 'rgba(52,211,153,0.7)' : 'rgba(255,255,255,0.15)',
          transition: 'color 0.15s',
        }}>{String(i + 1).padStart(2, '0')}</span>
        <span style={{
          fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans,sans-serif',
          color: hov ? '#fff' : 'rgba(255,255,255,0.7)',
          transition: 'color 0.15s',
        }}>{label}</span>
      </div>
      <span style={{
        fontSize: 12,
        color: hov ? 'rgba(52,211,153,0.55)' : 'rgba(255,255,255,0.1)',
        transition: 'color 0.15s',
      }}>→</span>
    </div>
  )
}