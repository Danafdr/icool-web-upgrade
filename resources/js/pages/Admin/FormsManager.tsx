import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface Contact {
    id: number;
    order_id: string | null;
    name: string;
    email: string | null;
    phone: string;
    hvac_issue_type: string | null;
    message: string | null;
    status: 'pending' | 'resolved';
    created_at: string;
}

interface PaginationData {
    data: Contact[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface FormsManagerProps {
    forms: PaginationData;
}

export default function FormsManager({ forms }: FormsManagerProps) {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        message: ''
    });

    const handleViewDetails = (contact: Contact) => {
        setSelectedContact(contact);
        reset('message');
    };

    const handleReplySubmit = () => {
        if (!selectedContact) return;
        
        post(`/admin/forms/${selectedContact.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('message');
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Forms Manager" />
            
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Formulir Pelanggan</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola dan tanggapi permintaan layanan pelanggan.</p>
                    </div>
                </div>

                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
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
                                {forms.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Belum ada formulir yang masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    forms.data.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-950/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                                                {format(new Date(contact.created_at), 'MMM d, yyyy')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900 dark:text-white">{contact.name}</div>
                                                <div className="text-gray-500">{contact.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                                {contact.hvac_issue_type || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {contact.status === 'pending' ? (
                                                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/50">Menunggu</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50">Selesai</Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => handleViewDetails(contact)}
                                                >
                                                    Lihat Detail
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {forms.last_page > 1 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                            <div className="text-sm text-gray-500 text-center sm:text-left">
                                Menampilkan <span className="font-medium">{forms.data.length}</span> dari <span className="font-medium">{forms.total}</span> data
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-end gap-1">
                                {forms.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>

            {/* Details Modal */}
            <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Detail Formulir</DialogTitle>
                        <DialogDescription>
                            Dikirim pada {selectedContact ? format(new Date(selectedContact.created_at), 'PPP') : ''}
                        </DialogDescription>
                    </DialogHeader>
                    
                    {selectedContact && (
                        <div className="space-y-4 py-4">
                            {selectedContact.order_id && (
                                <div className="bg-brand-green/10 border border-brand-green/20 p-3 rounded-lg mb-2">
                                    <label className="text-xs font-semibold text-brand-green uppercase tracking-wider">Order ID</label>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-1 font-mono tracking-wider">{selectedContact.order_id}</p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Nama Pelanggan</label>
                                    <p className="text-sm font-medium mt-1">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Nomor Telepon</label>
                                    <p className="text-sm font-medium mt-1">{selectedContact.phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Alamat Email</label>
                                    <p className="text-sm font-medium mt-1">{selectedContact.email || 'Tidak ada'}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Jenis Layanan</label>
                                    <p className="text-sm font-medium mt-1">{selectedContact.hvac_issue_type || 'Tidak ada'}</p>
                                </div>
                            </div>
                            
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Pesan</label>
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300 min-h-24">
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
                    
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedContact(null)} className="w-full sm:w-auto">
                            Tutup
                        </Button>
                        {selectedContact?.email && (
                            <Button 
                                onClick={handleReplySubmit} 
                                disabled={processing || !data.message.trim()} 
                                className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-zinc-950 font-semibold"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Balasan'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
