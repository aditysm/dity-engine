import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Shield, Lock, EyeOff, ServerOff } from 'lucide-react';
import { motion } from 'motion/react';

export function PrivacyPage() {
  const sections = [
    {
      title: "Filosofi 'Privacy First'",
      content: "Di Dity Engine, kami percaya bahwa privasi bukanlah fitur, melainkan hak dasar setiap developer. Seluruh arsitektur kami dibangun dengan prinsip lokal-sentris, di mana data Anda tidak pernah dikirim ke server cloud mana pun tanpa izin eksplisit Anda.",
      icon: <EyeOff className="text-primary" />
    },
    {
      title: "Data yang Kami Kumpulkan",
      content: "Hampir nol. Dity Engine beroperasi secara lokal. Kami hanya mengumpulkan data telemetri anonim (seperti versi aplikasi dan error log) untuk meningkatkan stabilitas sistem. Kode sumber dan rahasia proyek Anda tetap 100% di komputer Anda.",
      icon: <ServerOff className="text-primary" />
    },
    {
      title: "Keamanan Lokal",
      content: "Data konfigurasi Anda disimpan menggunakan enkripsi tingkat industri (AES-256) di penyimpanan lokal sistem operasi Anda. Kami tidak memiliki kunci dekripsi; hanya akun pengguna sistem Anda yang dapat mengaksesnya.",
      icon: <Lock className="text-primary" />
    }
  ];

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kebijakan <span className="text-primary italic">Privasi</span></h1>
          <p className="text-muted-foreground">Terakhir diperbarui: 17 Juli 2026</p>
        </motion.div>

        <div className="space-y-12 mb-16">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-border bg-card/50"
            >
              <div className="flex items-center gap-4 mb-4">
                {section.icon}
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none text-muted-foreground">
          <h3 className="text-foreground">1. Persetujuan Pengguna</h3>
          <p>Dengan menggunakan Dity Engine, Anda menyetujui praktik pengolahan data yang dijelaskan dalam kebijakan ini. Kami menyarankan Anda untuk meninjau kebijakan ini secara berkala untuk tetap mendapatkan informasi tentang bagaimana kami melindungi data Anda.</p>
          
          <h3 className="text-foreground">2. Perubahan Kebijakan</h3>
          <p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan diinformasikan melalui notifikasi di dalam aplikasi Dity Engine dan pembaruan tanggal di bagian atas halaman ini.</p>
          
          <h3 className="text-foreground">3. Hubungi Kami</h3>
          <p>Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau praktik privasi kami, silakan hubungi tim dukungan kami melalui halaman Support.</p>
        </div>
      </div>
    </PageLayout>
  );
}
