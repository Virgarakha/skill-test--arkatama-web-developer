<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penumpang extends Model
{
    use HasFactory;
    protected $table = 'penumpang';
    protected $guarded = [];

    public function travel(){
        return $this->belongsTo(Travel::class, 'id_travel');
    }

    public $timestamps = false;
}
