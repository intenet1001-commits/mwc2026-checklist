import { Category } from '@/data/schedule'

const config: Record<Category, { label: string; className: string }> = {
  AI:      { label: 'AI',      className: 'bg-purple-100 text-purple-700 border border-purple-200' },
  FinTech: { label: 'FinTech', className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  Korean:  { label: '한국',    className: 'bg-red-100 text-red-700 border border-red-200' },
  Mobile:  { label: 'Mobile',  className: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
  Startup: { label: 'Startup', className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  Cloud:   { label: 'Cloud',   className: 'bg-sky-100 text-sky-700 border border-sky-200' },
  Session: { label: '세션',    className: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
}

export function CategoryBadge({ category }: { category: Category }) {
  const { label, className } = config[category]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  )
}
