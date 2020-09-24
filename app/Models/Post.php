<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'score', 'link', 'group_id'
    ];

    public function group()
    {
        return $this->belongsTo('App\Models\Group');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }
}
