<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Friendship;

class UserControlFriendsTest extends TestCase
{
    /** @test */
    public function it_removes_a_friend()
    {

        $this->signIn();

        $friend = create(User::class);

        auth()->user()->addFriend($friend->id);

        $response = $this->get("/user/control-friend/{$friend->id}/removeFriend");


        $this->assertNull($response->jsonData('friend')['sendStatus']);
        $this->assertNull($response->jsonData('friend')['recieveStatus']);

        $friend->addFriend(auth()->id());

        $response = $this->get("/user/control-friend/{$friend->id}/removeFriend");

        $this->assertNull($response->jsonData('friend')['sendStatus']);
        $this->assertNull($response->jsonData('friend')['recieveStatus']);
    }
}
