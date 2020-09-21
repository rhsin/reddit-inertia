<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post as PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Home', [
            'posts' => PostResource::collection(Post::all())
        ]);
    }
}
