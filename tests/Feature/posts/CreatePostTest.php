<?php

namespace Tests\Feature\posts;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class CreatePostTest extends TestCase
{
    /** @test */
    public function an_auth_can_create_a_post()
    {
        // Give we have a signed in user
        $this->signIn();
        // And a post
        $post = factory('App\Post')->make();
        // if we visit /posts
        $this->post('/posts', $post->toArray());
        // the count of posts will increase by 1
        $this->assertCount(1, \App\Post::all());
    }
}
