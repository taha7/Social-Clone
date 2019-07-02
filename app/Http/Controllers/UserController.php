<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    public function search($key)
    {
        $users = User::whoSend()->WhoRecieve()->searchByKey($key)->take(10)->get();
        return makeResponse(UserResource::collection($users), 'users');
    }

    public function controlFriend($friend, $control)
    {
        if (method_exists(auth()->user(), $control)) {
            if (auth()->user()->$control($friend)) {
                return makeResponse(new UserResource(User::find($friend)), 'friend');
            }
        }

        return false;
    }

    public function getFriends()
    {
        return makeResponse(auth()->user()->myFriends(), 'friends');
    }

    public function getFriendRequests()
    {
        return makeResponse(auth()->user()->getFriendRequests(), 'friendRequests');
    }
}
