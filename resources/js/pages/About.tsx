import MainLayout from '../layouts/MainLayout';
import { ShieldAlert, Award, FileCheck, CheckCircle2, BadgeCheck, Download, FileText } from 'lucide-react';
import { Head } from '@inertiajs/react';
import { Button } from '../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../components/ui/dialog";
import ContactForm from '../components/landing/ContactForm';

export default function About() {
    return (
        <MainLayout title="Tentang Kami">
            <Head>
                <title>Tentang Kami - iCool | Service AC Berintegritas</title>
                <meta name="description" content="Mengenal iCool lebih dekat. Komitmen kami untuk menjadi ONE STOP HVAC SERVICE di Indonesia dengan pelayanan yang jujur dan transparan." />
            </Head>

            <div className="bg-gray-950 min-h-screen text-gray-300">
                {/* Hero Banner */}
                <div className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/images/ac_technician.png" 
                            alt="Tim iCool" 
                            className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/50 to-transparent"></div>
                    </div>
                    
                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-semibold mb-6">
                                <BadgeCheck className="w-4 h-4" />
                                PT Mitra Sahabat Selaras
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Menjadi <span className="text-brand-green">ONE STOP HVAC SERVICE</span> Kebanggaan Indonesia
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                iCool dibangun dengan satu tujuan utama: Menghadirkan layanan pendingin ruangan yang identik dengan kualitas, profesionalisme, dan transparansi mutlak.
                            </p>
                        </div>
                    </div>
                </div>

                {/* The "No-Nonsense" Guarantee (Director's Message) */}
                <section className="py-12 lg:py-16 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
                    
                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-6 lg:p-12 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
                            
                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
                                <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    <ShieldAlert className="w-6 h-6 lg:w-8 lg:h-8" />
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white">
                                        Komitmen "Zero-Tolerance" Kami
                                    </h2>
                                    <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
                                        <p>
                                            Di iCool, kepuasan dan kepercayaan pelanggan adalah <strong>Key Performance Indicator (KPI) nomor satu kami</strong>. Kami sangat menyadari stigma negatif yang sering melekat pada penyedia jasa service AC akibat oknum teknisi yang nakal.
                                        </p>
                                        <div className="border-l-4 border-brand-green pl-6 my-8">
                                            <p className="text-white text-xl lg:text-2xl font-semibold m-0 leading-snug">
                                                "Kami menerapkan kebijakan <span className="text-brand-green">Zero-Tolerance</span>. Jika terbukti ada teknisi yang berbuat curang, mereka menghadapi <span className="text-red-400">Pemecatan Langsung</span>."
                                            </p>
                                        </div>
                                        <p>
                                            Kami lebih memilih kehilangan teknisi daripada kehilangan kepercayaan Anda. Integritas adalah harga mati bagi setiap personil yang mengenakan seragam iCool.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications, Badges & Company Profile */}
                <section className="py-12 lg:py-20 bg-gray-900/30 border-t border-b border-gray-800/50">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            
                            {/* Left Side: Badges & PDF */}
                            <div className="flex-1 space-y-8">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl font-bold text-white mb-4">Partner Resmi & Tersertifikasi</h2>
                                    <p className="text-gray-400 leading-relaxed">
                                        Keahlian teknisi kami bukan sekadar klaim. Seluruh tim iCool telah diakui secara resmi dan dilatih langsung oleh prinsipal AC terkemuka di dunia.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                    {/* DASP Card */}
                                    <div className="bg-gray-950 border border-gray-800 hover:border-brand-green/50 transition-colors p-5 rounded-2xl relative group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Award className="w-16 h-16 text-brand-green" />
                                        </div>
                                        <div className="relative z-10 space-y-3">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">DASP</h3>
                                            <p className="text-brand-green font-medium text-sm">Daikin Authorized Service Partner</p>
                                        </div>
                                    </div>

                                    {/* Training Center Card */}
                                    <div className="bg-gray-950 border border-gray-800 hover:border-brand-green/50 transition-colors p-5 rounded-2xl relative group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <FileCheck className="w-16 h-16 text-brand-green" />
                                        </div>
                                        <div className="relative z-10 space-y-3">
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                                                <BadgeCheck className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">National Training</h3>
                                            <p className="text-brand-green font-medium text-sm">Sertifikasi Resmi Pelatihan</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Download PDF Button */}
                                <div className="pt-6 border-t border-gray-800/50">
                                    <a 
                                        href="/pdf/iCool Company Profile 2022.pdf" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-4 p-4 pr-6 bg-gray-950 border border-gray-800 hover:border-brand-green hover:bg-gray-900 rounded-2xl transition-all group w-full sm:w-auto"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white font-bold group-hover:text-brand-green transition-colors">Unduh Company Profile</div>
                                            <div className="text-sm text-gray-500 line-clamp-1">iCool Company Profile 2022.pdf</div>
                                        </div>
                                        <Download className="w-5 h-5 text-gray-600 group-hover:text-brand-green ml-auto sm:ml-8 transition-colors shrink-0" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Certificate Image */}
                            <div className="flex-1 w-full relative mt-8 lg:mt-0">
                                {/* Decorative elements behind certificate */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-green/20 to-blue-500/20 blur-3xl opacity-30 rounded-full"></div>
                                
                                <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
                                    <div className="relative rounded-xl border border-gray-700 bg-gray-900 p-1.5 shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer group">
                                        <img 
                                            src="/images/certificate.png" 
                                            alt="Daikin Certificate" 
                                            className="w-full h-auto rounded-lg shadow-inner border border-gray-800 group-hover:brightness-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-xl transition-opacity">
                                            <span className="text-white text-xs sm:text-sm font-medium border border-white/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">Daikin</span>
                                        </div>
                                    </div>
                                    <div className="relative rounded-xl border border-gray-700 bg-gray-900 p-1.5 shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer group">
                                        <img 
                                            src="/images/certificate.png" 
                                            alt="Panasonic Certificate" 
                                            className="w-full h-auto rounded-lg shadow-inner border border-gray-800 group-hover:brightness-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-xl transition-opacity">
                                            <span className="text-white text-xs sm:text-sm font-medium border border-white/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">Panasonic</span>
                                        </div>
                                    </div>
                                    <div className="relative rounded-xl border border-gray-700 bg-gray-900 p-1.5 shadow-xl hover:-translate-y-2 transition-transform duration-300 cursor-pointer group">
                                        <img 
                                            src="/images/certificate.png" 
                                            alt="Mitsubishi Certificate" 
                                            className="w-full h-auto rounded-lg shadow-inner border border-gray-800 group-hover:brightness-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-xl transition-opacity">
                                            <span className="text-white text-xs sm:text-sm font-medium border border-white/50 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">Mitsubishi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center text-sm text-gray-500">
                                    Sertifikasi dan keanggotaan service partner resmi iCool
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Call to Action Footer */}
                <section className="py-16 lg:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-green/5"></div>
                    <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Siap Beralih ke Service AC yang Terpercaya?
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                            Jangan ambil risiko dengan teknisi abal-abal. Percayakan kenyamanan ruangan Anda pada tim profesional iCool.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full h-14 px-8 text-base font-medium shadow-lg shadow-brand-green/20 cursor-pointer">
                                    Jadwalkan Survey & Service Sekarang
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-4xl lg:max-w-5xl p-0 max-h-[90dvh] overflow-y-auto bg-transparent border-none shadow-2xl">
                                <ContactForm isPopup={true} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
