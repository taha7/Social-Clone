<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Friendship;

class UserTest extends TestCase
{
    /** @test */
    public function it_searchs_users_by_key()
    {
        $searchedUser = User::searchByKey(
            $name = factory(User::class)->create(['email' => "ss@ss.com"])->name
        )->first();

        $this->assertEquals($searchedUser->name, $name);

        factory(User::class)->create(['email' => "sss@ss.com"]);
        $searchedUsers = User::searchByKey("ss")->get();

        $this->assertEquals(2, $searchedUsers->count());
    }

    /** @test */
    public function it_can_add_friend()
    {
        $user = factory(User::class)->create();
        $friend = factory(User::class)->create();

        $friendship = $user->addFriend($friend->id);

        $this->assertEquals($friendship->user_id, $user->id);
        $this->assertEquals($friendship->friend_id, $friend->id);
    }

    /** @test */
    public function it_can_not_add_a_friend_that_has_a_relation_with()
    {
        $user = factory(User::class)->create();
        $friend = factory(User::class)->create();

        $user->addFriend($friend->id);

        $friendship = $user->addFriend($friend->id);

        $this->assertFalse($friendship);
    }

    /** @test */
    public function it_can_accept_request_from_a_friend_if_a_has_only()
    {
        $user = factory(User::class)->create();
        $friend = factory(User::class)->create();

        $this->assertFalse($user->acceptFriend($friend->id));

        $friend->addFriend($user->id);

        $this->assertFalse($friend->acceptFriend($user->id));
        $this->assertTrue($user->acceptFriend($friend->id));
    }

    /** @test */
    public function it_can_remove_friendship_with_a_friend()
    {
        $user = create(User::class);

        $friend = create(User::class);

        $user->addFriend($friend->id);

        $user->removeFriend($friend->id);

        $this->assertCount(0, Friendship::all());
    }

    /** @test */
    public function it_can_know_the_friend_ship_status()
    {
        $user = factory(User::class)->create();
        $friend = factory(User::class)->create();

        $this->assertFalse($user->friendshipStatus($friend->id));

        $user->addFriend($friend->id);

        $this->assertEquals($user->friendshipStatus($friend->id), 'pending');

        $friend->acceptFriend($user->id);

        $this->assertEquals($user->friendshipStatus($friend->id), 'friends');
    }
}
