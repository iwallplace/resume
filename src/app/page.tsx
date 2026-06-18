"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <button className="print-button" style={{ opacity: 0.5 }}>Loading...</button> }
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

    // Always-present structured data so crawlers/agents read it without toggling.
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

    const isMachineLabel = lang === 'tr'
        ? { human: 'İNSAN', machine: 'MAKİNE' }
        : { human: 'HUMAN', machine: 'MACHINE' };

    const machineCopy = lang === 'tr'
        ? {
            heading: 'Makine-Okunur Görünüm',
            intro: 'Bu CV, yapay zeka ajanlarının ve crawler\'ların okuyabilmesi için yapısal formata dönüştürülmüştür. Aşağıdaki veriyi kopyalayabilir veya doğrudan uç noktalara erişebilirsiniz.',
            copy: 'Kopyala',
            copied: 'Kopyalandı ✓',
            tabs: { json: 'JSON', markdown: 'Markdown (llms.txt)', jsonld: 'JSON-LD (schema.org)' },
            endpoints: 'Doğrudan erişim:',
        }
        : {
            heading: 'Machine-Readable View',
            intro: 'This CV has been converted into structured formats that AI agents and crawlers can read. Copy the data below, or fetch the endpoints directly.',
            copy: 'Copy',
            copied: 'Copied ✓',
            tabs: { json: 'JSON', markdown: 'Markdown (llms.txt)', jsonld: 'JSON-LD (schema.org)' },
            endpoints: 'Direct access:',
        };

    return (
        <div className="cv-container">
            {/* Structured data for search engines & AI agents */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: personJsonLd }}
            />

            <div className="language-switcher">
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

            {view === 'human' ? (
                <>
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="profile-image-container">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profile.jpg"
                                alt="Ahmet Mersin"
                                className="profile-image"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/340x400?text=Profile+Photo';
                                }}
                            />
                        </div>

                        <section>
                            <h2 className="section-title-sidebar">{t.contact}</h2>
                            <div className="contact-list">
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <a href="mailto:intra@outlook.com.tr">intra@outlook.com.tr</a>
                                </div>

                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                    <a href="https://ahmetmersin.com" target="_blank" rel="noopener noreferrer">ahmetmersin.com</a>
                                </div>
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    <a href="https://www.linkedin.com/in/ahmetmersin/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                </div>
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    <a href="https://hackerone.com/iwallplace" target="_blank" rel="noopener noreferrer">HackerOne</a>
                                </div>
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                    <a href="https://app.letsdefend.io/user/ahmetmersin" target="_blank" rel="noopener noreferrer">LetsDefend</a>
                                </div>
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                    <a href="https://medium.com/@iwallplace" target="_blank" rel="noopener noreferrer">Medium</a>
                                </div>
                                <div className="contact-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    <a href="https://www.exploit-db.com/exploits/42634" target="_blank" rel="noopener noreferrer">Exploit-DB</a>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="section-title-sidebar">{t.knowHow}</h2>
                            <ul className="list-sidebar">
                                {profile.skills.map((skill, idx) => (
                                    <li key={idx}>{skill}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="section-title-sidebar">{t.certificates}</h2>
                            <ul className="list-sidebar">
                                {t.certList.map((cert, idx) => (
                                    <li key={idx}>{cert}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="section-title-sidebar">{t.education}</h2>
                            {t.educationList.map((edu, idx) => (
                                <div key={idx} className="education-item" style={{ marginTop: idx > 0 ? '15px' : '0' }}>
                                    <h4>{edu.school}</h4>
                                    <p>{edu.degree}</p>
                                    <p>{edu.dates}</p>
                                </div>
                            ))}
                        </section>
                    </aside>

                    {/* Main Content */}
                    <main className="main-content">
                        <div className="cover-photo-container">
                            <img
                                src="/cover.jpg"
                                alt="1927 Solvay Conference - Famous Scientists"
                                className="cover-photo"
                            />
                        </div>
                        <header className="header">
                            <h1 className="name">AHMET MERSİN</h1>
                            <div className="title-box">
                                {t.title}
                            </div>
                            <div className="summary-section" style={{ marginTop: '30px', color: 'var(--text-secondary)', fontSize: '1.05rem', fontStyle: 'italic', borderLeft: '4px solid var(--accent-color)', paddingLeft: '20px' }}>
                                {t.summary}
                            </div>
                        </header>

                        <section style={{ marginBottom: '40px' }}>
                            <div className="section-header-wrap">
                                <h2 className="section-title-main">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
                                        <path d="M12 15L15 12L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    {t.achievements}
                                </h2>
                            </div>
                            <div className="achievements-grid">
                                {t.notablePoints.map((point, idx) => (
                                    <div key={idx} className="achievement-card">
                                        <h3>{point.title}</h3>
                                        <p>{point.desc}</p>
                                        {point.link && (
                                            <a href={point.link} target="_blank" rel="noopener noreferrer" className="news-link">
                                                {t.viewMedia}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section style={{ marginBottom: '40px' }}>
                            <div className="section-header-wrap">
                                <h2 className="section-title-main">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
                                        <circle cx="12" cy="8" r="6"></circle>
                                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                                    </svg>
                                    {t.patentsTitle}
                                </h2>
                            </div>
                            <div className="achievements-grid">
                                {t.patents.map((p, idx) => (
                                    <div key={idx} className="achievement-card patent-card">
                                        <span className="patent-tag">{p.kind}</span>
                                        <h3>{p.name} — {p.title}</h3>
                                        <p className="patent-id">{p.identifier}</p>
                                        {p.dates && <p className="patent-id">{p.dates}</p>}
                                        {p.scope && <p>{p.scope}</p>}
                                        {p.link && (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="news-link">
                                                {t.viewPatent}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="section-header-wrap">
                                <h2 className="section-title-main">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
                                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {t.workExperience}
                                </h2>
                            </div>

                            {t.experiences.map((exp, idx) => (
                                <div key={idx} className="experience-item">
                                    <div className="job-role">{exp.role}</div>
                                    <div className="company-info">{exp.company}</div>
                                    <ul className="experience-list">
                                        {exp.tasks.map((task, tidx) => (
                                            <li key={tidx}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </main>
                </>
            ) : (
                /* Machine-readable view */
                <main className="machine-view">
                    <div className="machine-head">
                        <span className="machine-badge">{'</>'} AI · AGENT READABLE</span>
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

            {/* Human / Machine toggle */}
            <div className="mode-switcher">
                <button
                    className={`mode-btn ${view === 'human' ? 'active' : ''}`}
                    onClick={() => setView('human')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {isMachineLabel.human}
                </button>
                <button
                    className={`mode-btn ${view === 'machine' ? 'active' : ''}`}
                    onClick={() => setView('machine')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"></rect><line x1="8" y1="20" x2="16" y2="20"></line><line x1="12" y1="16" x2="12" y2="20"></line><path d="M9 9l-2 2 2 2"></path><path d="M15 9l2 2-2 2"></path></svg>
                    {isMachineLabel.machine}
                </button>
            </div>

            <div className="print-button-container">
                <PDFDownloadLink
                    document={<CVDocument t={t} />}
                    fileName={`Ahmet_Mersin_CV_${lang.toUpperCase()}.pdf`}
                    className="print-button"
                    style={{ textDecoration: 'none' }}
                >
                    {({ loading }) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            {loading ? 'Generating...' : t.downloadPdf}
                        </div>
                    )}
                </PDFDownloadLink>
            </div>
        </div >
    );
}
