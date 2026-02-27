'use client'

import { useState, useEffect, useCallback } from 'react'

type BoothState = {
  checked: boolean
  memo: string
}

type ChecklistState = Record<string, BoothState>

const STORAGE_KEY = 'mwc2026-checklist'

export function useChecklist() {
  const [state, setState] = useState<ChecklistState>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setState(JSON.parse(saved))
    } catch {
      // ignore parse errors
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore storage errors
    }
  }, [state, isLoaded])

  const toggle = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      [id]: {
        checked: !prev[id]?.checked,
        memo: prev[id]?.memo ?? '',
      },
    }))
  }, [])

  const setMemo = useCallback((id: string, memo: string) => {
    setState(prev => ({
      ...prev,
      [id]: {
        checked: prev[id]?.checked ?? false,
        memo,
      },
    }))
  }, [])

  const isChecked = useCallback((id: string) => state[id]?.checked ?? false, [state])
  const getMemo = useCallback((id: string) => state[id]?.memo ?? '', [state])

  return { toggle, setMemo, isChecked, getMemo, isLoaded }
}
