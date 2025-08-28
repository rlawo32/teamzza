import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // www로 시작하면 www 제거하고 non-www로 리디렉션
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace('www.', '')
    return NextResponse.redirect(url, 301)  // 301 영구 리디렉션
  }

  // www가 없으면 그냥 통과
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*', // 모든 경로에 적용
}
