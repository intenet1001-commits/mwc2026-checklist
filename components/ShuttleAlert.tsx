'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'shuttle-alert-dismissed-20260302'

export function ShuttleAlert() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 이미 닫은 경우 표시 안 함
    if (localStorage.getItem(STORAGE_KEY)) return

    // 바르셀로나 기준 2026-03-02 08:10 이전에만 표시
    const now = new Date()
    const deadline = new Date('2026-03-02T08:10:00+01:00') // Europe/Madrid (CET = UTC+1)
    if (now >= deadline) return

    setVisible(true)
  }, [])

  if (!visible) return null

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 px-6 pt-6 pb-5 text-white text-center">
          <div className="text-4xl mb-2">🚌</div>
          <h2 className="text-lg font-bold leading-snug">셔틀버스 집결 알림</h2>
          <p className="text-blue-200 text-sm mt-1">MWC 2026 · Day 1</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-4">
            <span className="text-2xl mt-0.5">📍</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">집결 장소</p>
              <p className="text-base font-bold text-blue-800">호텔 로비</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50 rounded-2xl p-4">
            <span className="text-2xl mt-0.5">⏰</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">집결 시간</p>
              <p className="text-base font-bold text-amber-800">3월 2일(월) 오전 8:10</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-emerald-50 rounded-2xl p-4">
            <span className="text-2xl mt-0.5">🗺️</span>
            <div>
              <p className="text-sm font-semibold text-emerald-900">이동 수단</p>
              <p className="text-base font-bold text-emerald-800">셔틀버스 탑승 후 MWC 이동</p>
            </div>
          </div>

          <p className="text-xs text-center text-slate-400">
            ⚠️ 시간 엄수 · 늦지 않게 집결해주세요!
          </p>
        </div>

        {/* Action */}
        <div className="px-6 pb-6">
          <button
            onClick={handleClose}
            className="w-full bg-blue-800 hover:bg-blue-700 active:bg-blue-900 text-white font-semibold rounded-2xl py-3.5 text-sm transition-colors"
          >
            확인했습니다 ✓
          </button>
        </div>
      </div>
    </div>
  )
}
