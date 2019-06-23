<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class ReadUsersTest extends TestCase
{
    /** @test */
    public function it_is_searched_by_name_and_email()
    {
        $usersInSearch = factory(User::class, 3)->create(['name' => 'ITWILLBEINCLUDED']);
        $usersNotInSearch = factory(User::class, 2)->create(['name' => 'no']);

        $resonse =  $this->get('/users/search/ITWILLBEINCLUDED');

        $usersInSearch->each(function ($user) use ($resonse) {
            $resonse->assertJsonFragment(['email' => $user->email]);
        });

        $usersNotInSearch->each(function ($user) use ($resonse) {
            $resonse->assertJsonMissing([
                'email' => $user->email
            ]);
        });
    }

    /** @test */
    public function when_search_it_returns_the_status_between_auth_and_searched_user()
    {
        $this->be($authUser = factory(User::class)->create(['name' => 'taha']));


        factory(User::class)->create(['name' => 'taha'])->addFriend($authUser->id);

        $authUser->addFriend(factory(User::class)->create(['name' => 'taha'])->id);

        $userIsFriendWithAuth = factory(User::class)->create(['name' => 'taha']);
        $authUser->addFriend($userIsFriendWithAuth->id);
        $userIsFriendWithAuth->acceptFriend($authUser->id);

        factory(User::class)->create(['name' => 'taha']);

        $resonse =  $this->getJson('/users/search/taha');

        $sendStatus = array_column($resonse->decodeResponseJson()['users'], 'sendStatus');
        $recieveStatus = array_column($resonse->decodeResponseJson()['users'], 'recieveStatus');

        $this->assertEquals([null, "pending", null, null, null], $sendStatus);
        $this->assertEquals([null, null, "pending", "friends", null], $recieveStatus);
    }
}
