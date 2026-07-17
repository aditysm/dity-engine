import React from 'react';
import { FeatureDetailPage } from '../../components/features/FeatureDetailPage';

export function TokenCostTrackerPage() {
  return (
    <FeatureDetailPage
      title={<>Token Cost <span className="text-primary italic">Tracker</span></>}
      category="Analysis"
      date="15 Juli 2026"
      readTime="3 min read"
      image="https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=2070"
      content={
        <>
          <p>
            Biaya API AI bisa membengkak tanpa kendali jika Anda tidak waspada. <strong>Token Cost Tracker</strong> memberikan transparansi penuh atas penggunaan resource Anda.
          </p>
          <h2>Kontrol Anggaran Anda</h2>
          <p>
            Setiap kali Anda berinteraksi dengan AI, Dity Engine menghitung estimasi biaya berdasarkan model yang Anda gunakan. Tidak ada lagi kejutan di akhir bulan saat tagihan API datang.
          </p>
          <ul>
            <li><strong>Real-time Dashboard:</strong> Pantau grafik penggunaan harian, mingguan, dan bulanan.</li>
            <li><strong>Model Comparison:</strong> Lihat perbandingan biaya antara GPT-4, Gemini Pro, dan model lokal (Ollama).</li>
            <li><strong>Auto-Limit:</strong> Setel batas penggunaan untuk mencegah pengeluaran berlebih secara otomatis.</li>
          </ul>
          <p>
            Dengan fitur ini, Anda bisa memutuskan kapan harus menggunakan model "mahal" untuk tugas kompleks, dan kapan harus beralih ke model lokal yang gratis untuk tugas sederhana.
          </p>
        </>
      }
    />
  );
}
