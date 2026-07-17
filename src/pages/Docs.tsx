import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Book, Search, Terminal, Code, Cpu, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function DocsPage() {
  const categories = [
    {
      title: "Memulai",
      icon: <Cpu size={24} />,
      items: ["Instalasi", "Konfigurasi Awal", "Update System", "Persyaratan Sistem"]
    },
    {
      title: "Fitur Utama",
      icon: <Terminal size={24} />,
      items: ["Local Context Packer", "Smart Boilerplate", "Token Tracker", "PRD Architect"]
    },
    {
      title: "Keamanan",
      icon: <Shield size={24} />,
      items: ["Enkripsi Lokal", "Izin Akses File", "Privacy Shield", "Data Policy"]
    }
  ];

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Cari dokumentasi..." 
                className="w-full bg-muted/50 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <nav className="space-y-8">
              {categories.map((cat, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                    {cat.icon}
                    <span>{cat.title}</span>
                  </div>
                  <ul className="space-y-2 border-l border-border ml-3 pl-4">
                    {cat.items.map((item, j) => (
                      <li key={j}>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-grow">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="prose prose-invert max-w-none"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-8">Dokumentasi <span className="text-primary italic">Dity Engine</span></h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Selamat datang di pusat bantuan Dity Engine. Di sini Anda akan menemukan semua yang Anda butuhkan untuk memaksimalkan alur kerja pengembangan Anda dengan AI lokal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Book size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Panduan Cepat</h3>
                  <p className="text-sm text-muted-foreground mb-4">Mulai setup Dity Engine dalam kurang dari 5 menit.</p>
                  <button className="text-primary text-sm font-bold flex items-center gap-2">
                    Baca Panduan <ArrowRight size={16} />
                  </button>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Code size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Referensi API</h3>
                  <p className="text-sm text-muted-foreground mb-4">Integrasikan Dity Engine dengan tool internal Anda.</p>
                  <button className="text-primary text-sm font-bold flex items-center gap-2">
                    Buka Referensi <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <section className="space-y-8">
                <h2 className="text-3xl font-bold">Instalasi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dity Engine dirancang untuk berjalan sebagai aplikasi desktop mandiri yang menjembatani IDE Anda dengan model AI lokal. Pastikan Anda telah mengunduh installer yang sesuai untuk OS Anda.
                </p>
                <div className="bg-zinc-950 p-6 rounded-xl border border-white/5 font-mono text-sm overflow-x-auto">
                  <div className="flex gap-2 mb-4 text-zinc-500 border-b border-white/5 pb-2">
                    <span className="text-primary">npm</span>
                    <span>yarn</span>
                    <span>pnpm</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-500">$</span>
                    <span className="text-zinc-300">npm install -g @dity/engine-cli</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Setelah instalasi, jalankan perintah <code className="text-primary bg-primary/10 px-1 rounded">dity init</code> untuk memulai konfigurasi ruang kerja Anda.
                </p>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
