<?php

namespace Tests\Feature\posts;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ReadPostsTest extends TestCase
{
    use DatabaseMigrations;
    /** @test */
    public function a_user_can_browse_all_posts()
    {
        $post = factory('App\Post')->create();

        $this->get('/posts')->assertSee($post->body);
    }
}
