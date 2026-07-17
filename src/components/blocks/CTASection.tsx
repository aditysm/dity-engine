'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { motion } from 'motion/react'

export function CTASection() {
    const navigate = useNavigate();
    
    return (
        <section id="cta" className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--primary-foreground)_0%,transparent_70%)] opacity-[0.03] dark:opacity-[0.05]"></div>
            
            <div className="mx-auto max-w-5xl px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl border border-border/50 backdrop-blur-sm bg-card/50 p-8 md:p-16 text-left shadow-2xl overflow-hidden"
                >
                    {/* Decorative Blobs */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
                            Ubah Ide Anda Menjadi <span className="text-primary italic">Kode Produksi</span> Sekarang
                        </h2>
                        
                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                            Bergabunglah dengan para pengembang modern yang telah mempercepat alur kerja mereka dengan Dity Engine. 100% lokal, aman, dan tanpa batas.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                            <Button
                                onClick={() => navigate('/app')}
                                size="lg"
                                className="rounded-xl px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto"
                            >
                                Mulai Gratis
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="h-14 rounded-xl px-8 text-lg font-semibold border border-transparent hover:border-border w-full sm:w-auto"
                            >
                                Pelajari Dokumentasi
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
