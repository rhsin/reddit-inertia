<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'size'
    ];

    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }
}
