<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    //
    protected $fillable = ['user_id', 'friend_id', 'status'];


    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }

    public function scopeRelation($builder, $user_id, $friend_id)
    {
        $builder
            ->where(['user_id' => $user_id, 'friend_id' => $friend_id])
            ->orWhere(['user_id' => $friend_id, 'friend_id' => $user_id]);
    }

    public static function makeFriends($user, $friend)
    {
        static::create([
            'user_id' => $user,
            'friend_id' => $friend,
            'status' => 'friends'
        ]);
    }
}
