<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post as PostResource;
use App\Http\Resources\User as UserResource;
use App\Mail\DailyPosts;
use App\Models\Group;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Data is passed directly to component as props, Inertia renders component name-matching
    // from Pages directory (similar to Laravel view rendering from Views directory)
    public function dashboard()
    {
        $user = new UserResource(Auth::user());
        return Inertia::render('Home', [
            'account' => $user,
            'posts' => PostResource::collection(Post::all())
        ]);
    }

    public function profile()
    {
        $user = new UserResource(Auth::user());
        return Inertia::render('Profile', [
            'account' => $user,
        ]);
    }

    // Attach/Detach Eloquent methods insert/delete row into pivot table (group_user)
    public function attachGroup(Request $request)
    {
        $this->authorize('user');
        $user = $request->user();
        $user->groups()->attach($request->group_id);
        return response('Attached!', 201);
    }

    public function detachGroup(Request $request)
    {
        $this->authorize('user');
        $user = $request->user();
        $user->groups()->detach($request->group_id);
        return response('Detached!', 204);
    }

    public function detachPost(Request $request, $id)
    {
        $this->authorize('user');
        $user = $request->user();
        $user->posts()->detach($id);
        return response('Detached!', 204);
    }

    // Function only for testing that mailable can be sent by User 1 (Ryan)
    public function dailyposts()
    {
        $this->authorize('admin');
        $user = User::find(1);
        Mail::to($user)->send(new DailyPosts($user));
        return response('Sent!', 200);
    }
}
