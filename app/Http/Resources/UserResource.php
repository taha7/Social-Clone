<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $sendFriendship = $this->senders->where('friend_id', auth()->id())->first();
        $reciveFriendship = $this->friends->where('user_id', auth()->id())->first();
        $sendStatus =  $sendFriendship ? $sendFriendship->status : null;
        $recieveStatus =  $reciveFriendship ? $reciveFriendship->status : null;


        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'sendStatus' => $sendStatus ?: null,
            'recieveStatus' => $recieveStatus ?: null,
        ];
    }
}
