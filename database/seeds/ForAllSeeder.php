<?php

use Illuminate\Database\Seeder;

class ForAllSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 20)->create()->each(function ($u) {
            for ($i = 0; $i < 5; $i++) {
                $post = factory(App\Post::class)->make();
                $u->posts()->save($post);

                for ($j = 0; $j < 5; $j++) {

                    $post->comments()->save(factory(App\Comment::class)->create([
                        'user_id' => $u->id,
                        'post_id' => $post->id
                    ]));
                }
            }
        });
    }
}
