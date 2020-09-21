<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post as PostResource;
use App\Mail\DailyPosts;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
        return Inertia::render('Home', [
            'posts' => PostResource::collection(Post::all())
        ]);
    }

    public function dailyposts()
    {
        $this->authorize('admin');
        $user = User::find(1);
        Mail::to($user)->send(new DailyPosts($user));
        return response('Sent!', 200);
    }
}
