import React from 'react';
import { FeatureDetailPage } from '../../components/features/FeatureDetailPage';

export function PRDArchitectPage() {
  return (
    <FeatureDetailPage
      title={<>PRD <span className="text-primary italic">Architect</span></>}
      category="Architecture"
      date="14 Juli 2026"
      readTime="6 min read"
      image="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2055"
      content={
        <>
          <p>
            Produk yang bagus dimulai dari dokumentasi yang matang. <strong>PRD Architect</strong> membantu Anda menyusun Product Requirements Document (PRD) yang komprehensif tanpa pusing.
          </p>
          <h2>Dari Ide ke Struktur</h2>
          <p>
            Cukup masukkan garis besar ide Anda, dan PRD Architect akan menyusun User Stories, Functional Requirements, hingga Technical Constraints secara otomatis.
          </p>
          <ul>
            <li><strong>AI-Powered Drafting:</strong> Draft awal yang terstruktur rapi sesuai standar industri.</li>
            <li><strong>Conflict Detection:</strong> AI akan memperingatkan jika ada persyaratan yang saling bertentangan.</li>
            <li><strong>Export to Docs:</strong> Ekspor hasil akhir ke Markdown, PDF, atau Google Docs dengan satu klik.</li>
          </ul>
          <p>
            Jangan biarkan ide hebat Anda hilang karena malas menulis dokumentasi. Biarkan Dity Engine menjadi asisten arsitek produk Anda.
          </p>
        </>
      }
    />
  );
}
