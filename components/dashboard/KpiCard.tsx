import { ElementType } from 'react'
import { Skeleton } from '@/components/common/Skeleton'

interface KpiCardProps {
  variant?: 'light' | 'dark'
  label: string
  value: string | number
  icon?: ElementType
  sub?: string
  className?: string
  syncing?: boolean
}

export default function KpiCard({ variant = 'light', label, value, icon: Icon, sub, className = '', syncing }: KpiCardProps) {
  const base = 'rounded-xl border shadow-sm p-5 flex flex-col gap-3'
  const styles = variant === 'dark'
    ? 'bg-neutral-900 border-neutral-800 text-white'
    : 'bg-white border-neutral-200 text-neutral-900'
  const iconWrap = variant === 'dark'
    ? 'bg-white/10 text-white'
    : 'bg-neutral-900/5 text-neutral-700'
  const labelStyle = variant === 'dark' ? 'text-white/70' : 'text-neutral-500'
  const subStyle = variant === 'dark' ? 'text-white/50' : 'text-neutral-500'

  return (
    <div className={`${base} ${styles} ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${labelStyle}`}>{label}</span>
        {Icon ? (
          <span className={`h-9 w-9 rounded-xl flex items-center justify-center ${iconWrap}`}>
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <div>
        {syncing ? (
          <Skeleton className="h-8 w-20 mb-1" />
        ) : (
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        )}
        {sub ? (
          syncing ? <Skeleton className="h-4 w-32 mt-1" /> : <p className={`text-xs mt-1 ${subStyle}`}>{sub}</p>
        ) : null}
      </div>
    </div>
  )
}
