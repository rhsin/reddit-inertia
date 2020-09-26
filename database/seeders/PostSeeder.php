<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('posts')->insert([
            [
                'title' => 'assembly developers',
                'score' => 22495,
                'link' => '/r/ProgrammerHumor/comments/ivmto5/assembly_developers/',
                'group_id' => 4,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Time displayed as color',
                'score' => 1672,
                'link' => '/r/webdev/comments/ivsw8e/time_displayed_as_color/',
                'group_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Covid Grows Less Deadly …Practice, Drugs Improve',
                'score' => 2739,
                'link' => '/r/Coronavirus/comments/ivtkzn/covid_grows_less_deadly_as_doctors_gain_practice/',
                'group_id' => 3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Insomniac is working on a solution to the Spider-Man: Remastered issue!',
                'score' => 635,
                'link' => '/r/PS4/comments/ivs65o/insomniac_is_working_on_a_solution_to_the/',
                'group_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],

        ]);
    }
}
