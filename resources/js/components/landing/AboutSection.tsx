import { ShieldCheck, Wrench, GraduationCap, HeartHandshake, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

export default function AboutSection() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden" id="about">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-dark to-transparent opacity-50 z-0"></div>
            
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 md:space-y-10 order-2 lg:order-1">
                        <div className="inline-block px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold text-sm tracking-wider uppercase mb-2">
                            Hello, Kami iCool!
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                            Lebih Dari Sekadar <span className="text-brand-green">Service AC</span>
                        </h2>
                        
                        <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                            <p>
                                iCool beroperasi di bawah naungan PT Mitra Sahabat Selaras, sebuah grup yang telah menjadi pemain utama dalam pengadaan HVAC di Indonesia sejak tahun <strong className="text-white font-medium">1998</strong>.
                            </p>
                            <p>
                                Berbekal pengalaman lebih dari dua dekade, kami hadir sebagai solusi dari kebutuhan masyarakat akan perusahaan service dan reparasi HVAC yang dapat dipercaya, mengutamakan integritas, dan transparan di setiap tahap pengerjaan.
                            </p>
                        </div>

                        {/* Features list (4 Pillars) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 my-8 md:my-10">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-brand-green">
                                    <HeartHandshake className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Kepuasan Pelanggan</h4>
                                    <p className="text-sm text-gray-400">Menjadi prioritas utama di setiap kunjungan.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-brand-green">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Kepercayaan & Transparansi</h4>
                                    <p className="text-sm text-gray-400">Tanpa biaya tersembunyi, SOP ketat anti-kecurangan.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-brand-green">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Kerjasama Tim</h4>
                                    <p className="text-sm text-gray-400">Teknisi tersertifikasi, solid dan profesional.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-brand-green">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Peningkatan Kualitas</h4>
                                    <p className="text-sm text-gray-400">Terus berinovasi dan belajar setiap harinya.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-8">
                            <Button asChild variant="outline" className="border-brand-green/50 text-brand-green hover:bg-brand-green hover:text-slate-900 font-bold rounded-full px-8 py-6 text-lg transition-all shadow-lg shadow-brand-green/10">
                                <Link href="/tentang-kami" className="flex items-center gap-2">
                                    Kenali Tim Kami <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Image / Visuals */}
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden relative group border border-white/10">
                            <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                            <img 
                                src="/images/ac_technician.png" 
                                alt="Tim Teknisi iCool" 
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 left-4 sm:-left-12 bg-gray-950 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                                    <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8" />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                                    <div className="text-xs sm:text-sm text-gray-400">Garansi Kejujuran</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
