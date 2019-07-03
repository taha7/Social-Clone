<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use App\User;


class UserControlFriendsTest extends TestCase
{
    /** @test */
    public function it_removes_a_friend()
    {

        $this->signIn();

        $friend = create(User::class);
        $anotherFriend = create(User::class);

        $friend->addFriend($anotherFriend->id);

        auth()->user()->addFriend($anotherFriend->id);
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
