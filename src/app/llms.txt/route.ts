import { buildCvMarkdown } from '../../data/cv';

// llms.txt — plain-text/Markdown rendering for AI agents and crawlers.
export const dynamic = 'force-static';

export function GET() {
    const header = [
        '# Ahmet Mersin — Machine-readable CV (llms.txt)',
        '',
        'This document is an AI/agent-friendly rendering of the CV at https://ahmetmersin.com/',
        'Structured JSON is available at https://ahmetmersin.com/cv.json',
        '',
        '---',
        '',
    ].join('\n');

    const body =
        header +
        buildCvMarkdown('en') +
        '\n\n---\n\n## Türkçe\n\n' +
        buildCvMarkdown('tr');

    return new Response(body, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'access-control-allow-origin': '*',
            'cache-control': 'public, max-age=3600',
        },
    });
}
