'use client'

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Menu, X, Zap, Terminal, Bot, Shield, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatedGroup } from '../ui/animated-group'
import { cn } from '../../lib/utils'
import { useScroll, motion, AnimatePresence } from 'motion/react'
import { ThemeToggle } from '../ThemeToggle'
import { Logo } from '../ui/Logo'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
} as const;

export function HeroSection() {
    const navigate = useNavigate();
    
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden bg-background">
                <section id="hero">
                    <div className="relative pt-32 pb-12 lg:pt-48">
                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_0%_100%,transparent_0%,var(--background)_75%)]"></div>
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="flex flex-col items-start text-left">
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.3,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                >
                                    <h1
                                        className="text-balance text-3xl font-bold tracking-tight md:text-7xl lg:mt-4 leading-[1.1] max-w-4xl">
                                        Bangun Aplikasi Impian Anda Lebih <span className="text-primary italic text-shadow-glow">Cepat</span>
                                    </h1>
                                    <p
                                        className="mt-6 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
                                        Dity Engine membantu Anda merancang, mengelola, dan menghasilkan kode untuk proyek pengembangan perangkat lunak dengan asisten AI yang cerdas.
                                    </p>
                                    <div className="mt-10 flex items-center gap-4">
                                        <Button
                                            onClick={() => navigate('/app')}
                                            size="lg"
                                            className="rounded-xl px-6 md:px-10 h-12 md:h-14 text-sm md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex-1 sm:flex-none">
                                            <span className="text-nowrap">Mulai Gratis</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            className="h-12 md:h-14 rounded-xl px-6 md:px-8 text-sm md:text-lg font-semibold border border-border hover:bg-surface-container-low transition-all flex-1 sm:flex-none">
                                            <span className="text-nowrap">Lihat Demo</span>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>
                        <AnimatedGroup
                            className="w-full"
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.5,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-16 md:mt-24 max-w-5xl mx-auto px-6">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-50%"
                                />
                                <div className="backdrop-blur-sm bg-card/50 relative mx-auto overflow-hidden rounded-3xl border border-border/50 p-2 shadow-2xl shadow-zinc-950/15">
                                    <img
                                        className="bg-background aspect-video relative hidden rounded-2xl dark:block object-cover w-full"
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                                        alt="app screen dark"
                                    />
                                    <img
                                        className="z-2 border-border/25 aspect-video relative rounded-2xl border dark:hidden object-cover w-full"
                                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015"
                                        alt="app screen light"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>

        </>
    )
}

const menuItems = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Tujuan Kami', href: '#features' },
    { name: 'Fitur', href: '#tools' },
    { 
        name: 'Micro-Tools', 
        href: '#',
        dropdown: [
            { name: 'Local Context Packer', href: '#tools' },
            { name: 'Smart Boilerplate', href: '#tools' },
            { name: 'Token Cost Tracker', href: '#tools' },
            { name: 'PRD Architect', href: '#tools' },
        ]
    },
    { name: 'Tentang Kami', href: '#about' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
    const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState<string | null>(null)
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const handleNavClick = (href: string) => {
        if (href.startsWith('#')) {
            window.dispatchEvent(new CustomEvent('nav-start'));
            setMenuState(false);
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('nav-end'));
            }, 1000);
        } else {
            navigate(href);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'group mx-auto max-w-6xl rounded-2xl border border-border/50 transition-all duration-300 pointer-events-auto', 
                    'bg-background/80 backdrop-blur-xl py-4 px-6 shadow-lg'
                )}>
                <div className="relative flex items-center justify-between gap-6">
                    <div className="flex items-center gap-8">
                        <div 
                            className="flex items-center gap-2 cursor-pointer" 
                            onClick={() => {
                                handleNavClick('#hero');
                            }}
                        >
                            <Logo className="h-8 w-8 text-primary" />
                            <span className="font-bold text-xl tracking-tight">Dity Engine</span>
                        </div>

                        <div className="hidden md:block">
                            <ul className="flex gap-6 text-sm font-medium">
                                {menuItems.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className="relative"
                                        onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button
                                            onClick={() => !item.dropdown && handleNavClick(item.href)}
                                            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-2 cursor-pointer">
                                            {item.name}
                                            {item.dropdown && <ChevronDown size={14} className={cn("transition-transform", activeDropdown === item.name && "rotate-180")} />}
                                        </button>

                                        {item.dropdown && (
                                            <AnimatePresence>
                                                {activeDropdown === item.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-xl shadow-xl p-2 z-50"
                                                    >
                                                        {item.dropdown.map((subItem, subIndex) => (
                                                            <button
                                                                key={subIndex}
                                                                onClick={() => handleNavClick(subItem.href)}
                                                                className="w-full text-left block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all"
                                                            >
                                                                {subItem.name}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle className="text-foreground" />
                        
                        <div className="hidden sm:flex items-center gap-3">
                            <Button
                                onClick={() => navigate('/app')}
                                variant="ghost"
                                size="sm"
                                className="font-semibold">
                                Masuk
                            </Button>
                            <Button
                                onClick={() => navigate('/app')}
                                size="sm"
                                className="font-bold rounded-xl px-5">
                                Daftar
                            </Button>
                        </div>

                        <button
                            onClick={() => setMenuState(!menuState)}
                            className="relative z-20 p-2 md:hidden text-foreground">
                            {menuState ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {menuState && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40 bg-black/5 md:hidden pointer-events-auto" 
                                    onClick={() => setMenuState(false)}
                                />
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-full left-0 right-0 mt-4 bg-background border border-border rounded-2xl p-6 shadow-2xl md:hidden z-50 pointer-events-auto"
                                >
                                <ul className="space-y-4 mb-8">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => {
                                                        if (item.dropdown) {
                                                            setMobileDropdownOpen(mobileDropdownOpen === item.name ? null : item.name);
                                                        } else {
                                                            handleNavClick(item.href);
                                                        }
                                                    }}
                                                    className="w-full text-left text-lg font-medium text-muted-foreground hover:text-foreground flex items-center justify-between">
                                                    {item.name}
                                                    {item.dropdown && <ChevronDown size={18} className={cn("transition-transform", mobileDropdownOpen === item.name && "rotate-180")} />}
                                                </button>
                                                {item.dropdown && (
                                                    <AnimatePresence>
                                                        {mobileDropdownOpen === item.name && (
                                                            <motion.ul 
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="pl-4 border-l border-border space-y-2 pt-2 overflow-hidden"
                                                            >
                                                                {item.dropdown.map((sub, i) => (
                                                                    <li key={i}>
                                                                        <button 
                                                                            onClick={() => handleNavClick(sub.href)}
                                                                            className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-1 block"
                                                                        >
                                                                            {sub.name}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        onClick={() => {
                                            setMenuState(false);
                                            navigate('/app');
                                        }}
                                        variant="outline"
                                        className="w-full font-bold py-6">
                                        Masuk
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setMenuState(false);
                                            navigate('/app');
                                        }}
                                        className="w-full font-bold py-6">
                                        Daftar
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                </div>
            </nav>
        </header>
    )
}
