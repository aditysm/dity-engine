import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { 
  Book, Search, Terminal, Code, Cpu, Shield, ArrowRight, Settings, 
  KeyRound, FileEdit, Zap, Sparkles, Keyboard, Copy, Check, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DocsPage() {
  const [activeTab, setActiveTab] = useState<string>("welcome");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedShortcut, setCopiedShortcut] = useState<string | null>(null);

  const chapters = [
    {
      id: "welcome",
      title: "Selamat Datang",
      icon: <Book size={18} />,
      category: "Dasar"
    },
    {
      id: "setup-install",
      title: "Instalasi",
      icon: <Cpu size={18} />,
      category: "Persiapan Awal"
    },
    {
      id: "setup-apikey",
      title: "Menghubungkan API Key",
      icon: <KeyRound size={18} />,
      category: "Persiapan Awal"
    },
    {
      id: "feat-prd",
      title: "Instant PRD Architect",
      icon: <FileEdit size={18} />,
      category: "Fitur Utama"
    },
    {
      id: "feat-rules",
      title: "Rules Builder (.cursorrules)",
      icon: <Settings size={18} />,
      category: "Fitur Utama"
    },
    {
      id: "feat-vibe",
      title: "Vibe Prompt Generator",
      icon: <Sparkles size={18} />,
      category: "Fitur Utama"
    },
    {
      id: "shortcuts",
      title: "Keyboard Shortcuts",
      icon: <Keyboard size={18} />,
      category: "Lainnya"
    }
  ];

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedShortcut(label);
    setTimeout(() => setCopiedShortcut(null), 2000);
  };

  // Filter chapters based on search query
  const filteredChapters = chapters.filter(ch => 
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ch.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar Navigator */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 bg-card/25 p-6 rounded-3xl border border-border/40">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari bab dokumentasi..." 
                className="w-full bg-muted/50 border border-border rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <nav className="space-y-6">
              {["Dasar", "Persiapan Awal", "Fitur Utama", "Lainnya"].map((category) => {
                const items = filteredChapters.filter(ch => ch.category === category);
                if (items.length === 0) return null;

                return (
                  <div key={category} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80 pl-1">
                      {category}
                    </span>
                    <ul className="space-y-1">
                      {items.map((ch) => {
                        const isActive = activeTab === ch.id;
                        return (
                          <li key={ch.id}>
                            <button
                              onClick={() => setActiveTab(ch.id)}
                              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-3 transition-all ${
                                isActive 
                                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/15' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                              }`}
                            >
                              <span className={isActive ? 'text-primary-foreground' : 'text-primary'}>
                                {ch.icon}
                              </span>
                              <span className="truncate">{ch.title}</span>
                              {isActive && <ChevronRight size={14} className="ml-auto shrink-0" />}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content Panel */}
          <div className="flex-grow w-full">
            <div className="bg-card/45 border border-border/50 rounded-[2.5rem] p-6 md:p-10 min-h-[600px] shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.02),transparent_40%)] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="prose prose-invert max-w-none space-y-8"
                >
                  
                  {/* WELCOME CHAPTER */}
                  {activeTab === "welcome" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Book size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Dokumentasi Resmi <span className="text-primary italic">Dity Engine</span>
                      </h1>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed m-0">
                        Selamat datang di panduan pengguna resmi Dity Engine. Di sini, Anda akan mempelajari cara mengoptimalkan seluruh ekosistem kerja lokal kami untuk melipatgandakan kecepatan coding dan efisiensi harian Anda.
                      </p>
                      
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                        <h4 className="text-foreground font-bold m-0 flex items-center gap-2">
                          <Zap size={18} className="text-primary" />
                          Filosofi Desain: Local-First Control Center
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                          Kami merancang Dity Engine sebagai pusat kendali luring yang menghargai privasi kekayaan intelektual Anda. Dity Engine membantu mengemas konteks proyek, merancang berkas pendukung, dan memformulasikan prompt tanpa memonitor atau menyimpan aktivitas pengembangan Anda ke server luar mana pun.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border/50 space-y-4">
                        <h3 className="text-xl font-bold text-foreground m-0">Navigasi Panduan Cepat</h3>
                        <p className="text-sm text-muted-foreground m-0">
                          Gunakan menu pencarian di sebelah kiri untuk menemukan modul tertentu, atau mulailah dengan langkah instalasi dasar di bawah:
                        </p>
                        <Button 
                          onClick={() => setActiveTab("setup-install")}
                          className="rounded-xl flex items-center gap-2 h-11 font-semibold text-xs md:text-sm"
                        >
                          Langkah Pertama: Instalasi <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SETUP - INSTALL CHAPTER */}
                  {activeTab === "setup-install" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Cpu size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Persiapan Awal: <span className="text-primary italic">Instalasi</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Dity Engine tersedia sebagai aplikasi desktop cross-platform yang sangat ringan dan siap berjalan luring di komputer Anda.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground m-0">Langkah-langkah Instalasi</h3>
                        <ol className="list-decimal pl-5 space-y-3 m-0 text-sm md:text-base text-muted-foreground leading-relaxed">
                          <li>
                            Unduh paket berkas instaler resmi yang sesuai dengan sistem operasi Anda dari menu utama atau halaman <strong className="text-foreground">Unduh</strong> (<code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">.dmg</code> untuk macOS atau <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">.exe</code> untuk Windows).
                          </li>
                          <li>
                            Jalankan program instaler yang telah diunduh di komputer Anda.
                          </li>
                          <li>
                            Ikuti petunjuk pemasangan sederhana yang muncul di layar monitor Anda hingga proses tuntas.
                          </li>
                          <li>
                            Buka aplikasi <strong className="text-foreground">Dity Engine</strong> dari daftar aplikasi atau desktop shortcut Anda.
                          </li>
                        </ol>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Bab Berikutnya: Menghubungkan API Key</span>
                        <Button 
                          onClick={() => setActiveTab("setup-apikey")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Lanjut <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SETUP - API KEY CHAPTER */}
                  {activeTab === "setup-apikey" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <KeyRound size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Konfigurasi: <span className="text-primary italic">Menghubungkan API Key</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Agar mesin kecerdasan buatan (LLM) di Dity Engine dapat bekerja secara optimal, Anda perlu menghubungkan API Key pribadi Anda (prinsip Bring Your Own Key).
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground m-0">Panduan Pengaturan API Key</h3>
                        <ul className="list-disc pl-5 space-y-3 m-0 text-sm md:text-base text-muted-foreground leading-relaxed">
                          <li>
                            Buka aplikasi <strong className="text-foreground">Dity Engine</strong>, lalu arahkan kursor ke pojok kiri bawah layar dan klik tombol <strong className="text-foreground">Settings (⚙️)</strong>.
                          </li>
                          <li>
                            Pada panel pengaturan yang terbuka, pilih tab menu <strong className="text-foreground">Providers</strong>.
                          </li>
                          <li>
                            Pilih penyedia layanan kecerdasan buatan yang Anda kehendaki (misalnya <strong className="text-foreground">OpenAI</strong>, <strong className="text-foreground">Anthropic</strong>, atau <strong className="text-foreground">Groq</strong>).
                          </li>
                          <li>
                            Masukkan kunci API rahasia Anda pada kolom input kunci yang telah disediakan.
                          </li>
                          <li>
                            Klik tombol <strong className="text-foreground">Save & Test Connection</strong> untuk menguji responsivitas koneksi. Apabila indikator menyala hijau, Engine Anda siap digunakan sepenuhnya!
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs leading-relaxed flex items-start gap-3">
                        <Shield size={18} className="shrink-0 mt-0.5" />
                        <p className="m-0">
                          <strong>Keamanan Terjamin:</strong> API Key Anda terenkripsi secara luring di perangkat keras pribadi Anda. Dity Engine tidak pernah merekam, melacak, atau mengunggah kredensial sensitif Anda ke server manapun.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Bab Berikutnya: Instant PRD Architect</span>
                        <Button 
                          onClick={() => setActiveTab("feat-prd")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Lanjut <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE - PRD ARCHITECT */}
                  {activeTab === "feat-prd" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <FileEdit size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Fitur Utama: <span className="text-primary italic">Instant PRD Architect</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Ubah coretan gagasan mentah atau deskripsi ide singkat menjadi dokumen Product Requirement Document (PRD) yang sangat komprehensif, terstruktur, dan siap dieksekusi.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">💡 Cara Penggunaan:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Buka tab <strong className="text-foreground">"PRD Architect"</strong> di panel kerja Dity Engine. Pada kolom input teks, ketik ide mentah Anda (misalnya: <em>"Saya ingin buat aplikasi absensi karyawan menggunakan selfie berpagar GPS"</em>).
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">✨ Hasil Output:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Engine akan merangkai dokumen terstruktur berformat Markdown yang solid, mencakup: Ringkasan Produk (Overview), Identitas Target (User Persona), Rencana Rilis MVP, Rekomendasi Tumpukan Teknologi, hingga Struktur Skema Database Relasional.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Bab Berikutnya: Rules Builder (.cursorrules)</span>
                        <Button 
                          onClick={() => setActiveTab("feat-rules")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Lanjut <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE - RULES BUILDER */}
                  {activeTab === "feat-rules" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Settings size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Fitur Utama: <span className="text-primary italic">Rules Builder (.cursorrules)</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Langkah krusial (Day-1 Project) sebelum memulai baris pengetikan kode Anda. Berikan aturan main yang ketat pada asisten kecerdasan buatan editor Anda.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">💡 Cara Penggunaan:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Buka tab <strong className="text-foreground">"Rules Builder"</strong>. Pilih atau centang kerangka kerja yang Anda gunakan (misal: Flutter, BLoC, Firebase) dan tentukan preferensi arsitektur kode Anda.
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">✨ Hasil Output:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Engine menghasilkan teks standar instruksi pemrograman asisten yang presisi. Cukup klik <strong className="text-foreground">Copy</strong>, lalu buat berkas dengan nama <code className="text-primary bg-primary/10 px-1 rounded">.cursorrules</code> atau <code className="text-primary bg-primary/10 px-1 rounded">.clinerules</code> di root proyek Anda, lalu tempel hasilnya.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Bab Berikutnya: Vibe Prompt Generator</span>
                        <Button 
                          onClick={() => setActiveTab("feat-vibe")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Lanjut <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* FEATURE - VIBE PROMPT GENERATOR */}
                  {activeTab === "feat-vibe" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Sparkles size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Fitur Utama: <span className="text-primary italic">Vibe Prompt Generator</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Dapatkan hasil instruksi rekayasa prompt terbaik secara instan tanpa perlu merangkai kalimat instruksi panjang secara manual.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">💡 Cara Penggunaan:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Pilih jenis template pengolahan yang Anda butuhkan (seperti: <em>Refactor Code</em>, <em>Write Unit Test</em>, atau <em>Explain Bug</em>). Kemudian tempelkan potongan kode sumber mentah Anda ke dalam kotak Context Box yang disediakan.
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
                          <h4 className="font-bold text-foreground m-0 text-sm">✨ Hasil Output:</h4>
                          <p className="text-xs md:text-sm text-muted-foreground m-0 leading-relaxed">
                            Dity Engine akan merestrukturisasi prompt Anda menjadi formula super-prompt kokoh yang memaksa model AI merespons langsung dengan solusi teknis murni tanpa penjelasan teoritis bertele-tele.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Bab Berikutnya: Keyboard Shortcuts</span>
                        <Button 
                          onClick={() => setActiveTab("shortcuts")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Lanjut <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* KEYBOARD SHORTCUTS CHAPTER */}
                  {activeTab === "shortcuts" && (
                    <div className="space-y-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                        <Keyboard size={24} />
                      </div>
                      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 text-foreground">
                        Sistem Akses: <span className="text-primary italic">Keyboard Shortcuts</span>
                      </h1>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed m-0">
                        Pertahankan fokus penuh dan biarkan tangan Anda tetap berada di atas keyboard dengan pintasan navigasi cepat Dity Engine:
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              keys: "Ctrl/Cmd + K",
                              desc: "Membuka Menu Perintah Cepat (Command Palette)",
                              command: "command_palette"
                            },
                            {
                              keys: "Ctrl/Cmd + Shift + C",
                              desc: "Langsung menyalin output terakhir yang dihasilkan AI",
                              command: "copy_output"
                            },
                            {
                              keys: "Ctrl/Cmd + 1 / 2 / 3",
                              desc: "Berpindah antar tab menu utama (PRD, Rules, Prompt)",
                              command: "switch_tabs"
                            },
                            {
                              keys: "Esc",
                              desc: "Menutup kotak dialog aktif atau membatalkan proses generate (Stop)",
                              command: "escape"
                            }
                          ].map((shortcut, idx) => (
                            <div 
                              key={idx} 
                              className="p-5 rounded-2xl bg-muted/40 border border-border/50 flex justify-between items-center hover:border-primary/20 transition-all duration-300 group"
                            >
                              <div className="space-y-1">
                                <span className="font-mono text-xs md:text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                                  {shortcut.keys}
                                </span>
                                <p className="text-xs text-muted-foreground leading-relaxed pt-2 m-0">
                                  {shortcut.desc}
                                </p>
                              </div>
                              <button 
                                onClick={() => handleCopyText(shortcut.keys, shortcut.command)}
                                className="p-2 rounded-xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors shrink-0"
                                title="Salin Pintasan"
                              >
                                {copiedShortcut === shortcut.command ? (
                                  <Check size={14} className="text-emerald-500" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Kembali ke halaman utama</span>
                        <Button 
                          onClick={() => setActiveTab("welcome")}
                          variant="outline"
                          className="rounded-xl flex items-center gap-2 h-10 font-semibold text-xs"
                        >
                          Awal <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
