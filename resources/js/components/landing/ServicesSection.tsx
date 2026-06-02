import { Plus } from 'lucide-react';

export default function ServicesSection() {
    return (
        <>


            {/* FAQ Section */}
            <section id="faq" className="py-24 relative border-b border-white/5 text-white">
                <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
                    <div className="text-center mb-16">
                        <span className="text-brand-green font-semibold tracking-wider uppercase text-sm mb-3 block">Masih Ragu?</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            Pertanyaan Umum
                        </h2>
                        <p className="text-gray-400">Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan iCool sebelum menjadwalkan service Anda.</p>
                    </div>

                    <div className="space-y-4">
                        <details className="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-green/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 font-semibold text-white list-none">
                                <span>Apa itu iCool dan service iCool mencakup apa saja?</span>
                                <Plus aria-hidden="true" className="w-5 h-5 text-gray-400 group-open:rotate-45 group-open:text-brand-green transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
                                iCool adalah layanan perawatan, perbaikan, dan instalasi AC terpadu. Layanan kami mencakup cuci AC, perbaikan, kontrak perawatan, teknisi standby, hingga penyediaan spare part resmi.
                            </div>
                        </details>
                        <details className="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-green/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 font-semibold text-white list-none">
                                <span>Apakah menggunakan jasa iCool aman?</span>
                                <Plus aria-hidden="true" className="w-5 h-5 text-gray-400 group-open:rotate-45 group-open:text-brand-green transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
                                Ya, sangat aman. Semua teknisi kami tersertifikasi dan berpengalaman. Kami juga merupakan Service Partner resmi untuk merk Daikin, Panasonic, Mitsubishi Electric, dan Gree.
                            </div>
                        </details>
                        <details className="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-green/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 font-semibold text-white list-none">
                                <span>Bagaimana cara saya melakukan pemesanan jasa iCool?</span>
                                <Plus aria-hidden="true" className="w-5 h-5 text-gray-400 group-open:rotate-45 group-open:text-brand-green transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
                                Anda bisa melakukan pemesanan melalui form booking di website ini, menghubungi nomor Hotline kami, atau chat langsung melalui WhatsApp yang tersedia di pojok kanan bawah layar Anda.
                            </div>
                        </details>
                        <details className="group bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-brand-green/30 transition-colors">
                            <summary className="flex items-center justify-between p-6 font-semibold text-white list-none">
                                <span>Siapa saja yang telah menggunakan jasa iCool?</span>
                                <Plus aria-hidden="true" className="w-5 h-5 text-gray-400 group-open:rotate-45 group-open:text-brand-green transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-gray-400 text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
                                Kami telah melayani ribuan pelanggan residensial (rumah tangga) hingga komersial berskala besar seperti perkantoran, pabrik, dan pusat perbelanjaan ternama di berbagai kota.
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </>
    );
}
