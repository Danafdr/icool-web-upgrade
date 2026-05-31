<x-mail::message>
# Halo {{ $contact->name }},

{!! nl2br(e($replyMessage)) !!}

<br>
Terima kasih,<br>
Tim Support {{ config('app.name') }}
</x-mail::message>
