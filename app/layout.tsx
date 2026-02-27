import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MWC 2026 체크리스트',
  description: 'N2 디지털사업부 MWC 2026 바르셀로나 방문 부스 체크리스트',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MWC 2026',
  },
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'MWC 2026 부스 방문 체크리스트',
    description: 'N2 디지털사업부 · 바르셀로나 3/2~3/5 부스 방문 체크리스트',
    url: 'https://mwc-blush.vercel.app',
    siteName: 'MWC 2026 체크리스트',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://mwc-blush.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MWC 2026 부스 방문 체크리스트',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MWC 2026 부스 방문 체크리스트',
    description: 'N2 디지털사업부 · 바르셀로나 3/2~3/5',
    images: ['https://mwc-blush.vercel.app/opengraph-image'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e3a8a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
