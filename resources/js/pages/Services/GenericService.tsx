import MainLayout from '../../layouts/MainLayout';
import { Button } from '../../components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Wallet, Clock } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../../components/ui/dialog";
import ContactForm from '../../components/landing/ContactForm';
import PricingCalculator from '../../components/landing/PricingCalculator';

interface Props {
    title: string;
    description: string;
    benefits: string[];
    service_type?: string;
    price?: string;
    hasCalculator?: boolean;
}

export default function GenericService({ title, description, benefits, service_type, price, hasCalculator = false }: Props) {
    return (
        <MainLayout title={title}>
            <div className="bg-gradient-to-b from-brand-dark to-gray-950 text-white min-h-screen">
                {/* Header Banner Section */}
                <div className="relative bg-white/[0.02] border-b border-white/10 py-16 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark to-transparent" />
                    </div>
                    <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8 text-left md:text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
                            {title}
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-400 max-w-3xl md:mx-auto">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="flex-1 space-y-6 md:space-y-8">
                        <h2 className="text-3xl font-bold text-white text-left">Kenapa Memilih Layanan Ini?</h2>
                        <ul className="space-y-4">
                            {benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                                    <span className="text-lg text-gray-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        
                        {price && (
                            <div className="pt-4 pb-2">
                                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-gray-400 text-sm font-medium">Estimasi Biaya:</span>
                                    <span className="text-brand-green font-bold text-lg">{price}</span>
                                </div>
                            </div>
                        )}

                        <div className="pt-2 mb-8 md:mb-0">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-slate-900 rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-brand-green/25 cursor-pointer">
                                        Pesan Layanan Ini
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-4xl lg:max-w-5xl p-0 max-h-[90dvh] overflow-y-auto bg-transparent border-none shadow-2xl">
                                    <ContactForm isPopup={true} defaultServiceType={service_type} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl h-full min-h-[400px] flex items-center justify-center p-2 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-3xl pointer-events-none"></div>
                            <img 
                                src="/images/ac_technician.png" 
                                alt="Teknisi iCool membersihkan AC" 
                                className="w-full h-full object-cover rounded-2xl transition-all duration-500 group-hover:scale-105" 
                            />
                        </div>
                    </div>
                </div>

                {/* Calculator Section */}
                {hasCalculator && (
                    <div className="border-t border-white/10 bg-gray-950/50">
                        <PricingCalculator />
                    </div>
                )}

                {/* Guarantees Section */}
                <div className="border-t border-white/10 bg-white/[0.02] py-16 md:py-24 mt-8 md:mt-0">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center max-w-4xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                            AC Anda Masih Bermasalah?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                            Jangan biarkan masalah AC mengganggu kenyamanan Anda. Kami memberikan jaminan kepastian untuk setiap layanan.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-0">
                                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center md:mb-6 text-brand-green">
                                    <Wallet className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Bayar di Akhir</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">Tidak perlu DP. Anda hanya membayar setelah teknisi selesai bekerja dan AC kembali dingin.</p>
                                </div>
                            </div>
                            
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-0">
                                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center md:mb-6 text-brand-green">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Garansi 24 Jam</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">Jaminan kepuasan. Jika ada kendala setelah service, kami kembali tanpa biaya tambahan.</p>
                                </div>
                            </div>
                            
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-0">
                                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center md:mb-6 text-brand-green">
                                    <Clock className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Perawatan Rutin</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">Mencegah AC cepat rusak dan hemat listrik dengan mencuci AC rutin 3 bulan sekali.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section (Grid) */}
                <div className="py-16 md:py-24 relative overflow-hidden bg-transparent">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-12 text-center relative z-20">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Kata Pelanggan Kami</h2>
                        <p className="text-gray-400">Dipercaya oleh ratusan rumah, villa, dan perusahaan ternama.</p>
                    </div>
                    
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "Ibu Mike",
                                    role: "Rumah Kalideres",
                                    content: "Tq u buat I COOL. Udah mengerjakan service AC rumah, dtng sesuai dgn perjanjian, jika ada keluhan cepat direspon.",
                                    initial: "M"
                                },
                                {
                                    name: "Ronald JP",
                                    role: "Villa Owner Canggu",
                                    content: "Kerja tim iCool sangat detail. Teknisi Kerta sangat telaten membersihkan AC saya. Saya sudah jadi pelanggan rutin iCool buat cuci bulanan AC di villa saya di Canggu!",
                                    initial: "R"
                                },
                                {
                                    name: "Garuda Wisnu Kencana",
                                    role: "GWK Bali",
                                    content: "Tim teknisi yang bekerja sangat profesional dan solid. Pekerjaan sangat rapih dan tim yang selalu berkoordinasi dengan baik bersama team engineering GWK.",
                                    initial: "G"
                                }
                            ].map((review, idx) => (
                                <div key={idx} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/[0.06] transition-colors duration-300 h-full">
                                    <div>
                                        <div className="flex gap-1 mb-6">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 italic mb-8 leading-relaxed">
                                            "{review.content}"
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold text-xl border border-brand-green/30 shrink-0">
                                            {review.initial}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{review.name}</h4>
                                            <p className="text-gray-400 text-sm">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
