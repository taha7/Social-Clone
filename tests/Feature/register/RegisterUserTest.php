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
            $user = $this->user;
            $user["{$field}"] = null;

            $this->post('/register/user', $user)
                ->assertJsonValidationErrors(["{$field}"])
                ->assertJsonMissingValidationErrors(
                    array_except($requiredFields, array_search("{$field}", $requiredFields))
                );
        }
    }

    /** @test */
    public function a_register_form_requires_a_valid_email()
    {
        $this->user['email'] = "unvalid email";

        $this->post('/register/user', $this->user)
            ->assertJsonValidationErrors(['email']);

        $user = factory(User::class)->create();
        $this->user['email'] = $user->email;

        $this->post('/register/user', $this->user)
            ->assertJsonValidationErrors(['email'])
            ->assertJsonMissingValidationErrors(['name', 'password']);
    }

    /** @test */
    public function a_register_form_requires_a_valid_password_confirmation()
    {
        $this->user['password_confirmation'] = "notequalpassword";
        $this->post('/register/user', $this->user)
            ->assertJsonValidationErrors(['password'])
            ->assertJsonMissingValidationErrors(['name', 'email']);
    }
}
