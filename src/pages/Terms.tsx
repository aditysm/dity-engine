import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function TermsPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Syarat & <span className="text-primary italic">Ketentuan</span></h1>
          <p className="text-muted-foreground">Terakhir diperbarui: 17 Juli 2026</p>
        </motion.div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="text-primary" size={24} />
              <h2 className="text-2xl font-bold m-0">Lisensi Penggunaan</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dity Engine memberikan Anda lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengunduh, menginstal, dan menggunakan aplikasi untuk tujuan profesional atau pribadi sesuai dengan ketentuan ini.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-primary" size={24} />
              <h2 className="text-2xl font-bold m-0">Batasan Tanggung Jawab</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dity Engine disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerusakan, kehilangan data, atau kegagalan sistem yang mungkin timbul dari penggunaan aplikasi ini. Sebagai aplikasi berbasis AI, hasil yang dihasilkan harus ditinjau kembali oleh pengguna sebelum diimplementasikan.
            </p>
          </section>

          <div className="bg-muted/30 rounded-3xl p-8 border border-border space-y-6">
            <h3 className="text-xl font-bold m-0">Hal-hal yang Dilarang:</h3>
            <ul className="space-y-4 m-0 p-0 list-none">
              {[
                "Merekayasa balik (reverse engineering) kode sumber aplikasi.",
                "Menggunakan aplikasi untuk kegiatan ilegal atau berbahaya.",
                "Mendistribusikan salinan aplikasi tanpa izin resmi.",
                "Mencoba merusak atau mengganggu integritas sistem keamanan kami."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Pemutusan Layanan</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kami berhak untuk menghentikan atau menangguhkan akses Anda ke aplikasi sewaktu-waktu tanpa pemberitahuan sebelumnya, jika Anda melanggar ketentuan yang ditetapkan dalam dokumen ini.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
