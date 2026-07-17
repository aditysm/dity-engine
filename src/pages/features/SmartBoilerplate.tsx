import React from 'react';
import { FeatureDetailPage } from '../../components/features/FeatureDetailPage';

export function SmartBoilerplatePage() {
  return (
    <FeatureDetailPage
      title={<>Smart <span className="text-primary italic">Boilerplate</span></>}
      category="Structure"
      date="16 Juli 2026"
      readTime="4 min read"
      image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
      content={
        <>
          <p>
            Mulai proyek baru seharusnya tidak memakan waktu berjam-jam hanya untuk setup folder dan file dasar. <strong>Smart Boilerplate</strong> hadir untuk memberikan fondasi yang solid dalam hitungan detik.
          </p>
          <h2>Standardisasi Proyek</h2>
          <p>
            Dity Engine mempelajari pola arsitektur terbaik dan menyajikannya dalam bentuk template yang siap pakai. Apakah Anda membangun microservices, aplikasi frontend modern, atau tool CLI, kami punya strukturnya.
          </p>
          <h2>Fitur Utama</h2>
          <ul>
            <li><strong>Markdown Tree Generation:</strong> Visualisasikan struktur proyek Anda bahkan sebelum file dibuat.</li>
            <li><strong>Cross-Framework Support:</strong> Template untuk React, Vue, Next.js, Go, Python, dan banyak lagi.</li>
            <li><strong>Customizable Rules:</strong> Sesuaikan aturan boilerplate sesuai dengan standar tim atau perusahaan Anda.</li>
          </ul>
          <p>
            Gunakan perintah <code>dity create</code> dan biarkan mesin kami menangani sisanya. Fokuslah pada logika bisnis, bukan pada pembuatan folder <code>/utils</code> atau <code>/components</code> secara manual.
          </p>
        </>
      }
    />
  );
}
