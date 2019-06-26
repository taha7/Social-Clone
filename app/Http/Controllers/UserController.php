<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    //
    public function index()
    {
        $users =  User::all()->except(auth()->id());
        $users = $users->map(function ($user) {
            $user->sendStatus = auth()->user()->sendFriendshipStatus($user->id);
            $user->recieveStatus = auth()->user()->acceptFriendShipStatus($user->id);
            return $user;
        });

        return response()->json(['users' => $users]);
    }


    public function search($key)
    {
        $users = User::whoSend()->WhoRecieve()->searchByKey($key)->take(10)->get();
        return makeResponse(UserResource::collection($users), 'users');
    }

    public function addFriend($friend)
    {
        if (auth()->user()->addFriend($friend)) {
            return makeResponse(new UserResource(User::find($friend)), 'friend');
        }

        return false;
    }

    public function acceptFriend($friend)
    {
        if (auth()->user()->acceptFriend($friend)) {
            return makeResponse(new UserResource(User::find($friend)), 'friend');
        }

        return false;
    }

    public function removeFriend($friend)
    {
        if (auth()->user()->removeFriend($friend)) {
            return makeResponse(new UserResource(User::find($friend)), 'friend');
        }
        return false;
    }
}
