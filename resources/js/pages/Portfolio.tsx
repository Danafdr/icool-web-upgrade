import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Building2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import { useState, useMemo, useRef, useEffect } from 'react';
import clientsData from '@/data/clients.json';

// Ensure type safety
interface Client {
    name: string;
    image: string;
    category: string;
    scope?: string;
    stats?: string;
}

const clients: Client[] = clientsData;

export default function Portfolio() {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const filterBarRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 8);
            setIsLoading(false);
        }, 500);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (filterBarRef.current) {
                const rect = filterBarRef.current.getBoundingClientRect();
                const headerHeightStr = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
                const headerHeight = headerHeightStr ? parseFloat(headerHeightStr) : (window.innerWidth >= 1024 ? 112 : 80);
                setIsScrolled(rect.top <= headerHeight + 1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 240;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(clients.map(c => c.category)));
        // Sort alphabetically but put 'Featured' and 'Lain Lain' logically
        return ['All', ...uniqueCategories.sort()];
    }, []);

    const filteredClients = useMemo(() => {
        if (activeCategory === 'All') return clients;
        return clients.filter(c => c.category === activeCategory);
    }, [activeCategory]);

    const displayedClients = useMemo(() => {
        return filteredClients.slice(0, visibleCount);
    }, [filteredClients, visibleCount]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setVisibleCount(8);
    };

    return (
        <MainLayout title="Client Portfolio">
            <Head title="Client Portfolio">
                <meta name="description" content="Portofolio klien iCool — dari korporasi multinasional, fasilitas kesehatan, hingga pusat perbelanjaan. Lihat siapa saja yang mempercayakan kenyamanan kepada kami." />
            </Head>
            
            {/* Hero Section */}
            <section className="relative min-h-[35vh] py-16 md:py-24 bg-gray-950 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10 mix-blend-overlay"></div>
                    {/* Bottom Gradient Fade to transition into Portfolio Grid Section */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Building2 className="w-4 h-4" />
                        Our Trusted Clients
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Mereka yang Mempercayakan <span className="text-brand-green">Kenyamanan</span> Kepada Kami
                    </h1>
                    
                    <p className="mt-6 text-lg md:text-xl text-gray-400 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Dari korporasi multinasional, fasilitas kesehatan, hingga pusat perbelanjaan, kami berkomitmen memberikan solusi pendingin terbaik untuk setiap skala bisnis.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-brand-dark to-gray-950 min-h-screen">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Saring Portofolio Klien Header */}
                    <div className="mb-4 text-left">
                        <h2 className="text-sm font-bold text-white tracking-wider uppercase">
                            Kategori Portofolio Klien
                        </h2>
                    </div>
                </div>

                {/* Filter Container Block */}
                <div 
                    ref={filterBarRef}
                    className={`sticky top-[var(--header-height,80px)] z-40 mb-2 w-full transition-all duration-300 ${
                        isScrolled 
                            ? 'bg-gray-950 py-4 border-b border-white/10 shadow-md' 
                            : 'bg-transparent py-2 border-transparent shadow-none'
                    }`}
                >
                    <div className="container mx-auto px-0 md:px-8 flex items-center gap-2 relative">
                        {/* Left Scroll Button (Desktop Only) */}
                        <button 
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`hidden md:flex w-10 h-10 rounded-full border shadow-sm transition-all shrink-0 items-center justify-center z-10 ${
                                canScrollLeft 
                                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 cursor-pointer' 
                                : 'bg-transparent border-transparent text-transparent cursor-default'
                            }`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {/* Scrollable Container with Mobile Gradient Affordance */}
                        <div className="relative flex-1 min-w-0">
                            <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${isScrolled ? 'from-gray-950' : 'from-brand-dark'} to-transparent z-10 pointer-events-none md:hidden`}></div>
                            
                            <div 
                                ref={scrollContainerRef}
                                onScroll={checkScroll}
                                className="flex items-center gap-2.5 overflow-x-auto py-2 px-6 md:px-0 select-none scroll-smooth relative z-0"
                                role="tablist"
                                aria-label="Portfolio Categories"
                            >
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        role="tab"
                                        aria-selected={activeCategory === category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green cursor-pointer ${
                                            activeCategory === category 
                                            ? 'bg-brand-green text-slate-900 shadow-md shadow-brand-green/20 scale-105' 
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                                {/* Extra padding element at the end for mobile so the last tab isn't hidden under gradient */}
                                <div className="min-w-[20px] md:hidden"></div>
                            </div>
                        </div>

                        {/* Right Scroll Button (Desktop Only) */}
                        <button 
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`hidden md:flex w-10 h-10 rounded-full border shadow-sm transition-all shrink-0 items-center justify-center z-10 ${
                                canScrollRight 
                                ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 active:scale-90 cursor-pointer' 
                                : 'bg-transparent border-transparent text-transparent cursor-default'
                            }`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-8">
                    {/* Animate presence layout for grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500">
                        {displayedClients.length > 0 ? (
                            displayedClients.map((client, idx) => (
                                <div 
                                    key={`${client.name}-${idx}`} 
                                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 animate-in fade-in zoom-in-95 duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green/5 hover:border-white/20 transition-all duration-300"
                                    style={{ 
                                        animationDelay: `${(idx % 8) * 50}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    {/* Category Badge */}
                                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gray-950/80 backdrop-blur-md border border-gray-800 rounded-full text-xs font-semibold text-gray-300 shadow-sm">
                                        {client.category}
                                    </div>

                                    {/* Image Container */}
                                    <div className="relative h-48 sm:h-56 w-full bg-gray-50/50 dark:bg-white/5 flex items-center justify-center overflow-hidden group-hover:bg-white/10 transition-colors p-4">
                                        <img 
                                            src={client.image} 
                                            alt={client.name} 
                                            loading="lazy"
                                            className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-sm" 
                                        />
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-6 flex flex-col flex-1 bg-gray-900">
                                        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-brand-green transition-colors">
                                            {client.name}
                                        </h3>
                                        {client.scope && (
                                            <p className="text-brand-green text-sm font-medium mb-4">
                                                {client.scope}
                                            </p>
                                        )}
                                        {client.stats && (
                                            <div className="mt-auto pt-4 border-t border-gray-800 flex items-center gap-2 text-gray-400 text-sm">
                                                <Building2 className="w-4 h-4 shrink-0 opacity-70" />
                                                <span className="truncate">{client.stats}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400 text-lg">Tidak ada klien di kategori ini.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Button */}
                    {visibleCount < filteredClients.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white font-medium text-sm shadow-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isLoading ? 'Memuat...' : 'Muat Lebih Banyak'}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
