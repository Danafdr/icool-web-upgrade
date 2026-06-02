<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'name',
        'phone',
        'email',
        'service_area',
        'hvac_issue_type',
        'message',
        'ai_summary',
        'urgency_level',
        'address',
        'ai_reasoning',
        'suggested_service',
        'internal_notes',
        'scheduled_at',
        'technician_id',
        'status',
        'is_spam',
    ];

    public function technician()
    {
        return $this->belongsTo(Technician::class);
    }
}
