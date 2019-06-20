<?php

namespace Tests\Feature\register;

use Tests\TestCase;

use App\User;

class RegisterUserTest extends TestCase
{

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->raw([
            'password' => '123456',
            'password_confirmation' => '123456'
        ]);
    }
    /** @test */
    public function a_user_can_register_to_system()
    {

        $this->post('/register/user', $this->user)
            ->assertRedirect('/home');

        $this->assertDatabaseHas('users', ['name' => $this->user['name']]);
    }

    /** @test */
    public function a_register_form_requires_inputs()
    {
        $requiredFields = ['name', 'email', 'password'];

        foreach ($requiredFields as $field) {
            $this->user["{$field}"] = null;
            $this->post('/register/user', $this->user)->assertJsonValidationErrors(["{$field}"]);
        }
    }
}
