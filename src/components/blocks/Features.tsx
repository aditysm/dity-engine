import React, { useRef, useEffect, useState } from 'react';
import { Cpu, Terminal, ArrowRight, Package, Zap, Layout, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

const microTools = [
    {
        title: "Local Context Packer",
        description: "Gabungkan file kode ke satu prompt teks dengan penghitung token otomatis. Memastikan AI Anda mendapatkan konteks yang tepat tanpa melebihi batas.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        tag: "Optimization"
    },
    {
        title: "Smart Boilerplate",
        description: "Generate struktur folder proyek berbasis Markdown Tree yang siap pakai. Dokumentasi rapi dan terstruktur sejak hari pertama proyek dimulai.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        tag: "Structure"
    },
    {
        title: "Token Cost Tracker",
        description: "Pantau estimasi biaya penggunaan API Token Anda secara real-time. Kendali penuh atas pengeluaran API tanpa perlu cek dashboard eksternal.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tag: "Analytics"
    },
    {
        title: "PRD Architect",
        description: "Ubah ide kasar menjadi dokumen teknis (PRD) lengkap dengan User Flow dan MVP Scope dalam hitungan detik menggunakan AI lokal.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tag: "Planning"
    }
];

export function Features() {
    return (
        <section id="about" className="bg-background">
            <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-12 mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-bold tracking-tight leading-tight break-words"
                    >
                        Ekosistem Kerja <span className="text-primary italic">Vibe Coder</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl text-muted-foreground text-sm md:text-lg leading-relaxed"
                    >
                        Dity Engine dirancang untuk mempercepat setup proyek dan dokumentasi tanpa merusak flow kreatif Anda. Berjalan 100% lokal, aman, dan menggunakan API Key pribadi Anda.
                    </motion.p>
                </div>

                <div className="relative rounded-3xl p-3 md:-mx-8 overflow-hidden">
                    <div className="min-h-[300px] md:aspect-[88/36] relative rounded-3xl overflow-hidden border border-border/50 backdrop-blur-sm bg-card/50 shadow-2xl p-2">
                        <div className="bg-gradient-to-t z-1 from-background/80 absolute inset-0 to-transparent"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=2070" 
                            className="absolute inset-0 z-0 object-cover w-full h-full opacity-60 dark:opacity-40 rounded-2xl" 
                            alt="Code editor setup" 
                        />
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                            <div className="bg-background/40 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 max-w-md text-center">
                                <Terminal className="mx-auto mb-3 md:mb-4 text-primary" size={24} />
                                <h3 className="text-lg md:text-xl font-bold mb-2">Control Center Masa Depan</h3>
                                <p className="text-xs md:text-sm text-on-surface-variant">Konfigurasi instruksi asisten AI editor dalam hitungan detik untuk alur kerja yang lebih cerdas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
