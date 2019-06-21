<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

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
}
