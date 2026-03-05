'use client'

import { useState, useEffect } from 'react'

const KEY = 'mwc2026-elderly-mode'

export function useElderlyMode() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(KEY) === 'true'
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
