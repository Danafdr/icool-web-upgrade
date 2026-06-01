import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';
import { format, startOfWeek, endOfWeek, addDays, isSameDay, parseISO, subWeeks, addWeeks, isToday } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Technician {
    id: number;
    name: string;
}

interface Job {
    id: number;
    name: string;
    hvac_issue_type: string | null;
    status: string;
    urgency_level: string | null;
    address: string | null;
    scheduled_at: string;
    technician: Technician | null;
}

interface Props {
    jobs: Job[];
}

export default function ScheduleCalendar({ jobs }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

    const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
    const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const goToToday = () => setCurrentDate(new Date());

    // Generate days of the week
    const weekDays = [];
    let day = startDate;
    while (day <= endDate) {
        weekDays.push(day);
        day = addDays(day, 1);
    }

    return (
        <AdminLayout title="Jadwal Teknisi">
            <Head title="Jadwal Teknisi" />
            
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jadwal Teknisi</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola dan pantau jadwal pengerjaan teknisi di lapangan.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={goToToday}>
                            Hari Ini
                        </Button>
                        <div className="flex items-center bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-l-md" onClick={prevWeek}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="px-4 py-2 text-sm font-medium border-x border-gray-200 dark:border-gray-800 min-w-[140px] text-center">
                                {format(startDate, 'd MMM', { locale: id })} - {format(endDate, 'd MMM yyyy', { locale: id })}
                            </div>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-r-md" onClick={nextWeek}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weekDays.map((date, idx) => {
                        // Filter jobs for this specific day
                        const dayJobs = jobs.filter(job => {
                            if (!job.scheduled_at) return false;
                            const jobDate = parseISO(job.scheduled_at);
                            return isSameDay(jobDate, date);
                        }).sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());

                        const isCurrentDay = isToday(date);

                        return (
                            <Card 
                                key={idx} 
                                className={cn(
                                    "flex flex-col overflow-hidden h-[600px]", 
                                    isCurrentDay ? "border-brand-green/50 ring-1 ring-brand-green/50" : "border-gray-200 dark:border-gray-800"
                                )}
                            >
                                <div className={cn(
                                    "p-3 text-center border-b",
                                    isCurrentDay 
                                        ? "bg-brand-green/10 dark:bg-brand-green/20 border-brand-green/20" 
                                        : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800"
                                )}>
                                    <div className="text-xs font-semibold text-gray-500 uppercase">{format(date, 'EEEE', { locale: id })}</div>
                                    <div className={cn(
                                        "text-xl font-bold mt-1",
                                        isCurrentDay ? "text-brand-green" : "text-gray-900 dark:text-white"
                                    )}>
                                        {format(date, 'd')}
                                    </div>
                                </div>
                                <CardContent className="p-2 overflow-y-auto flex-1 space-y-2 bg-gray-50/30 dark:bg-gray-950/30">
                                    {dayJobs.length === 0 ? (
                                        <div className="text-center py-6 text-xs text-gray-400 dark:text-gray-600">
                                            Tidak ada jadwal
                                        </div>
                                    ) : (
                                        dayJobs.map(job => (
                                            <div 
                                                key={job.id} 
                                                className="bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-brand-green/40 hover:shadow-md transition-all group"
                                                onClick={() => router.get('/admin', { search: job.name })}
                                                title="Klik untuk mencari di halaman formulir"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center text-xs font-medium text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {format(parseISO(job.scheduled_at), 'HH:mm')}
                                                    </div>
                                                    {job.urgency_level === 'high' && (
                                                        <div className="w-2 h-2 rounded-full bg-red-500" title="Urgensi Tinggi" />
                                                    )}
                                                </div>
                                                
                                                <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                                    {job.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                                                    {job.hvac_issue_type || 'Layanan Umum'}
                                                </div>
                                                
                                                <div className="mt-2 space-y-1">
                                                    <div className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                                                        <MapPin className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2 leading-tight">{job.address || 'Alamat belum diisi'}</span>
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                                        <User className="w-3 h-3 mr-1 shrink-0" />
                                                        <span className="truncate">{job.technician?.name || 'Belum ditugaskan'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}
