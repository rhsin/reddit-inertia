<?php

namespace Tests\Feature;

use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GroupTest extends TestCase
{
    // use DatabaseTransactions;

    public function testGroupsDatabase()
    {
        $this->assertDatabaseHas('groups', [
            'name' => 'WebDev',
        ]);
    }

    public function testCanRetrieveGroups()
    {
        $this->get('/groups')->assertStatus(200);
    }

    public function testUserCanCreateGroup()
    {
        $this->actingAs(User::find(2))
            ->post('/groups', ['name' => 'news'])
            ->assertStatus(201);
    }

    public function testUserCanUpdateGroup()
    {
        $group = Group::latest()->first();
        $this->actingAs(User::find(2))
            ->put('/groups/' . $group->id, ['name' => 'pics'])
            ->assertStatus(200);
    }

    public function testUserCanDeleteGroup()
    {
        $group = Group::latest()->first();
        $this->actingAs(User::find(2))
            ->delete('/groups/' . $group->id)
            ->assertStatus(204);
    }

    public function testGuestCannotCreateGroup()
    {
        $this->post('/groups', ['name' => 'news'])
            ->assertStatus(403);
    }

    public function testGuestCannotUpdateGroup()
    {
        $group = Group::latest()->first();
        $this->put('/groups/' . $group->id, ['name' => 'pics'])
            ->assertStatus(403);
    }

    public function testGuestCannotDeleteGroup()
    {
        $group = Group::latest()->first();
        $this->delete('/groups/' . $group->id)
            ->assertStatus(403);
    }
}
