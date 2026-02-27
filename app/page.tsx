'use client'

import { useState, useEffect } from 'react'
import { useChecklist } from '@/hooks/useChecklist'
import { DayTabs } from '@/components/DayTabs'
import { InstallBanner } from '@/components/InstallBanner'
import { schedule } from '@/data/schedule'

type Platform = 'ios' | 'android' | 'ios-inapp' | 'android-inapp' | null

export default function Home() {
  const { isChecked, getMemo, toggle, setMemo, isLoaded } = useChecklist()
  const [platform, setPlatform] = useState<Platform>(null)
  const [bannerOpen, setBannerOpen] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    const standalone =
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches

    if (standalone) return

    let detected: Platform = null
    if (/iPad|iPhone|iPod/.test(ua)) detected = 'ios'
    else if (/Android/.test(ua)) detected = 'android'

    // 인앱 브라우저 감지 (카카오톡, 인스타, 라인 등)
    const isInApp = /KAKAOTALK|Instagram|NAVER|Line\//.test(ua)
    if (isInApp && detected) detected = detected === 'ios' ? 'ios-inapp' : 'android-inapp'

    if (!detected) return
    setPlatform(detected)

    const dismissed = sessionStorage.getItem('install-banner-dismissed')
    if (!dismissed) setBannerOpen(true)
  }, [])

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
      <InstallBanner
        open={bannerOpen}
        platform={platform}
        onClose={() => {
          sessionStorage.setItem('install-banner-dismissed', '1')
          setBannerOpen(false)
        }}
      />
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white px-4 pt-8 pb-5 safe-area-inset">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-blue-700 px-2.5 py-1 rounded-full">
                MWC 2026
              </span>
              <span className="text-xs text-blue-300">바르셀로나 · 3/2(월)~3/5(목)</span>
            </div>
            {platform && (
              <button
                onClick={() => setBannerOpen(true)}
                className="text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
                aria-label="홈화면 추가 안내"
                title="홈화면에 추가하는 방법"
              >
                📲
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold tracking-tight">부스 방문 체크리스트</h1>
          <p className="text-sm text-blue-300 mt-0.5">기획자팀 · 전달래 권기호 이창구 이충협 최천성 양성현(직급순아님,우연의일치)</p>

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
