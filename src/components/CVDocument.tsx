import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';

// Register Roboto font for Turkish character support
Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row-reverse', // ATS Optimization: Main content first in DOM, reversed visually
        backgroundColor: '#FFFFFF',
        fontFamily: 'Roboto', // Changed to Roboto for Turkish support
    },
    sidebar: {
        width: '30%',
        backgroundColor: '#0f172a',
        color: 'white',
        padding: 15,
        paddingTop: 10, // Reduced top padding specifically
        height: '100%',
    },
    main: {
        width: '70%',
        padding: 20,
        paddingTop: 10, // Reduced from 15
    },
    profileImage: {
        width: 120,
        height: 140,
        borderRadius: 6,
        marginBottom: 20,
        alignSelf: 'center',
        objectFit: 'cover'
    },
    sidebarSection: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 8,
    },
    sidebarTitle: {
        fontSize: 10,
        fontWeight: 700,
        color: '#3b82f6',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sidebarText: {
        fontSize: 8,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
        lineHeight: 1.4,
    },
    sidebarLink: {
        fontSize: 8,
        color: 'rgba(255,255,255,0.8)',
        textDecoration: 'none',
        marginBottom: 4
    },
    name: {
        fontSize: 20,
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 10,
        color: '#3b82f6',
        marginBottom: 2, // Reduced from 4
        fontWeight: 700,
    },
    summary: {
        fontSize: 8,
        lineHeight: 1.3, // Slightly tighter line height
        color: '#475569',
        marginBottom: 4, // Reduced from 8
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#3b82f6',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: 3, // Reduced from 4
        marginTop: 3, // Reduced from 4
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 2, // Reduced from 3
        flexDirection: 'row',
        alignItems: 'center',
    },
    experienceItem: {
        marginBottom: 4, // Reduced from 6
    },
    role: {
        fontSize: 10,
        fontWeight: 700,
        color: '#0f172a',
    },
    company: {
        fontSize: 8,
        color: '#3b82f6',
        marginBottom: 2,
        fontWeight: 700,
    },
    task: {
        fontSize: 7.5,
        color: '#475569',
        marginBottom: 1, // Reduced from 1.5
        paddingLeft: 8,
    },
    achievementTitle: {
        fontSize: 10,
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: 2,
    },
    achievementDesc: {
        fontSize: 9,
        color: '#475569',
        marginBottom: 2, // Reduced from 4
    },
    bullet: {
        width: 3,
        height: 3,
        backgroundColor: '#3b82f6',
        borderRadius: 2,
        marginRight: 5,
        marginTop: 4
    },
    taskRow: {
        flexDirection: 'row',
        marginBottom: 2
    }
});

interface CVDocumentProps {
    t: any;
}

const CVDocument: React.FC<CVDocumentProps> = ({ t }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.main}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.name}>AHMET MERSİN</Text>
                    <Text style={styles.title}>{t.title}</Text>
                    <Text style={styles.summary}>
                        {t.summary.replace(/"/g, '')}
                    </Text>
                </View>

                <View style={styles.sectionTitle}>
                    <View style={{ width: 4, height: 4, backgroundColor: '#0f172a', borderRadius: 2, marginRight: 8 }} />
                    <Text>{t.achievements}</Text>
                </View>
                {t.notablePoints.map((point: any, idx: number) => (
                    <View key={idx} style={{ marginBottom: 10 }}>
                        <Text style={styles.achievementTitle}>{point.title}</Text>
                        <Text style={styles.achievementDesc}>{point.desc}</Text>
                        {point.links ? (
                            point.links.map((l: any, li: number) => (
                                <Link key={li} src={l.url} style={{ fontSize: 9, color: '#3b82f6', textDecoration: 'none' }}>
                                    {l.label}: {l.url}
                                </Link>
                            ))
                        ) : point.link && (
                            <Link src={point.link} style={{ fontSize: 9, color: '#3b82f6', textDecoration: 'none' }}>
                                {point.link}
                            </Link>
                        )}
                    </View>
                ))}

                {t.patents && t.patents.length > 0 && (
                    <>
                        <View style={styles.sectionTitle}>
                            <View style={{ width: 4, height: 4, backgroundColor: '#0f172a', borderRadius: 2, marginRight: 8 }} />
                            <Text>{t.patentsTitle}</Text>
                        </View>
                        {t.patents.map((p: any, idx: number) => (
                            <View key={idx} style={{ marginBottom: 6 }}>
                                <Text style={styles.achievementTitle}>{p.name} — {p.title} ({p.kind})</Text>
                                <Text style={styles.achievementDesc}>
                                    {p.identifier}{p.dates ? ` · ${p.dates}` : ''}
                                </Text>
                                {p.scope && <Text style={styles.achievementDesc}>{p.scope}</Text>}
                                {p.link && (
                                    <Link src={p.link} style={{ fontSize: 9, color: '#3b82f6', textDecoration: 'none' }}>
                                        {p.link}
                                    </Link>
                                )}
                            </View>
                        ))}
                    </>
                )}

                <View style={styles.sectionTitle}>
                    <View style={{ width: 4, height: 4, backgroundColor: '#0f172a', borderRadius: 2, marginRight: 8 }} />
                    <Text>{t.workExperience}</Text>
                </View>
                {t.experiences.map((exp: any, idx: number) => (
                    <View key={idx} style={styles.experienceItem}>
                        <Text style={styles.role}>{exp.role}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                        {exp.tasks.map((task: string, tidx: number) => (
                            <View key={tidx} style={styles.taskRow}>
                                <View style={styles.bullet} />
                                <Text style={styles.task}>{task}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            <View style={styles.sidebar}>
                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>{t.contact}</Text>
                    <Text style={styles.sidebarText}>hestiases@gmail.com</Text>

                    <Link src="https://ahmetmersin.com" style={styles.sidebarLink}>ahmetmersin.com</Link>
                    <Link src="https://www.linkedin.com/in/ahmetmersin/" style={styles.sidebarLink}>LinkedIn</Link>
                    <Link src="https://hackerone.com/iwallplace" style={styles.sidebarLink}>HackerOne</Link>
                    <Link src="https://app.letsdefend.io/user/ahmetmersin" style={styles.sidebarLink}>LetsDefend</Link>
                    <Link src="https://medium.com/@iwallplace" style={styles.sidebarLink}>Medium</Link>
                    <Link src="https://www.exploit-db.com/exploits/42634" style={styles.sidebarLink}>Exploit-DB</Link>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>{t.knowHow}</Text>
                    <Text style={styles.sidebarText}>• MITRE ATT&CK / TCP/IP</Text>
                    <Text style={styles.sidebarText}>• Wireshark / Network Analysis</Text>
                    <Text style={styles.sidebarText}>• Dynamic Malware Analysis</Text>
                    <Text style={styles.sidebarText}>• Web app pentest (Burp)</Text>
                    <Text style={styles.sidebarText}>• Network pentest (Nessus)</Text>
                    <Text style={styles.sidebarText}>• SIEM (Qradar, Wazuh)</Text>
                    <Text style={styles.sidebarText}>• Cyber Threat Intelligence</Text>
                    <Text style={styles.sidebarText}>• Siemens NX Modelling 2206 / Arçelik Akademi</Text>
                    <Text style={styles.sidebarText}>• SAP & Teamcenter Lifecycle Management</Text>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>{t.certificates}</Text>
                    {t.certList.map((cert: string, idx: number) => (
                        <Text key={idx} style={styles.sidebarText}>• {cert}</Text>
                    ))}
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>{t.education}</Text>
                    {t.educationList.map((edu: any, idx: number) => (
                        <View key={idx} style={{ marginBottom: 8 }}>
                            <Text style={{ fontSize: 9, fontWeight: 'bold', color: 'white' }}>{edu.school}</Text>
                            <Text style={styles.sidebarText}>{edu.degree}</Text>
                            <Text style={styles.sidebarText}>{edu.dates}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default CVDocument;
