<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post as PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PostResource::collection(Post::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('user', Post::class);
        $validatedData = $request->validate([
            'title' => ['required', 'unique:posts', 'min:3'],
            'score' => ['required', 'integer'],
            'link' => ['required', 'unique:posts', 'min:5'],
            'group_id' => ['required', 'integer']
        ]);
        $post = Post::create($validatedData);
        $user = $request->user();
        $user->posts()->attach($post->id);
        return response('Created!', 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('admin', Post::class);
        Post::find($id)->delete();
        return response('Deleted!', 204);
    }
}
