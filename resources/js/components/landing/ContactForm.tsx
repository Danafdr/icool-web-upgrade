import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function ContactForm({ isPopup = false, defaultServiceType = '' }: { isPopup?: boolean; defaultServiceType?: string }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState(1);
    const [step1Loading, setStep1Loading] = useState(false);
    const [step1Error, setStep1Error] = useState('');
    
    const { props } = usePage() as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        order_id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        service_area: '',
        hvac_issue_type: defaultServiceType,
        message: ''
    });

    const handleStep1Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep1Error('');
        
        if (!data.phone) {
            setStep1Error('Nomor telepon wajib diisi');
            return;
        }

        setStep1Loading(true);
        try {
            const response = await axios.post('/contact/step1', {
                phone: data.phone,
                hvac_issue_type: data.hvac_issue_type
            });
            
            if (response.data.success) {
                setData('order_id', response.data.order_id);
                setStep(2);
            }
        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setStep1Error(`Error ${error.response.status}: ${error.response.data.message || error.response.data.error || 'Terjadi kesalahan sistem'}`);
            } else if (error.request) {
                // The request was made but no response was received
                setStep1Error('Network Error: Tidak dapat terhubung ke server.');
            } else {
                setStep1Error(`Gagal mengirim data: ${error.message}`);
            }
        } finally {
            setStep1Loading(false);
        }
    };

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact/step2', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStep(1);
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
                                : 'Terima kasih telah memilih iCool. Pesanan Anda telah kami terima.'}
                        </DialogDescription>
                    </DialogHeader>
                    {!props.flash?.success?.includes('ERROR LOG') && (
                        <>
                            <div className="flex flex-col items-center justify-center py-6 mt-2">
                                <span className="text-sm text-zinc-500 mb-2 uppercase tracking-wider font-semibold">Order ID Anda</span>
                                <div className="bg-zinc-800/80 border border-zinc-700 px-8 py-4 rounded-xl font-mono text-brand-green tracking-[0.2em] text-xl font-bold shadow-inner">
                                    {props.flash?.order_id || 'ORD-PENDING'}
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-sm text-zinc-300">
                                    Tim kami akan menghubungi Anda via WhatsApp dalam <strong className="text-brand-green">5 menit ke depan</strong> untuk konfirmasi kedatangan teknisi.
                                </p>
                            </div>
                        </>
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
                                {step === 1 
                                    ? "Langkah 1: Beritahu kami masalah AC Anda dan nomor WhatsApp yang bisa dihubungi."
                                    : "Langkah 2: Sambil menunggu tim kami menyiapkan teknisi, mohon lengkapi alamat detail Anda."}
                            </p>
                            
                            {/* Step Indicator */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 1 ? 'bg-brand-green text-slate-900' : 'bg-white/10 text-white/50'}`}>1</div>
                                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-brand-green' : 'bg-white/10'}`}></div>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 2 ? 'bg-brand-green text-slate-900' : 'bg-white/10 text-white/50'}`}>2</div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-medium text-sm text-gray-300">Respon Cepat</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-green">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="font-medium text-sm text-gray-300">Tim Profesional</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="md:w-3/5 p-6 sm:p-8 lg:p-10">
                        {step === 1 ? (
                            <form onSubmit={handleStep1Submit} className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-gray-300">Apa masalah AC Anda?</Label>
                                    <Select value={data.hvac_issue_type} onValueChange={(v) => setData('hvac_issue_type', v)}>
                                        <SelectTrigger className="w-full h-14 bg-white/10 border-white/20 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent text-lg">
                                            <SelectValue placeholder="-- Pilih opsi masalah --" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900/95 backdrop-blur-sm border-white/20 text-white">
                                            <SelectItem value="cuci-ac" className="py-3 hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Service Cuci AC (Rutin)</SelectItem>
                                            <SelectItem value="reparasi" className="py-3 hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Reparasi (Bocor/Tidak Dingin)</SelectItem>
                                            <SelectItem value="instalasi" className="py-3 hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Instalasi / Pasang AC Baru</SelectItem>
                                            <SelectItem value="general" className="py-3 hover:bg-brand-green hover:text-slate-900 focus:bg-brand-green focus:text-slate-900 cursor-pointer">Lainnya / Pertanyaan Umum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-300">Nomor WhatsApp <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id="phone" 
                                        type="tel"
                                        inputMode="tel"
                                        placeholder="0812..." 
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)}
                                        required
                                        className={`h-14 bg-white/10 border-white/20 text-white rounded-xl text-lg focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${step1Error ? "border-red-500" : ""}`}
                                    />
                                    {step1Error && <p className="text-xs text-red-500">{step1Error}</p>}
                                </div>
                                
                                <Button type="submit" disabled={step1Loading} className="w-full bg-brand-green hover:bg-brand-green/90 text-slate-900 rounded-full h-14 text-lg font-bold shadow-lg shadow-brand-green/20 mt-4">
                                    {step1Loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                                    {step1Loading ? "Memproses..." : "Lanjut (Amankan Jadwal)"}
                                </Button>
                            </form>
                        ) : (
                            <form onSubmit={handleStep2Submit} className="space-y-6">
                                <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-4 mb-6">
                                    <p className="text-brand-green text-sm font-medium">Terima kasih! Teknisi kami sedang disiapkan. Sambil menunggu, mohon lengkapi alamat detail Anda di bawah ini:</p>
                                </div>
                                
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
                                        <Label htmlFor="email" className="text-gray-300">Email (Opsional)</Label>
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
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-gray-300">Alamat Lengkap <span className="text-red-500">*</span></Label>
                                    <Textarea 
                                        id="address" 
                                        placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan..." 
                                        rows={2}
                                        value={data.address}
                                        required
                                        onChange={e => setData('address', e.target.value)}
                                        className={`bg-white/10 border-white/20 text-white rounded-xl resize-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.address ? "border-red-500" : ""}`}
                                    />
                                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold text-gray-300">Area Layanan</Label>
                                    <Select value={data.service_area} onValueChange={(v) => setData('service_area', v)}>
                                        <SelectTrigger className={`w-full h-12 bg-white/10 border-white/20 text-white rounded-xl focus:ring-2 focus:ring-brand-green ${errors.service_area ? "border-red-500" : ""}`}>
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

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-gray-300">Pesan / Detail Masalah Tambahan</Label>
                                    <Textarea 
                                        id="message" 
                                        placeholder="Ceritakan detail keluhan atau patokan alamat Anda..." 
                                        rows={2}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className={`bg-white/10 border-white/20 text-white rounded-xl resize-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:border-transparent ${errors.message ? "border-red-500" : ""}`}
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full bg-brand-green hover:bg-brand-green/90 text-slate-900 rounded-full h-12 text-md font-bold shadow-lg shadow-brand-green/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                    {processing && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                    {processing ? "Mengirim..." : "Selesai (Kirim Detail)"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
