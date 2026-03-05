'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

const TOTAL_PAGES = 9

export function PDFSlider() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [modalPage, setModalPage] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const modalScrollRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)

  // 캐러셀 페이지 트래킹
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

  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (modalPage !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalPage])

  // 모달 스와이프 핸들러 (단일 터치만 처리)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length !== 1) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    const dt = Date.now() - touchStartTime.current
    // 빠른 수평 스와이프만 페이지 전환 (핀치줌/스크롤 방해 안 함)
    if (dt < 400 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const resetScroll = () => {
        modalScrollRef.current?.scrollTo({ top: 0, left: 0 })
      }
      if (dx < 0 && modalPage !== null && modalPage < TOTAL_PAGES - 1) {
        setModalPage(p => (p ?? 0) + 1)
        setTimeout(resetScroll, 0)
      } else if (dx > 0 && modalPage !== null && modalPage > 0) {
        setModalPage(p => (p ?? 1) - 1)
        setTimeout(resetScroll, 0)
      }
    }
  }

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
                className="relative flex-none w-full cursor-zoom-in"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => setModalPage(i)}
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
                <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
                  🔍 탭하여 확대
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-1.5 py-3">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === currentPage ? 'w-4 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300'
                }`}
                aria-label={`페이지 ${i + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 pb-3">
            {currentPage + 1} / {TOTAL_PAGES}
          </p>
        </div>
      )}

      {/* Fullscreen zoom modal */}
      {modalPage !== null && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Modal header */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 bg-black/80">
            <span className="text-white text-sm font-medium">
              {modalPage + 1} / {TOTAL_PAGES}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => modalPage > 0 && setModalPage(p => (p ?? 1) - 1)}
                className={`text-2xl px-1 transition-opacity ${modalPage > 0 ? 'text-white' : 'text-white/20'}`}
                disabled={modalPage === 0}
              >‹</button>
              <button
                onClick={() => modalPage < TOTAL_PAGES - 1 && setModalPage(p => (p ?? 0) + 1)}
                className={`text-2xl px-1 transition-opacity ${modalPage < TOTAL_PAGES - 1 ? 'text-white' : 'text-white/20'}`}
                disabled={modalPage === TOTAL_PAGES - 1}
              >›</button>
              <button
                onClick={() => setModalPage(null)}
                className="text-white text-lg w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
              >✕</button>
            </div>
          </div>

          {/* Zoomable + swipeable image area */}
          <div
            ref={modalScrollRef}
            className="flex-1 overflow-auto flex items-center justify-center"
            style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={modalPage}
              src={`/reviews/pdf-pages/page-${String(modalPage + 1).padStart(2, '0')}.jpg`}
              alt={`AI Vision 2026 p.${modalPage + 1}`}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: 'calc(100dvh - 96px)',
                display: 'block',
              }}
            />
          </div>

          <p className="text-center text-slate-600 text-xs py-2 flex-shrink-0 bg-black">
            좌우 스와이프로 페이지 이동 · 핀치로 확대
          </p>
        </div>
      )}
    </div>
  )
}
