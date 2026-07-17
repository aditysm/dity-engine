import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-12 relative"
        >
          <Ghost size={64} />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-foreground/20"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Halaman <span className="text-primary italic">Hilang di Cloud.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed"
        >
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. Mari kembali ke jalur yang benar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="rounded-xl px-8 font-bold flex items-center gap-2"
          >
            <Home size={18} />
            Kembali ke Beranda
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            size="lg"
            className="rounded-xl px-8 font-bold flex items-center gap-2 border-border/50 hover:border-primary/30"
          >
            <ArrowLeft size={18} />
            Halaman Sebelumnya
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
