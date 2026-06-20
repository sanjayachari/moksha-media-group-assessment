'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const GRID = 60

const DOTS = [
  { x: '8%', y: '18%', s: 2.5, delay: '0s', dur: '6s' },
  { x: '15%', y: '42%', s: 1.5, delay: '2.1s', dur: '8s' },
  { x: '6%', y: '70%', s: 2, delay: '1.0s', dur: '7s' },
  { x: '22%', y: '85%', s: 1.5, delay: '3.5s', dur: '5s' },
  { x: '35%', y: '12%', s: 2, delay: '0.7s', dur: '9s' },
  { x: '48%', y: '6%', s: 1.5, delay: '4.2s', dur: '6.5s' },
  { x: '60%', y: '10%', s: 2.5, delay: '1.8s', dur: '7.5s' },
  { x: '76%', y: '8%', s: 1.5, delay: '3.0s', dur: '5.5s' },
  { x: '88%', y: '22%', s: 2, delay: '0.4s', dur: '8.5s' },
  { x: '94%', y: '50%', s: 1.5, delay: '2.6s', dur: '6s' },
  { x: '90%', y: '74%', s: 2, delay: '1.4s', dur: '7s' },
  { x: '78%', y: '88%', s: 1.5, delay: '3.8s', dur: '9s' },
  { x: '55%', y: '90%', s: 2, delay: '0.9s', dur: '6.5s' },
  { x: '30%', y: '78%', s: 1.5, delay: '5.0s', dur: '5s' },
]

function Crosshair({ x, y }) {
  return (
    <div
      className="absolute w-0 h-0 pointer-events-none z-[6] opacity-0"
      style={{
        left: x, top: y,
        animation: 'crossAppear 16s 2s ease-in-out infinite',
        animationFillMode: 'backwards',
        willChange: 'opacity',
      }}
    >
      <div
        className="absolute"
        style={{
          top: '-0.5px', left: '-50vw', width: '100vw', height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, transparent 5%, rgba(52,211,153,0.08) 18%, rgba(52,211,153,0.5) 46%, rgba(180,255,225,0.95) 50%, rgba(52,211,153,0.5) 54%, rgba(52,211,153,0.08) 82%, transparent 95%, transparent 100%)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '-0.5px', top: '-50vh', width: '1px', height: '100vh',
          background: 'linear-gradient(180deg, transparent 0%, transparent 5%, rgba(52,211,153,0.08) 18%, rgba(52,211,153,0.5) 46%, rgba(180,255,225,0.95) 50%, rgba(52,211,153,0.5) 54%, rgba(52,211,153,0.08) 82%, transparent 95%, transparent 100%)',
        }}
      />
      <div
        className="absolute -left-0.5 -top-0.5 w-1 h-1 rounded-full"
        style={{
          background: 'rgba(220,255,240,1)',
          boxShadow: '0 0 6px 2px rgba(52,211,153,0.7)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const snap = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      setPos({
        x: Math.round((0.72 * W) / GRID) * GRID,
        y: Math.round((0.70 * H) / GRID) * GRID,
      })
    }
    snap()
    window.addEventListener('resize', snap)
    return () => window.removeEventListener('resize', snap)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-surface z-0" />

      {/* Silk fold — upper-left sweep */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(122deg,
            transparent 0%, transparent 12%,
            rgba(255,255,255,0) 16%, rgba(255,255,255,0.05) 21%,
            rgba(255,255,255,0.11) 24%, rgba(255,255,255,0.05) 27%,
            rgba(255,255,255,0) 32%, transparent 42%, transparent 56%,
            rgba(255,255,255,0) 60%, rgba(255,255,255,0.035) 63%,
            rgba(255,255,255,0.07) 65.5%, rgba(255,255,255,0.035) 68%,
            rgba(255,255,255,0) 72%, transparent 100%)`,
        }}
      />

      {/* Silk fold — cross-diagonal */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(148deg,
            transparent 0%, transparent 8%,
            rgba(255,255,255,0) 11%, rgba(255,255,255,0.04) 14%,
            rgba(255,255,255,0.09) 17%, rgba(255,255,255,0.04) 20%,
            rgba(255,255,255,0) 23%, transparent 35%, transparent 58%,
            rgba(255,255,255,0) 62%, rgba(255,255,255,0.03) 65%,
            rgba(255,255,255,0.06) 67.5%, rgba(255,255,255,0.03) 70%,
            rgba(255,255,255,0) 74%, transparent 100%)`,
        }}
      />

      {/* Silk fold — shallow center */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(105deg,
            transparent 0%, transparent 45%,
            rgba(255,255,255,0) 49%, rgba(255,255,255,0.025) 52%,
            rgba(255,255,255,0.05) 54%, rgba(255,255,255,0.025) 56%,
            rgba(255,255,255,0) 60%, transparent 100%)`,
        }}
      />

      {/* Radial light pools */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            radial-gradient(ellipse 130% 55% at 18% 18%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 30%, transparent 60%),
            radial-gradient(ellipse 90% 45% at 78% 12%, rgba(255,255,255,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 110% 38% at 55% 82%, rgba(255,255,255,0.06) 0%, transparent 52%),
            radial-gradient(ellipse 70% 55% at 92% 50%, rgba(255,255,255,0.05) 0%, transparent 58%),
            radial-gradient(ellipse 90% 50% at 50% 50%, rgba(52,211,153,0.06) 0%, transparent 55%)`,
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ background: 'radial-gradient(ellipse 85% 72% at 50% 38%, transparent 15%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.9) 100%)' }}
      />

      {/* Top darkness */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 18%, transparent 35%)' }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0.65) 80%, rgba(0,0,0,0.88) 92%, rgba(0,0,0,0.96) 100%)' }}
      />

      {/* Left + right edge */}
      <div
        className="absolute inset-0 z-[3]"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Water dots */}
      <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden>
        {DOTS.map((d, i) => (
          <div key={i} className="absolute rounded-full bg-emerald-400/90" style={{
            left: d.x, top: d.y, width: d.s * 1.3, height: d.s * 1.3,
            boxShadow: `0 0 ${d.s * 4}px ${d.s * 1.5}px rgba(52,211,153,0.35)`,
            animation: `waterDot ${d.dur} ${d.delay} infinite ease-in-out`,
            willChange: 'opacity,transform',
          }} />
        ))}
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] z-[4]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {pos && <Crosshair x={pos.x} y={pos.y} />}

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 z-10">

        <div className="opacity-0 animate-fade-up-custom inline-flex items-center gap-2 mb-10" style={{ animationDelay: '0.1s' }}>
          <span className="h-px w-8 bg-white/20" />
          <span className="text-xs tracking-[0.2em] text-white/40 uppercase font-body">
            Enterprise AI Agents
          </span>
          <span className="h-px w-8 bg-white/20" />
        </div>

    <h1
  className="opacity-0 animate-fade-up-custom text-5xl md:text-7xl font-bold mb-6 leading-[1.05] font-display tracking-[-0.04em]"
  style={{ animationDelay: '0.2s' }}
>
  {/* Mobile: short 2-line version */}
  <span
    className="block md:hidden bg-clip-text text-transparent"
    style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.82) 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
  >
    AI Agents That
  </span>
  <span
    className="block md:hidden font-medium tracking-[-0.03em] bg-clip-text text-transparent"
    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.55) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
  >
    Get Work Done
  </span>

  {/* Desktop: current full version */}
  <span
    className="hidden md:block bg-clip-text text-transparent"
    style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.82) 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
  >
    AI Agents That Actually
  </span>
  <span
    className="hidden md:block font-medium tracking-[-0.03em] bg-clip-text text-transparent"
    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.55) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
  >
    Get Real Work Done
  </span>
</h1>

        <p
          className="opacity-0 animate-fade-up-custom text-base md:text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed font-body"
          style={{ animationDelay: '0.3s' }}
        >
          Deploy customer support, research, and workflow automation agents tailored to your business needs and goals.
        </p>

        <div className="opacity-0 animate-fade-up-custom flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/ask-ai"
            className="relative inline-flex items-center justify-center p-[3px] rounded-full cursor-pointer outline-none w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.4) 0%, rgba(16,185,129,0.18) 50%, rgba(52,211,153,0.1) 100%)',
              border: '1px solid rgba(52,211,153,0.3)',
            }}
          >
            <span
              className="flex items-center justify-center px-7 py-2.5 rounded-full text-white text-sm font-semibold tracking-[0.02em] font-body whitespace-nowrap w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(52,211,153,0.28) 0%, rgba(16,185,129,0.1) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(52,211,153,0.35), inset 0 -1px 0 rgba(0,0,0,0.3)',
              }}
            >
              Ai Chat
            </span>
          </Link>

          <Link
            href="/services"
            className="relative inline-flex items-center justify-center p-[3px] rounded-full cursor-pointer outline-none w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span
              className="flex items-center justify-center gap-2 px-7 py-2.5 rounded-full text-white/80 text-sm font-medium tracking-[0.02em] font-body whitespace-nowrap w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.2) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)',
              }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="origin-left opacity-0 animate-scale-in-x mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-8 flex justify-center">
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

    </section>
  )
}