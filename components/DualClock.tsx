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

function weatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 2) return '🌤️'
  if (code === 3) return '☁️'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌦️'
  if (code <= 65) return '🌧️'
  if (code <= 77) return '🌨️'
  if (code <= 82) return '🌧️'
  return '⛈️'
}

export function DualClock() {
  const [now, setNow] = useState<Date | null>(null)
  const [weather, setWeather] = useState<{ temp: number; emoji: string } | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=41.3851&longitude=2.1734&current=temperature_2m,weather_code&timezone=Europe%2FMadrid'
    )
      .then(r => r.json())
      .then(data => {
        const temp = Math.round(data.current.temperature_2m)
        const code = data.current.weather_code
        setWeather({ temp, emoji: weatherEmoji(code) })
      })
      .catch(() => {})
  }, [])

  if (!now) return null

  const barcelona = formatTime(now, 'Europe/Madrid')
  const seoul = formatTime(now, 'Asia/Seoul')

  return (
    <div className="flex items-center gap-3 text-xs text-blue-300 mt-1 tabular-nums">
      <span>
        🇪🇸 <span className="text-blue-100">{barcelona}</span>
        {weather && (
          <span className="ml-1.5 text-blue-200">
            {weather.emoji} {weather.temp}°C
          </span>
        )}
      </span>
      <span className="text-blue-700">|</span>
      <span>
        🇰🇷 <span className="text-blue-100">{seoul}</span>
      </span>
    </div>
  )
}
