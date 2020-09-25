<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(GroupSeeder::class);
        $this->call(SubredditSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(GroupUserSeeder::class);
        $this->call(PostUserSeeder::class);
    }
}
