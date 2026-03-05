'use client'

import { useState, useEffect } from 'react'

const KEY = 'mwc2026-elderly-mode'

export function useElderlyMode() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(KEY)
    // 저장값 없으면 기본값 true (고령자 모드 ON)
    const saved = stored === null ? true : stored === 'true'
    setEnabled(saved)
    if (saved) document.body.classList.add('elderly-mode')
  }, [])

  const toggle = () => {
    setEnabled(prev => {
      const next = !prev
      localStorage.setItem(KEY, String(next))
      if (next) document.body.classList.add('elderly-mode')
      else document.body.classList.remove('elderly-mode')
      return next
    })
  }

  return { enabled, toggle }
}
