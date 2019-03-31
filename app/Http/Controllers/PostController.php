<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;

class PostController extends Controller
{
    //
    public function index()
    {
        $posts = Post::latest()->limit(10)->get();
        foreach ($posts as $post) {
            $post->user;
        }
        return response()->json([
            "data" => $posts,
        ], 200);
    }

    public function store(Request $request)
    {
        $post = Post::create([
            'user_id' => auth()->id(),
            'body' => $request->body
        ]);

        $post->load('user');
        return response()->json([
            'status' => true,
            'post' => $post
        ]);
    }
}
