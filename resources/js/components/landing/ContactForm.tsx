import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm({ isPopup = false, defaultServiceType = '' }: { isPopup?: boolean; defaultServiceType?: string }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const { props } = usePage() as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        service_area: '',
        hvac_issue_type: defaultServiceType,
        message: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowSuccess(true);
            },
        });
    };

    return (
        <section id={!isPopup ? "contact" : undefined} className={!isPopup ? "min-h-[calc(100vh-100px)] flex flex-col items-center justify-center py-12 relative text-white scroll-mt-[100px]" : "w-full text-white"}>
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white p-6 sm:p-8">
                    <DialogHeader>
                        <div className="mx-auto w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <DialogTitle className="text-center text-2xl font-bold">
                            {props.flash?.success?.includes('ERROR LOG') ? 'Gagal Menyimpan' : 'Booking Berhasil!'}
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-400 pt-2 text-base leading-relaxed">
                            {props.flash?.success?.includes('ERROR LOG') 
                                ? props.flash.success 
                                : 'Terima kasih telah memilih iCool. Pesanan Anda telah kami terima dan kami akan mengirimkan email konfirmasi.'}
                        </DialogDescription>
                    </DialogHeader>
                    {!props.flash?.success?.includes('ERROR LOG') && (
                        <div className="flex flex-col items-center justify-center py-6 mt-2">
                            <span className="text-sm text-zinc-500 mb-2 uppercase tracking-wider font-semibold">Order ID Anda</span>
                            <div className="bg-zinc-800/80 border border-zinc-700 px-8 py-4 rounded-xl font-mono text-brand-green tracking-[0.2em] text-xl font-bold shadow-inner">
                                {props.flash?.order_id || 'ORD-PENDING'}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center mt-2 gap-3">
                        <Button onClick={() => setShowSuccess(false)} variant="outline" className="w-full sm:w-auto text-zinc-300 border-zinc-700 hover:bg-zinc-800 px-6 py-6 rounded-xl">
                            Tutup
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className={!isPopup ? "container mx-auto px-4 lg:px-8 w-full" : "w-full"}>
                <div className={`mx-auto bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden flex flex-col md:flex-row ${!isPopup ? 'max-w-4xl rounded-3xl shadow-2xl shadow-brand-green/5' : 'w-full rounded-xl border-0'}`}>
                    
                    {/* Left Info Panel */}
                    <div className="md:w-2/5 bg-white/5 border-r border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-white">Pesan Layanan Anda</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Isi formulir di samping dan tim kami akan segera menghubungi Anda untuk mengonfirmasi jadwal.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-medium text-sm text-gray-300">Respon Cepat</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-medium text-sm text-gray-300">Tim Profesional</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-medium text-sm text-gray-300">Diskon 10% Kontrak Pertama</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="md:w-3/5 p-6 sm:p-8 lg:p-10">
                        <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-300">Nama <span className="text-red-500">*</span></Label>
                                        <Input 
                                            id="name" 
                                            placeholder="Nama lengkap Anda" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            required
                                            className={`h-12 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.name ? "border-red-500" : ""}`}
                                        />
                                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-300">Telepon/WhatsApp <span className="text-red-500">*</span></Label>
                                        <Input 
                                            id="phone" 
                                            type="tel"
                                            inputMode="tel"
                                            placeholder="0812..." 
                                            value={data.phone} 
                                            onChange={e => setData('phone', e.target.value)}
                                            required
                                            className={`h-12 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.phone ? "border-red-500" : ""}`}
                                        />
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="anda@email.com" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className={`h-12 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-gray-300">Area Layanan</Label>
                                    <Select value={data.service_area} onValueChange={(v) => setData('service_area', v)}>
                                        <SelectTrigger className={`h-12 bg-white/10 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-brand-green ${errors.service_area ? "border-red-500" : ""}`}>
                                            <SelectValue placeholder="Pilih area lokasi Anda" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                                            <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                                            <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                                            <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                                            <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                                            <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                                            <SelectItem value="Bodetabek">Bodetabek (Bogor, Depok, Tangerang, Bekasi)</SelectItem>
                                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.service_area && <p className="text-xs text-red-500">{errors.service_area}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-gray-300">Pilih Layanan</Label>
                                    <Select value={data.hvac_issue_type} onValueChange={(v) => setData('hvac_issue_type', v)}>
                                        <SelectTrigger className={`h-12 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.hvac_issue_type ? "border-red-500" : ""}`}>
                                            <SelectValue placeholder="-- Pilih opsi --" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-white/20 text-white">
                                            <SelectItem value="cuci-ac" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Service Cuci AC</SelectItem>
                                            <SelectItem value="kontrak-cuci" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Kontrak Maintenance AC</SelectItem>
                                            <SelectItem value="reparasi" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Reparasi / Perbaikan</SelectItem>
                                            <SelectItem value="teknisi-standby" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Teknisi Standby / Inhouse</SelectItem>
                                            <SelectItem value="spare-part" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Spare Part AC</SelectItem>
                                            <SelectItem value="instalasi" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Instalasi / Pasang AC</SelectItem>
                                            <SelectItem value="general" className="hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Pertanyaan Umum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.hvac_issue_type && <p className="text-xs text-red-500">{errors.hvac_issue_type}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-gray-300">Pesan / Pertanyaan</Label>
                                    <Textarea 
                                        id="message" 
                                        placeholder="Ceritakan detail keluhan atau kebutuhan Anda..." 
                                        rows={4}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className={`bg-white/10 border-white/20 text-white rounded-xl resize-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.message ? "border-red-500" : ""}`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full bg-brand-green hover:bg-brand-green/90 text-slate-900 rounded-full h-12 text-md font-bold shadow-lg shadow-brand-green/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                    {processing && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                    {processing ? "Mengirim..." : "Kirim Permintaan"}
                                </Button>
                            </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
