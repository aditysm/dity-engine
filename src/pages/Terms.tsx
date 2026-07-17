import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { FileText, ShieldAlert, KeyRound, Hammer, HelpCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function TermsPage() {
  const termsList = [
    {
      icon: <Hammer className="text-primary" size={24} />,
      title: "1. Lisensi Penggunaan",
      content: "Dity Engine (\"Perangkat Lunak\") memberikan Anda lisensi personal, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengunduh, menginstal, dan menggunakan Perangkat Lunak ini di perangkat pribadi atau perangkat kerja Anda untuk mendukung alur kerja pengembangan perangkat lunak Anda."
    },
    {
      icon: <KeyRound className="text-primary" size={24} />,
      title: "2. Penggunaan API Key dan Pihak Ketiga",
      content: "Dity Engine berfungsi sebagai jembatan (interface) lokal ke penyedia layanan AI pihak ketiga (seperti OpenAI, Anthropic, Groq, dll). Anda wajib menggunakan API Key Anda sendiri.",
      subPoints: [
        {
          label: "Tanggung Jawab API Key",
          text: "Anda bertanggung jawab penuh atas keamanan, penyimpanan, dan kerahasiaan API Key pribadi Anda di dalam perangkat lokal."
        },
        {
          label: "Biaya Penggunaan",
          text: "Segala biaya yang timbul dari penggunaan API Key tersebut adalah tanggung jawab Anda sepenuhnya kepada masing-masing penyedia layanan AI (Provider). Dity Engine tidak mengambil potongan biaya, komisi, atau memproses pembayaran token AI Anda sedikit pun."
        },
        {
          label: "Keamanan Kunci",
          text: "Kami tidak pernah mentransmisikan kunci Anda ke server kami. Namun, kehilangan atau kebocoran kunci akibat kelalaian perangkat lokal Anda adalah tanggung jawab Anda."
        }
      ]
    },
    {
      icon: <AlertTriangle className="text-primary" size={24} />,
      title: "3. Penolakan Jaminan (Disclaimer of Warranties)",
      content: "Perangkat lunak ini disediakan \"sebagaimana adanya\" (as is) tanpa jaminan apa pun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa kode, konfigurasi .cursorrules, dokumen PRD, atau keluaran lain yang dihasilkan oleh AI melalui Dity Engine akan 100% bebas dari kesalahan teknis, kelemahan keamanan, atau bias informasi. Pengguna diwajibkan untuk selalu melakukan peninjauan ulang (review) dan verifikasi secara mandiri sebelum menerapkan kode ke lingkungan produksi."
    },
    {
      icon: <ShieldAlert className="text-primary" size={24} />,
      title: "4. Batasan Tanggung Jawab",
      content: "Dalam keadaan apa pun, pengembang Dity Engine tidak bertanggung jawab atas segala kerugian langsung, tidak langsung, insidental, konsekuensial, atau kerusakan data apa pun (termasuk namun tidak terbatas pada hilangnya profit bisnis, gangguan usaha, kebocoran kredensial proyek, atau kehilangan informasi penting lainnya) yang diakibatkan oleh penggunaan atau ketidakmampuan untuk menggunakan aplikasi ini."
    },
    {
      icon: <HelpCircle className="text-primary" size={24} />,
      title: "5. Hak Kekayaan Intelektual",
      content: "Seluruh hak cipta, merek dagang, paten, rahasia dagang, serta desain antarmuka (UI/UX) Dity Engine adalah hak milik penuh dari pengembang resmi (Dity). Pengguna tidak diperkenankan untuk merekayasa balik (reverse-engineering), mendekompilasi, menyalin, memodifikasi, atau mendistribusikan ulang aplikasi ini tanpa izin tertulis yang sah dari pihak pengembang."
    },
    {
      icon: <RefreshCw className="text-primary" size={24} />,
      title: "6. Perubahan Syarat & Ketentuan",
      content: "Kami berhak untuk mengubah, memodifikasi, atau memperbarui syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan tertulis sebelumnya demi penyesuaian regulasi atau pembaruan fitur aplikasi. Penggunaan berkelanjutan Anda terhadap Dity Engine setelah pembaruan syarat dan ketentuan diterbitkan akan dianggap sebagai persetujuan penuh terhadap ketentuan baru tersebut."
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
            <FileText size={32} />
          </div>
          <h1 id="terms-title" className="text-4xl md:text-5xl font-bold mb-4">
            Syarat & <span className="text-primary italic">Ketentuan Layanan</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">Pembaruan Terakhir: 17 Juli 2026</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Selamat datang di Dity Engine. Dengan mengunduh, menginstal, mengakses, atau menggunakan aplikasi Dity Engine, Anda secara sadar menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui bagian apa pun dari syarat ini, Anda disarankan untuk segera menghentikan penggunaan aplikasi.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {termsList.map((term, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              id={`term-section-${i}`}
              className="p-8 rounded-[2rem] border border-border bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  {term.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">{term.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {term.content}
              </p>
              
              {term.subPoints && (
                <div className="mt-6 pl-4 border-l-2 border-primary/20 space-y-4">
                  {term.subPoints.map((sub, j) => (
                    <div key={j} className="space-y-1">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {sub.label}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3">
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 text-center max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Apabila Anda memiliki pertanyaan atau memerlukan klarifikasi lebih lanjut mengenai Syarat dan Ketentuan ini, silakan menghubungi tim legal dan dukungan pengembang kami secara langsung.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
