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
        // $posts = Post::with('user')->latest()->limit(10)->get();
        $posts = Post::with('user')->latest()->paginate(10);
        
        return response()->json([
            "status" => true,
            "paginatedPosts" => $posts,
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
