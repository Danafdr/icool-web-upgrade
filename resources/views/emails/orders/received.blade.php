<x-mail::message>
# Halo {{ $contact->name }},

Terima kasih telah memilih iCool untuk kebutuhan HVAC Anda! Pesanan Anda telah kami terima dan tim kami akan segera menghubungi Anda.

**Order ID Anda:**
# <center>{{ $contact->order_id }}</center>

## Detail Layanan
- **Nama:** {{ $contact->name }}
- **Telepon/WA:** {{ $contact->phone }}
- **Layanan:** {{ $contact->hvac_issue_type ?: 'Pemasangan/Perawatan' }}
- **Area Layanan:** {{ $contact->service_area ?: 'Tidak disebutkan' }}

Kami akan menghubungi Anda dalam waktu 1x24 jam untuk konfirmasi jadwal.

Terima kasih,<br>
{{ config('app.name') }}
</x-mail::message>
