import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { AppMain } from './pages/AppMain';
import { DownloadPage } from './pages/Download';
import { DocsPage } from './pages/Docs';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { SupportPage } from './pages/Support';
import { NotFoundPage } from './pages/NotFound';
import { LocalContextPackerPage } from './pages/features/LocalContextPacker';
import { SmartBoilerplatePage } from './pages/features/SmartBoilerplate';
import { TokenCostTrackerPage } from './pages/features/TokenCostTracker';
import { PRDArchitectPage } from './pages/features/PRDArchitect';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ui/ErrorBoundary';

function TitleAndMetaManager() {
  const location = useLocation();

  useEffect(() => {
    let title = "Dity Engine";
    let description = "Dity Engine adalah ekosistem micro-tools modern yang dirancang khusus untuk meningkatkan efisiensi dan produktivitas developer. Bangun konteks, boilerplate, dan dokumen teknis secara lokal, instan, dan aman.";

    if (location.pathname === "/privacy" || location.pathname === "/terms") {
      title = "Dity Engine - Privasi & Ketentuan";
      description = "Kebijakan privasi dan ketentuan layanan penggunaan Dity Engine. Kami menjamin kerahasiaan penuh dengan pemrosesan data yang 100% lokal di browser Anda.";
    } else if (location.pathname === "/download") {
      title = "Dity Engine - Unduh";
      description = "Unduh aplikasi desktop Dity Engine secara gratis untuk macOS, Windows, dan Linux. Mulai bangun alur kerja yang lebih privat.";
    } else if (location.pathname === "/docs") {
      title = "Dity Engine - Dokumentasi";
      description = "Dokumentasi resmi penggunaan Dity Engine dan panduan integrasi micro-tools modern untuk efisiensi coding harian Anda.";
    } else if (location.pathname === "/local-context-packer") {
      title = "Dity Engine - Local Context Packer";
      description = "Paketkan seluruh berkas kode proyek Anda menjadi satu file konteks bersih, terstruktur, dan siap dikirim ke LLM kesayangan Anda secara offline.";
    } else if (location.pathname === "/smart-boilerplate") {
      title = "Dity Engine - Smart Boilerplate";
      description = "Hasilkan struktur proyek standar industri dan kode boilerplate berkualitas tinggi secara instan dan lokal tanpa biaya bulanan.";
    } else if (location.pathname === "/token-cost-tracker") {
      title = "Dity Engine - Token Cost Tracker";
      description = "Pantau dan estimasikan penggunaan serta biaya token API LLM Anda secara real-time untuk efisiensi pengeluaran optimal.";
    } else if (location.pathname === "/prd-architect") {
      title = "Dity Engine - PRD Architect";
      description = "Rancang dokumen Product Requirement Document (PRD) yang solid, terstruktur, dan komprehensif langsung dari spesifikasi ide Anda.";
    } else if (location.pathname === "/support") {
      title = "Dity Engine - Dukungan";
      description = "Butuh bantuan dengan Dity Engine? Temukan panduan pemecahan masalah, FAQ, dan hubungi tim pengembang resmi kami.";
    }

    document.title = title;

    // Update dynamic meta description for SEO & browser accessibility
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <TitleAndMetaManager />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<AppMain />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/support" element={<SupportPage />} />
            
            {/* Feature Pages */}
            <Route path="/local-context-packer" element={<LocalContextPackerPage />} />
            <Route path="/smart-boilerplate" element={<SmartBoilerplatePage />} />
            <Route path="/token-cost-tracker" element={<TokenCostTrackerPage />} />
            <Route path="/prd-architect" element={<PRDArchitectPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
