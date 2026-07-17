import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Mail, MessageSquare, Send, ArrowRight, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Masalah Teknis');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const faqs = [
    {
      q: "Apa itu Dity Engine?",
      a: "Dity Engine adalah ekosistem aplikasi desktop lokal untuk mempermudah alur kerja developer harian Anda. Aplikasi ini membantu Anda melakukan pengemasan konteks file (Local Context Packer), menghasilkan struktur proyek standar industri (Smart Boilerplate), memantau biaya penggunaan API (Token Cost Tracker), merancang dokumen kebutuhan produk (PRD Architect), serta menyusun aturan pengerjaan AI (.cursorrules)."
    },
    {
      q: "Apakah kode dan ide proyek saya dikirim ke server Dity?",
      a: "Tidak sama sekali. Dity Engine dirancang dengan prinsip Lokal-Pertama (Local-First). Aplikasi ini berjalan sepenuhnya luring (offline) di perangkat lokal Anda. Data Anda ditransmisikan langsung dari komputer pribadi Anda ke server penyedia layanan kecerdasan buatan (seperti OpenAI atau Anthropic) secara langsung sesuai dengan API Key yang Anda hubungkan."
    },
    {
      q: "Mengapa saya harus memasukkan API Key sendiri (BYOK)?",
      a: "Prinsip Bring Your Own Key (BYOK) memberikan Anda kontrol mutlak atas privasi data, pilihan model, serta pengeluaran operasional. Anda tidak perlu membayar paket langganan bulanan mahal ke Dity Engine untuk memproses prompt. Anda hanya membayar apa yang Anda konsumsi langsung ke penyedia AI, sehingga menjadi solusi yang jauh lebih hemat, fleksibel, dan aman."
    },
    {
      q: "Model AI apa saja yang saat ini didukung?",
      a: "Saat ini Dity Engine mendukung integrasi langsung dengan penyedia utama seperti: OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude 3.5 Sonnet), serta Groq (Llama 3, Mixtral) yang sangat direkomendasikan untuk speed coding berkecepatan tinggi. Dukungan untuk model lokal via Ollama dan penyedia API lainnya akan terus ditambahkan secara bertahap."
    },
    {
      q: "Bagaimana cara kerja \"Rules Builder\" (.cursorrules)?",
      a: "Cukup masukkan deskripsi singkat mengenai tumpukan teknologi (tech stack) proyek Anda (misal: 'Next.js 14, Tailwind, Supabase, pakai pola Clean Architecture'). Dity Engine secara otomatis akan menghasilkan file konfigurasi yang sangat lengkap dan solid. Anda cukup menyalin dan menempelkannya sebagai berkas `.cursorrules` di root direktori proyek agar AI di editor kode Anda (seperti Cursor atau Windsurf) menulis kode dengan standar yang presisi."
    },
    {
      q: "Aplikasi ini tersedia untuk OS apa saja?",
      a: "Saat ini Dity Engine tersedia untuk platform macOS (mendukung Apple Silicon M1/M2/M3 & Intel) serta Windows 10 dan 11 (64-bit). Paket instaler dapat langsung diunduh secara gratis di halaman Unduh."
    },
    {
      q: "Apakah Dity Engine gratis?",
      a: "Ya! Aplikasi desktop Dity Engine sepenuhnya gratis untuk diunduh dan digunakan tanpa batasan fitur lokal. Anda hanya akan dikenakan biaya konsumsi token API yang ditagihkan langsung oleh penyedia layanan kecerdasan buatan (OpenAI/Anthropic/Groq) sesuai volume pemakaian Anda sendiri."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!name.trim()) {
      setFormError('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Silakan masukkan alamat email yang valid.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setFormError('Isi pesan Anda minimal harus mengandung 10 karakter.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API email dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 inline-block">
              Layanan Bantuan Terpadu
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Pusat <span className="text-primary italic">Bantuan & FAQ</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Temukan jawaban cepat untuk pertanyaan operasional seputar cara kerja Dity Engine, atau hubungi tim pengembang kami secara langsung jika menemui kendala teknis.
            </p>
          </motion.div>
        </div>

        {/* Support Grid: FAQs & Contact channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Q&A Accordion (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-primary" size={24} />
              <h2 className="text-2xl font-bold">Pertanyaan yang Sering Diajukan</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'bg-card border-primary/30 shadow-md' 
                        : 'bg-card/40 border-border/50 hover:border-primary/20'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors"
                    >
                      <span className="font-bold text-sm md:text-base text-foreground flex items-center gap-3">
                        <span className="text-primary shrink-0">{idx + 1}.</span>
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="text-primary shrink-0" size={18} />
                      ) : (
                        <ChevronDown className="text-muted-foreground shrink-0" size={18} />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-0 border-t border-border/20 text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Quick stats / reassurance */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/40 flex items-start gap-4">
              <Shield className="text-primary shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Jaminan Kerahasiaan Pengguna:</strong> Seluruh interaksi, pemrosesan file, dan input API Key dalam ruang kerja Dity Engine diproses sepenuhnya secara lokal di dalam perangkat Anda. Informasi Anda tidak pernah disentuh atau dikirimkan ke pihak eksternal.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form & Info (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Message Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2.5rem] border border-border bg-card relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Kirim Pesan Langsung</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  Punya pertanyaan teknis khusus? Isi formulir di bawah ini untuk terhubung langsung ke kotak masuk kami.
                </p>

                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle size={36} />
                      </div>
                      <h4 className="text-lg font-bold text-foreground">Pesan Berhasil Dikirim!</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed px-2">
                        Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan tim pengembang resmi kami akan merespons melalui email dalam waktu <strong>maksimal 24 jam</strong>.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSubmitSuccess(false)}
                        className="mt-4 rounded-xl"
                      >
                        Kirim Pesan Lain
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {formError && (
                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                          <AlertCircle size={16} />
                          <span>{formError}</span>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nama Lengkap</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground" 
                          placeholder="John Doe" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Alamat Email</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground" 
                          placeholder="john@example.com" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subjek Pesan</label>
                        <div className="relative">
                          <select 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground appearance-none"
                          >
                            <option value="Masalah Teknis">Masalah Teknis</option>
                            <option value="Saran & Feedback">Saran & Feedback</option>
                            <option value="Pertanyaan Lisensi">Pertanyaan Lisensi</option>
                            <option value="Kemitraan">Kemitraan</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Isi Pesan</label>
                        <textarea 
                          rows={4} 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-foreground" 
                          placeholder="Jelaskan detail pertanyaan atau kendala Anda..." 
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 group mt-2"
                      >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                        <Send size={16} className={`${isSubmitting ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                      </Button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Support channels list */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Kontak Resmi Kami</h4>
              
              {[
                {
                  title: "Dukungan Email",
                  value: "dity.store31@gmail.com",
                  icon: <Mail className="text-primary" size={20} />,
                  action: "Kirim Email",
                  href: "mailto:dity.store31@gmail.com"
                },
                {
                  title: "Layanan Instagram",
                  value: "@dity.storee",
                  icon: <FaInstagram className="text-primary" size={20} />,
                  action: "Kunjungi Profil",
                  href: "https://www.instagram.com/dity.storee"
                },
                {
                  title: "GitHub Repository",
                  value: "Dity Engine Workspace",
                  icon: <FaGithub className="text-primary" size={20} />,
                  action: "Laporkan Bug",
                  href: "https://github.com/aditysm/dity-engine"
                }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                    {item.action} <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
