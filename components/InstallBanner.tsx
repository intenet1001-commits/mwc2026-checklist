'use client'

import { useState, useEffect } from 'react'

export function InstallBanner() {
  const [show, setShow] = useState(false)
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    const standalone =
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches

    setIsStandalone(standalone)

    if (standalone) return

    const dismissed = sessionStorage.getItem('install-banner-dismissed')
    if (dismissed) return

    if (/iPad|iPhone|iPod/.test(ua)) {
      setPlatform('ios')
      setShow(true)
    } else if (/Android/.test(ua)) {
      setPlatform('android')
      setShow(true)
    }
  }, [])

  if (!show || isStandalone) return null

  return (
    <div className="bg-blue-950 border-b border-blue-800 px-4 py-3">
      <div className="max-w-lg mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-blue-200 mb-1.5">
              📱 홈화면에 추가하면 앱처럼 사용할 수 있어요
            </p>
            {platform === 'ios' && (
              <div className="text-xs text-blue-300 space-y-0.5">
                <p>
                  <span className="text-white font-medium">1.</span> 하단 공유 버튼{' '}
                  <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-100">□↑</span> 탭
                </p>
                <p>
                  <span className="text-white font-medium">2.</span> &quot;홈 화면에 추가&quot; 선택
                </p>
                <p>
                  <span className="text-white font-medium">3.</span> 오른쪽 상단 &quot;추가&quot; 탭
                </p>
              </div>
            )}
            {platform === 'android' && (
              <div className="text-xs text-blue-300 space-y-0.5">
                <p>
                  <span className="text-white font-medium">1.</span> 우상단{' '}
                  <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-100">⋮</span> 메뉴 탭
                </p>
                <p>
                  <span className="text-white font-medium">2.</span> &quot;홈 화면에 추가&quot; 선택
                </p>
                <p>
                  <span className="text-white font-medium">3.</span> &quot;추가&quot; 확인
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              sessionStorage.setItem('install-banner-dismissed', '1')
              setShow(false)
            }}
            className="text-blue-500 hover:text-blue-300 text-lg leading-none mt-0.5 shrink-0"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
