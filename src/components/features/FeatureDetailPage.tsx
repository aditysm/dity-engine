import React from 'react';
import { PageLayout } from '../layout/PageLayout';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface FeaturePageProps {
  title: React.ReactNode;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
}

export function FeatureDetailPage({ title, category, date, readTime, image, content }: FeaturePageProps) {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <article className="mx-auto max-w-4xl px-6 pt-6 md:pt-12 pb-12 md:pb-24 text-left">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-12"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="group mb-8 rounded-full px-4 border border-border/50 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Button>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Tim Dity Engine</span>
            </div>
            <button className="ml-auto flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-16 border border-border/50 shadow-2xl"
        >
          <img 
            src={image} 
            alt={typeof title === 'string' ? title : 'Feature image'} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-3xl prose-img:border prose-img:border-border/50"
        >
          {content}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-card border border-border/50 text-left relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Siap mencoba fitur ini?</h2>
          <p className="text-muted-foreground mb-8 relative z-10 max-w-2xl">Unduh Dity Engine sekarang dan rasakan efisiensinya secara langsung.</p>
          <Button 
            size="lg" 
            onClick={() => navigate('/download')}
            className="rounded-xl px-10 h-14 font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform relative z-10"
          >
            Unduh Sekarang
          </Button>
        </motion.div>
      </article>
    </PageLayout>
  );
}
