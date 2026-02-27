'use client'

type Platform = 'ios' | 'android' | null

type Props = {
  open: boolean
  platform: Platform
  onClose: () => void
}

export function InstallBanner({ open, platform, onClose }: Props) {
  if (!open || !platform) return null

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 border-b border-blue-800 px-4 py-3">
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
            onClick={onClose}
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
