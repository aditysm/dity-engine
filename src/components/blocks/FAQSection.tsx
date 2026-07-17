import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Terminal, Shield, ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

const faqs = [
    {
        question: "Bagaimana cara kerja AI Collaboration?",
        answer: "Dity Engine bekerja sebagai asisten AI yang memahami konteks proyek Anda secara mendalam. Anda bisa berkolaborasi secara real-time untuk menghasilkan kode, melakukan debugging, atau merancang arsitektur aplikasi hanya melalui percakapan natural.",
        icon: <Bot size={20} className="text-primary" />
    },
    {
        question: "Apa itu Prompt Engineering di Dity Engine?",
        answer: "Kami menyediakan Prompt Builder yang memungkinkan Anda merancang instruksi yang sangat spesifik dan presisi. Ini membantu AI memberikan hasil yang lebih akurat sesuai dengan kebutuhan teknis proyek Anda, mengurangi trial-and-error.",
        icon: <Terminal size={20} className="text-primary" />
    },
    {
        question: "Apakah data saya aman di Secure Workspace?",
        answer: "Keamanan adalah prioritas kami. Seluruh data proyek Anda tersimpan secara lokal di browser Anda. Kami tidak menyimpan kode atau informasi sensitif Anda di server kami, memberikan Anda kendali penuh atas privasi data.",
        icon: <Shield size={20} className="text-primary" />
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-background border-t border-border/50">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col items-start text-left mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                        FAQ (Yang <span className="text-primary italic">Sering</span> Ditanyakan)
                    </h2>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                        Segala hal yang perlu Anda ketahui tentang bagaimana Dity Engine mempercepat alur kerja pengembangan Anda.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-3xl border border-border/50 backdrop-blur-sm bg-card/50 transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        {faq.icon}
                                    </div>
                                    <span className="text-lg font-bold">{faq.question}</span>
                                </div>
                                <ChevronDown 
                                    size={20} 
                                    className={cn(
                                        "transition-transform duration-300",
                                        openIndex === index ? "text-primary rotate-180" : "text-muted-foreground"
                                    )} 
                                />
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed pl-16">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
