import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { FileText, AlertCircle, Calendar, Search, X, CheckCircle, Clock, Copy, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Contact {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    hvac_issue_type: string | null;
    message: string | null;
    status: 'pending' | 'resolved' | 'spam';
    ai_summary: string | null;
    urgency_level: 'low' | 'medium' | 'high' | null;
    created_at: string;
}

interface PaginationData {
    data: Contact[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    stats: {
        totalForms: number;
        unresolvedIssues: number;
        newFormsThisWeek: number;
    };
    forms: PaginationData;
    serviceTypes?: string[];
    filters?: {
        search?: string;
        status?: string;
        service_type?: string;
    };
}

export default function DashboardOverview({ stats, forms, serviceTypes = [], filters = {} }: Props) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        message: ''
    });
    
    // Local states for Optimistic UI updates
    const [localForms, setLocalForms] = useState<Contact[]>(forms.data);
    const [localStats, setLocalStats] = useState(stats);

    // Sync state with props when server returns fresh data
    useEffect(() => {
        setLocalForms(forms.data);
    }, [forms.data]);

    useEffect(() => {
        setLocalStats(stats);
    }, [stats]);

    // Filtering & searching states
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [serviceType, setServiceType] = useState(filters.service_type || 'all');
    const [isLoading, setIsLoading] = useState(false);

    const isFirstRender = useRef(true);

    // Debounced search and filtering effect
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounce = setTimeout(() => {
            setIsLoading(true);
            const params: Record<string, string> = {};
            if (search) params.search = search;
            if (status && status !== 'all') params.status = status;
            if (serviceType && serviceType !== 'all') params.service_type = serviceType;

            router.get('/admin', params, {
                preserveState: true,
                preserveScroll: true,
                only: ['forms', 'stats'],
                onFinish: () => setIsLoading(false),
            });
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, status, serviceType]);

    // Optimistic status toggle handler
    const handleStatusChange = (contactId: number, currentStatus: 'pending' | 'resolved') => {
        const newStatus = currentStatus === 'pending' ? 'resolved' : 'pending';

        // 1. Snapshot original data for rollback in case of failure
        const originalForms = [...localForms];
        const originalStats = { ...localStats };

        // 2. Perform optimistic update instantly
        setLocalForms(prev =>
            prev.map(c => (c.id === contactId ? { ...c, status: newStatus } : c))
        );

        if (selectedContact && selectedContact.id === contactId) {
            setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
        }

        setLocalStats(prev => {
            const diff = newStatus === 'resolved' ? -1 : 1;
            return {
                ...prev,
                unresolvedIssues: Math.max(0, prev.unresolvedIssues + diff),
            };
        });

        // 3. Trigger background PATCH request
        const toastId = toast.loading('Memperbarui status...', {
            description: `Mengubah status formulir ke ${newStatus === 'resolved' ? 'Selesai' : 'Menunggu'}`,
        });

        router.patch(
            `/admin/forms/${contactId}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Status berhasil diperbarui', {
                        id: toastId,
                        description: `Status telah diubah menjadi ${newStatus === 'resolved' ? 'Selesai' : 'Menunggu'}.`,
                    });
                },
                onError: () => {
                    // Revert UI on failure
                    setLocalForms(originalForms);
                    setLocalStats(originalStats);
                    if (selectedContact && selectedContact.id === contactId) {
                        setSelectedContact(originalForms.find(c => c.id === contactId) || null);
                    }
                    toast.error('Gagal memperbarui status', {
                        id: toastId,
                        description: 'Terjadi kesalahan jaringan atau server. Silakan coba lagi.',
                    });
                },
            }
        );
    };

    const statCards = [
        {
            title: 'Total Formulir Masuk',
            value: localStats.totalForms,
            icon: FileText,
            description: 'Total semua pengiriman',
            color: 'text-blue-600 dark:text-blue-400',
            borderColor: 'border-t-blue-500 dark:border-t-blue-600',
        },
        {
            title: 'Masalah Belum Selesai',
            value: localStats.unresolvedIssues,
            icon: AlertCircle,
            description: 'Formulir dengan status menunggu',
            color: 'text-amber-600 dark:text-amber-400',
            borderColor: 'border-t-amber-500 dark:border-t-amber-600',
        },
        {
            title: 'Baru Minggu Ini',
            value: localStats.newFormsThisWeek,
            icon: Calendar,
            description: 'Pengiriman dalam 7 hari terakhir',
            color: 'text-emerald-600 dark:text-emerald-400',
            borderColor: 'border-t-emerald-500 dark:border-t-emerald-600',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ringkasan Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Selamat datang. Berikut adalah aktivitas terbaru dari formulir pelanggan Anda.
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <Card 
                                key={i} 
                                className={cn(
                                    "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm border-t-2 cursor-default",
                                    card.borderColor,
                                    "hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                )}
                            >
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {card.title}
                                    </CardTitle>
                                    <Icon className={`w-5 h-5 ${card.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300">
                                        {card.value}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{card.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Forms Section with Filters */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Formulir Pelanggan</h2>
                        
                        {/* Search and Filters */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Search bar */}
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Cari pelanggan..."
                                    className="pl-9 pr-8"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {search && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-9 w-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        onClick={() => setSearch('')}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            {/* Status Filter */}
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-full sm:w-[140px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua Status</SelectItem>
                                    <SelectItem value="pending">Menunggu</SelectItem>
                                    <SelectItem value="resolved">Selesai</SelectItem>
                                    <SelectItem value="spam">Spam</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Service Type Filter */}
                            {serviceTypes.length > 0 && (
                                <Select value={serviceType} onValueChange={setServiceType}>
                                    <SelectTrigger className="w-full sm:w-[160px]">
                                        <SelectValue placeholder="Layanan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua Layanan</SelectItem>
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>

                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden relative animate-in fade-in-50 duration-300">
                        {/* Inline progress loader indicator */}
                        {isLoading && (
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500/20 overflow-hidden">
                                <div className="h-full bg-blue-600 animate-[loading_1.5s_infinite_linear] w-[50%] rounded-full" />
                            </div>
                        )}

                        {localForms.length === 0 ? (
                            /* Redesigned Empty State */
                            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-800 flex items-center justify-center mb-3">
                                    <Inbox className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tidak Ada Formulir Ditemukan</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs leading-relaxed">
                                    Tidak ditemukan data yang sesuai dengan kata kunci pencarian atau filter status yang aktif saat ini.
                                </p>
                                {(search || status !== 'all' || serviceType !== 'all') && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4 active:scale-95 transition-transform"
                                        onClick={() => {
                                            setSearch('');
                                            setStatus('all');
                                            setServiceType('all');
                                        }}
                                    >
                                        Reset Filter
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className={`overflow-x-auto transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-600 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Tanggal</th>
                                            <th className="px-6 py-4 font-medium">Pelanggan</th>
                                            <th className="px-6 py-4 font-medium">Jenis Layanan</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {localForms.map((contact) => (
                                            <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-950/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                    {format(new Date(contact.created_at), 'MMM d, yyyy')}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]" title={contact.name}>
                                                        {contact.name}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">{contact.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium truncate max-w-[160px]" title={contact.hvac_issue_type || ''}>
                                                    {contact.hvac_issue_type || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-1.5">
                                                        {contact.status === 'pending' ? (
                                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50 w-fit">
                                                                Menunggu
                                                            </Badge>
                                                        ) : contact.status === 'resolved' ? (
                                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50 w-fit">
                                                                Selesai
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50 w-fit">
                                                                Spam
                                                            </Badge>
                                                        )}
                                                        {contact.urgency_level && (
                                                            <Badge variant="outline" className={cn("text-[10px] w-fit", 
                                                                contact.urgency_level === 'high' ? "border-red-300 text-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-800" :
                                                                contact.urgency_level === 'medium' ? "border-orange-300 text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800" :
                                                                "border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
                                                            )}>
                                                                Urgensi: {contact.urgency_level === 'high' ? 'Tinggi' : contact.urgency_level === 'medium' ? 'Sedang' : 'Rendah'}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="active:scale-95 transition-transform duration-100"
                                                            onClick={() => setSelectedContact(contact)}
                                                        >
                                                            Lihat Detail
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={cn(
                                                                "active:scale-95 transition-transform duration-100",
                                                                contact.status === 'pending'
                                                                    ? 'border-amber-200 hover:bg-amber-50/50 dark:border-amber-900/30 dark:hover:bg-amber-900/20'
                                                                    : 'border-emerald-200 hover:bg-emerald-50/50 dark:border-emerald-900/30 dark:hover:bg-emerald-900/20'
                                                            )}
                                                            onClick={() => handleStatusChange(contact.id, contact.status)}
                                                        >
                                                            {contact.status === 'pending' ? (
                                                                <>
                                                                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
                                                                    Selesaikan
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                                                                    Buka Kembali
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {forms.last_page > 1 && localForms.length > 0 && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                                <div className="text-sm text-gray-500 text-center sm:text-left">
                                    Menampilkan <span className="font-medium">{localForms.length}</span> dari{' '}
                                    <span className="font-medium">{forms.total}</span> data
                                </div>
                                <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                    {forms.links.map((link, i) => (
                                        <Button
                                            key={i}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => {
                                                if (link.url) {
                                                    setIsLoading(true);
                                                    router.get(link.url, {}, {
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                        only: ['forms'],
                                                        onFinish: () => setIsLoading(false),
                                                    });
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Detail Modal */}
            <Dialog open={!!selectedContact} onOpenChange={(open) => {
                if (!open) {
                    setSelectedContact(null);
                    reset('message');
                }
            }}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">Detail Formulir</DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400">
                            Dikirim pada {selectedContact ? format(new Date(selectedContact.created_at), 'PPP') : ''}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedContact && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Pelanggan</label>
                                    <p className="text-sm font-semibold mt-1 text-gray-900 dark:text-white break-words">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nomor Telepon</label>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedContact.phone}</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 active:scale-90 transition-transform"
                                            onClick={() => {
                                                try {
                                                    navigator.clipboard.writeText(selectedContact.phone);
                                                    toast.success('Nomor telepon berhasil disalin');
                                                } catch (err) {
                                                    toast.error('Gagal menyalin data');
                                                }
                                            }}
                                            title="Salin Nomor Telepon"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat Email</label>
                                    {selectedContact.email ? (
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[140px]" title={selectedContact.email}>
                                                {selectedContact.email}
                                            </p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 active:scale-90 transition-transform"
                                                onClick={() => {
                                                    try {
                                                        navigator.clipboard.writeText(selectedContact.email!);
                                                        toast.success('Email berhasil disalin');
                                                    } catch (err) {
                                                        toast.error('Gagal menyalin data');
                                                    }
                                                }}
                                                title="Salin Email"
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <p className="text-sm font-medium mt-1 text-gray-400 dark:text-gray-500">Tidak ada</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Jenis Layanan</label>
                                    <p className="text-sm font-semibold mt-1 text-gray-900 dark:text-white">{selectedContact.hvac_issue_type || 'Tidak ada'}</p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    AI Summary 
                                    {selectedContact.urgency_level && (
                                        <Badge variant="outline" className={cn("text-[10px] uppercase font-bold", 
                                            selectedContact.urgency_level === 'high' ? "border-red-300 text-red-600 bg-red-50" :
                                            selectedContact.urgency_level === 'medium' ? "border-orange-300 text-orange-600 bg-orange-50" :
                                            "border-blue-300 text-blue-600 bg-blue-50"
                                        )}>
                                            {selectedContact.urgency_level}
                                        </Badge>
                                    )}
                                </label>
                                <div className="mt-2 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-900/50">
                                    {selectedContact.ai_summary || selectedContact.message || 'Tidak ada pesan tambahan.'}
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pesan Asli</label>
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm whitespace-pre-wrap text-gray-600 dark:text-gray-400 min-h-16 max-h-32 overflow-y-auto border border-gray-100/50 dark:border-gray-800/50">
                                    {selectedContact.message || 'Tidak ada pesan tambahan.'}
                                </div>
                            </div>
                            
                            {/* Reply Section */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <label className="text-xs font-semibold text-gray-500 uppercase block mb-2">Balas Email</label>
                                {selectedContact.email ? (
                                    <>
                                        <Textarea 
                                            placeholder="Tulis balasan email Anda di sini..." 
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            className="min-h-32 mb-2"
                                        />
                                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                    </>
                                ) : (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 p-3 rounded-lg text-sm">
                                        Pelanggan tidak menyertakan alamat email, Anda tidak dapat membalas via email.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex sm:justify-between items-center gap-3">
                        <Button variant="outline" onClick={() => {
                            setSelectedContact(null);
                            reset('message');
                        }} className="w-full sm:w-auto active:scale-95 transition-transform">
                            Tutup
                        </Button>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            {selectedContact?.email && (
                                <Button 
                                    onClick={() => {
                                        post(`/admin/forms/${selectedContact.id}/reply`, {
                                            preserveScroll: true,
                                            onSuccess: () => reset('message')
                                        });
                                    }} 
                                    disabled={processing || !data.message.trim()} 
                                    className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-zinc-950 font-semibold active:scale-95 transition-transform"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Balasan'}
                                </Button>
                            )}
                            {selectedContact && (
                                <Button

                                variant={selectedContact.status === 'pending' ? 'default' : 'secondary'}
                                onClick={() => handleStatusChange(selectedContact.id, selectedContact.status)}
                                className="w-full sm:w-auto active:scale-95 transition-transform"
                            >
                                {selectedContact.status === 'pending' ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Tandai Selesai
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-4 h-4 mr-2" />
                                        Tandai Menunggu
                                    </>
                                )}
                            </Button>
                        )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Custom animation style for the progress bar loader */}
            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </AdminLayout>
    );
}
