<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Primary Meta Tags --}}
        <meta name="title" content="iCool - Layanan HVAC & AC Premium">
        <meta name="description" content="Layanan perbaikan dan perawatan AC profesional dengan standar enterprise. Booking teknisi tersertifikasi secara instan.">

        {{-- Open Graph / WhatsApp / Facebook --}}
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://icool-staging.vercel.app/">
        <meta property="og:title" content="iCool - Layanan HVAC & AC Premium">
        <meta property="og:description" content="Layanan perbaikan dan perawatan AC profesional dengan standar enterprise. Booking teknisi tersertifikasi secara instan.">
        <meta property="og:image" content="https://icool-staging.vercel.app/images/og-preview.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="https://icool-staging.vercel.app/">
        <meta name="twitter:title" content="iCool - Layanan HVAC & AC Premium">
        <meta name="twitter:description" content="Layanan perbaikan dan perawatan AC profesional dengan standar enterprise. Booking teknisi tersertifikasi secara instan.">
        <meta name="twitter:image" content="https://icool-staging.vercel.app/images/og-preview.png">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.png?v=2" type="image/png">
        <link rel="apple-touch-icon" href="/favicon.png?v=2">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>Loading iCool...</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
