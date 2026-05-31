import { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, AlertCircle, Minus, Plus } from 'lucide-react';
import { calculateServicePrice, formatIDR, getAvailablePKs, PRICING_MATRIX } from '../../utils/calculator';

export default function PricingCalculator() {
    const [area, setArea] = useState('Jabodetabek');
    const [serviceType, setServiceType] = useState('Cleaning / Cuci');
    const [acType, setAcType] = useState('Split / Split Wall');
    const [pk, setPk] = useState('Semua PK');
    const [quantity, setQuantity] = useState<string>('1');

    const [hasCalculated, setHasCalculated] = useState(false);

    const availablePKsList = getAvailablePKs(acType);

    useEffect(() => {
        if (availablePKsList.length > 0 && !availablePKsList.includes(pk)) {
            setPk(availablePKsList[0]);
        }
    }, [acType, pk, availablePKsList]);

    const result = useMemo(() => {
        return calculateServicePrice({
            area,
            serviceType,
            acType,
            pk,
            quantity: parseInt(quantity) || 0
        });
    }, [area, serviceType, acType, pk, quantity]);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setHasCalculated(true);
    };

    return (
        <section className="w-full relative text-white py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="mx-auto bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden flex flex-col lg:flex-row max-w-5xl rounded-3xl shadow-2xl shadow-brand-green/5">
                    
                    {/* Left Form Panel */}
                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                                <Calculator className="w-6 h-6 text-brand-green" />
                                Kalkulator Harga On-Call
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Hitung estimasi biaya service AC Anda dengan cepat.
                            </p>
                        </div>

                        <form onSubmit={handleCalculate} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-gray-300">Area Layanan</Label>
                                    <Select value={area} onValueChange={setArea}>
                                        <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green">
                                            <SelectValue placeholder="Pilih Area" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                                            <SelectItem value="Jabodetabek" className="hover:bg-zinc-800 cursor-pointer">Jabodetabek</SelectItem>
                                            <SelectItem value="Bali" className="hover:bg-zinc-800 cursor-pointer">Bali</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-gray-300">Tipe Service</Label>
                                    <Select value={serviceType} onValueChange={setServiceType}>
                                        <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green">
                                            <SelectValue placeholder="Pilih Service" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                                            <SelectItem value="Cleaning / Cuci" className="hover:bg-zinc-800 cursor-pointer">Cleaning / Cuci AC</SelectItem>
                                            <SelectItem value="Reparasi" className="hover:bg-zinc-800 cursor-pointer">Reparasi / Perbaikan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-gray-300">Tipe AC</Label>
                                    <Select value={acType} onValueChange={setAcType}>
                                        <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green">
                                            <SelectValue placeholder="Pilih Tipe AC" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                                            {Object.keys(PRICING_MATRIX).map((typeOption) => (
                                                <SelectItem key={typeOption} value={typeOption} className="hover:bg-zinc-800 cursor-pointer">
                                                    {typeOption}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-gray-300">Kapasitas (PK)</Label>
                                    <Select value={pk} onValueChange={setPk}>
                                        <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-2 focus-visible:ring-brand-green">
                                            <SelectValue placeholder="Pilih PK" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                                            {availablePKsList.map((pkOption) => (
                                                <SelectItem key={pkOption} value={pkOption} className="hover:bg-zinc-800 cursor-pointer">
                                                    {pkOption}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-semibold text-gray-300">Kuantitas (Unit)</Label>
                                <div className="flex items-center h-11 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-green">
                                    <button 
                                        type="button" 
                                        onClick={() => setQuantity(prev => Math.max(1, (parseInt(prev) || 0) - 1).toString())}
                                        className="h-full px-4 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <input 
                                        id="quantity" 
                                        type="number"
                                        min="1"
                                        value={quantity} 
                                        onChange={e => setQuantity(e.target.value)}
                                        className="h-full flex-1 w-0 bg-transparent text-center text-white font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setQuantity(prev => ((parseInt(prev) || 0) + 1).toString())}
                                        className="h-full px-4 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green/90 text-slate-900 rounded-full h-12 text-md font-bold shadow-lg shadow-brand-green/20 cursor-pointer mt-4">
                                Kalkulasi Biaya
                            </Button>
                        </form>
                    </div>

                    {/* Right Results Panel */}
                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-black/20 flex flex-col justify-center">
                        <div className="space-y-6">
                            
                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <Label className="text-gray-400 text-sm mb-1 block">Harga Normal</Label>
                                <div className="text-3xl font-bold text-white mb-2">
                                    {hasCalculated ? formatIDR(result.hargaNormal) : '—'}
                                </div>
                                {hasCalculated && result.isBelowMinimumCharge && (
                                    <div className="flex items-start gap-2 text-yellow-500 text-xs bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                        <span>Minimum Charge of Rp 500,000 berlaku untuk On-Call Visit.</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-brand-green/10 border border-brand-green/20 p-5 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">HEMAT</div>
                                <Label className="text-brand-green text-sm mb-1 block font-medium">Promo: Bayar 3, Cuci 4 X</Label>
                                <div className="text-2xl font-bold text-white">
                                    {hasCalculated ? formatIDR(result.promoTier1) : '—'}
                                </div>
                                <p className="text-gray-400 text-xs mt-1">Berlaku untuk paket bundling cuci 4 unit.</p>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/20 p-5 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">SUPER HEMAT</div>
                                <Label className="text-blue-400 text-sm mb-1 block font-medium">Promo: Bayar 10, Cuci 12 X</Label>
                                <div className="text-2xl font-bold text-white">
                                    {hasCalculated ? formatIDR(result.promoTier2) : '—'}
                                </div>
                                <p className="text-gray-400 text-xs mt-1">Berlaku untuk paket korporasi/borongan cuci 12 unit.</p>
                            </div>

                            <div className="text-xs text-gray-400 text-center mt-4">
                                * Harga inclusive PPN 11%. Belum inclusive biaya akomodasi bila ada.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
