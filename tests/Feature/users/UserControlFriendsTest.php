<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use App\User;


class UserControlFriendsTest extends TestCase
{

    protected $friend;
    protected $anotherFriend;

    public function setUp()
    {
        parent::setUp();

        $this->signIn();

        $this->friend = create(User::class);
        $this->anotherFriend = create(User::class);
    }

    /** @test */
    public function it_controls_a_friend()
    {

        $this->friend->addFriend($this->anotherFriend->id);

        auth()->user()->addFriend($this->anotherFriend->id);

        $response = $this->get("/user/control-friend/{$this->friend->id}/addFriend");

        $this->assertEquals($response->jsonData('friend')['recieveStatus'], 'pending');

        $response = $this->get("/user/control-friend/{$this->friend->id}/removeFriend");

        $this->assertNull($response->jsonData('friend')['sendStatus']);
        $this->assertNull($response->jsonData('friend')['recieveStatus']);

        $this->friend->addFriend(auth()->id());
        $response = $this->get("/user/control-friend/{$this->friend->id}/acceptFriend");

        $this->assertEquals($response->jsonData('friend')['sendStatus'], 'friends');
    }
}
