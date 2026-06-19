'use client'

export default function GreenButton({ children, href, size = 'md', onClick, secondary = false }: { children: React.ReactNode, href?: string, size?: 'sm' | 'md' | 'lg', onClick?: () => void, secondary?: boolean }) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-sm',
  }

  const base = `relative inline-flex items-center gap-2 font-medium rounded-sm transition-all duration-200 group overflow-hidden`
  const colorClasses = secondary
    ? 'text-white/60 hover:text-white bg-transparent'
    : 'text-white bg-white/[0.04] hover:bg-white/[0.07]'

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${base} ${colorClasses} ${sizeClasses[size]}`}
    >
      <span
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.5)]"
      />
      <span className="absolute top-0 left-0 w-2 h-px bg-emerald-500/0 group-hover:bg-emerald-500/80 transition-all duration-300" />
      <span className="absolute top-0 left-0 w-px h-2 bg-emerald-500/0 group-hover:bg-emerald-500/80 transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-px bg-emerald-500/0 group-hover:bg-emerald-500/80 transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-px h-2 bg-emerald-500/0 group-hover:bg-emerald-500/80 transition-all duration-300" />

      <span className="relative z-10">{children}</span>

      {secondary && (
        <span className="relative z-10 opacity-50 group-hover:opacity-100 transition-opacity">
          →
        </span>
      )}
    </Tag>
  )
}
