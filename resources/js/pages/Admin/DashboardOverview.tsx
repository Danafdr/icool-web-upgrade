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
import { FileText, AlertCircle, Calendar, Search, X, CheckCircle, Clock, Copy, Inbox, Sparkles, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import axios from 'axios';
import { cn } from '@/lib/utils';
import KanbanBoard from '@/components/admin/KanbanBoard';
import { Upload } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    hvac_issue_type: string | null;
    message: string | null;
    status: 'menunggu' | 'dijadwalkan' | 'dalam_proses' | 'selesai' | 'spam';
    ai_summary: string | null;
    urgency_level: 'low' | 'medium' | 'high' | null;
    address: string | null;
    ai_reasoning: string | null;
    suggested_service: string | null;
    internal_notes: string | null;
    scheduled_at: string | null;
    technician_id: number | null;
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
        waitingForSchedule: number;
        inProgress: number;
        resolved: number;
    };
    forms: PaginationData;
    serviceTypes?: string[];
    filters?: {
        search?: string;
        status?: string;
        service_type?: string;
    };
    technicians?: { id: number; name: string }[];
}

export default function DashboardOverview({ stats, forms, serviceTypes = [], filters = {}, technicians = [] }: Props) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
    const { data, setData, post, processing, reset, errors } = useForm({
        message: ''
    });
    const notesForm = useForm({
        internal_notes: ''
    });
    const scheduleForm = useForm({
        technician_id: '',
        scheduled_at: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const [customerHistory, setCustomerHistory] = useState<Contact[]>([]);
    
    // Import state
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const { data: importData, setData: setImportData, post: postImport, processing: importing, reset: resetImport, errors: importErrors } = useForm<{ file: File | null }>({
        file: null
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
    const handleStatusChange = (contactId: number, currentStatusOrNewStatus: string) => {
        // Support both old binary toggle and new explicit status setting
        let newStatus = currentStatusOrNewStatus;
        if (currentStatusOrNewStatus === 'pending') newStatus = 'resolved';
        else if (currentStatusOrNewStatus === 'resolved') newStatus = 'pending';

        // 1. Snapshot original data for rollback in case of failure
        const originalForms = [...localForms];
        const originalStats = { ...localStats };

        // 2. Perform optimistic update instantly
        setLocalForms(prev =>
            prev.map(c => (c.id === contactId ? { ...c, status: newStatus as any } : c))
        );

        if (selectedContact && selectedContact.id === contactId) {
            setSelectedContact(prev => prev ? { ...prev, status: newStatus as any } : null);
        }

        setLocalStats(prev => {
            const isResolved = newStatus === 'selesai';
            const wasResolved = originalForms.find(c => c.id === contactId)?.status === 'selesai';
            
            let unresolvedDiff = 0;
            if (isResolved && !wasResolved) unresolvedDiff = -1;
            if (!isResolved && wasResolved) unresolvedDiff = 1;

            return {
                ...prev,
                waitingForSchedule: prev.waitingForSchedule, 
                resolved: Math.max(0, prev.resolved - unresolvedDiff),
            };
        });

        // 3. Fire to server in background
        axios.patch(`/admin/forms/${contactId}/status`, { status: newStatus }).catch(() => {
            toast.error('Gagal memperbarui status');
            setLocalForms(originalForms);
            setLocalStats(originalStats);
            if (selectedContact && selectedContact.id === contactId) {
                const originalStatus = originalForms.find(c => c.id === contactId)?.status;
                if (originalStatus) {
                    setSelectedContact(prev => prev ? { ...prev, status: originalStatus as any } : null);
                }
            }
        });
    };

    const handleViewContact = async (contact: Contact) => {
        setSelectedContact(contact);
        reset('message');
        try {
            const res = await axios.get(`/admin/forms/${contact.id}/history`);
            setCustomerHistory(res.data.history);
        } catch (err) {
            setCustomerHistory([]);
        }
    };

    const statCards = [
        {
            title: 'Menunggu Jadwal',
            value: localStats.waitingForSchedule,
            icon: AlertCircle,
            description: 'Perlu dijadwalkan teknisi',
            color: 'text-amber-600 dark:text-amber-400',
            borderColor: 'border-t-amber-500 dark:border-t-amber-600',
        },
        {
            title: 'Dalam Proses',
            value: localStats.inProgress,
            icon: Clock,
            description: 'Dijadwalkan / sedang dikerjakan',
            color: 'text-blue-600 dark:text-blue-400',
            borderColor: 'border-t-blue-500 dark:border-t-blue-600',
        },
        {
            title: 'Selesai',
            value: localStats.resolved,
            icon: CheckCircle,
            description: 'Sudah diselesaikan',
            color: 'text-emerald-600 dark:text-emerald-400',
            borderColor: 'border-t-emerald-500 dark:border-t-emerald-600',
        },
        {
            title: 'Total Masuk',
            value: localStats.totalForms,
            icon: FileText,
            description: 'Keseluruhan order',
            color: 'text-gray-600 dark:text-gray-400',
            borderColor: 'border-t-gray-500 dark:border-t-gray-600',
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daftar Formulir</h2>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('kanban')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'kanban' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    Kanban
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    Tabel
                                </button>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setIsImportModalOpen(true)}
                                className="ml-2 text-brand-green border-brand-green/30 hover:bg-brand-green/10"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Import Excel
                            </Button>
                        </div>
                        
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
                                    <SelectItem value="menunggu">Menunggu</SelectItem>
                                    <SelectItem value="dijadwalkan">Dijadwalkan</SelectItem>
                                    <SelectItem value="dalam_proses">Dalam Proses</SelectItem>
                                    <SelectItem value="selesai">Selesai</SelectItem>
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
                        ) : viewMode === 'kanban' ? (
                            <div className={`p-4 transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                                <KanbanBoard 
                                    contacts={localForms}
                                    onStatusChange={handleStatusChange}
                                    onViewContact={handleViewContact}
                                />
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
                                                        {contact.status === 'menunggu' ? (
                                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50 w-fit">Menunggu</Badge>
                                                        ) : contact.status === 'dijadwalkan' ? (
                                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50 w-fit">Dijadwalkan</Badge>
                                                        ) : contact.status === 'dalam_proses' ? (
                                                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/50 w-fit">Dalam Proses</Badge>
                                                        ) : contact.status === 'selesai' ? (
                                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50 w-fit">Selesai</Badge>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50 w-fit">Spam</Badge>
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
                                                            onClick={() => handleViewContact(contact)}
                                                        >
                                                            Lihat Detail
                                                        </Button>
                                                        {contact.status !== 'spam' ? (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className={cn(
                                                                    "active:scale-95 transition-transform duration-100",
                                                                    contact.status === 'selesai'
                                                                        ? 'border-emerald-200 hover:bg-emerald-50/50 text-emerald-700'
                                                                        : 'border-amber-200 hover:bg-amber-50/50 text-amber-700'
                                                                )}
                                                                onClick={() => handleStatusChange(contact.id, contact.status === 'selesai' ? 'menunggu' : 'selesai')}
                                                            >
                                                                {contact.status === 'selesai' ? 'Buka Kembali' : 'Selesaikan'}
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="active:scale-95 transition-transform duration-100 border-red-200 hover:bg-red-50/50 text-red-700"
                                                                onClick={() => handleStatusChange(contact.id, 'menunggu')}
                                                            >
                                                                Bukan Spam
                                                            </Button>
                                                        )}
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
                    notesForm.reset('internal_notes');
                    scheduleForm.reset();
                } else if (selectedContact) {
                    notesForm.setData('internal_notes', selectedContact.internal_notes || '');
                    scheduleForm.setData({
                        technician_id: selectedContact.technician_id ? selectedContact.technician_id.toString() : '',
                        scheduled_at: selectedContact.scheduled_at ? new Date(selectedContact.scheduled_at).toISOString().slice(0, 16) : ''
                    });
                }
            }}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            Detail Formulir Pelanggan
                            {customerHistory.length > 0 && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    Pelanggan Lama ({customerHistory.length} Riwayat)
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Masuk pada {selectedContact && format(new Date(selectedContact.created_at), 'd MMMM yyyy, HH:mm')}
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
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]" title={selectedContact.email}>
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
                                <div className="col-span-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat Lengkap</label>
                                    <p className="text-sm font-semibold mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{selectedContact.address || 'Tidak ada alamat tercatat.'}</p>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    AI Summary & Reasoning
                                    {selectedContact.urgency_level && (
                                        <Badge variant="outline" className={cn("text-[10px] uppercase font-bold", 
                                            selectedContact.urgency_level === 'high' ? "border-red-300 text-red-600 bg-red-50" :
                                            selectedContact.urgency_level === 'medium' ? "border-orange-300 text-orange-600 bg-orange-50" :
                                            "border-blue-300 text-blue-600 bg-blue-50"
                                        )}>
                                            {selectedContact.urgency_level}
                                        </Badge>
                                    )}
                                    {selectedContact.suggested_service && (
                                        <Badge variant="outline" className="text-[10px] uppercase font-bold border-indigo-300 text-indigo-600 bg-indigo-50">
                                            {selectedContact.suggested_service}
                                        </Badge>
                                    )}
                                </label>
                                <div className="mt-2 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-900/50 space-y-2">
                                    <div>
                                        <span className="font-semibold text-blue-800 dark:text-blue-300">Ringkasan: </span>
                                        {selectedContact.ai_summary || selectedContact.message || 'Tidak ada pesan tambahan.'}
                                    </div>
                                    {selectedContact.ai_reasoning && (
                                        <div>
                                            <span className="font-semibold text-blue-800 dark:text-blue-300">Alasan: </span>
                                            {selectedContact.ai_reasoning}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pesan Asli</label>
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-950 rounded-lg text-sm whitespace-pre-wrap text-gray-600 dark:text-gray-400 min-h-16 max-h-32 overflow-y-auto border border-gray-100/50 dark:border-gray-800/50">
                                    {selectedContact.message || 'Tidak ada pesan tambahan.'}
                                </div>
                            </div>
                            
                            {/* Jadwal & Teknisi */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Jadwal & Teknisi</label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={scheduleForm.processing || !scheduleForm.data.technician_id || !scheduleForm.data.scheduled_at}
                                        className="h-7 text-xs active:scale-95 transition-transform"
                                        onClick={() => {
                                            scheduleForm.patch(`/admin/forms/${selectedContact.id}/schedule`, {
                                                preserveScroll: true,
                                                onSuccess: () => toast.success('Jadwal & teknisi berhasil disimpan! Tiket sekarang Dalam Proses.'),
                                                onError: () => toast.error('Gagal menyimpan jadwal.')
                                            });
                                        }}
                                    >
                                        {scheduleForm.processing ? 'Menyimpan...' : 'Atur Jadwal'}
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">Pilih Teknisi</label>
                                        <Select 
                                            value={scheduleForm.data.technician_id} 
                                            onValueChange={v => scheduleForm.setData('technician_id', v)}
                                        >
                                            <SelectTrigger className="h-9 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                                <SelectValue placeholder="Pilih Teknisi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {technicians.length > 0 ? technicians.map(tech => (
                                                    <SelectItem key={tech.id} value={tech.id.toString()}>{tech.name}</SelectItem>
                                                )) : (
                                                    <SelectItem value="none" disabled>Tidak ada teknisi aktif</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {scheduleForm.errors.technician_id && <span className="text-[10px] text-red-500">{scheduleForm.errors.technician_id}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500 dark:text-gray-400">Tanggal & Waktu</label>
                                        <Input 
                                            type="datetime-local" 
                                            value={scheduleForm.data.scheduled_at}
                                            onChange={e => scheduleForm.setData('scheduled_at', e.target.value)}
                                            className="h-9 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800" 
                                        />
                                        {scheduleForm.errors.scheduled_at && <span className="text-[10px] text-red-500">{scheduleForm.errors.scheduled_at}</span>}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Internal Notes */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Catatan Internal (Admin)</label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={notesForm.processing}
                                        className="h-7 text-xs active:scale-95 transition-transform"
                                        onClick={() => {
                                            notesForm.patch(`/admin/forms/${selectedContact.id}/notes`, {
                                                preserveScroll: true,
                                                onSuccess: () => toast.success('Catatan berhasil disimpan!'),
                                                onError: () => toast.error('Gagal menyimpan catatan.')
                                            });
                                        }}
                                    >
                                        {notesForm.processing ? 'Menyimpan...' : 'Simpan Catatan'}
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Tulis catatan internal di sini (tidak terlihat oleh pelanggan)..."
                                    value={notesForm.data.internal_notes}
                                    onChange={e => notesForm.setData('internal_notes', e.target.value)}
                                    className="min-h-20 mb-2 bg-yellow-50/30 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30 focus-visible:ring-yellow-500"
                                />
                            </div>
                            
                            {/* Reply Section */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Balas Email</label>
                                    {selectedContact.email && (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={isRefining || !data.message}
                                                className="h-7 text-xs bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50 dark:hover:bg-emerald-900/40"
                                                onClick={async () => {
                                                    setIsRefining(true);
                                                    try {
                                                        const res = await axios.post(`/admin/forms/refine-reply`, { draft: data.message });
                                                        setData('message', res.data.reply);
                                                        toast.success('Bahasa berhasil diperbaiki!');
                                                    } catch (err: any) {
                                                        toast.error(err.response?.data?.reply || 'Gagal memperbaiki balasan.');
                                                    } finally {
                                                        setIsRefining(false);
                                                    }
                                                }}
                                            >
                                                {isRefining ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1.5" />}
                                                Perbaiki Bahasa
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={isGenerating}
                                                className="h-7 text-xs bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/50 dark:hover:bg-indigo-900/40"
                                                onClick={async () => {
                                                    setIsGenerating(true);
                                                    try {
                                                        const res = await axios.post(`/admin/forms/${selectedContact.id}/generate-reply`);
                                                        setData('message', res.data.reply);
                                                        toast.success('Balasan AI berhasil dibuat!');
                                                    } catch (err: any) {
                                                        toast.error(err.response?.data?.reply || 'Gagal menghasilkan balasan.');
                                                    } finally {
                                                        setIsGenerating(false);
                                                    }
                                                }}
                                            >
                                                {isGenerating ? <Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1.5" />}
                                                Buat Balasan dengan AI
                                            </Button>
                                        </div>
                                    )}
                                </div>
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

                    <DialogFooter className="flex flex-col sm:flex-row items-center gap-3 w-full border-t border-gray-100 dark:border-gray-800 pt-4">
                        <div className="flex w-full sm:w-auto">
                            <Button variant="outline" onClick={() => {
                                setSelectedContact(null);
                                reset('message');
                                notesForm.reset('internal_notes');
                            }} className="w-full sm:w-auto active:scale-95 transition-transform">
                                Tutup
                            </Button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:ml-auto items-center">
                            {selectedContact && (
                                <div className="w-full sm:w-auto flex justify-end">
                                    {selectedContact.status !== 'spam' ? (
                                        <Button
                                            variant={selectedContact.status === 'selesai' ? 'secondary' : 'default'}
                                            onClick={() => handleStatusChange(selectedContact.id, selectedContact.status === 'selesai' ? 'menunggu' : 'selesai')}
                                            className="w-full sm:w-auto active:scale-95 transition-transform"
                                        >
                                            {selectedContact.status !== 'selesai' ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Tandai Selesai
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    Buka Kembali
                                                </>
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={() => handleStatusChange(selectedContact.id, 'menunggu')}
                                            className="w-full sm:w-auto active:scale-95 transition-transform border-red-200 text-red-600 hover:bg-red-50"
                                        >
                                            Bukan Spam
                                        </Button>
                                    )}
                                </div>
                            )}

                            {selectedContact?.email && selectedContact?.status !== 'spam' && (
                                <div className="hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                            )}

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
            {/* Import Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Import Data Pelanggan</DialogTitle>
                        <DialogDescription>
                            Upload file Excel (.xlsx) atau CSV yang berisi data keluhan pelanggan. 
                            AI akan secara otomatis membaca dan menganalisis setiap baris data yang Anda upload.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        postImport(route('admin.import'), {
                            onSuccess: () => {
                                setIsImportModalOpen(false);
                                resetImport();
                                toast.success('Data berhasil diimpor dan dianalisis!');
                            },
                            onError: () => toast.error('Gagal mengimpor data.')
                        });
                    }} className="space-y-4">
                        <div 
                            className={cn(
                                "border-2 border-dashed rounded-lg p-6 text-center transition-colors relative",
                                isDragging ? "border-brand-green bg-brand-green/5" : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                            )}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    setImportData('file', e.dataTransfer.files[0]);
                                }
                            }}
                        >
                            <input 
                                type="file" 
                                id="file-upload" 
                                className="hidden" 
                                accept=".csv,.xlsx" 
                                onChange={(e) => setImportData('file', e.target.files ? e.target.files[0] : null)}
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full absolute inset-0 z-10 opacity-0">
                                Upload
                            </label>
                            <div className="pointer-events-none flex flex-col items-center relative z-0">
                                <Upload className={cn("w-8 h-8 mb-3 transition-colors", isDragging ? "text-brand-green" : "text-gray-400")} />
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {importData.file ? importData.file.name : 'Klik atau drag & drop file (.xlsx, .csv)'}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">Maksimal 5MB. Proses analisis AI mungkin memakan waktu beberapa detik.</span>
                            </div>
                        </div>
                        {importErrors.file && <p className="text-xs text-red-500 text-center">{importErrors.file}</p>}
                        
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsImportModalOpen(false)}>Batal</Button>
                            <Button type="submit" disabled={!importData.file || importing} className="bg-brand-green hover:bg-brand-green/90 text-white">
                                {importing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Menganalisis dengan AI...
                                    </>
                                ) : (
                                    'Proses & Import'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
