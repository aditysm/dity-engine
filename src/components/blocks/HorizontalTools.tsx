import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const tools = [
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

export function HorizontalTools() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  React.useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleEnd = () => setIsNavigating(false);
    window.addEventListener('nav-start', handleStart);
    window.addEventListener('nav-end', handleEnd);
    return () => {
      window.removeEventListener('nav-start', handleStart);
      window.removeEventListener('nav-end', handleEnd);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section 
      id="tools" 
      ref={targetRef} 
      className={cn(
        "relative bg-background border-t border-border/50 transition-[height] duration-700 ease-in-out",
        isNavigating ? "h-[100vh] overflow-hidden" : "h-[400vh]"
      )}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="mx-auto max-w-5xl px-6">
            <h3 className="text-2xl md:text-4xl font-bold">
              <span className="text-primary italic">Micro-Tools</span> untuk Efisiensi Maksimal
            </h3>
          </div>
        </div>

        <motion.div 
          style={{ x: isNavigating ? 0 : x }} 
          className="flex gap-8 px-[calc((100vw-min(100vw,1024px))/2+24px)] pt-48"
        >
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="group relative w-[80vw] md:w-[450px] shrink-0"
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
                  <h4 className="text-2xl font-bold tracking-tight">{tool.title}</h4>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                  <button className="text-primary font-bold flex items-center gap-2 pt-2 group-hover:gap-3 transition-all">
                    Read more <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer to allow full scroll */}
          <div className="w-[20vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
