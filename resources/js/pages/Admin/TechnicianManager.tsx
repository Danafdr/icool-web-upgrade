import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Technician {
    id: number;
    name: string;
    phone: string | null;
    status: 'active' | 'inactive';
    created_at: string;
}

interface PaginationData {
    data: Technician[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    technicians: PaginationData;
}

export default function TechnicianManager({ technicians }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState<Technician | null>(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        name: '',
        phone: '',
        status: 'active' as 'active' | 'inactive'
    });

    const openCreateModal = () => {
        setEditingTech(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (tech: Technician) => {
        setEditingTech(tech);
        setData({
            name: tech.name,
            phone: tech.phone || '',
            status: tech.status
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingTech) {
            put(`/admin/technicians/${editingTech.id}`, {
                onSuccess: () => {
                    toast.success('Teknisi berhasil diperbarui');
                    setIsModalOpen(false);
                },
                preserveScroll: true
            });
        } else {
            post('/admin/technicians', {
                onSuccess: () => {
                    toast.success('Teknisi berhasil ditambahkan');
                    setIsModalOpen(false);
                    reset();
                },
                preserveScroll: true
            });
        }
    };

    const handleDelete = (tech: Technician) => {
        if (confirm(`Apakah Anda yakin ingin menghapus teknisi ${tech.name}?`)) {
            destroy(`/admin/technicians/${tech.id}`, {
                onSuccess: () => toast.success('Aksi berhasil dilakukan'),
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout title="Manajemen Teknisi">
            <Head title="Manajemen Teknisi" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Teknisi</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kelola data teknisi untuk penugasan service.</p>
                </div>
                <Button onClick={openCreateModal} className="bg-brand-green hover:bg-brand-green/90 text-zinc-950 font-semibold active:scale-95 transition-transform">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Tambah Teknisi
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Nama</th>
                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">No. Telepon</th>
                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                <th className="px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {technicians.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                        Belum ada data teknisi.
                                    </td>
                                </tr>
                            ) : (
                                technicians.data.map((tech) => (
                                    <tr key={tech.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{tech.name}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{tech.phone || '-'}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={tech.status === 'active' ? 'default' : 'secondary'} 
                                                className={tech.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-0' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0'}>
                                                {tech.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEditModal(tech)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => handleDelete(tech)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                            {editingTech ? 'Edit Data Teknisi' : 'Tambah Teknisi Baru'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400">
                            {editingTech ? 'Ubah informasi teknisi di bawah ini.' : 'Masukkan informasi teknisi baru yang akan ditugaskan.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                            <Input 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Cth: Budi Santoso"
                                className="bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                                required
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">No. Telepon / WhatsApp</label>
                            <Input 
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                placeholder="Cth: 08123456789"
                                className="bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <Select value={data.status} onValueChange={(val: 'active'|'inactive') => setData('status', val)}>
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Aktif (Tersedia untuk tugas)</SelectItem>
                                    <SelectItem value="inactive">Nonaktif (Tidak tersedia)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
                        </div>

                        <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2 w-full">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-zinc-950 font-semibold">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </AdminLayout>
    );
}
