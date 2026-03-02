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
const EVENT_DATES: Record<string, number> = {
  '2026-03-02': 0,
  '2026-03-03': 1,
  '2026-03-04': 2,
  '2026-03-05': 3,
}

function getInitialDay(): number {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Madrid' }).format(new Date())
  return EVENT_DATES[today] ?? 0
}

export function DayTabs({ isChecked, getMemo, onToggle, onMemoChange }: Props) {
  const [activeDay, setActiveDay] = useState(getInitialDay)

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

        {activeDay === 0 && (
          <div className="pt-2 pb-2 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">📋 Day 1 참관 리포트</span>
                <a
                  href="https://web.plaud.ai/s/pub_8afd1130-d77c-48a8-8efb-07a399bd72bb::Kp5wJ_YmaxOrrpIIsqX9JmPxMhtwd1LspeLD1_c3awJ4-QD4ggsVw4nywMoYBZ2X7vRbY_ACXryKxYrYnSR3qgI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  🎙️ 플라우드 노트 보기
                </a>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="/reviews/20260302_한장랩업.png"
                  alt="MWC 2026 참관 리포트: AI 실용화와 데이터 자산화의 미래"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">🎬 키노트 다시보기</p>
              <div className="space-y-2">
                {[
                  { num: 1, title: 'Leading the Future: Intelligent, Inclusive, Unstoppable', url: 'https://www.mwcbarcelona.com/agenda/sessions/6088-keynote-1-leading-the-future-intelligent-inclusive-unstoppable' },
                  { num: 2, title: "Transforming Tomorrow's Connected World", url: 'https://www.mwcbarcelona.com/agenda/sessions/6087-keynote-2-transforming-tomorrows-connected-world' },
                  { num: 3, title: 'The Politics of Connectivity: Governing in a Fragmented World', url: 'https://www.mwcbarcelona.com/agenda/sessions/6093-keynote-3-the-politics-of-connectivity-governing-in-a-fragmented-world' },
                  { num: 4, title: 'What Does Strategic Tech Sovereignty Mean for Europe?', url: 'https://www.mwcbarcelona.com/agenda/sessions/6091-keynote-4-what-does-strategic-tech-sovereignty-mean-for-europe' },
                  { num: 5, title: 'Seeing the Light: Technology, Addiction and Balance', url: 'https://www.mwcbarcelona.com/agenda/sessions/6090-keynote-5-seeing-the-light-technology-addiction-and-balance' },
                ].map(k => (
                  <a
                    key={k.num}
                    href={k.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <span className="shrink-0 text-xs font-bold text-white bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">{k.num}</span>
                    <span className="text-xs text-slate-700 leading-snug">{k.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

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
