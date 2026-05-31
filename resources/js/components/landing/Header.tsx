import { Link, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Mail, ChevronDown, Menu, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '../ui/sheet';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';

export default function Header() {
    const { url } = usePage();
    const headerRef = useRef<HTMLElement>(null);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                document.documentElement.style.setProperty('--header-height', `${height}px`);
            }
        };

        // Run initially and observe resizing
        updateHeaderHeight();
        window.addEventListener('resize', updateHeaderHeight);
        
        // Use ResizeObserver for more robust tracking of DOM mutations that change height
        const observer = new ResizeObserver(updateHeaderHeight);
        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
            observer.disconnect();
        };
    }, []);

    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all flex flex-col">
            {/* Secondary Top Bar for Contact Info */}
            <div className="hidden lg:flex bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 py-1.5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium">
                <div className="container mx-auto px-5 lg:px-8 flex justify-end items-center gap-6">
                    <a href="mailto:support@icool.co.id" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        support@icool.co.id
                    </a>
                    <a href="tel:08001060610" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        0800-10-606-10
                    </a>
                </div>
            </div>

            <div className="container mx-auto px-5 lg:px-8 h-20 relative flex items-center justify-between">
                <div className="flex items-center h-full">
                    <Link href="/" className="flex items-center h-full">
                        <img src="/images/logo.png" alt="ICool Logo" className="h-12 w-auto object-contain transform -translate-y-0.5" />
                    </Link>
                </div>
                
                {/* Desktop Main Navigation */}
                <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-medium">
                    <Link href="/" className={`transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-transform after:duration-300 ${url === '/' ? 'text-primary after:scale-x-100' : 'text-gray-600 dark:text-gray-300 hover:text-primary after:scale-x-0'}`}>
                        Beranda
                    </Link>
                    <Link href="/tentang-kami" className={`transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-transform after:duration-300 ${url.startsWith('/tentang-kami') ? 'text-primary after:scale-x-100' : 'text-gray-600 dark:text-gray-300 hover:text-primary after:scale-x-0'}`}>
                        Tentang Kami
                    </Link>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className={`flex items-center gap-1.5 py-6 transition-colors focus:outline-none ${url.startsWith('/service-kami') ? 'text-primary' : 'text-gray-600 dark:text-gray-300 hover:text-primary'}`}>
                            Layanan Kami <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl p-2 shadow-xl">
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/service-cuci-ac" className="w-full text-sm text-gray-700 dark:text-gray-300">Service Cuci AC</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/kontrak-cuci-ac" className="w-full text-sm text-gray-700 dark:text-gray-300">Kontrak Cuci AC</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/reparasi-perbaikan" className="w-full text-sm text-gray-700 dark:text-gray-300">Reparasi / Perbaikan</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/teknisi-standby-inhouse" className="w-full text-sm text-gray-700 dark:text-gray-300">Teknisi Standby / Inhouse</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/spare-part-ac" className="w-full text-sm text-gray-700 dark:text-gray-300">Spare Part AC</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-primary dark:focus:bg-gray-900 rounded-lg">
                                <Link href="/service-kami/instalasi-pasang-ac" className="w-full text-sm text-gray-700 dark:text-gray-300">Instalasi / Pasang AC</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/projek-ac" className={`transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-transform after:duration-300 ${url.startsWith('/projek-ac') ? 'text-primary after:scale-x-100' : 'text-gray-600 dark:text-gray-300 hover:text-primary after:scale-x-0'}`}>
                        Portfolio
                    </Link>
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <Button asChild className="bg-primary hover:bg-primary/90 text-slate-900 font-semibold rounded-full px-4 sm:px-6 shadow-lg shadow-primary/30">
                        <Link href="/#contact">
                            <span className="sm:hidden">Booking</span>
                            <span className="hidden sm:inline">Booking Sekarang</span>
                        </Link>
                    </Button>

                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                <span className="sr-only">Buka Menu</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col p-0">
                            <SheetHeader className="p-6 border-b border-gray-100 dark:border-gray-800 text-left">
                                <SheetTitle>
                                    <img src="/images/logo.png" alt="ICool Logo" className="h-8 w-auto object-contain" />
                                </SheetTitle>
                            </SheetHeader>
                            
                            <div className="flex flex-col gap-4 p-6 overflow-y-auto">
                                <SheetClose asChild>
                                    <Link href="/" className={`text-lg font-medium transition-colors ${url === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300'}`}>Beranda</Link>
                                </SheetClose>

                                <SheetClose asChild>
                                    <Link href="/tentang-kami" className={`text-lg font-medium transition-colors ${url.startsWith('/tentang-kami') ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300'}`}>Tentang Kami</Link>
                                </SheetClose>
                                
                                <div className="flex flex-col gap-3 my-2 py-4 border-y border-gray-100 dark:border-gray-800">
                                    <button 
                                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                                        className={`flex items-center justify-between w-full text-lg font-medium focus:outline-none ${url.startsWith('/service-kami') ? 'text-primary' : 'text-gray-900 dark:text-white'}`}
                                    >
                                        Layanan Kami
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`flex flex-col gap-3 pl-4 border-l-2 border-gray-100 dark:border-gray-800 mt-2 overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <SheetClose asChild><Link href="/service-kami/service-cuci-ac" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Service Cuci AC</Link></SheetClose>
                                        <SheetClose asChild><Link href="/service-kami/kontrak-cuci-ac" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Kontrak Cuci AC</Link></SheetClose>
                                        <SheetClose asChild><Link href="/service-kami/reparasi-perbaikan" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Reparasi / Perbaikan</Link></SheetClose>
                                        <SheetClose asChild><Link href="/service-kami/teknisi-standby-inhouse" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Teknisi Standby / Inhouse</Link></SheetClose>
                                        <SheetClose asChild><Link href="/service-kami/spare-part-ac" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Spare Part AC</Link></SheetClose>
                                        <SheetClose asChild><Link href="/service-kami/instalasi-pasang-ac" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors py-1">Instalasi / Pasang AC</Link></SheetClose>
                                    </div>
                                </div>

                                <SheetClose asChild>
                                    <Link href="/projek-ac" className={`text-lg font-medium mt-2 transition-colors ${url.startsWith('/projek-ac') ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300'}`}>Portfolio</Link>
                                </SheetClose>
                                
                                <SheetClose asChild>
                                    <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90 text-slate-900 font-bold rounded-full shadow-lg shadow-primary/30 h-12 text-base">
                                        <Link href="/#contact">Booking Sekarang</Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
