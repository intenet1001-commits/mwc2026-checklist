'use client'

import { useChecklist } from '@/hooks/useChecklist'
import { DayTabs } from '@/components/DayTabs'
import { schedule } from '@/data/schedule'

export default function Home() {
  const { isChecked, getMemo, toggle, setMemo, isLoaded } = useChecklist()

  const totalBooths = schedule.reduce((acc, d) => acc + d.booths.length, 0)
  const totalChecked = schedule.reduce(
    (acc, d) => acc + d.booths.filter(b => isChecked(b.id)).length,
    0,
  )
  const totalPct = totalBooths > 0 ? Math.round((totalChecked / totalBooths) * 100) : 0

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm animate-pulse">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-4 pt-8 pb-5 safe-area-inset">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold bg-blue-700 px-2.5 py-1 rounded-full">
              MWC 2026
            </span>
            <span className="text-xs text-blue-300">바르셀로나 · 3/2(월)~3/5(목)</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">부스 방문 체크리스트</h1>
          <p className="text-sm text-blue-300 mt-0.5">기획자팀 · 전달래 권기호 이창구 이충협 최천성 양성현</p>

          {/* Overall progress */}
          <div className="mt-5 bg-blue-900/50 rounded-2xl p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-blue-200 font-medium">전체 방문 진행률</span>
              <span className="text-sm font-bold text-white">
                {totalChecked}
                <span className="text-blue-300 font-normal">/{totalBooths}</span>
                <span className="text-blue-300 font-normal ml-1.5">({totalPct}%)</span>
              </span>
            </div>
            <div className="h-2.5 bg-blue-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${totalPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-blue-400">
              {schedule.map((d, i) => {
                const c = d.booths.filter(b => isChecked(b.id)).length
                const t = d.booths.length
                return (
                  <span key={i} className={c === t ? 'text-emerald-400 font-semibold' : ''}>
                    D{i + 1} {c}/{t}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + cards */}
      <div className="max-w-lg mx-auto">
        <DayTabs
          isChecked={isChecked}
          getMemo={getMemo}
          onToggle={toggle}
          onMemoChange={setMemo}
        />
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-slate-300 max-w-lg mx-auto px-4">
        체크 후 새로고침해도 저장됩니다 · localStorage 기반 저장
      </div>
    </div>
  )
}
