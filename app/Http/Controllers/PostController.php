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

    public function destroy(Post $post)
    {
        if (!$post->exists) {
            return response()->json([
                'status' => false,
                'data' => null,
                'error' => "An error occured while deleting the post please try again"
            ]);
        }
        $post->delete();
        return response()->json([
            'status' => true,
            'post' => $post,
        ]);
    }

    public function show(Post $post)
    {
        return view('posts.showPost', compact('post'));
    }
}
