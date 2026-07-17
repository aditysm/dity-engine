import React from 'react';
import { HeroSection } from '../components/blocks/HeroSection';
import { Features } from '../components/blocks/Features';
import { HorizontalTools } from '../components/blocks/HorizontalTools';
import { FAQSection } from '../components/blocks/FAQSection';
import { CTASection } from '../components/blocks/CTASection';
import { Footer } from '../components/ui/footer';
import { Logo } from '../components/ui/Logo';

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      <div className="h-px w-full bg-border/40" />
      <Features />
      <div className="h-px w-full bg-border/40" />
      <HorizontalTools />
      <div className="h-px w-full bg-border/40" />
      <FAQSection />
      <div className="h-px w-full bg-border/40" />
      <CTASection />
      <div className="h-px w-full bg-border/40" />

      <Footer
        logo={<Logo className="h-10 w-10 text-primary" />}
      />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-surface rounded-2xl border border-outline-variant hover:border-primary/40 hover:shadow-lg transition-all group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">
        {description}
      </p>
    </div>
  );
}
