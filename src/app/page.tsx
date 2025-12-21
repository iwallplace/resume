"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <button className="print-button" style={{ opacity: 0.5 }}>Loading...</button> }
);
import CVDocument from '../components/CVDocument';

const translations = {
    en: {
        title: "Technician & Cybersecurity Researcher",
        contact: "CONTACT",
        knowHow: "KNOW HOW",
        certificates: "CERTIFICATES",
        education: "EDUCATION",
        workExperience: "WORK EXPERIENCE",
        achievements: "NOTABLE ACHIEVEMENTS & MEDIA",
        downloadPdf: "Download PDF",
        viewMedia: "View News →",
        summary: '"I have gained experience working at the world\'s largest energy and automation company and Europe\'s leading home appliances manufacturer. I identified security vulnerabilities in assets belonging to global giants and earned awards. Throughout these processes, I have developed strong collaboration skills by working with diverse teams."',
        notablePoints: [
            {
                title: "Huawei Router Critical Vulnerability (CVE-2017-17309 / EDB-ID: 42634)",
                desc: "Discovered and reported a critical security vulnerability in Huawei HG255s routers.",
                link: "https://www.huawei.com/en/psirt/security-notices/2017/huawei-sn-20170911-01-hg255s-en"
            },
            {
                title: "Dutch Central Bank (DNB)",
                desc: "Received official reference postmail for vulnerability discovery."
            },
            {
                title: "Hürriyet Media - Vulnerability Hunter",
                desc: 'Featured in national media for discovering security vulnerabilities.',
                link: "https://www.hurriyet.com.tr/ekonomi/acik-avcisi-20-yasindaki-mersin-dunya-devlerinin-guvenlik-aciklarini-ortaya-cikardi-41109630"
            },
            {
                title: "Global Security Research",
                desc: "Discovered and reported vulnerabilities in industry giants such as U.S. Dept Of Defense, General Motors, Uber, Yahoo, Yandex, Bosch, and many more."
            }
        ],
        experiences: [
            {
                role: "IME TECHNICIAN",
                company: "Schneider Electric | Manisa | 06.2025 - Present",
                tasks: [
                    "Developed software and macros to improve personnel efficiency and optimize workflows.",
                    "Managed the full lifecycle of corporate IT & Smart Factory systems, including planning, procurement, installation, and technical support processes.",
                    "Performed cybersecurity risk analyses for Industrial Control Systems (ICS) and SCADA environments in the production area; prepared technical reports containing vulnerabilities and recommendations for improvement."
                ]
            },
            {
                role: "R&D TECHNICIAN",
                company: "BEKO | 01.2024 - 06.2025",
                tasks: [
                    "Managed projects by applying Agile principles, tracked internal team tasks via Jira, and optimized workflows.",
                    "Demonstrated knowledge of Teamcenter and SAP software; managed product lifecycles from concept to end-of-service.",
                    "Proposed process improvements by conducting comprehensive data analyses on SMM, BOM, and business processes using Excel pivot tables."
                ]
            },
            {
                role: "HVAC TECHNICIAN",
                company: "Tor Demir Metal | Manisa | 07.2021 - 10.2023",
                tasks: [
                    "Preparation of prototypes and guidelines for mass production stages.",
                    "Optimized technical production processes and ensured maximum machinery uptime."
                ]
            },
            {
                role: "HVAC TECHNICIAN",
                company: "Termokar | Manisa | 08.2019 - 04.2021",
                tasks: [
                    "Control of production processes and operational quality.",
                    "Ensured rigorous quality control standards across assembly lines."
                ]
            },
            {
                role: "IT & CYBERSECURITY INTERN",
                company: "Balıkesir University, IT Department | 01.2019 - 06.2019",
                tasks: [
                    "Acquired hands-on expertise in network administration and enterprise security monitoring within a large-scale academic environment."
                ]
            },
            {
                role: "CYBERSECURITY RESEARCHER",
                company: "HackerOne / Bugcrowd | 01.2015 - Present",
                tasks: [
                    "Identified security vulnerabilities in various web services and digital assets through bug bounty programs.",
                    "Analyzed discovered vulnerabilities and prepared detailed, clear security reports.",
                    "Contributed to increasing corporate security levels by providing actionable recommendations for closing vulnerabilities."
                ]
            }
        ],
        educationList: [
            { school: "ANADOLU UNIVERSITY", degree: "Computer Programming (Associate Degree)", dates: "2024 - 2026" },
            { school: "ANADOLU UNIVERSITY", degree: "Occupational Health and Safety (Associate Degree)", dates: "2021 - 2023" },
            { school: "BALIKESİR UNIVERSITY", degree: "Air Conditioning & Refrigeration Tech (Associate Degree)", dates: "2016 - 2019" }
        ],
        certList: [
            "Foundations of Cybersecurity / Google",
            "Web & Network Security / HackerOne",
            "SOC Analyst Learning Path / LetsDefend",
            "SIEM Engineer / LetsDefend",
            "Cybersecurity for Schneider Electric",
            "Siemens NX Modelling 2206 / Arçelik Akademi",
            "Cybersecurity School / Coderspace"
        ]
    },
    tr: {
        title: "Teknisyen & Siber Güvenlik Araştırmacısı",
        contact: "İLETİŞİM",
        knowHow: "BİLGİ BİRİKİMİ",
        certificates: "SERTİFİKALAR",
        education: "EĞİTİM",
        workExperience: "İŞ DENEYİMİ",
        achievements: "ÖNEMLİ BAŞARILAR & MEDYA",
        downloadPdf: "PDF İndir",
        viewMedia: "Haberi Görüntüle →",
        summary: '"Dünyanın en büyük enerji ve otomasyon şirketi ve Avrupa\'nın en büyük beyaz eşya üreticisinde çalışma deneyimine sahibim. Dünya devlerine ait varlıklarda güvenlik açıkları buldum ve ödüller kazandım. Bu süreçlerde birçok farklı insanla ve takımla uyum içinde çalışma fırsatı buldum."',
        notablePoints: [
            {
                title: "Huawei Router Kritik Zafiyet (CVE-2017-17309 / EDB-ID: 42634)",
                desc: "Huawei HG255s routerlarda kritik güvenlik zafiyeti tespit edilip raporlanmıştır.",
                link: "https://www.huawei.com/en/psirt/security-notices/2017/huawei-sn-20170911-01-hg255s-en"
            },
            {
                title: "Hollanda Merkez Bankası (DNB)",
                desc: "Zafiyet keşfi için resmi referans mektubu almıştır."
            },
            {
                title: "Hürriyet Gazetesi - Açık Avcısı",
                desc: 'Güvenlik açığı keşifleriyle ulusal medyada yer almıştır.',
                link: "https://www.hurriyet.com.tr/ekonomi/acik-avcisi-20-yasindaki-mersin-dunya-devlerinin-guvenlik-aciklarini-ortaya-cikardi-41109630"
            },
            {
                title: "Global Güvenlik Araştırmaları",
                desc: "U.S. Dept Of Defense, General Motors, Uber, Yahoo, Yandex, Bosch ve çok daha fazlası gibi endüstri devlerinde zafiyetler tespit edilip raporlanmıştır."
            }
        ],
        experiences: [
            {
                role: "IME TEKNİSYENİ",
                company: "Schneider Electric | Manisa | 06.2025 - Güncel",
                tasks: [
                    "Personel verimliliğini artırmak ve iş akışlarını optimize etmek için yazılımlar ve makrolar geliştirdi.",
                    "Kurumsal BT ve Akıllı Fabrika sistemlerinin planlama, tedarik, kurulum ve teknik destek süreçlerini koordine etti.",
                    "Üretim alanındaki Endüstriyel Kontrol Sistemleri (ICS) ve SCADA ortamları için siber güvenlik risk analizleri yaptı; zafiyet ve iyileştirme önerileri içeren teknik raporlar hazırladı."
                ]
            },
            {
                role: "AR-GE TEKNİSYENİ",
                company: "BEKO | 01.2024 - 06.2025",
                tasks: [
                    "Agile ilkelerini uygulayarak projeleri yönetti, ekip içi görevleri Jira üzerinden takip etti ve iş akışlarını optimize etti.",
                    "Teamcenter ve SAP yazılımlarını kullanarak ürün yaşam döngüsü yönetim süreçlerini yürüttü.",
                    "SMM, BOM ve iş süreçleri üzerinde kapsamlı veri analizleri yaparak Excel pivot tabloları ile süreç iyileştirme önerileri sundu."
                ]
            },
            {
                role: "İKLİMLENDİRME TEKNİSYENİ",
                company: "Tor Demir Metal | Manisa | 07.2021 - 10.2023",
                tasks: [
                    "Prototip hazırlanması ve seri üretim aşamaları için klavuz hazırlanması.",
                    "Teknik üretim süreçlerini optimize etti ve makine kullanım sürelerini maksimize etti."
                ]
            },
            {
                role: "İKLİMLENDİRME TEKNİSYENİ",
                company: "Termokar | Manisa | 08.2019 - 04.2021",
                tasks: [
                    "Üretim süreçlerinin kontrolü.",
                    "Montaj hatlarında sıkı kalite kontrol standartlarını sağladı."
                ]
            },
            {
                role: "BT & SİBER GÜVENLİK STAJYERİ",
                company: "Balıkesir Üniversitesi, BT Daire Başkanlığı | 01.2019 - 06.2019",
                tasks: [
                    "Akademik ortamlarda ağ yönetimi ve güvenlik izleme konularında uygulamalı deneyim kazandı."
                ]
            },
            {
                role: "SİBER GÜVENLİK ARAŞTIRMACISI",
                company: "HackerOne / Bugcrowd | 01.2015 - Güncel",
                tasks: [
                    "Bug bounty programları aracılığıyla çeşitli web servisleri ve dijital varlıklardaki güvenlik açıklarını tespit etti.",
                    "Tespit edilen zafiyetleri analiz ederek detaylı ve anlaşılır güvenlik raporları hazırladı.",
                    "Zafiyetlerin kapatılması için uygulanabilir öneriler sunarak kurumsal güvenlik seviyelerine katkıda bulundu."
                ]
            }
        ],
        educationList: [
            { school: "ANADOLU ÜNİVERSİTESİ", degree: "Bilgisayar Programcılığı (Önlisans)", dates: "2024 - 2026" },
            { school: "ANADOLU ÜNİVERSİTESİ", degree: "İş Sağlığı ve Güvenliği (Önlisans)", dates: "2021 - 2023" },
            { school: "BALIKESİR ÜNİVERSİTESİ", degree: "İklimlendirme ve Soğutma Teknolojileri (Önlisans)", dates: "2016 - 2019" }
        ],
        certList: [
            "Siber Güvenliğin Temelleri / Google",
            "Web & Ağ Güvenliği / HackerOne",
            "SOC Analisti Öğrenim Yolu / LetsDefend",
            "SIEM Mühendisi / LetsDefend",
            "Schneider Electric için Siber Güvenlik",
            "Siemens NX Modelleme 2206 / Arçelik Akademi",
            "Siber Güvenlik Okulu / Coderspace"
        ]
    }
};

export default function CVPage() {
    const [lang, setLang] = useState<'en' | 'tr'>('en');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = translations[lang];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="cv-container">
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
                        <li>MITRE ATT&CK / OSI Model TCP/IP</li>
                        <li>Wireshark Expert / Network Analysis</li>
                        <li>Dynamic Malware Analysis</li>
                        <li>Web app pentest & Burp - İnvicti</li>
                        <li>Network pentest & Nessus - Claroty</li>
                        <li>SIEM Engineer & IBM Qradar-Wazuh</li>
                        <li>Cyber Threat Intelligence / SDLC</li>
                        <li>Siemens NX Modelling 2206 / Arçelik Akademi</li>
                        <li>SAP & Teamcenter Lifecycle Management</li>
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
