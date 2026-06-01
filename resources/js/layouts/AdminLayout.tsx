import { Link, usePage } from '@inertiajs/react';
import React, { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { LayoutDashboard, LogOut, Menu, FileText, Calendar, Wrench, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/routes';

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // Watch for flash messages from Inertia
    useEffect(() => {
        const flash = props.flash as { success?: string; error?: string };
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [props.flash]);

    const navLinks = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Formulir', href: '/admin/forms', icon: FileText },
        { name: 'Jadwal', href: '/admin/jadwal', icon: Calendar },
        { name: 'Teknisi', href: '/admin/technicians', icon: Wrench },
        { name: 'Laporan', href: '/admin/laporan', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-500">ICool Admin</span>
                </div>
                
                <nav className="p-4 space-y-1">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = url === link.href || (link.href !== '/admin' && url.startsWith(link.href));
                        
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Use Inertia Link as a button for logout to trigger the POST request */}
                        <Link href={logout.url()} method="post" as="button">
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 gap-2">
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Keluar</span>
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
