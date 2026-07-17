import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const tools = [
    {
        title: "Local Context Packer",
        description: "Gabungkan file kode ke satu prompt teks dengan penghitung token otomatis.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        tag: "Optimization",
        href: "/local-context-packer"
    },
    {
        title: "Smart Boilerplate",
        description: "Generate struktur folder proyek berbasis Markdown Tree yang siap pakai.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        tag: "Structure",
        href: "/smart-boilerplate"
    },
    {
        title: "Token Cost Tracker",
        description: "Pantau biaya API Token secara real-time. Anti kecolongan.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tag: "Analytics",
        href: "/token-cost-tracker"
    },
    {
        title: "PRD Architect",
        description: "Ubah ide acak jadi dokumen teknis (PRD) matang dalam hitungan detik.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tag: "Planning",
        href: "/prd-architect"
    }
];

export function HorizontalTools() {
  const [showAll, setShowAll] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  return (
    <section 
      id="tools" 
      className="bg-background border-t border-border/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
              <span className="text-primary italic">Micro-Tools</span> untuk Efisiensi Maksimal
            </h3>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl leading-relaxed">
              Alat bantu cerdas yang dirancang untuk memangkas tugas repetitif, menjaga fokus, dan memastikan standar proyek tetap konsisten.
            </p>
          </div>
        </div>

        {/* Desktop View: Simple Horizontal Scroll */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="hidden md:block overflow-x-auto pb-6 scroll-smooth"
        >
          <div className="flex gap-8 min-w-max px-2">
            {tools.map((tool, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(tool.href)}
                className="group relative w-[400px] shrink-0 cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="aspect-video relative rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-xl">
                    <img 
                      src={tool.image} 
                      alt={tool.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {tool.tag}
                    </div>
                  </div>
                  <div className="space-y-3 px-2">
                    <h4 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{tool.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="text-primary font-bold flex items-center gap-2 pt-2 group-hover:gap-3 transition-all">
                      Pelajari Selengkapnya <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View: Expandable List */}
        <div className="md:hidden space-y-12">
          {tools.map((tool, index) => {
            const isVisible = showAll || index < 2;
            const isSecondItem = index === 1 && !showAll;

            if (!isVisible) return null;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                viewport={{ once: true }}
                onClick={() => navigate(tool.href)}
                className="group relative cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="aspect-video relative rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-lg">
                    <img 
                      src={tool.image} 
                      alt={tool.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {tool.tag}
                    </div>
                  </div>
                  <div className="space-y-3 px-2">
                    <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{tool.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="text-primary text-sm font-bold flex items-center gap-2 pt-1">
                      Pelajari Selengkapnya <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {isSecondItem && (
                  <div className="absolute inset-x-0 -bottom-4 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {!showAll && (
          <div className="md:hidden mt-8 flex justify-center relative z-20">
            <button 
              onClick={() => setShowAll(true)}
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <span className="text-primary font-bold text-sm group-hover:text-primary/80">Lihat Semua Fitur</span>
              <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors animate-bounce">
                <ChevronDown size={20} className="text-primary" />
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
