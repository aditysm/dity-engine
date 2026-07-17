import React from 'react';
import { FeatureDetailPage } from '../../components/features/FeatureDetailPage';

export function LocalContextPackerPage() {
  return (
    <FeatureDetailPage
      title={<>Local Context <span className="text-primary italic">Packer</span></>}
      category="Optimization"
      date="17 Juli 2026"
      readTime="5 min read"
      image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
      content={
        <>
          <p>
            Local Context Packer adalah jantung dari Dity Engine. Fitur ini dirancang khusus untuk memecahkan masalah klasik dalam pengembangan berbasis AI: <strong>Context Window Limitations</strong>.
          </p>
          <h2>Bagaimana Ini Bekerja?</h2>
          <p>
            Seringkali kita harus menyalin file satu per satu ke prompt AI. Ini membosankan dan rawan kesalahan. Local Context Packer mengotomatiskan proses ini dengan memindai struktur proyek Anda, memilih file yang relevan, dan membungkusnya menjadi satu paket konteks yang optimal.
          </p>
          <ul>
            <li><strong>Auto-Token Counting:</strong> Mengetahui persis berapa banyak token yang Anda gunakan sebelum mengirimnya ke AI.</li>
            <li><strong>Intelligent Filtering:</strong> Secara otomatis mengabaikan file biner, node_modules, dan file sampah lainnya.</li>
            <li><strong>Flat Structure Conversion:</strong> Mengubah folder kompleks menjadi representasi teks yang mudah dipahami oleh model bahasa (LLM).</li>
          </ul>
          <h2>Kenapa Ini Penting?</h2>
          <p>
            Dengan memberikan konteks yang tepat dan lengkap, jawaban AI menjadi jauh lebih akurat. Anda tidak perlu lagi menjelaskan "di mana file X berada" karena AI sudah melihat seluruh peta proyek Anda.
          </p>
          <blockquote>
            "Local Context Packer memangkas waktu persiapan prompt saya dari 10 menit menjadi 10 detik." — Early Adopter
          </blockquote>
        </>
      }
    />
  );
}
