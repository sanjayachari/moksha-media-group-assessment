'use client'

import { motion } from 'framer-motion'
import {
  SiGoogle,
  SiSlack,
  SiGithub,
  SiStripe,
  SiSpotify,
  SiNotion,
} from 'react-icons/si'

const logos = [
  { name: 'Google', Icon: SiGoogle, color: '#4285F4' },
  { name: 'Slack', Icon: SiSlack, color: '#4A154B' },
  { name: 'GitHub', Icon: SiGithub, color: '#ffffff' },
  { name: 'Stripe', Icon: SiStripe, color: '#635BFF' },
  { name: 'Spotify', Icon: SiSpotify, color: '#1ED760' },
  { name: 'Notion', Icon: SiNotion, color: '#ffffff' },
]

export default function LogoStrip() {
  return (
    <section className="overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* emerald glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)',
            }}
          />

          {/* top line */}
          <div className="h-px mb-10" />

          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-white/35 mb-10">
            Trusted Technology Partners
          </p>

          <div className="relative">
     

            <div
              className="overflow-hidden"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <motion.div
                className="flex gap-8 items-center w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[...logos, ...logos].map(({ name, Icon, color }, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex items-center gap-2.5 justify-center min-w-[140px] md:min-w-[160px] grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                    <span className="font-semibold text-lg tracking-tight whitespace-nowrap text-white/90">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* bottom line */}
          <div
            className="h-px mt-10"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(52,211,153,0.35), transparent)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}