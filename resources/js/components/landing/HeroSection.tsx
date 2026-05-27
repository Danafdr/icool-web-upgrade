import { Button } from '../ui/button';
import { ArrowRight, FileText, PhoneCall, Wrench, UserCheck, Layers, Power } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-green/10 blur-[140px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-green/5 blur-[140px]" />
            </div>

            <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green/45 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                        </span>
                        Diskon 10% Kontrak Service Pertama Anda
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Mitra Terpercaya Bisnis Anda Dalam <br />
                        <span className="text-brand-green">Urusan Pendingin</span>
                    </h1>
                    
                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Layanan profesional untuk perawatan, perbaikan, dan instalasi AC Anda. Kami menjamin kenyamanan Anda dengan solusi pendingin yang cepat, handal, dan berkualitas tinggi.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-14 px-8 text-lg group shadow-xl shadow-brand-green/25 cursor-pointer">
                            <Link href="/#contact">
                                Pesan Sekarang
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:w-[55%] mt-10 lg:mt-0 animate-in fade-in zoom-in-95 duration-1000 delay-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 relative lg:ml-auto lg:max-w-[800px]">
                        <Link href="/service-kami/kontrak-cuci-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Kontrak Maintenance</span>
                        </Link>
                        <Link href="/service-kami/service-cuci-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">On-Call Service</span>
                        </Link>
                        <Link href="/service-kami/reparasi-perbaikan" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <Wrench className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Reparasi / Perbaikan</span>
                        </Link>
                        <Link href="/service-kami/teknisi-standby-inhouse" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Teknisi Standby</span>
                        </Link>
                        <Link href="/service-kami/spare-part-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 text-brand-green shadow-sm">
                                <Layers className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors">Spare Part AC</span>
                        </Link>
                        <Link href="/service-kami/instalasi-pasang-ac" className="group flex sm:flex-col items-center justify-start sm:justify-center p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand-green hover:-translate-y-1 hover:shadow-lg transition-all text-left sm:text-center gap-4">
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
