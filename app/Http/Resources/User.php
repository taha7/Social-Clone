<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $sendStatus = count($this->senders) ? $this->senders[0]->status : null;
        $friendStatus = count($this->friends) ? $this->friends[0]->status : null;


        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'sendStatus' => $sendStatus ?: null,
            'recieveStatus' => $friendStatus ?: null,
        ];
    }
}
