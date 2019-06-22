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
}
