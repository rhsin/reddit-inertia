<?php

namespace App\Http\Livewire;

use App\Models\Subreddit;
use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Support\Facades\Http;

class Subreddits extends Component
{
    use WithPagination;

    public $subs = [];

    // Retrieves 10 newest subreddits using Reddit API, sets as component property $subs
    public function new()
    {
        $response = Http::get('https://www.reddit.com/subreddits/new.json?limit=10');
        $subreddits = $response->json()['data']['children'];
        foreach ($subreddits as $subreddit) {
            $subreddit = $subreddit['data'];
            array_push($this->subs, $subreddit);
        }
        session()->flash('message', 'New Subreddits Retrieved!');
    }

    public function render()
    {
        return view('livewire.subreddits', [
            'subreddits' => Subreddit::paginate(20)
        ]); 
    }
}
