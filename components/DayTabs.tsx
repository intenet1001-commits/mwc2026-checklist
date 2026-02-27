'use client'

import { useState } from 'react'
import { schedule } from '@/data/schedule'
import { BoothCard } from './BoothCard'
import { ProgressBar } from './ProgressBar'

type Props = {
  isChecked: (id: string) => boolean
  getMemo: (id: string) => string
  onToggle: (id: string) => void
  onMemoChange: (id: string, memo: string) => void
}

const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3', 'Day 4']

export function DayTabs({ isChecked, getMemo, onToggle, onMemoChange }: Props) {
  const [activeDay, setActiveDay] = useState(0)

  const countChecked = (dayIndex: number) =>
    schedule[dayIndex].booths.filter(b => isChecked(b.id)).length

  const day = schedule[activeDay]
  const checked = countChecked(activeDay)
  const total = day.booths.length

  return (
    <div>
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100">
        <div className="flex">
          {schedule.map((d, i) => {
            const c = countChecked(i)
            const t = d.booths.length
            const done = c === t
            const active = activeDay === i
            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`flex-1 py-3 text-center transition-colors relative ${
                  active
                    ? 'text-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full" />
                )}
                <div className="text-xs font-bold">{DAY_LABELS[i]}</div>
                <div className={`text-xs mt-0.5 font-medium ${done ? 'text-emerald-500' : active ? 'text-blue-500' : 'text-slate-300'}`}>
                  {c}/{t}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Day content */}
      <div className="p-4 space-y-3">
        {/* Day header */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2 mb-0.5">
            <h2 className="text-lg font-bold text-slate-900">{day.date}</h2>
          </div>
          <p className="text-sm text-slate-500">🎯 {day.theme}</p>
          <div className="mt-3">
            <ProgressBar checked={checked} total={total} label="오늘 방문 현황" />
          </div>
        </div>

        {/* Booth cards */}
        {day.booths.map(booth => (
          <BoothCard
            key={booth.id}
            booth={booth}
            checked={isChecked(booth.id)}
            memo={getMemo(booth.id)}
            onToggle={() => onToggle(booth.id)}
            onMemoChange={memo => onMemoChange(booth.id, memo)}
          />
        ))}
      </div>
    </div>
  )
}
