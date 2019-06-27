<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Friendship;
use App\User;

class GetFriendsTest extends TestCase
{
    /** @test */
    public function users_display_their_friends()
    {
        $this->signIn();

        $followingFriends = create(User::class, [], 2);
        $followersFriends = create(User::class, [], 2);

        $notFriends = create(User::class, [], 2);

        foreach ($followingFriends as $friend) {
            Friendship::makeFriends(auth()->id(), $friend->id);
        }

        foreach ($followersFriends as $friend) {
            Friendship::makeFriends($friend->id, auth()->id());
        }

        $response = $this->get('/user/friends');


        $followingFriends->each(function ($friend) use ($response) {
            $response->assertJsonFragment(['email' => $friend->email]);
        });

        $followersFriends->each(function ($friend) use ($response) {
            $response->assertJsonFragment(['email' => $friend->email]);
        });

        $notFriends->each(function ($friend) use ($response) {
            $response->assertJsonMissing(['email' => $friend->email]);
        });
    }
}
