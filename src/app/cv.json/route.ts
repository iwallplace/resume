import { buildCvJson } from '../../data/cv';

// Agent-friendly structured CV. Fetchable directly at /cv.json
export const dynamic = 'force-static';

export function GET() {
    const body = {
        format: 'machine-readable-cv',
        version: '1.0',
        default: 'en',
        languages: {
            en: buildCvJson('en'),
            tr: buildCvJson('tr'),
        },
    };

    return new Response(JSON.stringify(body, null, 2), {
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'access-control-allow-origin': '*',
            'cache-control': 'public, max-age=3600',
        },
    });
}
