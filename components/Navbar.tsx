'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Bot } from 'lucide-react'
import Link from 'next/link'
import RequestQuoteModal from './modal/RequestQuoteModal'
import { RiGeminiFill } from 'react-icons/ri'

const navItems = [
  { label: 'Home', href: '/' },

  {
    label: 'Services',
    children: [
      {
        label: 'Support Agents',
        child_href: '/services#support-agents',
        desc: 'Autonomous customer support agents that handle queries, tickets, and resolutions 24/7'
      },
      {
        label: 'Research Agents',
        child_href: '/services#research-agents',
        desc: 'AI agents that gather, analyze, and summarize data for faster decision-making'
      },
      {
        label: 'Workflow Agents',
        child_href: '/services#workflow-agents',
        desc: 'Automation agents that orchestrate business processes across tools and teams'
      },
      {
        label: 'Enterprise Agents',
        child_href: '/services#enterprise-agents',
        desc: 'Secure, scalable AI agents designed for enterprise-grade systems and compliance'
      },
    ]
  },

  { label: 'About', href: '/about-us' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
]

const EASE = [0.32, 0.72, 0, 1]
const WIDTH_SPRING = { type: 'spring', stiffness: 220, damping: 30, mass: 0.9 }

function QuoteButton({ mobile = false, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href="/ask-ai"
      className="inline-flex items-center justify-center rounded-full cursor-pointer whitespace-nowrap font-semibold tracking-[0.01em] transition-all duration-[180ms]"
      style={{
        padding: mobile ? '10px 20px' : '7px 18px',
        fontSize: mobile ? 14 : 13,
        background: hovered
          ? 'linear-gradient(180deg,#333 0%,#222 100%)'
          : 'linear-gradient(180deg,#2c2c2c 0%,#1c1c1c 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: hovered
          ? '0 4px 20px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.13),inset 0 -1px 0 rgba(0,0,0,0.5)'
          : '0 2px 12px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.5)',
        color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
        fontFamily: 'inherit',
      }}
    >
      Ask AI
    </Link>
  )
}

function MobileItem({ item, onClose }) {
  const [open, setOpen] = useState(false)

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors no-underline border-b border-white/[0.05] last:border-0"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-white/[0.05] last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-2.5 text-sm font-medium text-white/80 bg-transparent border-none cursor-pointer text-left"
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="flex items-center shrink-0"
        >
          <ChevronDown size={13} className="text-white/35" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-2 flex flex-col gap-0.5">
              {item.children.map(child => (
                <Link
                  key={child.label}
                  href={child.child_href}
                  onClick={onClose}
                  className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl no-underline hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-[13px] font-medium text-white/75">{child.label}</span>
                  <span className="text-[11px] text-white/30">{child.desc}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pillWidth, setPillWidth] = useState(0)
  const [expandedWidth, setExpandedWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const pillMeasureRef = useRef(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    if (pillMeasureRef.current) setPillWidth(pillMeasureRef.current.scrollWidth)
  }, [])

  useEffect(() => {
    const calc = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setExpandedWidth(mobile
        ? window.innerWidth - 24
        : Math.min(window.innerWidth * 0.88, 1280)
      )
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const activeData = navItems.find(n => n.label === activeItem)
  const isExpanded = !!(activeItem && activeData?.children)
  const ready = pillWidth > 0 && expandedWidth > 0

  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActiveItem(null), 120) }
  const cancelClose = () => clearTimeout(closeTimer.current)
  const handleEnter = (item) => { cancelClose(); setActiveItem(item.children ? item.label : null) }

  const openQuote = () => {
    setMobileOpen(false)
    setQuoteOpen(true)
  }

  const animatedWidth = isMobile ? (mobileOpen ? expandedWidth : (scrolled ? expandedWidth : pillWidth)) : (scrolled ? expandedWidth : pillWidth)
  const animatedRadius = isMobile ? (mobileOpen || scrolled ? '0px 0px 16px 16px' : '22px') : (scrolled ? '0px 0px 16px 16px' : '22px')
  const animatedTop = isMobile ? (mobileOpen || scrolled ? 0 : 16) : (scrolled ? 0 : 16)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-0 pointer-events-none">
        <motion.div
          ref={pillMeasureRef}
          initial={false}
          onMouseLeave={() => !isMobile && scheduleClose()}
          onMouseEnter={() => !isMobile && cancelClose()}
          animate={ready ? {
            width: animatedWidth,
            borderRadius: animatedRadius,
            top: animatedTop,
            background: (scrolled || mobileOpen) ? 'rgba(10,10,10,0.97)' : 'rgba(16,16,16,0.94)',
            boxShadow: (scrolled || mobileOpen)
              ? '0 8px 40px rgba(0,0,0,0.7),0 2px 0 rgba(255,255,255,0.04) inset,0 0 0 1px rgba(255,255,255,0.08)'
              : '0 4px 24px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.08)',
          } : {}}
          transition={WIDTH_SPRING}
          className="absolute pointer-events-auto"
          style={{
            top: 16,
            left: '50%',
            x: '-50%',
            overflow: isExpanded || mobileOpen ? 'hidden' : 'visible',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            ...(!ready && {
              width: 'max-content',
              borderRadius: 22,
              background: 'rgba(16,16,16,0.94)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.08)',
            }),
          }}
        >
          {/* Top bar */}
          <div className="flex items-center px-3 py-2.5">

            <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
              <div className="relative shrink-0 w-[18px] h-[18px]">
                <div className="absolute inset-0 rotate-45 border-[1.5px] border-emerald-400/70" />
                <div className="absolute rotate-45 inset-[3px] bg-emerald-400/25" />
              </div>
              <span className="text-white font-semibold whitespace-nowrap text-[13px] tracking-[-0.02em]">
                Aether AI
              </span>
            </Link>

            <div
              className="shrink-0 w-px h-4 mx-2.5 bg-white/10 transition-opacity duration-300 hidden md:block"
              style={{ opacity: scrolled ? 0 : 1 }}
            />

            {/* Desktop nav items */}
            <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
              {navItems.map(item =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => handleEnter(item)}
                    className="px-3.5 py-2 text-sm whitespace-nowrap rounded-[10px] text-white/55 no-underline transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                  >


                    <span className={item.label === 'Register' ? "text-emerald-400 font-medium" : ""}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onMouseEnter={() => handleEnter(item)}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm whitespace-nowrap rounded-[10px] border-none cursor-pointer font-[inherit] transition-all duration-150"
                    style={{
                      color: activeItem === item.label ? '#fff' : 'rgba(255,255,255,0.55)',
                      background: activeItem === item.label ? 'rgba(255,255,255,0.08)' : 'transparent',
                    }}
                  >


                    <span className={item.label === 'Register' ? "text-emerald-400 font-medium" : ""}>
                      {item.label}
                    </span>

                    <motion.span
                      animate={{ rotate: activeItem === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="flex items-center"
                    >
                      <ChevronDown size={12} className="opacity-45" />
                    </motion.span>
                  </button>
                )
              )}
            </div>

            {/* Desktop: quote button */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <div
                className="shrink-0 w-px h-4 mx-0.5 bg-white/10 transition-opacity duration-300"
                style={{ opacity: scrolled ? 0 : 1 }}
              />
              <QuoteButton onOpen={openQuote} />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center ml-auto bg-transparent border-none cursor-pointer rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x"
                    initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}>
                    <X size={16} color="white" />
                  </motion.span>
                ) : (
                  <motion.span key="menu"
                    initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}>
                    <Menu size={16} color="white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Desktop dropdown */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key={activeItem}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.26, ease: EASE }}
                className="overflow-hidden hidden md:block"
              >
                <div className="h-px mx-5 bg-white/[0.07]" />
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 6, opacity: 0 }}
                  transition={{ duration: 0.22, delay: 0.04, ease: EASE }}
                  className="px-6 pt-[18px] pb-[22px]"
                >
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-emerald-400/[0.85] mb-3 pl-1">
                    {activeItem}
                  </p>
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: scrolled ? 'repeat(4,1fr)' : '1fr 1fr' }}
                  >
                    {activeData.children.map((child, i) => (
                      <Link key={child.label} href={child.child_href} passHref legacyBehavior>
                        <motion.a
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + i * 0.03, duration: 0.18 }}
                          className="flex flex-col gap-1 px-3.5 py-2.5 rounded-xl no-underline bg-transparent transition-colors duration-150 hover:bg-white/[0.05]"
                        >
                          <span className="text-[13px] font-medium text-white/[0.88]">{child.label}</span>
                          <span className="text-[11px] text-white/[0.35]">{child.desc}</span>
                        </motion.a>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="overflow-hidden md:hidden"
              >
                <div className="h-px mx-4 bg-white/[0.07]" />
                <div className="px-4 pt-3 pb-1">
                  {navItems.map(item => (
                    <MobileItem
                      key={item.label}
                      item={item}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
                <div className="px-4 pt-3 pb-5">
                  <QuoteButton mobile onOpen={openQuote} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal outside the pill — clean z-index stacking */}
      <RequestQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}