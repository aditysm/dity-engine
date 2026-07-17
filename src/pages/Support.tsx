import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Mail, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export function SupportPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Pusat <span className="text-primary italic">Bantuan</span></h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl leading-relaxed">
              Ada kendala dengan Dity Engine atau ingin memberikan feedback? Tim kami siap membantu Anda 24/7.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Email Support",
                  value: "support@dityengine.com",
                  icon: <Mail className="text-primary" />,
                  action: "Kirim Email"
                },
                {
                  title: "Community Chat",
                  value: "Discord / Telegram",
                  icon: <MessageSquare className="text-primary" />,
                  action: "Gabung Sekarang"
                },
                {
                  title: "GitHub Issues",
                  value: "dity-engine/app",
                  icon: <FaGithub className="text-primary" size={24} />,
                  action: "Buka Issue"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                  <button className="text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {item.action} <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-12 rounded-[2.5rem] border border-border bg-card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold mb-8">Kirim Pesan Langsung</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Nama Lengkap</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <input type="email" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Subjek</label>
                <select className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                  <option>Masalah Teknis</option>
                  <option>Pertanyaan Lisensi</option>
                  <option>Feedback Fitur</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Pesan</label>
                <textarea rows={4} className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Ceritakan kendala Anda..." />
              </div>

              <Button className="w-full h-14 rounded-xl font-bold flex items-center justify-center gap-2 group">
                Kirim Pesan
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
