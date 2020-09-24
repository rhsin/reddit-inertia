<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostTest extends TestCase
{
    // use DatabaseTransactions;

    public function testPostsDatabase()
    {
        $this->assertDatabaseHas('posts', [
            'title' => 'assembly developers',
        ]);
    }

    public function testPostUserDatabase()
    {
        $this->assertDatabaseHas('post_user', [
            'user_id' => 1,
        ]);
    }

    public function testCanRetrievePosts()
    {
        $this->get('/posts')->assertStatus(200);
    }

    public function testUserCanCreateAndAttachPost()
    {
        $this->actingAs(User::find(2))
            ->post('/posts', [
                'title' => 'title',
                'score' => 1000,
                'link' => '/r/subreddit/comments',
                'group_id' => 1
            ])
            ->assertStatus(201);
    }

    public function testUserCanDetachPost()
    {
        $post = Post::latest()->first();
        $this->actingAs(User::find(2))
            ->post('/detach/posts/' . $post->id)
            ->assertStatus(204);
    }

    public function testAdminCanDeletePost()
    {
        $post = Post::latest()->first();
        $this->actingAs(User::find(1))
            ->delete('/posts/' . $post->id)
            ->assertStatus(204);
    }

    public function testGuestCannotCreatePost()
    {
        $this->post('/posts', [
                'title' => 'new title',
                'score' => 2000,
                'link' => '/r/subreddit/title',
                'group_id' => 1
            ])
            ->assertStatus(403);
    }

    public function testUserCannotDeletePost()
    {
        $post = Post::latest()->first();
        $this->actingAs(User::find(2))
            ->delete('/posts/' . $post->id)
            ->assertStatus(403);
    }
}
