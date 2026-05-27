import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Delay showing the widget slightly for better UX
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const admins = [
        {
            name: "Admin HO",
            role: "Customer Support",
            url: "https://api.whatsapp.com/send?phone=6281386049231&text=Hallo%20iCool.."
        },
        {
            name: "Admin Bali",
            role: "Customer Support",
            url: "https://api.whatsapp.com/send?phone=6281386049202&text=Hello%20iCool%20Bali..."
        },
        {
            name: "Admin Cikupa (Suvarna)",
            role: "Customer Support",
            url: "https://api.whatsapp.com/send?phone=6282211067098&text=Hello%20iCool%20Cikupa%C2%A0(Suvarna)..."
        }
    ];

    return (
        <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3 font-sans animate-in slide-in-from-bottom-10 fade-in duration-500">
            
            {/* Popup Menu */}
            {isOpen && (
                <div className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-[320px] md:w-[350px] mb-2 border border-gray-300 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right max-h-[calc(100dvh-120px)] overflow-y-auto">
                    {/* Header */}
                    <div className="bg-[#25D366] p-5 text-slate-900 flex gap-4 items-start">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        <div>
                            <h3 className="font-semibold text-lg">Mulai Tanya</h3>
                            <p className="text-slate-800 text-sm mt-1 leading-snug">Hi! Klik pada salah satu tim kami untuk memulai chat <strong>WhatsApp</strong></p>
                        </div>
                    </div>
                    {/* Body */}
                    <div className="p-5 bg-gray-100 dark:bg-gray-900">
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Tim kami biasanya akan membalas dalam beberapa menit.</p>
                        <div className="flex flex-col gap-3">
                            {admins.map((admin, idx) => (
                                <a 
                                    key={idx}
                                    href={admin.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-3 rounded-lg bg-gray-200/80 dark:bg-gray-800 border border-transparent hover:border-[#25D366] hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                                            <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-none mb-1 group-hover:text-[#25D366] transition-colors">{admin.name}</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-xs">{admin.role}</p>
                                        </div>
                                    </div>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366] opacity-50 group-hover:opacity-100 transition-opacity">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-end gap-3">
                {/* Chat Bubble Tooltip (Only show if not open and not dismissed) */}
                {!isOpen && !isDismissed && (
                    <div 
                        className={`hidden sm:flex items-start gap-4 relative bg-gray-100/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-300 dark:border-gray-700 transition-all duration-300 origin-bottom-right ${isHovered ? 'scale-105' : 'scale-100'}`}
                    >
                        <div className="text-sm">
                            <p className="text-gray-600 dark:text-gray-300 mb-1 font-medium">Perlu Bantuan?</p>
                            <p className="text-[#005AAA] dark:text-[#3b82f6] font-bold">Klik untuk Chat Kami</p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
                            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors -mt-1 -mr-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        {/* Pointer triangle */}
                        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-gray-100 dark:bg-gray-800 border-r border-t border-gray-300 dark:border-gray-700 rotate-45 pointer-events-none"></div>
                    </div>
                )}

                {/* WhatsApp Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative bg-[#25D366] hover:bg-[#20b858] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 z-50 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    aria-label="Toggle WhatsApp Menu"
                >
                    {isOpen ? (
                        <X className="w-8 h-8 md:w-9 md:h-9" />
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-11 md:h-11 ml-0.5 mt-0.5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
