<?php

namespace Tests\Feature\register;

use Tests\TestCase;

use App\User;

class RegisterUserTest extends TestCase
{
    /** @test */
    public function a_user_can_register_to_system()
    {
        $user = factory(User::class)->raw();
        $user['password_confirmation'] = $user['password'];

        $this->post('/register/user', $user)
            ->assertRedirect('/home');

        $this->assertDatabaseHas('users', ['name' => $user['name']]);
    }
}
