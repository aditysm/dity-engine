import React from 'react';
import { HeroHeader } from '../blocks/HeroSection';
import { Footer } from '../ui/footer';
import { Logo } from '../ui/Logo';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  React.useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: 'auto' // Force instant scroll on mount
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroHeader />
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>
      <Footer
        logo={<Logo className="h-10 w-10 text-primary" />}
      />
    </div>
  );
}
