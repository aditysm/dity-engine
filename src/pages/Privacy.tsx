import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Shield, EyeOff, Lock, Database, Globe, Mail, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export function PrivacyPage() {
  const privacyPoints = [
    {
      icon: <EyeOff className="text-primary" size={24} />,
      title: "1. Data yang TIDAK Kami Kumpulkan",
      description: "Kami sangat berkomitmen terhadap keamanan intelektual Anda. Dity Engine tidak mengumpulkan, membaca, mengirimkan, mengunggah, atau menyimpan hal-hal berikut ke server eksternal kami:",
      list: [
        "Kode sumber (source code) proyek yang Anda miliki atau sedang Anda kerjakan.",
        "Prompt, instruksi, cuplikan kode, atau teks percakapan yang Anda inputkan ke dalam tools.",
        "Berkas konfigurasi hasil generate (seperti .cursorrules, .clinerules, dll).",
        "Dokumen spesifikasi teknis dan Product Requirement Document (PRD) yang Anda bangun.",
        "Informasi pribadi, metrik kerja, riwayat aktivitas pengetikan, maupun statistik produktivitas Anda."
      ]
    },
    {
      icon: <Lock className="text-primary" size={24} />,
      title: "2. Penyimpanan & Keamanan API Key",
      description: "API Key yang Anda konfigurasikan di dalam Dity Engine (seperti kunci OpenAI, Anthropic, Groq, dll) disimpan seutuhnya secara lokal di dalam penyimpanan terenkripsi pada perangkat Anda (local storage browser Anda atau keychain sistem operasi).",
      highlights: [
        "Kami tidak pernah mengirimkan API Key tersebut ke server Dity Engine.",
        "Semua permintaan pengolahan teks/AI dilakukan secara langsung (direct client request) dari komputer Anda ke server penyedia layanan AI (OpenAI/Anthropic/Groq). Tidak ada server perantara (proxy server) di pihak kami."
      ]
    },
    {
      icon: <Database className="text-primary" size={24} />,
      title: "3. Data Telemetri & Crash Analytics",
      description: "Secara default, Dity Engine beroperasi 100% offline (kecuali ketika Anda mengeksekusi panggilan API kecerdasan buatan ke penyedia luar).",
      list: [
        "Kami mungkin meminta persetujuan eksplisit secara berkala (fitur opt-in) untuk mengumpulkan laporan kegagalan (crash reports) anonim.",
        "Laporan kegagalan ini murni hanya berisi tumpukan error sistem (stack trace) guna membantu kami memperbaiki bug di versi mendatang.",
        "Anda memiliki kebebasan penuh untuk menonaktifkan pengiriman log kerusakan ini kapan saja melalui menu Pengaturan tanpa mengurangi fungsi aplikasi sama sekali."
      ]
    },
    {
      icon: <Globe className="text-primary" size={24} />,
      title: "4. Kebijakan Layanan Pihak Ketiga",
      description: "Karena seluruh model kecerdasan buatan (LLM) diakses langsung dari komputer Anda menuju server pihak ketiga (seperti OpenAI, Anthropic, Groq, atau penyedia API lainnya) menggunakan kunci API pribadi Anda, prompt dan konteks yang Anda kirimkan akan tunduk pada Kebijakan Privasi masing-masing penyedia tersebut.",
      note: "Kami sangat menganjurkan Anda untuk meninjau secara saksama kebijakan retensi data dan pemrosesan informasi dari penyedia model AI yang Anda gunakan di dalam ruang kerja Anda."
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "5. Informasi Kontak & Konsultasi Keamanan",
      description: "Apabila Anda memiliki pertanyaan yang mendalam, kekhawatiran khusus, atau membutuhkan konsultasi teknis lebih lanjut mengenai arsitektur keamanan informasi dan privasi data di Dity Engine, Anda dapat menghubungi tim pengembang kami langsung di:",
      email: "dity.store31@gmail.com"
    }
  ];

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Shield size={32} />
          </div>
          <h1 id="privacy-title" className="text-4xl md:text-5xl font-bold mb-4">
            Kebijakan <span className="text-primary italic">Privasi</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Pembaruan Terakhir: 17 Juli 2026</p>
          
          <div className="mt-8 p-6 bg-card/30 border border-border/50 rounded-3xl flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary shrink-0">
              <HeartHandshake size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Prinsip Utama: Lokal-Pertama (Local-First)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Di Dity Engine, kami memahami sepenuhnya bahwa kode sumber, struktur folder, gagasan arsitektur sistem, dan dokumen kebutuhan produk (PRD) yang Anda miliki adalah rahasia komersial dan kekayaan intelektual tingkat tinggi. Oleh karena itu, arsitektur aplikasi kami dirancang dari dasar dengan prinsip <strong>Lokal-Pertama</strong>. Data Anda milik Anda sepenuhnya.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8 mb-16">
          {privacyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              id={`privacy-point-${i}`}
              className="p-8 rounded-[2rem] border border-border bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  {point.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">{point.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                {point.description}
              </p>

              {point.list && (
                <ul className="space-y-2 pl-4 list-none">
                  {point.list.map((item, j) => (
                    <li key={j} className="flex gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {point.highlights && (
                <div className="mt-4 p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                  {point.highlights.map((hl, j) => (
                    <p key={j} className="text-xs md:text-sm text-foreground/90 font-medium flex gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {hl}
                    </p>
                  ))}
                </div>
              )}

              {point.note && (
                <p className="mt-4 text-xs italic text-muted-foreground bg-primary/5 p-4 rounded-xl border border-primary/10">
                  ⚠️ <strong>Catatan Penting:</strong> {point.note}
                </p>
              )}

              {point.email && (
                <div className="mt-4 pt-2">
                  <a 
                    href={`mailto:${point.email}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm md:text-base"
                  >
                    <span>{point.email}</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Keamanan data Anda adalah prioritas mutlak pengembangan kami. Kami senantiasa memastikan bahwa integrasi kecerdasan buatan tetap berjalan tanpa merongrong kerahasiaan kekayaan intelektual lokal Anda.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
