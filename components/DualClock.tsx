'use client'

import { useState, useEffect } from 'react'

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone,
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function DualClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!now) return null

  const barcelona = formatTime(now, 'Europe/Madrid')
  const seoul = formatTime(now, 'Asia/Seoul')

  return (
    <div className="flex items-center gap-3 text-xs text-blue-300 mt-1 tabular-nums">
      <span>
        🇪🇸 <span className="text-blue-100">{barcelona}</span>
      </span>
      <span className="text-blue-700">|</span>
      <span>
        🇰🇷 <span className="text-blue-100">{seoul}</span>
      </span>
    </div>
  )
}
