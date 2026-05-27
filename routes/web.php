<?php

use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminDashboardController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('About');
})->name('about');

Route::post('/contact', [ContactController::class, 'store']);

// Service Routes
Route::get('/projek-ac', function () {
    return Inertia::render('Portfolio');
});

Route::get('/service-kami/service-cuci-ac', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Service Cuci AC',
        'description' => 'Layanan cuci AC profesional untuk memastikan udara tetap bersih, sehat, dan AC bekerja dengan efisiensi maksimal tanpa pemborosan listrik.',
        'benefits' => [
            'Membersihkan filter dan evaporator secara menyeluruh.',
            'Mencegah kerusakan komponen akibat penumpukan debu.',
            'Meningkatkan kualitas udara dalam ruangan.'
        ],
        'service_type' => 'cuci-ac',
        'price' => 'Mulai Rp 75.000 / unit'
    ]);
});

Route::get('/service-kami/kontrak-cuci-ac', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Kontrak Cuci AC',
        'description' => 'Solusi perawatan rutin berkala (maintenance contract) untuk perkantoran dan bisnis. Dapatkan penawaran harga terbaik dan prioritas layanan.',
        'benefits' => [
            'Diskon khusus untuk kontrak tahunan.',
            'Jadwal cuci teratur tanpa perlu Anda repot mengingat.',
            'Prioritas penanganan jika terjadi masalah mendadak.'
        ],
        'service_type' => 'kontrak-cuci',
        'price' => 'Hubungi kami untuk penawaran'
    ]);
});

Route::get('/service-kami/reparasi-perbaikan', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Reparasi / Perbaikan AC',
        'description' => 'Penanganan cepat dan tepat untuk segala jenis kerusakan AC, mulai dari kurang dingin, bocor air, berisik, hingga mati total.',
        'benefits' => [
            'Teknisi ahli mendiagnosa masalah secara presisi.',
            'Perbaikan cepat di tempat.',
            'Garansi untuk setiap layanan perbaikan.'
        ],
        'service_type' => 'reparasi',
        'price' => 'Mulai Rp 150.000 / kunjungan'
    ]);
});

Route::get('/service-kami/teknisi-standby-inhouse', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Teknisi Standby / Inhouse',
        'description' => 'Layanan penyediaan teknisi AC yang standby di lokasi Anda (gedung, mall, rumah sakit, dll) untuk memastikan operasional pendingin tidak pernah terganggu.',
        'benefits' => [
            'Respon seketika tanpa harus menunggu teknisi dari luar.',
            'Cocok untuk fasilitas kritikal yang membutuhkan suhu stabil.',
            'Dilengkapi peralatan standar dari ICool.'
        ],
        'service_type' => 'teknisi-standby',
        'price' => 'Hubungi kami untuk penawaran'
    ]);
});

Route::get('/service-kami/spare-part-ac', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Spare Part AC',
        'description' => 'Penyediaan dan pemasangan suku cadang (spare part) AC original untuk memastikan keawetan dan performa mesin AC Anda.',
        'benefits' => [
            '100% Suku cadang asli / original.',
            'Mendukung berbagai merk AC ternama (Daikin, Panasonic, dll).',
            'Harga transparan dan kompetitif.'
        ],
        'service_type' => 'spare-part',
        'price' => 'Bervariasi sesuai part & merk'
    ]);
});

Route::get('/service-kami/instalasi-pasang-ac', function () {
    return Inertia::render('Services/GenericService', [
        'title' => 'Instalasi / Pasang AC',
        'description' => 'Jasa pemasangan AC baru atau pemindahan AC dengan standar instalasi pabrik untuk mencegah masalah kebocoran freon atau air di kemudian hari.',
        'benefits' => [
            'Penggunaan material pipa dan kabel berkualitas SNI.',
            'Vakum instalasi wajib dilakukan untuk keawetan kompresor.',
            'Pemasangan rapi, aman, dan memperhatikan estetika ruangan.'
        ],
        'service_type' => 'instalasi',
        'price' => 'Mulai Rp 350.000 / unit'
    ]);
});

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });

// Secure Admin Dashboard Routes (auth only - no email verification required for internal panel)
Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.overview');
    Route::get('/forms', [AdminDashboardController::class, 'forms'])->name('admin.forms');
    Route::patch('/forms/{contact}/status', [AdminDashboardController::class, 'updateStatus'])->name('admin.forms.status');
});

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
});

require __DIR__.'/settings.php';
