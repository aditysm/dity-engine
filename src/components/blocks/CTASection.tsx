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
                    className="relative rounded-[2.5rem] border border-border/50 bg-card p-8 md:p-20 text-left shadow-2xl overflow-hidden group"
                >
                    {/* Unique Background Overlay */}
                    <div className="absolute inset-0 bg-primary/[0.02] dark:bg-primary/[0.05] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)] opacity-50 dark:opacity-100" />
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] dark:opacity-[0.1] mix-blend-overlay dark:mix-blend-normal" />
                    
                    {/* Decorative Blobs */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000 delay-150" />

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
                            Dari Ide Acak Jadi <span className="text-primary italic">Kode Siap Pakai</span>
                        </h2>
                        
                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                            Bergabunglah dengan developer modern yang berhasil menghemat ratusan jam kerja dengan Dity Engine.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                            <Button
                                onClick={() => navigate('/app')}
                                size="lg"
                                className="rounded-xl px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto"
                            >
                                Unduh Sekarang
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
