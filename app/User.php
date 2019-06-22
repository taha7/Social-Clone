<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\FriendshipTrait;


class User extends Authenticatable
{
    use Notifiable;
    use FriendshipTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected static function boot()
    {
        parent::boot();

        $authId = auth()->id();

        static::addGlobalScope('senders', function ($builder) use ($authId) {
            $builder->with(['senders' => function ($query) use ($authId) {
                $query->where('friend_id', $authId);
            }]);
        });

        static::addGlobalScope('friends', function ($builder) use ($authId) {
            $builder->with(['friends' => function ($query) use ($authId) {
                $query->where('user_id', $authId);
            }]);
        });
    }

    public function posts()
    {
        return $this->hasMany("App\Post");
    }

    public function comments()
    {
        return $this->hasMany("App\Comment");
    }

    public function scopeSearchByKey($builder, $key)
    {
        $builder
            ->where('name', 'like', '%' . $key . '%')
            ->orWhere('email', 'like', '%' . $key . '%');
    }
}
