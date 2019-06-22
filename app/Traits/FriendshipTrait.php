<?php
namespace App\Traits;

use App\Friendship;



trait FriendshipTrait
{

    /** all friendships that this user sent to others  */
    public function senders()
    {
        return $this->hasMany(Friendship::class, 'user_id');
    }

    /** all friendships that others sent to this user */
    public function friends()
    {
        return $this->hasMany(Friendship::class, 'friend_id');
    }


    public function hasRelation($friend_id)
    {
        return
            $this->senders()->where('friend_id', $friend_id)->exists()
            || $this->friends()->where('user_id', $friend_id)->exists();
    }

    public function friendshipStatus($friend_id)
    {
        if (!$this->hasRelation($friend_id)) return false;

        return  Friendship::relation($this->id, $friend_id)->first()->status;
    }

    public function addFriend($friend_id)
    {
        if (!$this->hasRelation($friend_id)) {
            return Friendship::create(['user_id' => $this->id, 'friend_id' => $friend_id]);
        }

        return false;
    }

    public function hasFriendRequestFrom($friend_id)
    {
        // Is this user in a relation where he is a friend on 
        $friendship = Friendship::where(['user_id' => $friend_id, 'friend_id' => $this->id])->first();

        return  isset($friendship->status) && $friendship->status === "pending" ? $friendship : false;
    }

    public function acceptFriend($friend_id)
    {
        if ($friendship = $this->hasFriendRequestFrom($friend_id)) {
            return $friendship->update(['status' => 'friends']);
        }

        return false;
    }





    // /**
    //  * The function get the status between the auth as requester
    //  * And a friend as accepter
    //  * @param id of friend
    //  * @return status
    //  */
    // public function sendFriendshipStatus($friendId)
    // {
    //     return Friendship::where('user_id', $this->id)
    //                         ->where('friend_id', $friendId)
    //                         ->value('status');
    // }

    // public function addFriend($friendId)
    // {
    //     /** You only will create if there is no relation between the 2 users */
    //     $status = $this->sendFriendshipStatus($friendId);
    //     if (!$status) {
    //         return Friendship::create([
    //             'user_id' => $this->id,
    //             'friend_id' => $friendId,
    //             'status' => 'pending'
    //         ]);
    //     }

    //     return false;
    // }

    // /**
    //  * The function get the status between the (auth) as accepter
    //  * And a friend as requester
    //  * @param id of friend
    //  * @return status
    //  */
    // public function acceptFriendShipStatus ($friendId) {
    //     return Friendship::where('user_id', $friendId)
    //                 ->where('friend_id', $this->id)
    //                 ->value("status");
    // }

    // public function acceptFriend ($friendId) {
    //     // did You sent a request for that friend or have any relation with
    //     if ($this->sendFriendshipStatus($friendId)) {
    //         return "You can not accept request you sent";
    //     }
    //     /** You only accept a friend if you are in pending */
    //     if ($this->acceptFriendshipStatus($friendId) === 'pending') {
    //         return Friendship::where('user_id', $friendId)
    //                         ->where('friend_id', $this->id)
    //                         ->update(['status' => 'friends']);
    //     }

    //     return false;
    // } 
}
