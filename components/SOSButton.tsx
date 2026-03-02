'use client'

import { useState } from 'react'

type Contact = {
  emoji: string
  name: string
  desc: string
  note?: string
  number: string
  urgent?: boolean
}

type Section = {
  label: string
  contacts: Contact[]
}

const sections: Section[] = [
  {
    label: '🏢 회사',
    contacts: [
      { emoji: '👔', name: '대표님', desc: '긴급 시 연락', number: '+821062981902' },
      { emoji: '💼', name: '상무님', desc: '긴급 시 연락', number: '+821038320212' },
      { emoji: '📱', name: '상무님 (업무폰)', desc: '업무 전화', number: '+821038892112' },
    ],
  },
  {
    label: '🚨 긴급',
    contacts: [
      {
        emoji: '🆘', name: '긴급전화 (경찰/소방/구급)', urgent: true,
        desc: '유럽 통합 긴급번호. 모든 긴급상황에 발신 가능',
        number: '112',
      },
      { emoji: '🚑', name: '구급대', urgent: true, desc: '의료 응급상황', number: '061' },
      { emoji: '🚒', name: '소방', urgent: true, desc: '화재 신고', number: '080' },
    ],
  },
  {
    label: '👮 경찰',
    contacts: [
      { emoji: '👮', name: '국가경찰', urgent: true, desc: '범죄 신고, 여권 분실 신고', number: '091' },
      { emoji: '🚔', name: '바르셀로나 시경', urgent: true, desc: '교통사고, 분실물, 치안 문제', number: '092' },
    ],
  },
  {
    label: '🇰🇷 영사관 & 호텔',
    contacts: [
      {
        emoji: '🇰🇷', name: '주바르셀로나 한국총영사관',
        desc: '여권 분실, 긴급여행증명서, 사건사고 영사 지원',
        note: '🕐 월~금 09:00-13:00, 14:00-18:00',
        number: '+34934880600',
      },
      {
        emoji: '🏨', name: '호텔 프런트 데스크',
        desc: '호텔 & SPA Villa Olimpic@Suites 프런트. 24시간 운영',
        note: '🕐 24시간',
        number: '+34932212610',
      },
    ],
  },
]

export function SOSButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating SOS button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-sm rounded-full px-3.5 py-2.5 shadow-lg transition-colors"
        aria-label="긴급연락처"
      >
        <span className="text-base leading-none">🆘</span>
        <span>SOS</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">🆘 긴급 연락처</h2>
                <p className="text-xs text-slate-400 mt-0.5">탭하면 바로 전화연결됩니다</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            {/* Contact list */}
            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-4">
              {sections.map((section) => (
                <div key={section.label}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                    {section.label}
                  </p>
                  <div className="space-y-2">
                    {section.contacts.map((c) => (
                      <a
                        key={c.number}
                        href={`tel:${c.number}`}
                        className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-2xl px-4 py-3 transition-colors"
                      >
                        <span className="text-2xl flex-shrink-0">{c.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                            {c.urgent && (
                              <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                긴급
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate">{c.desc}</p>
                          {c.note && <p className="text-xs text-slate-400 mt-0.5">{c.note}</p>}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-sm font-bold text-blue-700">{c.number}</span>
                          <span className="text-slate-300">›</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pb-2" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
