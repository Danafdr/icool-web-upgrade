<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Technician extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'status'];

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }
}
