// ---------------------------------------------------------------------------
// Single source of truth for the CV.
// Both the human-facing page and the machine-readable outputs
// (JSON-LD, /cv.json, /llms.txt, the in-page "MACHINE" view) are derived
// from the data in this module.
// ---------------------------------------------------------------------------

export type Lang = 'en' | 'tr';

// Language-independent identity / contact / skills.
export const profile = {
    name: 'Ahmet Mersin',
    email: 'hestiases@gmail.com',
    website: 'https://ahmetmersin.com',
    location: { city: 'Manisa', country: 'Türkiye', countryCode: 'TR' },
    contacts: [
        { type: 'email', label: 'hestiases@gmail.com', url: 'mailto:hestiases@gmail.com' },
        { type: 'website', label: 'ahmetmersin.com', url: 'https://ahmetmersin.com' },
        { type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmetmersin/' },
        { type: 'github', label: 'GitHub', url: 'https://github.com/iwallplace' },
        { type: 'hackerone', label: 'HackerOne', url: 'https://hackerone.com/iwallplace' },
        { type: 'letsdefend', label: 'LetsDefend', url: 'https://app.letsdefend.io/user/ahmetmersin' },
        { type: 'medium', label: 'Medium', url: 'https://medium.com/@iwallplace' },
        { type: 'exploit-db', label: 'Exploit-DB', url: 'https://www.exploit-db.com/exploits/42634' },
    ],
    skills: [
        'MITRE ATT&CK / OSI Model TCP/IP',
        'Wireshark Expert / Network Analysis',
        'Dynamic Malware Analysis',
        'Web app pentest & Burp - İnvicti',
        'Network pentest & Nessus - Claroty',
        'SIEM Engineer & IBM Qradar-Wazuh',
        'Cyber Threat Intelligence / SDLC',
        'Siemens NX Modelling 2206 / Arçelik Akademi',
        'SAP & Teamcenter Lifecycle Management',
    ],
} as const;

export type NotablePoint = { title: string; desc: string; link?: string; links?: { label: string; url: string }[] };
export type Experience = { role: string; company: string; tasks: string[] };
export type Education = { school: string; degree: string; dates: string };
export type Patent = {
    name: string;
    kind: string;        // e.g. "Patent Application" / "Utility Model Application"
    title: string;       // short description of the invention
    identifier: string;  // publication or application number
    dates?: string;      // filing / publication dates
    scope?: string;      // technical scope / key components
    link?: string;       // Espacenet or registry link
};

export type CvContent = {
    title: string;
    contact: string;
    knowHow: string;
    certificates: string;
    education: string;
    workExperience: string;
    achievements: string;
    patentsTitle: string;
    downloadPdf: string;
    viewMedia: string;
    viewPatent: string;
    summary: string;
    notablePoints: NotablePoint[];
    patents: Patent[];
    experiences: Experience[];
    educationList: Education[];
    certList: string[];
};

export const translations: Record<Lang, CvContent> = {
    en: {
        title: "Technician & Cybersecurity Researcher",
        contact: "CONTACT",
        knowHow: "KNOW HOW",
        certificates: "CERTIFICATES",
        education: "EDUCATION",
        workExperience: "WORK EXPERIENCE",
        achievements: "NOTABLE ACHIEVEMENTS & MEDIA",
        patentsTitle: "PATENTS & INTELLECTUAL PROPERTY",
        downloadPdf: "Download PDF",
        viewMedia: "View News →",
        viewPatent: "View on Espacenet →",
        summary: '"I have gained experience working at the world\'s largest energy and automation company and Europe\'s leading home appliances manufacturer. I identified security vulnerabilities in assets belonging to global giants and earned awards. Throughout these processes, I have developed strong collaboration skills by working with diverse teams."',
        notablePoints: [
            {
                title: "Huawei Router Critical Vulnerability (CVE-2017-17309 / EDB-ID: 42634)",
                desc: "Discovered and reported a critical security vulnerability in Huawei HG255s routers.",
                link: "https://www.huawei.com/en/psirt/security-notices/2017/huawei-sn-20170911-01-hg255s-en"
            },
            {
                title: "OpenWrt Root Command Injection (CVE-2026-46368)",
                desc: "Discovered a root command injection (CWE-77, CVSS 8.8 High) in OpenWrt's luci-app-https-dns-proxy: shell metacharacters in the setInitAction ubus RPC 'name' parameter allow arbitrary command execution as root. Published on Exploit-DB (EDB-52521).",
                links: [
                    { label: "CVE Record", url: "https://www.cve.org/CVERecord?id=CVE-2026-46368" },
                    { label: "Exploit-DB", url: "https://www.exploit-db.com/exploits/52521" },
                    { label: "PoC (GitHub)", url: "https://github.com/iwallplace/CVE-2026-46368-OpenWrt-Exploit" }
                ]
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
        patents: [
            {
                name: "ML-DC1",
                kind: "Patent Application",
                title: "ESP32-based ambient intelligence desk device",
                identifier: "Publication No: TR 2026005478 A2",
                dates: "Filed: 10 Apr 2026 · Published: 21 May 2026",
                scope: "Asymmetric dual-channel output architecture + cloud–hardware bridge system",
                link: "https://worldwide.espacenet.com/patent/search?q=pn%3DTR2026005478A2"
            },
            {
                name: "ML-RF1",
                kind: "Utility Model Application",
                title: "SDR preselector",
                identifier: "Application No: 2026/004623",
                scope: "PCB: ESP32/RP2040, PE4259 switch, SPF5189Z LNA, 5-band SAW filter bank"
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
        patentsTitle: "PATENTLER & FİKRİ MÜLKİYET",
        downloadPdf: "PDF İndir",
        viewMedia: "Haberi Görüntüle →",
        viewPatent: "Espacenet'te Görüntüle →",
        summary: '"Dünyanın en büyük enerji ve otomasyon şirketi ve Avrupa\'nın en büyük beyaz eşya üreticisinde çalışma deneyimine sahibim. Dünya devlerine ait varlıklarda güvenlik açıkları buldum ve ödüller kazandım. Bu süreçlerde birçok farklı insanla ve takımla uyum içinde çalışma fırsatı buldum."',
        notablePoints: [
            {
                title: "Huawei Router Kritik Zafiyet (CVE-2017-17309 / EDB-ID: 42634)",
                desc: "Huawei HG255s routerlarda kritik güvenlik zafiyeti tespit edilip raporlanmıştır.",
                link: "https://www.huawei.com/en/psirt/security-notices/2017/huawei-sn-20170911-01-hg255s-en"
            },
            {
                title: "OpenWrt Root Komut Enjeksiyonu (CVE-2026-46368)",
                desc: "OpenWrt'nin luci-app-https-dns-proxy bileşeninde root yetkisiyle komut enjeksiyonu (CWE-77, CVSS 8.8 Yüksek) tespit edilmiştir: setInitAction ubus RPC 'name' parametresine shell metakarakterleri enjekte ederek root olarak rastgele komut çalıştırılabiliyordu. Exploit-DB'de yayınlandı (EDB-52521).",
                links: [
                    { label: "CVE Kaydı", url: "https://www.cve.org/CVERecord?id=CVE-2026-46368" },
                    { label: "Exploit-DB", url: "https://www.exploit-db.com/exploits/52521" },
                    { label: "PoC (GitHub)", url: "https://github.com/iwallplace/CVE-2026-46368-OpenWrt-Exploit" }
                ]
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
        patents: [
            {
                name: "ML-DC1",
                kind: "Patent Başvurusu",
                title: "ESP32 tabanlı ambient intelligence masa cihazı",
                identifier: "Yayın No: TR 2026005478 A2",
                dates: "Başvuru: 10 Nisan 2026 · Yayın: 21 Mayıs 2026",
                scope: "Asimetrik çift kanallı çıkış mimarisi + bulut–donanım köprü sistemi",
                link: "https://worldwide.espacenet.com/patent/search?q=pn%3DTR2026005478A2"
            },
            {
                name: "ML-RF1",
                kind: "Faydalı Model Başvurusu",
                title: "SDR preselektör",
                identifier: "Başvuru No: 2026/004623",
                scope: "PCB: ESP32/RP2040, PE4259 switch, SPF5189Z LNA, 5-bant SAW filtre bankası"
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

// --- Helpers -------------------------------------------------------------

// Bump when the CV content changes; surfaced to agents for cache/freshness.
export const LAST_UPDATED = '2026-06-18';
export const SITE_URL = 'https://ahmetmersin.com';

const stripQuotes = (s: string) => s.replace(/^["']|["']$/g, '').trim();

// "Schneider Electric | Manisa | 06.2025 - Present" -> structured parts.
function parseCompany(company: string): { organization: string; location?: string; period?: string } {
    const parts = company.split('|').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 3) return { organization: parts[0], location: parts[1], period: parts.slice(2).join(' ') };
    if (parts.length === 2) return { organization: parts[0], period: parts[1] };
    return { organization: company };
}

// Structured, agent-friendly JSON document for a given language.
export function buildCvJson(lang: Lang) {
    const t = translations[lang];
    return {
        $schema: `${SITE_URL}/cv.schema.json`,
        format: 'machine-readable-cv',
        version: '1.0',
        lastUpdated: LAST_UPDATED,
        language: lang,
        person: {
            name: profile.name,
            title: t.title,
            summary: stripQuotes(t.summary),
            location: `${profile.location.city}, ${profile.location.country}`,
            email: profile.email,
            website: profile.website,
        },
        contact: profile.contacts.map((c) => ({ type: c.type, label: c.label, url: c.url })),
        skills: [...profile.skills],
        certifications: [...t.certList],
        education: t.educationList.map((e) => ({ institution: e.school, program: e.degree, period: e.dates })),
        experience: t.experiences.map((e) => {
            const parsed = parseCompany(e.company);
            return {
                role: e.role,
                organization: parsed.organization,
                location: parsed.location ?? null,
                period: parsed.period ?? null,
                highlights: e.tasks,
            };
        }),
        achievements: t.notablePoints.map((p) => ({
            title: p.title,
            description: p.desc,
            references: p.links ? p.links.map((l) => l.url) : p.link ? [p.link] : [],
        })),
        patents: t.patents.map((p) => ({
            name: p.name,
            kind: p.kind,
            title: p.title,
            identifier: p.identifier,
            dates: p.dates ?? null,
            scope: p.scope ?? null,
            reference: p.link ?? null,
        })),
        verification: buildVerification(),
        meta: {
            instructions:
                'This is the machine-readable CV of Ahmet Mersin (Technician & Cybersecurity Researcher). ' +
                'All claims can be independently verified via the "verification" array below. ' +
                `To contact him, email ${profile.email}. ` +
                'The most up-to-date structured data is always at /cv.json; a Markdown rendering is at /llms.txt.',
            contactEmail: profile.email,
            license: 'CC-BY-4.0',
            endpoints: {
                human: `${SITE_URL}/`,
                json: `${SITE_URL}/cv.json`,
                llmsTxt: `${SITE_URL}/llms.txt`,
                agentCard: `${SITE_URL}/.well-known/agent.json`,
            },
        },
    };
}

// Maps each notable claim to an independently checkable source URL,
// so an AI agent can verify the CV instead of trusting it blindly.
export function buildVerification() {
    const t = translations.en;
    const items: { claim: string; type: string; source: string }[] = [];

    for (const p of t.patents) {
        if (p.link) items.push({ claim: `${p.name} — ${p.title}`, type: 'patent', source: p.link });
    }
    for (const n of t.notablePoints) {
        if (n.link) items.push({ claim: n.title, type: 'achievement', source: n.link });
        if (n.links) {
            for (const l of n.links) {
                items.push({ claim: `${n.title} — ${l.label}`, type: 'achievement', source: l.url });
            }
        }
    }
    for (const c of profile.contacts) {
        if (!['email', 'website'].includes(c.type)) {
            items.push({ claim: `${c.label} profile`, type: 'profile', source: c.url });
        }
    }
    return items;
}

// schema.org Person object for embedding as JSON-LD in the page <head>/<body>.
export function buildPersonJsonLd(lang: Lang) {
    const t = translations[lang];
    const sameAs = profile.contacts
        .filter((c) => !['email', 'website'].includes(c.type))
        .map((c) => c.url);
    const current = parseCompany(t.experiences[0].company);
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: t.title,
        description: stripQuotes(t.summary),
        url: profile.website,
        email: profile.email,
        address: {
            '@type': 'PostalAddress',
            addressLocality: profile.location.city,
            addressCountry: profile.location.countryCode,
        },
        worksFor: { '@type': 'Organization', name: current.organization },
        sameAs,
        knowsAbout: [...profile.skills],
        alumniOf: t.educationList.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
        hasCredential: t.certList.map((name) => ({
            '@type': 'EducationalOccupationalCredential',
            name,
        })),
        subjectOf: t.patents.map((p) => ({
            '@type': 'CreativeWork',
            additionalType: p.kind,
            name: `${p.name} — ${p.title}`,
            identifier: p.identifier,
            ...(p.link ? { url: p.link } : {}),
        })),
    };
}

// llms.txt-style Markdown rendering for a given language.
export function buildCvMarkdown(lang: Lang): string {
    const t = translations[lang];
    const L = lang === 'tr'
        ? { contact: 'İletişim', skills: 'Yetkinlikler', certs: 'Sertifikalar', edu: 'Eğitim', exp: 'İş Deneyimi', ach: 'Başarılar & Medya', pat: 'Patentler & Fikri Mülkiyet' }
        : { contact: 'Contact', skills: 'Skills', certs: 'Certifications', edu: 'Education', exp: 'Work Experience', ach: 'Achievements & Media', pat: 'Patents & Intellectual Property' };

    const lines: string[] = [];
    lines.push(`# ${profile.name}`);
    lines.push('');
    lines.push(`> ${t.title} — ${profile.location.city}, ${profile.location.country}`);
    lines.push('');
    lines.push(stripQuotes(t.summary));
    lines.push('');

    lines.push(`## ${L.contact}`);
    for (const c of profile.contacts) lines.push(`- ${c.label}: ${c.url}`);
    lines.push('');

    lines.push(`## ${L.skills}`);
    for (const s of profile.skills) lines.push(`- ${s}`);
    lines.push('');

    lines.push(`## ${L.exp}`);
    for (const e of t.experiences) {
        lines.push(`### ${e.role} — ${e.company}`);
        for (const task of e.tasks) lines.push(`- ${task}`);
        lines.push('');
    }

    lines.push(`## ${L.pat}`);
    for (const p of t.patents) {
        lines.push(`### ${p.name} — ${p.title} (${p.kind})`);
        lines.push(`- ${p.identifier}`);
        if (p.dates) lines.push(`- ${p.dates}`);
        if (p.scope) lines.push(`- ${p.scope}`);
        if (p.link) lines.push(`- Reference: ${p.link}`);
        lines.push('');
    }

    lines.push(`## ${L.ach}`);
    for (const p of t.notablePoints) {
        lines.push(`### ${p.title}`);
        lines.push(p.desc);
        if (p.link) lines.push(`Reference: ${p.link}`);
        if (p.links) for (const l of p.links) lines.push(`${l.label}: ${l.url}`);
        lines.push('');
    }

    lines.push(`## ${L.edu}`);
    for (const e of t.educationList) lines.push(`- ${e.school} — ${e.degree} (${e.dates})`);
    lines.push('');

    lines.push(`## ${L.certs}`);
    for (const c of t.certList) lines.push(`- ${c}`);
    lines.push('');

    return lines.join('\n');
}
