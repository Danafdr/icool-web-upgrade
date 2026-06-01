import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Clock, CheckCircle, AlertCircle, Calendar as CalendarIcon, GripVertical } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    phone: string;
    hvac_issue_type: string | null;
    status: 'menunggu' | 'dijadwalkan' | 'dalam_proses' | 'selesai' | 'spam';
    created_at: string;
    urgency_level: 'low' | 'medium' | 'high' | null;
    scheduled_at: string | null;
    technician?: { id: number; name: string };
}

interface KanbanBoardProps {
    contacts: Contact[];
    onStatusChange: (id: number, newStatus: 'menunggu' | 'dijadwalkan' | 'dalam_proses' | 'selesai' | 'spam') => void;
    onViewContact: (contact: Contact) => void;
}

export default function KanbanBoard({ contacts, onStatusChange, onViewContact }: KanbanBoardProps) {
    const columns = [
        { id: 'menunggu', title: 'Menunggu', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-gray-50 dark:bg-gray-900', border: 'border-gray-200 dark:border-gray-800' },
        { id: 'dijadwalkan', title: 'Dijadwalkan', icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-gray-50 dark:bg-gray-900', border: 'border-gray-200 dark:border-gray-800' },
        { id: 'dalam_proses', title: 'Dalam Proses', icon: Clock, color: 'text-purple-600', bg: 'bg-gray-50 dark:bg-gray-900', border: 'border-gray-200 dark:border-gray-800' },
        { id: 'selesai', title: 'Selesai', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-gray-50 dark:bg-gray-900', border: 'border-gray-200 dark:border-gray-800' },
    ] as const;

    // Filter out spam from the board
    const boardContacts = contacts.filter(c => c.status !== 'spam');

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 px-1 min-h-[500px]">
            {columns.map(col => {
                const columnContacts = boardContacts.filter(c => c.status === col.id);
                
                return (
                    <div key={col.id} className={`flex-none w-80 rounded-xl border ${col.border} ${col.bg} p-4 flex flex-col`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <col.icon className={`w-5 h-5 ${col.color}`} />
                                <h3 className={`font-semibold ${col.color}`}>{col.title}</h3>
                            </div>
                            <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                                {columnContacts.length}
                            </Badge>
                        </div>
                        
                        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                            {columnContacts.length === 0 ? (
                                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                                    Tidak ada data
                                </div>
                            ) : (
                                columnContacts.map(contact => (
                                    <Card 
                                        key={contact.id}
                                        className="cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] border-gray-200 dark:border-gray-800"
                                        onClick={() => onViewContact(contact)}
                                    >
                                        <CardContent className="p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-semibold text-sm truncate pr-2" title={contact.name}>
                                                    {contact.name}
                                                </div>
                                                {contact.urgency_level && (
                                                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                                        contact.urgency_level === 'high' ? 'bg-red-500' : 
                                                        contact.urgency_level === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                                    }`} title={`Urgency: ${contact.urgency_level}`} />
                                                )}
                                            </div>
                                            
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                                                {contact.hvac_issue_type || 'Tidak ada layanan'}
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-3 text-[10px] text-gray-400">
                                                <span>{format(new Date(contact.created_at), 'd MMM yyyy')}</span>
                                                <span>{contact.phone}</span>
                                            </div>

                                            {/* Scheduling Info Badge */}
                                            {(contact.scheduled_at || contact.technician) && (
                                                <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md p-2 text-xs border border-blue-100 dark:border-blue-800/50">
                                                    {contact.technician && (
                                                        <div className="flex items-center gap-1.5 font-medium mb-1">
                                                            <div className="w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-[9px] uppercase">
                                                                {contact.technician.name.substring(0, 2)}
                                                            </div>
                                                            {contact.technician.name}
                                                        </div>
                                                    )}
                                                    {contact.scheduled_at && (
                                                        <div className="flex items-center gap-1.5 text-[10px]">
                                                            <CalendarIcon className="w-3 h-3" />
                                                            {format(new Date(contact.scheduled_at), 'd MMM yyyy, HH:mm')}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            
                                            {/* Status Dropdown to easily move items without drag and drop */}
                                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800" onClick={(e) => e.stopPropagation()}>
                                                <select 
                                                    className="w-full text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md py-1 px-2 focus:ring-blue-500 focus:border-blue-500"
                                                    value={contact.status}
                                                    onChange={(e) => onStatusChange(contact.id, e.target.value as any)}
                                                >
                                                    <option value="menunggu">Menunggu</option>
                                                    <option value="dijadwalkan">Dijadwalkan</option>
                                                    <option value="dalam_proses">Dalam Proses</option>
                                                    <option value="selesai">Selesai</option>
                                                </select>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
