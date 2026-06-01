import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Clock, TrendingUp, PieChart, BarChart } from 'lucide-react';

interface Props {
    monthlyLeads: { name: string; count: number }[];
    serviceBreakdown: { name: string; value: number }[];
    technicianStats: {
        id: number;
        name: string;
        total_jobs: number;
        completed_jobs: number;
        completion_rate: number;
    }[];
    overallStats: {
        totalLeads: number;
        completionRate: number;
        avgResolutionHours: number;
    };
}

export default function Analytics({ monthlyLeads, serviceBreakdown, technicianStats, overallStats }: Props) {
    // Find max value for scaling the bar chart
    const maxMonthlyLeads = Math.max(...monthlyLeads.map(m => m.count), 1);
    const maxServiceCount = Math.max(...serviceBreakdown.map(s => s.value), 1);

    return (
        <AdminLayout title="Laporan & Analitik">
            <Head title="Laporan & Analitik" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan Bisnis</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Pantau performa layanan dan efisiensi tim teknisi Anda.</p>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm border-t-2 border-t-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Prospek Masuk</CardTitle>
                            <Users className="w-5 h-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{overallStats.totalLeads}</div>
                            <p className="text-xs text-gray-500 mt-1">Keseluruhan kontak valid</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm border-t-2 border-t-emerald-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tingkat Penyelesaian</CardTitle>
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{overallStats.completionRate}%</div>
                            <p className="text-xs text-gray-500 mt-1">Dari total permintaan layanan</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm border-t-2 border-t-amber-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata Waktu Selesai</CardTitle>
                            <Clock className="w-5 h-5 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {overallStats.avgResolutionHours} <span className="text-lg text-gray-500 font-normal">Jam</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Estimasi dari form masuk hingga selesai</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Trends (Native Bar Chart) */}
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <TrendingUp className="w-5 h-5 text-brand-green" />
                                Tren Permintaan Layanan (6 Bulan)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-end justify-between gap-2 pt-6">
                                {monthlyLeads.map((month, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1 group">
                                        <div className="w-full relative flex justify-center h-full items-end">
                                            {/* Tooltip */}
                                            <div className="absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                                {month.count} Permintaan
                                            </div>
                                            <div 
                                                className="w-full max-w-[40px] bg-brand-green/80 hover:bg-brand-green rounded-t-sm transition-all duration-300"
                                                style={{ height: `${(month.count / maxMonthlyLeads) * 100}%`, minHeight: month.count > 0 ? '4px' : '0' }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 whitespace-nowrap truncate w-full text-center">
                                            {month.name.split(' ')[0]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Type Breakdown (Horizontal Bar) */}
                    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <PieChart className="w-5 h-5 text-indigo-500" />
                                Distribusi Jenis Layanan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {serviceBreakdown.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 text-sm">Belum ada data layanan.</div>
                                ) : (
                                    serviceBreakdown.map((service, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-700 dark:text-gray-300">{service.name}</span>
                                                <span className="text-gray-500 font-bold">{service.value}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                                                <div 
                                                    className="bg-indigo-500 h-2 rounded-full" 
                                                    style={{ width: `${(service.value / maxServiceCount) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Technician Performance */}
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                            <BarChart className="w-5 h-5 text-purple-500" />
                            Performa Teknisi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-600 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Nama Teknisi</th>
                                        <th className="px-6 py-4 font-medium text-center">Total Pekerjaan</th>
                                        <th className="px-6 py-4 font-medium text-center">Diselesaikan</th>
                                        <th className="px-6 py-4 font-medium">Tingkat Penyelesaian</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {technicianStats.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                                Belum ada data teknisi.
                                            </td>
                                        </tr>
                                    ) : (
                                        technicianStats.map((tech) => (
                                            <tr key={tech.id} className="hover:bg-gray-50 dark:hover:bg-gray-950/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {tech.name}
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                                                    {tech.total_jobs}
                                                </td>
                                                <td className="px-6 py-4 text-center text-emerald-600 font-medium">
                                                    {tech.completed_jobs}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-full max-w-[120px] bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                                                            <div 
                                                                className={tech.completion_rate >= 80 ? "bg-emerald-500 h-1.5 rounded-full" : tech.completion_rate >= 50 ? "bg-amber-500 h-1.5 rounded-full" : "bg-red-500 h-1.5 rounded-full"}
                                                                style={{ width: `${tech.completion_rate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 w-8">{tech.completion_rate}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
