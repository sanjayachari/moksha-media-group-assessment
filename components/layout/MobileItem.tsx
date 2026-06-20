import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE = [0.32, 0.72, 0, 1]

export default function MobileItem({ item, onClose }: any) {
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
              {item.children.map((child: any) => (
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
