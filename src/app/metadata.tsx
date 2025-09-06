import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://teamzza.co.kr'),
  title: 'Teamzza - 팀짜',
  description: `플레이어 입력만으로 손쉽게 다양한 방식의 팀 구성이 가능합니다.  
                직관적인 UI와 편리한 기능을 통해 사용자 맞춤형 팀 조합이 가능하며,  
                무작위 또는 사용자가 설정한 밸런스에 따라 팀을 분리하여 구성해주는 서비스입니다.`,   
  icons: {
    icon: '/dice.png',
  },
  alternates: {
    canonical: 'https://teamzza.co.kr/',
  },
  openGraph: {
    title: 'Teamzza - 팀짜',
    description: `편리한 UI와 기능으로 팀을 구성하세요!`,
    url: 'https://www.teamzza.co.kr/',
    siteName: 'Teamzza - 팀짜',
    images: [
      {
        url: '/dice.png',
        width: 1200,
        height: 630,
        alt: 'Teamzza OG Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teamzza - 팀짜',
    description: '편리한 UI와 기능으로 팀을 구성하세요!',
    images: ['/dice.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
