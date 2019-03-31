<?php
namespace App\Traits;

use App\Friendship;



trait FriendshipTrait {

    /**
     * The function get the status between the auth as requester
     * And a friend as accepter
     * @param id of friend
     * @return status
     */
    public function sendFriendshipStatus($friendId)
    {
        return Friendship::where('user_id', $this->id)
                            ->where('friend_id', $friendId)
                            ->value('status');
    }

    public function addFriend($friendId)
    {
        /** You only will create if there is no relation between the 2 users */
        $status = $this->sendFriendshipStatus($friendId);
        if (!$status) {
            return Friendship::create([
                'user_id' => $this->id,
                'friend_id' => $friendId,
                'status' => 'pending'
            ]);
        }

        return false;
    }

    /**
     * The function get the status between the (auth) as accepter
     * And a friend as requester
     * @param id of friend
     * @return status
     */
    public function acceptFriendShipStatus ($friendId) {
        return Friendship::where('user_id', $friendId)
                    ->where('friend_id', $this->id)
                    ->value("status");
    }

    public function acceptFriend ($friendId) {
        // did You sent a request for that friend or have any relation with
        if ($this->sendFriendshipStatus($friendId)) {
            return "You can not accept request you sent";
        }
        /** You only accept a friend if you are in pending */
        if ($this->acceptFriendshipStatus($friendId) === 'pending') {
            return Friendship::where('user_id', $friendId)
                            ->where('friend_id', $this->id)
                            ->update(['status' => 'friends']);
        }

        return false;
    }
}