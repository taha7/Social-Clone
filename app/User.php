<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Traits\FriendshipTrait;


class User extends Authenticatable
{
    use Notifiable, FriendshipTrait;

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

    public function friendsISendToThem($needed = 10)
    {
        $friendships = Friendship::with('friend')
            ->where(['user_id' => $this->id, 'status' => 'friends'])
            ->take($needed)->get();

        // $friendships = $this->senders()->with('friend')->where('status', 'friends')->take(5)->get();
        return array_column($friendships->toArray(), 'friend');
    }

    public function friendsTheySendToMe($needed = 10)
    {
        $friendships = Friendship::with('sender')
            ->where(['friend_id' => $this->id, 'status' => 'friends'])
            ->take($needed)->get();

        // $friendships = $this->friends()->with('sender')->where('status', 'friends')->take(5)->get();

        return array_column($friendships->toArray(), 'sender');
    }

    public function myFriends($following = 10, $followers = 10)
    {
        return array_merge(
            $this->friendsISendToThem($following),
            $this->friendsTheySendToMe($followers)
        );
    }

    public function getFriendRequests()
    {
        $friendships = Friendship::with('sender')
            ->where(['status' => 'pending', 'friend_id' => $this->id])
            ->get();

        return array_column($friendships->toArray(), 'sender');
    }
}
