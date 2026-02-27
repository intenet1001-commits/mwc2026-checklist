import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MWC 2026 부스 방문 체크리스트'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 10, height: '100%', background: '#3b82f6', display: 'flex' }} />

        {/* Badge */}
        <div
          style={{
            background: '#1d4ed8',
            color: 'white',
            fontSize: 28,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 10,
            marginBottom: 32,
            display: 'inline-flex',
            width: 'fit-content',
          }}
        >
          MWC 2026  BARCELONA
        </div>

        {/* Main title */}
        <div style={{ fontSize: 90, fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 24, display: 'flex' }}>
          부스 방문 체크리스트
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 36, color: '#93c5fd', marginBottom: 28, display: 'flex' }}>
          N2 디지털사업부  ·  바르셀로나 3/2~3/5
        </div>

        {/* Date bar */}
        <div style={{ width: 520, height: 4, background: '#3b82f6', marginBottom: 20, display: 'flex' }} />
        <div style={{ fontSize: 34, color: '#bfdbfe', display: 'flex' }}>
          D 2026. 3. 2(월) ~ 3. 5(목)
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 40, left: 70, fontSize: 26, color: '#475569', display: 'flex' }}>
          mwc-blush.vercel.app
        </div>

        {/* Right MWC text */}
        <div style={{ position: 'absolute', right: 40, top: 80, fontSize: 200, fontWeight: 900, color: '#1e3a8a', display: 'flex', letterSpacing: -4 }}>
          MWC
        </div>
      </div>
    ),
    { ...size }
  )
}
