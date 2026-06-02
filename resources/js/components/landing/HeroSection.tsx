import { Button } from '../ui/button';
import { ArrowRight, FileText, PhoneCall, Wrench, UserCheck, Layers, Power } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex items-center text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green/45 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                        </span>
                        Diskon 10% Kontrak Service Pertama Anda
                    </div>
                    
                    <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Mitra Terpercaya Bisnis Anda Dalam <span className="text-brand-green">Urusan Pendingin</span>
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Layanan profesional untuk perawatan, perbaikan, dan instalasi AC Anda. Kami menjamin kenyamanan Anda dengan solusi pendingin yang cepat, handal, dan berkualitas tinggi.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-black font-bold rounded-full h-14 px-8 text-lg cursor-pointer shadow-xl shadow-brand-green/25">
                            <Link href="/#contact">
                                Jadwalkan Perawatan Rutin
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Signals Elevated */}
                    <div className="pt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 overflow-hidden w-full">
                        <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wider uppercase text-center md:text-left">Official Service Partner Of</p>
                        
                        {/* Mobile Marquee (hidden on md screens and up) */}
                        <div className="relative flex overflow-hidden group md:hidden -mx-4 [-webkit-mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
                                <img src="/images/partners/daikin.png" alt="Daikin" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/panasonic.png" alt="Panasonic" className="h-5 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/mitsubishi.png" alt="Mitsubishi Electric" className="h-8 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/gree.png" alt="Gree" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            {/* Duplicate set for seamless infinite scroll */}
                            <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden="true">
                                <img src="/images/partners/daikin.png" alt="Daikin" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/panasonic.png" alt="Panasonic" className="h-5 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/mitsubishi.png" alt="Mitsubishi Electric" className="h-8 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                                <img src="/images/partners/gree.png" alt="Gree" className="h-6 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>

                        {/* Desktop Static Grid (hidden on mobile) */}
                        <div className="hidden md:flex flex-wrap items-center justify-start gap-8 opacity-70">
                            <img src="/images/partners/daikin.png" alt="Daikin" className="h-7 lg:h-8 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                            <img src="/images/partners/panasonic.png" alt="Panasonic" className="h-6 lg:h-7 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                            <img src="/images/partners/mitsubishi.png" alt="Mitsubishi Electric" className="h-9 lg:h-10 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                            <img src="/images/partners/gree.png" alt="Gree" className="h-7 lg:h-8 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:w-[55%] mt-10 lg:mt-0 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 relative lg:ml-auto lg:max-w-[800px]">
                        <Link href="/service-kami/kontrak-cuci-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Kontrak Maintenance</span>
                        </Link>
                        <Link href="/service-kami/service-cuci-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">On-Call Service</span>
                        </Link>
                        <Link href="/service-kami/reparasi-perbaikan" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <Wrench className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Reparasi / Perbaikan</span>
                        </Link>
                        <Link href="/service-kami/teknisi-standby-inhouse" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Teknisi Standby</span>
                        </Link>
                        <Link href="/service-kami/spare-part-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <Layers className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Spare Part AC</span>
                        </Link>
                        <Link href="/service-kami/instalasi-pasang-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4 transform-gpu will-change-transform">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <Power className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Instalasi AC</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
