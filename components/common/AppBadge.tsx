interface BadgeProps {
  status: 'pending' | 'completed' | 'delivered' | 'active' | 'inactive' | 'paid' | 'unpaid' | 'low' | 'ok' | 'archived' | string;
  label?: string;
  className?: string;
}

export default function Badge({ status, label, className = '' }: BadgeProps) {
  const styles = {
    pending: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
    completed: 'bg-black text-white border border-black',
    delivered: 'bg-neutral-800 text-white border border-neutral-800',
    active: 'bg-black text-white border border-black',
    inactive: 'bg-neutral-100 text-neutral-500 border border-neutral-200',
    paid: 'bg-black text-white border border-black',
    unpaid: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
    low: 'bg-neutral-800 text-white border border-neutral-800',
    ok: 'bg-neutral-100 text-neutral-600 border border-neutral-200',
  }

  const style = styles[status as keyof typeof styles] || 'bg-neutral-100 text-neutral-600 border border-neutral-200'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} ${className}`}
    >
      {label || status}
    </span>
  )
}
