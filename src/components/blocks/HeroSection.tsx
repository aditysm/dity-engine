'use client'

import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ChevronRight, Menu, X, Zap, Terminal, Bot, Shield, ChevronDown, Download, ArrowRight } from 'lucide-react'
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
    
    const handleNavClick = (href: string) => {
        if (href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                const navHeight = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            navigate(href);
        }
    };

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
                                        Ngoding Lebih Cepat. Tetap dalam <span className="text-primary italic text-shadow-glow">Kendali.</span>
                                    </h1>
                                    <p
                                        className="mt-6 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground leading-relaxed">
                                        Otomatiskan dokumentasi dan aturan main proyek secara instan, lokal tanpa biaya bulanan.
                                    </p>
                                    <div className="mt-10 flex flex-row items-center gap-2 sm:gap-4">
                                        <Button
                                            onClick={() => navigate('/download')}
                                            size="lg"
                                            className="rounded-xl px-4 sm:px-8 h-12 md:h-14 text-xs sm:text-sm md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                            <span className="text-nowrap">Unduh Sekarang</span>
                                            <ArrowRight size={18} className="hidden xs:inline" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            onClick={() => navigate('/docs')}
                                            className="h-12 md:h-14 rounded-xl px-3 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-transparent transition-all flex items-center justify-center">
                                            <span className="text-nowrap">Lihat Dokumentasi</span>
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
    { name: 'Tujuan Kami', href: '#about' },
    { name: 'Fitur', href: '#tools' },
    { 
        name: 'Micro-Tools', 
        href: '#tools',
        dropdown: [
            { name: 'Local Context Packer', href: '/local-context-packer' },
            { name: 'Smart Boilerplate', href: '/smart-boilerplate' },
            { name: 'Token Cost Tracker', href: '/token-cost-tracker' },
            { name: 'PRD Architect', href: '/prd-architect' },
        ]
    },
    { name: 'FAQ', href: '#faq' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
    const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState<string | null>(null)
    const navigate = useNavigate();
    const location = useLocation();

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const [activeSection, setActiveSection] = React.useState('#hero');
    const navRef = React.useRef<HTMLElement>(null);

    const isHome = location.pathname === '/';
    const isFeaturePage = ['/local-context-packer', '/smart-boilerplate', '/token-cost-tracker', '/prd-architect'].includes(location.pathname);
    const isDownloadPage = location.pathname === '/download';
    const isLegalPage = ['/privacy', '/terms', '/support'].includes(location.pathname);

    const handleNavClick = (href: string) => {
        if (href.startsWith('#')) {
            if (!isHome) {
                navigate('/' + href);
                return;
            }
            window.dispatchEvent(new CustomEvent('nav-start'));
            setMenuState(false);
            setMobileDropdownOpen(null);
            const target = document.querySelector(href);
            if (target) {
                const navHeight = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('nav-end'));
            }, 1000);
        } else {
            navigate(href);
        }
    };

    const getFeatureName = () => {
        const item = menuItems.find(i => i.dropdown)?.dropdown?.find(d => d.href === location.pathname);
        return item?.name || 'Fitur';
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = ['#hero', '#about', '#tools', '#faq'];
            const scrollPosition = window.scrollY + 120;

            for (const section of sections) {
                const element = document.querySelector(section);
                if (element) {
                    const top = (element as HTMLElement).offsetTop;
                    const height = (element as HTMLElement).offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuState && navRef.current && !navRef.current.contains(event.target as Node)) {
                setMenuState(false);
            }
        };

        if (menuState) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuState]);

    return (
        <header ref={navRef as any} className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <nav
                data-state={menuState && 'active'}
                className="mx-auto w-full max-w-7xl py-4 px-6">
                <div className="relative flex items-center justify-between gap-6">
                    <div className="flex items-center gap-8">
                        <div 
                            className="flex items-center gap-2 cursor-pointer select-none group transition-transform hover:scale-105 active:scale-95" 
                            onClick={() => {
                                if (window.location.pathname === '/') {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                } else {
                                    navigate('/');
                                }
                            }}
                        >
                            <Logo className="h-8 w-8 text-primary" />
                            <span className="font-bold text-xl tracking-tight text-foreground">Dity Engine</span>
                        </div>

                        <div className="hidden md:block">
                            <ul className="flex items-center gap-1">
                                {isHome ? (
                                    menuItems.map((item, index) => (
                                        <li 
                                            key={index} 
                                            className="relative group/item"
                                            onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                        >
                                            <button
                                                onClick={() => {
                                                    if (item.dropdown) {
                                                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                                                    } else {
                                                        handleNavClick(item.href);
                                                    }
                                                }}
                                                className={cn(
                                                    "px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative flex items-center gap-1",
                                                    activeSection === item.href ? "text-primary" : "text-muted-foreground"
                                                )}
                                            >
                                                {item.name}
                                                {item.dropdown && <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === item.name && "rotate-180")} />}
                                                
                                                {activeSection === item.href && !item.dropdown && (
                                                    <motion.div 
                                                        layoutId="activeNav"
                                                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                                                    />
                                                )}
                                            </button>

                                            {item.dropdown && (
                                                <AnimatePresence>
                                                    {activeDropdown === item.name && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-2xl shadow-2xl p-3 z-50"
                                                        >
                                                            <div className="space-y-1">
                                                                {item.dropdown.map((subItem, subIndex) => (
                                                                    <button
                                                                        key={subIndex}
                                                                        onClick={() => {
                                                                            handleNavClick(subItem.href);
                                                                            setActiveDropdown(null);
                                                                        }}
                                                                        className="w-full text-left flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all group/sub"
                                                                    >
                                                                        <span>{subItem.name}</span>
                                                                        <ArrowRight size={14} className="opacity-0 group-hover/sub:opacity-100 transition-all -translate-x-2 group-hover/sub:translate-x-0" />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                        </li>
                                    ))
                                ) : isFeaturePage ? (
                                    <li 
                                        className="relative"
                                        onMouseEnter={() => setActiveDropdown('Fitur')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button 
                                            onClick={() => setActiveDropdown(activeDropdown === 'Fitur' ? null : 'Fitur')}
                                            className="px-4 py-2 text-sm font-bold text-primary relative flex items-center gap-1 border border-primary/20 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
                                        >
                                            Fitur: {getFeatureName()}
                                            <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === 'Fitur' && "rotate-180")} />
                                        </button>
                                        <AnimatePresence>
                                            {activeDropdown === 'Fitur' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-2xl shadow-2xl p-3 z-50"
                                                >
                                                    <div className="space-y-1">
                                                        {menuItems.find(i => i.dropdown)?.dropdown?.map((subItem, subIndex) => {
                                                            const isActiveSub = location.pathname === subItem.href;
                                                            return (
                                                                <button
                                                                    key={subIndex}
                                                                    onClick={() => {
                                                                        handleNavClick(subItem.href);
                                                                        setActiveDropdown(null);
                                                                    }}
                                                                    className={cn(
                                                                        "w-full text-left flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all group/sub",
                                                                        isActiveSub 
                                                                            ? "text-primary bg-primary/5 font-bold" 
                                                                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                                                    )}
                                                                >
                                                                    <span>{subItem.name}</span>
                                                                    <ArrowRight size={14} className={cn("transition-all", isActiveSub ? "opacity-100 text-primary" : "opacity-0 group-hover/sub:opacity-100 -translate-x-2 group-hover/sub:translate-x-0")} />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ) : (
                                    <li className="relative">
                                        <button
                                            onClick={() => navigate('/')}
                                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Beranda
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <ThemeToggle className="text-foreground" />
                        
                        <div className="hidden sm:flex items-center gap-3">
                            {!isDownloadPage && (
                                <Button
                                    onClick={() => navigate('/download')}
                                    size="sm"
                                    className="font-bold rounded-xl px-5 flex items-center gap-2 group">
                                    Unduh Sekarang
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                setMenuState(!menuState);
                                if (!menuState) {
                                    setMobileDropdownOpen(null);
                                }
                            }}
                            className="relative z-20 p-2 md:hidden text-foreground">
                            {menuState ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {menuState && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setMenuState(false)}
                                    className="fixed inset-0 bg-background/40 z-40 md:hidden pointer-events-auto"
                                />
                                <motion.div 
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    className="absolute top-full left-4 right-4 mt-2 bg-card border border-border rounded-3xl p-8 shadow-2xl md:hidden z-50 pointer-events-auto overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)] pointer-events-none" />
                                    <ul className="space-y-4 mb-10 relative z-10">
                                        {isHome ? (
                                            menuItems.map((item, index) => (
                                                <li key={index}>
                                                    <div className="space-y-3">
                                                        <button
                                                            onClick={() => {
                                                                if (item.dropdown) {
                                                                    setMobileDropdownOpen(mobileDropdownOpen === item.name ? null : item.name);
                                                                } else {
                                                                    handleNavClick(item.href);
                                                                }
                                                            }}
                                                            className={cn(
                                                                "w-full text-left text-xl font-bold flex items-center justify-between transition-colors",
                                                                (activeSection === item.href || mobileDropdownOpen === item.name) ? "text-primary" : "text-foreground"
                                                            )}>
                                                            {item.name}
                                                            {item.dropdown && <ChevronDown size={20} className={cn("transition-transform duration-300", mobileDropdownOpen === item.name && "rotate-180")} />}
                                                        </button>
                                                        {item.dropdown && (
                                                            <AnimatePresence>
                                                                {mobileDropdownOpen === item.name && (
                                                                    <motion.ul 
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="pl-4 border-l border-border/50 space-y-4 pt-2 overflow-hidden"
                                                                    >
                                                                        {item.dropdown.map((sub, i) => (
                                                                            <li key={i}>
                                                                                <button 
                                                                                    onClick={() => handleNavClick(sub.href)}
                                                                                    className="w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors py-1 block"
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
                                            ))
                                        ) : isFeaturePage ? (
                                            <li>
                                                <div className="space-y-3">
                                                    <button
                                                        onClick={() => {
                                                            setMobileDropdownOpen(mobileDropdownOpen === 'Fitur' ? null : 'Fitur');
                                                        }}
                                                        className="w-full text-left text-xl font-bold flex items-center justify-between text-primary"
                                                    >
                                                        Fitur: {getFeatureName()}
                                                        <ChevronDown size={20} className={cn("transition-transform duration-300", mobileDropdownOpen === 'Fitur' && "rotate-180")} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileDropdownOpen === 'Fitur' && (
                                                            <motion.ul 
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="pl-4 border-l border-border/50 space-y-4 pt-2 overflow-hidden"
                                                            >
                                                                {menuItems.find(i => i.dropdown)?.dropdown?.map((sub, i) => {
                                                                    const isActiveSub = location.pathname === sub.href;
                                                                    return (
                                                                        <li key={i}>
                                                                            <button 
                                                                                onClick={() => {
                                                                                    setMenuState(false);
                                                                                    navigate(sub.href);
                                                                                }}
                                                                                className={cn(
                                                                                    "w-full text-left text-lg py-1 block transition-colors",
                                                                                    isActiveSub ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                                                                                )}
                                                                            >
                                                                                {sub.name}
                                                                            </button>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </li>
                                        ) : (
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        setMenuState(false);
                                                        navigate('/');
                                                    }}
                                                    className="w-full text-left text-xl font-bold text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    Beranda
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                    {!isDownloadPage && (
                                        <div className="relative z-10">
                                            <Button
                                                onClick={() => {
                                                    setMenuState(false);
                                                    navigate('/download');
                                                }}
                                                className="w-full font-bold h-14 rounded-2xl flex items-center justify-center gap-2 group shadow-lg shadow-primary/20">
                                                Unduh Sekarang
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    )
}
