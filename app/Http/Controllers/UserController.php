<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

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

        return response()->json([
            'users' => $users
        ], 200);
    }
}