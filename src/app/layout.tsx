import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

const DESCRIPTION = 'Technician & Cybersecurity Researcher — patent holder, bug bounty researcher (CVE-2017-17309). Machine-readable CV at /cv.json.';

export const metadata: Metadata = {
    metadataBase: new URL('https://ahmetmersin.com'),
    title: 'Ahmet Mersin | CV',
    description: DESCRIPTION,
    alternates: {
        canonical: '/',
        types: {
            'application/json': [{ url: '/cv.json', title: 'Machine-readable CV (JSON)' }],
            'text/plain': [{ url: '/llms.txt', title: 'Machine-readable CV (llms.txt)' }],
        },
    },
    openGraph: {
        type: 'profile',
        title: 'Ahmet Mersin | CV',
        description: DESCRIPTION,
        url: 'https://ahmetmersin.com/',
        siteName: 'Ahmet Mersin',
        images: [{ url: '/profile.jpg', width: 340, height: 400, alt: 'Ahmet Mersin' }],
    },
    twitter: {
        card: 'summary',
        title: 'Ahmet Mersin | CV',
        description: DESCRIPTION,
        images: ['/profile.jpg'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
