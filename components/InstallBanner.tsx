'use client'

type Platform = 'ios' | 'android' | 'ios-inapp' | 'android-inapp' | null

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
            {(platform === 'ios-inapp' || platform === 'android-inapp') ? (
              <>
                <p className="text-xs font-semibold text-amber-300 mb-1.5">
                  ⚠️ 인앱 브라우저에서는 홈화면 추가가 안 돼요
                </p>
                {platform === 'ios-inapp' && (
                  <div className="text-xs text-blue-300 space-y-0.5">
                    <p>카카오톡·인스타 등 앱 내 브라우저에서는 불가합니다</p>
                    <p className="text-white font-medium mt-1">Safari로 열어주세요 👇</p>
                    <p>
                      <span className="text-white font-medium">1.</span> 우하단{' '}
                      <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-100">···</span> 또는{' '}
                      <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-100">⋮</span> 탭
                    </p>
                    <p>
                      <span className="text-white font-medium">2.</span> &quot;Safari로 열기&quot; 선택
                    </p>
                    <p>
                      <span className="text-white font-medium">3.</span> Safari에서 하단 □↑ → &quot;홈 화면에 추가&quot;
                    </p>
                  </div>
                )}
                {platform === 'android-inapp' && (
                  <div className="text-xs text-blue-300 space-y-0.5">
                    <p>카카오톡·인스타 등 앱 내 브라우저에서는 불가합니다</p>
                    <p className="text-white font-medium mt-1">Chrome으로 열어주세요 👇</p>
                    <p>
                      <span className="text-white font-medium">1.</span> 우상단{' '}
                      <span className="bg-blue-800 px-1.5 py-0.5 rounded text-blue-100">⋮</span> 탭
                    </p>
                    <p>
                      <span className="text-white font-medium">2.</span> &quot;Chrome으로 열기&quot; 또는 &quot;기본 브라우저로 열기&quot;
                    </p>
                    <p>
                      <span className="text-white font-medium">3.</span> Chrome에서 ⋮ → &quot;홈 화면에 추가&quot;
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
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
