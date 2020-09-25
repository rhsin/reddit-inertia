<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class SubredditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('https://www.reddit.com/subreddits.json?limit=100');
        $subreddits = $response->json()['data']['children'];
        foreach ($subreddits as $subreddit) {
            $subreddit = $subreddit['data'];
            \DB::table('subreddits')->insert([
                'name' => $subreddit['display_name'],
                'size' => $subreddit['subscribers'],
                'desc' => $subreddit['public_description'],
                'created' => date('m/d/Y', $subreddit['created'])
            ]);
        }
    }
}
