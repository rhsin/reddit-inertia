<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    // use DatabaseTransactions;

    public function testUsersDatabase()
    {
        $this->assertDatabaseHas('users', [
            'email' => 'ryan@test.com',
        ]);
    }

    public function testGuestCannotRetrieveUsers()
    {
        $this->get('/users')->assertStatus(403);
    }

    public function testUserCanRetrieveUsers()
    {
        $this->actingAs(User::find(2))->get('/users')
            ->assertStatus(200);
    }

    public function testUserCanUpdateSelf()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->put('/users/' . $user->id, [
                'name' => 'John Doe', 'email' => 'john@test.com'
            ])
            ->assertStatus(200);
    }

    public function testUserCanDeleteSelf()
    {
        $user = User::latest()->first();
        $this->actingAs($user)
            ->delete('/users/' . $user->id)
            ->assertStatus(204);
    }
}
