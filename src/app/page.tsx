"use client";

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <button className="mode-btn" style={{ opacity: 0.55 }}>PDF</button> }
);

import CVDocument from '../components/CVDocument';
import {
    profile,
    translations,
    buildCvJson,
    buildCvMarkdown,
    buildPersonJsonLd,
    type Lang,
} from '../data/cv';

type View = 'human' | 'machine';
type MachineTab = 'json' | 'markdown' | 'jsonld';

type ContactType = (typeof profile.contacts)[number]['type'];

const visibleContactTypes = new Set<ContactType>([
    'email',
    'website',
    'linkedin',
    'hackerone',
    'letsdefend',
    'medium',
    'exploit-db',
]);

function ContactIcon({ type }: { type: ContactType }) {
    const shared = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
    };

    if (type === 'email') {
        return <svg {...shared}><path d="M4 5h16v14H4z" /><path d="m4 7 8 6 8-6" /></svg>;
    }

    if (type === 'website') {
        return <svg {...shared}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21" /><path d="M12 3c-2.2 2.4-3.4 5.4-3.4 9S9.8 18.6 12 21" /></svg>;
    }

    if (type === 'linkedin') {
        return <svg {...shared}><path d="M6.5 10v8" /><path d="M6.5 6v.01" /><path d="M10.5 18v-4.6c0-2.1 1.2-3.4 3.1-3.4 1.8 0 3.1 1.1 3.1 3.5V18" /><path d="M10.5 10v8" /></svg>;
    }

    if (type === 'hackerone') {
        return <svg {...shared}><path d="M7 5v14" /><path d="M17 5v14" /><path d="M7 12h10" /><path d="M12 5v14" /></svg>;
    }

    if (type === 'letsdefend') {
        return <svg {...shared}><path d="M3 12h4l2-5 5 10 2-5h5" /></svg>;
    }

    if (type === 'medium') {
        return <svg {...shared}><path d="M5 18V6l5.2 8L15.5 6v12" /><path d="M19 7v10" /></svg>;
    }

    return <svg {...shared}><path d="M12 3 5 6v6c0 4.6 3.1 7.6 7 9 3.9-1.4 7-4.4 7-9V6z" /><path d="m9.5 12 1.7 1.7 3.8-4" /></svg>;
}

function splitCompany(company: string) {
    const [organization, locationOrPeriod, maybePeriod] = company.split('|').map((part) => part.trim());
    return {
        organization,
        location: maybePeriod ? locationOrPeriod : '',
        period: maybePeriod ?? locationOrPeriod ?? '',
    };
}

function referenceFor(point: { link?: string; links?: { label: string; url: string }[] }) {
    if (point.links?.length) return point.links[0];
    if (point.link) return { label: 'View News', url: point.link };
    return null;
}

export default function CVPage() {
    const [lang, setLang] = useState<Lang>('en');
    const [view, setView] = useState<View>('human');
    const [machineTab, setMachineTab] = useState<MachineTab>('json');
    const [copied, setCopied] = useState(false);
    const [, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = translations[lang];
    const contacts = profile.contacts.filter((contact) => visibleContactTypes.has(contact.type));

    const ui = lang === 'tr'
        ? {
            achievements: 'BAŞARILAR',
            patents: 'PATENTLER',
            experience: 'DENEYİM',
            education: 'EĞİTİM',
            human: 'CV',
            machine: 'MAKİNE',
            pdf: 'PDF',
        }
        : {
            achievements: 'ACHIEVEMENTS',
            patents: 'PATENTS',
            experience: 'EXPERIENCE',
            education: 'EDUCATION',
            human: 'CV',
            machine: 'MACHINE',
            pdf: 'PDF',
        };

    const personJsonLd = useMemo(() => JSON.stringify(buildPersonJsonLd(lang)), [lang]);

    const machineText = useMemo(() => {
        if (machineTab === 'markdown') return buildCvMarkdown(lang);
        if (machineTab === 'jsonld') return JSON.stringify(buildPersonJsonLd(lang), null, 2);
        return JSON.stringify(buildCvJson(lang), null, 2);
    }, [machineTab, lang]);

    useEffect(() => {
        setCopied(false);
    }, [machineText]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(machineText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable */
        }
    };

    const machineCopy = lang === 'tr'
        ? {
            heading: 'Makine-Okunur Görünüm',
            intro: 'Bu CV, yapay zeka ajanlarının ve crawler\'ların okuyabilmesi için yapısal formata dönüştürülmüştür.',
            copy: 'Kopyala',
            copied: 'Kopyalandı',
            tabs: { json: 'JSON', markdown: 'Markdown', jsonld: 'JSON-LD' },
            endpoints: 'Doğrudan erişim:',
        }
        : {
            heading: 'Machine-Readable View',
            intro: 'This CV is also available in structured formats for AI agents, crawlers, and verification workflows.',
            copy: 'Copy',
            copied: 'Copied',
            tabs: { json: 'JSON', markdown: 'Markdown', jsonld: 'JSON-LD' },
            endpoints: 'Direct access:',
        };

    return (
        <div className={`cv-container ${view === 'machine' ? 'is-machine' : ''}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: personJsonLd }}
            />

            <div className="language-switcher" aria-label="Language">
                <button
                    className={`lang-btn ${lang === 'tr' ? 'active' : ''}`}
                    onClick={() => setLang('tr')}
                >
                    TR
                </button>
                <button
                    className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => setLang('en')}
                >
                    EN
                </button>
            </div>

            <div className="mode-switcher" aria-label="CV controls">
                <button
                    className={`mode-btn ${view === 'human' ? 'active' : ''}`}
                    onClick={() => setView('human')}
                >
                    {ui.human}
                </button>
                <button
                    className={`mode-btn ${view === 'machine' ? 'active' : ''}`}
                    onClick={() => setView('machine')}
                >
                    {ui.machine}
                </button>
                <PDFDownloadLink
                    document={<CVDocument t={t} />}
                    fileName={`Ahmet_Mersin_CV_${lang.toUpperCase()}.pdf`}
                    className="mode-btn"
                    style={{ textDecoration: 'none' }}
                >
                    {({ loading }) => loading ? '...' : ui.pdf}
                </PDFDownloadLink>
            </div>

            {view === 'human' ? (
                <>
                    <aside className="sidebar">
                        <div className="profile-image-container">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profile.jpg"
                                alt="Ahmet Mersin"
                                className="profile-image"
                            />
                        </div>

                        <section className="sidebar-section">
                            <h2 className="section-title-sidebar">{t.contact}</h2>
                            <div className="contact-list">
                                {contacts.map((contact) => (
                                    <a
                                        key={contact.type}
                                        className="contact-item"
                                        href={contact.url}
                                        target={contact.type === 'email' ? undefined : '_blank'}
                                        rel={contact.type === 'email' ? undefined : 'noopener noreferrer'}
                                    >
                                        <ContactIcon type={contact.type} />
                                        <span>{contact.label}</span>
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section className="sidebar-section">
                            <h2 className="section-title-sidebar">{lang === 'tr' ? 'TEMEL YETKİNLİKLER' : 'CORE SKILLS'}</h2>
                            <ul className="sidebar-list">
                                {profile.skills.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="sidebar-section">
                            <h2 className="section-title-sidebar">{t.certificates}</h2>
                            <ul className="sidebar-list">
                                {t.certList.map((cert) => (
                                    <li key={cert}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                    </aside>

                    <main className="main-content">
                        <header className="hero">
                            <h1 className="name">AHMET MERSIN</h1>
                            <p className="role-title">{t.title}</p>
                            <blockquote className="summary-section">{t.summary}</blockquote>
                        </header>

                        <section className="resume-section">
                            <h2 className="section-title-main">{ui.achievements}</h2>
                            <div className="simple-list">
                                {t.notablePoints.map((point) => {
                                    const ref = referenceFor(point);

                                    return (
                                        <article key={point.title} className="simple-row">
                                            <span className="row-marker" aria-hidden="true" />
                                            <div className="row-copy">
                                                <h3>{point.title}</h3>
                                                <p>{point.desc}</p>
                                            </div>
                                            {ref && (
                                                <a className="row-link" href={ref.url} target="_blank" rel="noopener noreferrer">
                                                    {point.links?.length ? ref.label : t.viewMedia}
                                                </a>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2 className="section-title-main">{ui.patents}</h2>
                            <div className="simple-list">
                                {t.patents.map((patent) => (
                                    <article key={patent.name} className="simple-row">
                                        <span className="row-marker" aria-hidden="true" />
                                        <div className="row-copy">
                                            <h3>{patent.name} — {patent.title}</h3>
                                            <p>{patent.identifier}{patent.scope ? ` · ${patent.scope}` : ''}</p>
                                        </div>
                                        {patent.link && (
                                            <a className="row-link" href={patent.link} target="_blank" rel="noopener noreferrer">
                                                {t.viewPatent}
                                            </a>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2 className="section-title-main">{ui.experience}</h2>
                            <div className="timeline-list">
                                {t.experiences.map((exp) => {
                                    const company = splitCompany(exp.company);

                                    return (
                                        <article key={`${exp.role}-${exp.company}`} className="timeline-item">
                                            <div className="timeline-date">{company.period}</div>
                                            <div className="timeline-copy">
                                                <h3>{exp.role}</h3>
                                                <p className="timeline-company">
                                                    {company.organization}{company.location ? ` · ${company.location}` : ''}
                                                </p>
                                                <ul className="timeline-tasks">
                                                    {exp.tasks.map((task) => (
                                                        <li key={task}>{task}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2 className="section-title-main">{ui.education}</h2>
                            <div className="timeline-list compact">
                                {t.educationList.map((edu) => (
                                    <article key={`${edu.school}-${edu.dates}`} className="timeline-item">
                                        <div className="timeline-date">{edu.dates}</div>
                                        <div className="timeline-copy">
                                            <h3>{edu.school}</h3>
                                            <p>{edu.degree}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </main>
                </>
            ) : (
                <main className="machine-view">
                    <div className="machine-head">
                        <span className="machine-badge">AI · AGENT READABLE</span>
                        <h2>{machineCopy.heading}</h2>
                        <p>{machineCopy.intro}</p>
                    </div>

                    <div className="machine-tabs">
                        {(['json', 'markdown', 'jsonld'] as MachineTab[]).map((tab) => (
                            <button
                                key={tab}
                                className={`machine-tab ${machineTab === tab ? 'active' : ''}`}
                                onClick={() => setMachineTab(tab)}
                            >
                                {machineCopy.tabs[tab]}
                            </button>
                        ))}
                        <button className="machine-copy" onClick={handleCopy}>
                            {copied ? machineCopy.copied : machineCopy.copy}
                        </button>
                    </div>

                    <pre className="machine-code"><code>{machineText}</code></pre>

                    <div className="machine-endpoints">
                        <span>{machineCopy.endpoints}</span>
                        <a href="/cv.json" target="_blank" rel="noopener noreferrer">/cv.json</a>
                        <a href="/llms.txt" target="_blank" rel="noopener noreferrer">/llms.txt</a>
                    </div>
                </main>
            )}
        </div>
    );
}
