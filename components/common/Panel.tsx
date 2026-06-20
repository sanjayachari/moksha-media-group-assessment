import { ReactNode } from 'react'
import { Skeleton } from './Skeleton'

interface PanelProps {
  title?: string
  right?: ReactNode
  children: ReactNode
  className?: string
  loading?: boolean
}

export default function Panel({ title, right, children, className = '', loading }: PanelProps) {
  return (
    <section className={`rounded-xl bg-white border border-neutral-200 shadow-sm overflow-hidden ${className}`}>
      {(title || right) ? (
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-200/70">
          <div className="flex items-center gap-2">
            {title ? <h3 className="text-sm font-semibold text-neutral-900">{title}</h3> : null}
            {loading ? (
              <Skeleton className="h-5 w-16" />
            ) : null}
          </div>
          {right}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  )
}
