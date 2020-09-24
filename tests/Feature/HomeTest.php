<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HomeTest extends TestCase
{
    public function testUserCanViewDashboard()
    {
        $this->actingAs(User::find(2))->get('/dashboard')
            ->assertStatus(200);
    }

    public function testGuestRedirectedFromDashboard()
    {
        $this->get('/dashboard')->assertStatus(302);
    }

    public function testUserCanViewProfile()
    {
        $this->actingAs(User::find(2))->get('/profile')
            ->assertStatus(200);
    }

    public function testGuestRedirectedFromProfile()
    {
        $this->get('/profile')->assertStatus(302);
    }

    public function testUserCanAttachGroup()
    {
        $this->actingAs(User::find(2))
            ->post('/attach/groups', [
                'group_id' => 2
            ])
            ->assertStatus(201);
    }

    public function testUserCanDetachGroup()
    {
        $this->actingAs(User::find(2))
            ->post('/detach/groups', [
                'group_id' => 2
            ])
            ->assertStatus(204);
    }

    public function testAdminCanSendMailable()
    {
        $this->actingAs(User::find(1))->get('/dailyposts')
            ->assertStatus(200);
    }
}
