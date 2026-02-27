'use client'

import { useState } from 'react'
import { Booth } from '@/data/schedule'
import { CategoryBadge } from './CategoryBadge'

type Props = {
  booth: Booth
  checked: boolean
  memo: string
  onToggle: () => void
  onMemoChange: (memo: string) => void
}

export function BoothCard({ booth, checked, memo, onToggle, onMemoChange }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        checked
          ? 'bg-slate-50 border-slate-200 opacity-55'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Card header */}
      <div className="flex items-start gap-3 p-4">
        {/* Custom checkbox */}
        <button
          onClick={onToggle}
          aria-label={checked ? '방문 완료 취소' : '방문 완료 표시'}
          className={`mt-0.5 w-6 h-6 rounded-lg flex-shrink-0 border-2 flex items-center justify-center transition-all active:scale-90 ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-slate-300 hover:border-blue-400'
          }`}
        >
          {checked && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <CategoryBadge category={booth.category} />
            <span className="text-xs text-slate-400">{booth.time} · {booth.duration}</span>
          </div>
          <h3 className={`font-semibold text-base leading-snug ${checked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
            {booth.company}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{booth.hall}</p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          aria-label={expanded ? '접기' : '펼치기'}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs font-semibold text-blue-600 mb-1.5">📌 체험 포인트</p>
            <p className="text-sm text-slate-700 leading-relaxed">{booth.description}</p>
          </div>

          <div className="rounded-xl bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-600 mb-1.5">💡 현장 질문 / 수집 목표</p>
            <p className="text-sm text-slate-700 leading-relaxed">{booth.tip}</p>
          </div>

          {(booth.sessionUrl || booth.boothUrl) && (
            <div className="flex flex-col gap-1.5">
              {booth.sessionUrl && (
                <a
                  href={booth.sessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  공식 세션 링크 →
                </a>
              )}
              {booth.boothUrl && (
                <a
                  href={booth.boothUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium hover:underline"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  MWC 공식 부스 페이지 →
                </a>
              )}
            </div>
          )}

          <div>
            <p className="text-xs text-slate-400 mb-1.5">현장 메모</p>
            <textarea
              value={memo}
              onChange={e => onMemoChange(e.target.value)}
              placeholder="간단한 메모를 남겨보세요..."
              maxLength={300}
              rows={3}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 placeholder:text-slate-300"
            />
            <p className="text-xs text-slate-300 text-right mt-0.5">{memo.length}/300</p>
          </div>
        </div>
      )}
    </div>
  )
}
