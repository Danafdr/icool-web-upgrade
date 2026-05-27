import { Head } from '@inertiajs/react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import WhatsAppWidget from '../components/landing/WhatsAppWidget';
import { PropsWithChildren } from 'react';

interface MainLayoutProps {
    title: string;
}

export default function MainLayout({ title, children }: PropsWithChildren<MainLayoutProps>) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-primary selection:text-white font-sans antialiased flex flex-col">
            <Head title={`${title} | ICool`} />
            
            <Header />

            <main className="flex-1 mt-20 lg:mt-28">
                {children}
            </main>

            <Footer />
            <WhatsAppWidget />
        </div>
    );
}
