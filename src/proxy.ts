import { NextRequest, NextResponse } from 'next/server';

// Content negotiation: when an AI agent / API client requests the root with
// `Accept: application/json` (and not text/html), serve the structured CV
// instead of the HTML page. Browsers (which send text/html) are unaffected.
export function proxy(req: NextRequest) {
    const accept = req.headers.get('accept') || '';
    const wantsJson = accept.includes('application/json') && !accept.includes('text/html');

    if (req.nextUrl.pathname === '/' && wantsJson) {
        return NextResponse.rewrite(new URL('/cv.json', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/',
};
