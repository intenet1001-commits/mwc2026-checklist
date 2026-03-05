'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const TOTAL_PAGES = 9

export function PDFSlider() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      setCurrentPage(idx)
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [open])

  const goTo = (idx: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="max-w-lg mx-auto px-4 pb-3">
      {/* Toggle Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between rounded-2xl px-5 py-4 shadow-md transition-all active:scale-[0.98]"
        style={{ backgroundColor: '#1e293b' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">📄</span>
          </div>
          <div className="text-left">
            <span className="text-base font-bold text-white">AI Vision 2026 리포트</span>
            <span className="text-sm text-slate-400 ml-2">{TOTAL_PAGES}p</span>
          </div>
        </div>
        <span className="text-slate-400 text-sm font-medium">{open ? '접기 ▲' : '보기 ▼'}</span>
      </button>

      {/* Carousel */}
      {open && (
        <div className="mt-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <div
                key={i}
                className="flex-none w-full"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Image
                  src={`/reviews/pdf-pages/page-${String(i + 1).padStart(2, '0')}.jpg`}
                  alt={`AI Vision 2026 p.${i + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 512px) 100vw, 512px"
                  style={{ width: '100%', height: 'auto' }}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center items-center gap-1.5 py-3">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === currentPage
                    ? 'w-4 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-slate-300'
                }`}
                aria-label={`페이지 ${i + 1}`}
              />
            ))}
          </div>

          {/* Page counter */}
          <p className="text-center text-xs text-slate-400 pb-3">
            {currentPage + 1} / {TOTAL_PAGES}
          </p>
        </div>
      )}
    </div>
  )
}
