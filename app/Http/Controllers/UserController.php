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


        return response()->json([
            'status' => true,
            'users' => UserResource::collection($users)
        ]);
    }

    public function addFriend(User $friend)
    {
        if (auth()->user()->addFriend($friend->id)) {
            return response()->json([
                'status' => true,
                'friend' => new UserResource(User::find($friend->id))
            ]);
        }

        return false;
    }
}
