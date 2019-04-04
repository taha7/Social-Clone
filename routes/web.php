<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

Route::get('/users', 'UserController@index')->name('users.index');
Route::get('/users/add-friend', 'UserController@addFriend')->name('users.addFriend');
Route::get('/auth', function () {
    return response()->json([
        'status' => true,
        'user' => auth()->user() ?: null
    ]);
});

Route::get('/posts', 'PostController@index')->name('posts.index');
Route::post('/posts', 'PostController@store')->name('posts.store');
Route::delete('/posts/{post}', 'PostController@destroy')->name('posts.delete');
Route::get('/posts/{post}', 'PostController@show')->name('posts.show');
