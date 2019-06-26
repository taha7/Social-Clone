<?php

namespace Tests\Feature\users;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Friendship;

class ReadUsersTest extends TestCase
{
    /** @test */
    public function it_is_searched_by_name_and_email()
    {
        $usersInSearch = create(User::class, ['name' => 'has-that-in-search'], 3);
        $usersNotInSearch = create(User::class, ['name' => 'no'], 2);

        $resonse =  $this->get('/users/search/has-that-in-search');

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
    public function when_search_it_returns_the_status_between_auth_and_searched_users()
    {
        $this->be($authUser = create(User::class, ['name' => 'taha']));

        create(User::class, ['name' => 'taha'])->addFriend($authUser->id);

        $authUser->addFriend(create(User::class, ['name' => 'taha'])->id);

        Friendship::makeFriends(
            $authUser->id,
            create(User::class, ['name' => 'taha'])->id
        );

        create(User::class, ['name' => 'taha']);

        $resonse =  $this->get('/users/search/taha');

        $sendStatus = array_column($resonse->jsonData('users'), 'sendStatus');
        $recieveStatus = array_column($resonse->jsonData('users'), 'recieveStatus');

        $this->assertEquals([null, "pending", null, null, null], $sendStatus);
        $this->assertEquals([null, null, "pending", "friends", null], $recieveStatus);
    }
}
