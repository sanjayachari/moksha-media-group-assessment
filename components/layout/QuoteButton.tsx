import { useState } from 'react'
import Link from 'next/link'

interface QuoteButtonProps {
  mobile?: boolean
  onOpen?: () => void
}

export default function QuoteButton({ mobile = false, onOpen }: QuoteButtonProps) {
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      Ask AI
    </Link>
  )
}
