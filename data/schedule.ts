export type Category = 'AI' | 'FinTech' | 'Korean' | 'Mobile' | 'Startup' | 'Cloud' | 'Session'

export type Booth = {
  id: string
  company: string
  hall: string
  time: string
  duration: string
  category: Category
  description: string
  tip: string
  sessionUrl?: string  // MWC 공식 세션 링크
  boothUrl?: string    // MWC 공식 부스 링크
}

export type Day = {
  date: string
  theme: string
  booths: Booth[]
}

// ✅ 참가 확인된 기업만 포함 (MWC 공식 exhibitor URL 기준)
// at-4yfn 기업(SKT, LGU+, DT HUBraum, Spendbase)은 Hall 8(4YFN) → Day4 배치
export const schedule: Day[] = [
  // ─────────────────────────────────────────
  // DAY 1 | Hall 2·3·6 | AI 웨어러블 + 모바일 UX
  // ─────────────────────────────────────────
  {
    date: '3월 2일 (월)',
    theme: 'AI 웨어러블 + 모바일 UX',
    booths: [
      {
        id: 'd1-samsung',
        company: 'Samsung Electronics',
        hall: 'Hall 3, Stand OA3A.30',
        time: '09:30',
        duration: '45m',
        category: 'Mobile',
        description:
          '갤럭시 S26 AI 기능 + 갤럭시 링·글라스 웨어러블 체험. 온디바이스 AI 기반 모바일 UX 혁신 파악. N2 MTS AI 연동 가능성 탐색.',
        tip: '온디바이스 AI로 어떤 금융 UX가 변하는지 / 생체인증·패스키 통합 방식 / 6G 로드맵 확인',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/33931-samsung-electronics-co-ltd',
      },
      {
        id: 'd1-qualcomm',
        company: 'Qualcomm',
        hall: 'Hall 3, Stand 3E10',
        time: '10:30',
        duration: '45m',
        category: 'AI',
        description:
          'Snapdragon 8 Elite 온디바이스 AI 데모. Wi-Fi 8 플랫폼 신제품 발표 예정. 모바일 AI 추론 속도·전력효율 체험.',
        tip: '금융 앱 on-device AI 적용 시나리오 / Wi-Fi 8 금융 네트워크 보안 강화 방안 문의',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/33805-qualcomm',
      },
      {
        id: 'd1-meta',
        company: 'Meta Platforms',
        hall: 'Hall 6, MWC Networking Hub',
        time: '11:30',
        duration: '1h',
        category: 'AI',
        description:
          'Meta AR 글래스 + 웨어러블 AI 어시스턴트 체험. AR 인터페이스 기반 정보 표시 UX 직접 경험. 금융 서비스 AR/AI 적용 가능성 탐색.',
        tip: 'AR 인터페이스로 포트폴리오·시세 정보 표시 UX / 음성+시각 복합 인터랙션 증권업 시나리오',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34284-meta-platforms-inc',
      },
      {
        id: 'd1-mediatek',
        company: 'MediaTek',
        hall: 'Hall 3, Stand 3D10',
        time: '14:00',
        duration: '45m',
        category: 'Mobile',
        description:
          'Dimensity 9400 AI 칩셋 + 모바일 AI 기능 데모. 중저가 스마트폰 AI 확산 트렌드 파악. IQ Era 디바이스 전략 발표.',
        tip: '다양한 기기 스펙트럼에서 금융 AI 접근성 / 저가형 기기 온디바이스 AI 한계 파악',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34018-mediatek',
      },
      {
        id: 'd1-google',
        company: 'Google',
        hall: 'Hall 2, Stand 2I10MR',
        time: '15:00',
        duration: '45m',
        category: 'AI',
        description:
          'Android AI 기능 + Gemini 모바일 통합 체험. 구글 생태계 금융 연동 방향 파악. Android 보안 강화 최신 기능 확인.',
        tip: 'Google Pay + Gemini AI 연동 로드맵 / Android 패스키·생체인증 금융앱 적용 가이드',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34202-google-llc',
      },
      {
        id: 'd1-session-banking',
        company: '세션: Customer-First Digital Banking',
        hall: 'Congress Centre (세션룸 번호 사전 확인)',
        time: '16:50',
        duration: '1h',
        category: 'Session',
        description:
          '고객 중심 디지털 뱅킹 혁신 세션. "Trust & Seamless Experiences" — 신뢰와 원활한 경험 두 축의 균형 전략.',
        tip: '해외 금융사 디지털 전환 베스트 케이스 / 고객 신뢰 구축을 위한 AI 활용 전략 노트',
        sessionUrl:
          'https://www.mwcbarcelona.com/agenda/sessions/5856-customer-first-digital-banking-innovation-trust-and-seamless-experiences',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DAY 2 | Hall 1·2·3·CC | FinTech + 클라우드 AI
  // ─────────────────────────────────────────
  {
    date: '3월 3일 (화)',
    theme: 'FinTech + 클라우드 AI',
    booths: [
      {
        id: 'd2-fintech-summit',
        company: '세션: FinTech & Commerce Summit',
        hall: 'Congress Centre (세션룸 번호 사전 확인)',
        time: '09:30',
        duration: '1h',
        category: 'Session',
        description:
          '모바일 커머스 진화 — 실시간 결제·오픈뱅킹·CBDC 동향. 글로벌 결제 인프라 혁신 트렌드.',
        tip: '글로벌 증권·뱅킹 결제 혁신 사례 / B2B 결제 흐름 변화 포인트 / 국내 적용 가능성',
        sessionUrl:
          'https://www.mwcbarcelona.com/agenda/sessions/5985-fintech-and-commerce-summit-the-evolution-of-mobile-driven-commerce',
      },
      {
        id: 'd2-microsoft',
        company: 'Microsoft',
        hall: 'Hall 3, Stand 3H30',
        time: '10:45',
        duration: '45m',
        category: 'Cloud',
        description:
          'Azure AI + Copilot for Financial Services 데모. Microsoft 365 Copilot 업무 자동화 체험. 금융 특화 AI 에이전트 솔루션 파악.',
        tip: 'Copilot 증권업무(리서치·보고서 작성) 적용 범위 / Azure OpenAI 금융 규제 컴플라이언스 방식',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/33692-microsoft',
      },
      {
        id: 'd2-aws',
        company: 'AWS (Amazon Web Services)',
        hall: 'Congress Centre, CC1.1 / CC1.5 / Atrium (South Entrance 상층)',
        time: '11:45',
        duration: '45m',
        category: 'Cloud',
        description:
          'AWS for Financial Services 솔루션 쇼케이스. Amazon Bedrock 금융 AI 워크로드 사례. 클라우드 전환 가속화 아키텍처.',
        tip: '금융 클라우드 규제 대응(망분리·데이터 주권) 방식 / Bedrock 금융 AI 비용 모델 문의',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/36762-aws-amazon-web-services',
      },
      {
        id: 'd2-sap',
        company: 'SAP SE',
        hall: 'Hall 3, Stand 3A4PEx',
        time: '13:30',
        duration: '45m',
        category: 'Cloud',
        description:
          'SAP S/4HANA Cloud + Business AI 금융 솔루션. AI 기반 재무 자동화 데모. ERP·금융 시스템 현대화 방향.',
        tip: '레거시 금융시스템 현대화 로드맵 / SAP AI 기반 재무 자동화 구체 사례·비용 구조',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34362-sap-se',
      },
      {
        id: 'd2-ericsson',
        company: 'Ericsson',
        hall: 'Hall 2, Ericsson Pavilion',
        time: '14:30',
        duration: '1h',
        category: 'Cloud',
        description:
          '5G·AI 네트워크 인프라 + Vonage 기업용 통신 API 솔루션. 텔코-AI 융합 B2B 플랫폼 동향 파악.',
        tip: '5G 네트워크 슬라이싱 금융 서비스 적용 사례 / Vonage API N2 알림·인증 연동 가능성',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/33994-ericsson',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DAY 3 | Hall 1·4·5 | AI 인프라 + 네트워크
  // ─────────────────────────────────────────
  {
    date: '3월 4일 (수)',
    theme: 'AI 인프라 + 네트워크',
    booths: [
      {
        id: 'd3-ai-summit',
        company: '세션: AI Beyond Boundaries Summit',
        hall: 'Congress Centre (세션룸 번호 사전 확인)',
        time: '09:30',
        duration: '1h',
        category: 'Session',
        description:
          '"AI Drives B2B New Growth" — AI가 B2B 새 성장 동력으로 부상하는 전략 세션. 금융·통신 B2B AI 수익화 모델.',
        tip: 'AI B2B 수익화 모델 / 금융기관 AI 투자 ROI 측정 방식 / 경쟁사 AI 전략 시그널',
        sessionUrl:
          'https://www.mwcbarcelona.com/agenda/sessions/6253-ai-beyond-boundaries-summit-ai-drives-b2b-new-growth',
      },
      {
        id: 'd3-digital-inclusion',
        company: '세션: Business Imperative for Digital Inclusion',
        hall: 'Congress Centre (세션룸 번호 사전 확인)',
        time: '10:00',
        duration: '1h',
        category: 'Session',
        description:
          '디지털 포용성의 비즈니스 당위성. 금융 접근성 확대 전략 — 소외계층 디지털 금융 진입 장벽 해소.',
        tip: '소외계층 디지털 금융 접근성 확대 사례 / 간편인증 대안 수단 / 포용금융 서비스 모델',
        sessionUrl:
          'https://www.mwcbarcelona.com/agenda/sessions/6148-the-business-imperative-for-digital-inclusion',
      },
      {
        id: 'd3-huawei',
        company: 'Huawei',
        hall: 'Hall 1, Stand 1H50',
        time: '11:30',
        duration: '1h',
        category: 'AI',
        description:
          'Huawei AI 클라우드·네트워크 인프라 + 5G/6G 솔루션. 글로벌 통신·AI 기술 동향 파악.',
        tip: 'Huawei AI 클라우드 금융 솔루션 현황 / 5G 네트워크 슬라이싱 B2B 사례 / 해외 N2 인프라 파트너십',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/33678-huawei-technologies-co-ltd',
      },
      {
        id: 'd3-kt',
        company: 'KT Corporation',
        hall: 'Hall 4 (Gwanghwamun Square 테마)',
        time: '13:30',
        duration: '45m',
        category: 'Korean',
        description:
          '광화문 광장 테마 부스 — KT Agentic Fabric(기업 AI OS) + AI Builder·Agentic AICC 솔루션. 이강인 AI 아바타 + AR K-pop 체험.',
        tip: 'KT 기업 AI OS 금융권 적용 가능성 / Agentic AICC 증권 콜센터 자동화 ROI / 협업 구조',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34020-kt-corporation',
      },
      {
        id: 'd3-nvidia',
        company: 'NVIDIA',
        hall: 'Hall 5, AI Advance 존',
        time: '14:30',
        duration: '1h',
        category: 'AI',
        description:
          'NVIDIA AI 인프라 + 텔코·금융 AI 솔루션. GPU 기반 AI 트레이딩·리스크 분석 시스템 데모.',
        tip: 'NVIDIA 금융 AI 파트너 생태계 / AI 트레이딩 시스템 구축 비용·기간 / 온프레미스 vs 클라우드',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34177-nvidia',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DAY 4 | Hall 8 (4YFN) | 스타트업 + 한국 통신사
  // ─────────────────────────────────────────
  {
    date: '3월 5일 (목)',
    theme: 'Hall 8 (4YFN) — 스타트업 + 한국 통신사',
    booths: [
      {
        id: 'd4-4yfn-explore',
        company: '4YFN 전시장 전체 탐색',
        hall: 'Hall 8.0 / 8.1 (4YFN 전용관)',
        time: '09:30',
        duration: '1h',
        category: 'Startup',
        description:
          '4YFN(4 Years From Now) 스타트업 전시 전체 훑기. 930+ 스타트업 중 핀테크·AI·리걸테크 분야 발굴.',
        tip: '한국 투자 유망 스타트업 발굴 / FinTech·AI 분야 집중 탐색 / 명함·QR 수집 목표 10개+',
      },
      {
        id: 'd4-dost',
        company: 'Dost',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '10:00',
        duration: '30m',
        category: 'Startup',
        description:
          '4YFN Top 20 핀테크 스타트업. 금융 접근성 혁신 솔루션. 소외계층 금융 서비스 플랫폼.',
        tip: '투자 유치 현황 및 밸류에이션 / 한국 시장 진출 의향 / 핵심 기술 특허 여부',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/35329-dost',
      },
      {
        id: 'd4-druo',
        company: 'DRUO',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '10:30',
        duration: '30m',
        category: 'Startup',
        description:
          '4YFN Top 20 핀테크 스타트업. 결제·금융 인프라 혁신 솔루션. B2B 금융 API 플랫폼.',
        tip: '기술 스택·특허 현황 / B2B 파트너십 모델 및 수익 구조 / 주요 고객사 레퍼런스',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/35397-druo',
      },
      {
        id: 'd4-kistpay',
        company: 'Kistpay',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '11:00',
        duration: '30m',
        category: 'Startup',
        description:
          '4YFN Top 20 결제 스타트업. 모바일 결제 혁신 솔루션. 크로스보더 결제·환전 효율화.',
        tip: '결제 수수료 혁신 구조 상세 확인 / N2 CMA·환전 서비스 연동 가능성 / 규제 준수 방식',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/35631-kistpay',
      },
      {
        id: 'd4-spendbase',
        company: 'Spendbase',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '11:30',
        duration: '30m',
        category: 'Startup',
        description:
          '4YFN Top 20 지출관리 스타트업. AI 기반 기업 지출 최적화 플랫폼. SaaS 비용 관리 자동화.',
        tip: '법인 자산관리 서비스 연동 가능성 / N2 기업 고객 대상 서비스 협력 방안 논의',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/35337-spendbase-at-4yfn',
      },
      {
        id: 'd4-pitching',
        company: '세션: Best Startup at 4YFN 2026 피칭',
        hall: 'Hall 8.0 / 8.1, 4YFN 메인 스테이지',
        time: '12:00',
        duration: '2h',
        category: 'Session',
        description:
          '4YFN 최고 스타트업 결선 피칭 + ESADE Choice Award. 글로벌 핀테크·AI 스타트업 Top 20 경쟁 현장 직관.',
        tip: '우승 스타트업 기술 방향성 분석 / 투자 유망 기업 최종 리스트 확정 / 연락처 확보',
        sessionUrl:
          'https://www.mwcbarcelona.com/agenda/sessions/6025-startup-pitching-session-challenge-esades-choice-best-startup-at-4yfn-2026',
      },
      {
        id: 'd4-skt',
        company: 'SK Telecom',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '14:00',
        duration: '45m',
        category: 'Korean',
        description:
          '"AI for Infinite Possibilities" — A.X K1 하이퍼스케일 AI 모델 라이브 데모. AI 인프라·서비스 풀스택 전략. 에이닷(A.) 글로벌 확장 비전.',
        tip: 'SKT AI 인프라 B2B 협업 모델 / 통신-금융 AI 데이터 연동 가능성 / A.X K1 활용 증권 시나리오',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34430-sk-telecom-at-4yfn',
      },
      {
        id: 'd4-lguplus',
        company: 'LG Uplus',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '15:00',
        duration: '45m',
        category: 'Korean',
        description:
          '"Humanizing Every Connection" — Ixi-O Pro AI 콜 에이전트 체험. 통화·문자·일정 데이터 통합 이해 AI. 한국 AI 스타트업 10개사 공동 전시.',
        tip: 'Ixi-O Pro 증권 고객 상담 자동화 적용 가능성 / LG U+ AI 스타트업 생태계 파트너십 탐색',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34475-lg-uplus-corp-at-4yfn',
      },
      {
        id: 'd4-dt-hubraum',
        company: 'Deutsche Telekom HUBraum',
        hall: 'Hall 8.0 / 8.1, 4YFN',
        time: '15:55',
        duration: '45m',
        category: 'Startup',
        description:
          'Deutsche Telekom HUBraum 혁신·투자 프로그램. 글로벌 스타트업 육성 생태계 + 텔코-스타트업 협업 모델.',
        tip: '투자 포트폴리오 핀테크 기업 현황 / 한국 스타트업 해외 진출 협력 프로그램 확인',
        boothUrl: 'https://www.mwcbarcelona.com/exhibitors/34472-deutsche-telekom-hubraum-at-4yfn',
      },
    ],
  },
]
