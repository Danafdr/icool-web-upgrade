import MainLayout from '../layouts/MainLayout';
import { Head } from '@inertiajs/react';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import ServicesSection from '../components/landing/ServicesSection';
import ContactForm from '../components/landing/ContactForm';

export default function Welcome() {
    return (
        <MainLayout title="Home">
            <Head>
                <meta name="description" content="iCool — Mitra terpercaya bisnis Anda dalam urusan pendingin. Layanan profesional untuk perawatan, perbaikan, dan instalasi AC oleh teknisi tersertifikasi." />
            </Head>
            <div className="bg-gradient-to-b from-brand-dark via-[#080b10] to-gray-950 min-h-screen">
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <ContactForm />
            </div>
        </MainLayout>
    );
}
