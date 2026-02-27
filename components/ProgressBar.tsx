type Props = {
  checked: number
  total: number
  label?: string
  colorClass?: string
}

export function ProgressBar({ checked, total, label, colorClass = 'bg-blue-600' }: Props) {
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0
  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm text-slate-500">{label}</span>
          <span className="text-sm font-bold text-slate-800">{checked}<span className="text-slate-400 font-normal">/{total}</span></span>
        </div>
      )}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
