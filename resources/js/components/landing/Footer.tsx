import { MapPin, Phone, Mail, MessageCircle, Instagram } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/landing/ContactForm';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="block mb-6">
                            <img src="/images/logo.png" alt="ICool" className="h-12 w-auto object-contain filter invert opacity-80 dark:invert-0" />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                            Service AC Berkualitas Dengan Integritas. Keahlian, pengalaman, dan kejujuran membedakan teknisi iCool dari yang lain.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Layanan Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/service-kami/service-cuci-ac" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Service Cuci AC</Link></li>
                            <li><Link href="/service-kami/kontrak-cuci-ac" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Kontrak Cuci AC</Link></li>
                            <li><Link href="/service-kami/reparasi-perbaikan" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Reparasi / Perbaikan</Link></li>
                            <li><Link href="/service-kami/teknisi-standby-inhouse" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Teknisi Standby / Inhouse</Link></li>
                            <li><Link href="/service-kami/spare-part-ac" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Spare Part AC</Link></li>
                            <li><Link href="/service-kami/instalasi-pasang-ac" className="text-gray-600 dark:text-gray-400 hover:text-brand-green hover:underline transition-all">Instalasi / Pasang AC</Link></li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Alamat Kantor</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <a href="https://maps.google.com/?q=Ruko+Imperial+Business+Center+C-7+Jl.+Raya+Daan+Mogot+Km.+17+Kalideres,+DKI+Jakarta" target="_blank" rel="noopener noreferrer" className="group">
                                    <strong className="block text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Head Office</strong>
                                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 transition-colors block">
                                        Ruko Imperial Business Center C-7<br/>
                                        Jl. Raya Daan Mogot Km. 17, Kalideres<br/>
                                        DKI Jakarta 11840
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <a href="https://maps.google.com/?q=Jl.+Bypass+Ngurah+Rai+No.154,+Sanur+Kaja,+Denpasar+Selatan,+Bali" target="_blank" rel="noopener noreferrer" className="group">
                                    <strong className="block text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Cabang Bali</strong>
                                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 transition-colors block">
                                        Jl. Bypass Ngurah Rai No.154<br/>
                                        Sanur Kaja, Denpasar Selatan<br/>
                                        Bali 80237
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <a href="https://maps.google.com/?q=Ruko+Terrace+8+blok+A+No.68+Suvarna+Sutera,+Tangerang" target="_blank" rel="noopener noreferrer" className="group">
                                    <strong className="block text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Cabang Suvarna</strong>
                                    <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 transition-colors block">
                                        Ruko Terrace 8 blok A No.68<br/>
                                        Suvarna Sutera, Kab. Tangerang<br/>
                                        Banten 15560
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Hubungi Kami</h4>
                        
                        <div className="mb-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="inline-flex items-center justify-center bg-brand-green hover:bg-brand-green/90 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer w-full sm:w-auto">
                                        Jadwalkan Service
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-4xl lg:max-w-5xl p-0 max-h-[90dvh] overflow-y-auto bg-transparent border-none shadow-2xl">
                                    <ContactForm isPopup={true} />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <li className="flex items-center gap-3">
                                <MessageCircle className="w-4 h-4 text-brand-green shrink-0" />
                                <div>
                                    <a href="https://wa.me/6285782747422" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">0857-8274-7422</a>
                                    <span className="mx-2 text-gray-500">/</span>
                                    <a href="https://wa.me/6281386049202" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">0813-8604-9202</a>
                                </div>
                            </li>
                            <li>
                                <a href="tel:08001060610" className="flex items-center gap-3 hover:text-brand-green transition-colors group">
                                    <Phone className="w-4 h-4 text-brand-green group-hover:scale-110 transition-transform" />
                                    <span>0800-10-606-10</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:support@icool.co.id" className="flex items-center gap-3 hover:text-brand-green transition-colors group">
                                    <Mail className="w-4 h-4 text-brand-green group-hover:scale-110 transition-transform" />
                                    <span>support@icool.co.id</span>
                                </a>
                            </li>
                        </ul>
                        
                        <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <a href="https://www.instagram.com/icoolaircon/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand-green transition-all group">
                                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} PT Mitra Sahabat Selaras. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
