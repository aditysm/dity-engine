import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Download, Monitor, Laptop, Globe, ArrowRight, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function DownloadPage() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 pt-6 md:pt-12 pb-12 md:pb-24">
        <div className="text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6"
          >
            <Download size={16} />
            <span>Versi Terbaru v1.2.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Siap untuk <span className="text-primary italic">Level Up?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Unduh Dity Engine untuk sistem operasi Anda dan mulai rasakan pengalaman coding yang lebih cerdas, lokal, dan privat.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "macOS",
              icon: <Laptop size={32} />,
              description: "Mendukung Intel & Apple Silicon (M1/M2/M3)",
              primary: true
            },
            {
              title: "Windows",
              icon: <Monitor size={32} />,
              description: "Windows 10 atau 11 (64-bit)",
              primary: false
            },
            {
              title: "Linux",
              icon: <Globe size={32} />,
              description: ".AppImage, .deb, & .rpm tersedia",
              primary: false
            }
          ].map((os, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className={`p-8 rounded-[2.5rem] border transition-all duration-300 ${
                os.primary 
                  ? 'bg-card border-primary/50 shadow-2xl shadow-primary/10 scale-105' 
                  : 'bg-card/50 border-border/50 hover:border-primary/30'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                os.primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}>
                {os.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{os.title}</h3>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                {os.description}
              </p>
              <Button 
                className={`w-full font-bold h-12 rounded-xl flex items-center justify-center gap-2 ${
                  !os.primary && 'variant-outline'
                }`}
                variant={os.primary ? 'default' : 'outline'}
              >
                Unduh untuk {os.title}
                <Download size={18} />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-muted/30 rounded-[3rem] p-8 md:p-16 border border-border/50">
          <div>
            <h2 className="text-3xl font-bold mb-6">Mengapa Dity Engine?</h2>
            <div className="space-y-6">
              {[
                {
                  title: "100% Lokal & Privat",
                  description: "Data Anda tidak pernah meninggalkan komputer. Semua pemrosesan dilakukan secara lokal.",
                  icon: <Shield className="text-primary" />
                },
                {
                  title: "Kecepatan Maksimal",
                  description: "Tanpa latensi cloud. Rasakan respon instan untuk setiap perintah AI Anda.",
                  icon: <Zap className="text-primary" />
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video bg-background border border-border rounded-2xl overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070" 
               alt="Code editor" 
               className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white animate-pulse">
                 <Monitor size={32} />
               </div>
             </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
