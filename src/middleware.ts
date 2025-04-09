import { NextRequest, NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();

  // Apply global cache headers for all pages
  res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');

  return res;
}

// Apply caching globally to all pages
export const config = {
  matcher: '/:path*', // Matches all routes
};
