<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::post('/register/user', 'Auth\RegisterController@registerUser')->name('register-user');


Route::get('/users/search/{key}', 'UserController@search')->name('users.search');

Route::get('/user/control-friend/{friend}/{control}', 'UserController@controlFriend')->name('user.controlfriend');
Route::get('/user/friends', 'UserController@getFriends')->name('user.friends');
Route::get('/user/friend-requests', 'UserController@getFriendRequests')->name('user.friendrequests');

Route::get('/posts', 'PostController@index')->name('posts.index');
Route::post('/posts', 'PostController@store')->name('posts.store');
Route::delete('/posts/{post}', 'PostController@destroy')->name('posts.delete');
Route::get('/posts/{post}', 'PostController@show')->name('posts.show');



Route::get('/test', function () {

    return App\User::all();
    // foreach (App\User::all() as $user) {
    //     $x = rand(0,1);
    //     if ($x === 0) auth()->user()->addFriend($user->id);
    //     else $user->addFriend(auth()->id());
    // }

    // return App\User::with(['senders' => function ($senders) {
    //     $senders->where('friend_id', auth()->id());
    // }, 'friends' => function($friends) {
    //     $friends->where('user_id', auth()->id());
    // }])->get();

    // return App\User::find(1)->friends;
    // return App\Friendship::all();   
    // dd(App\User::find(2)->hasRelation(1));
    // dd(App\User::find(4)->acceptFriend(3));
});
