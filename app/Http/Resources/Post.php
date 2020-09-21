<?php

namespace App\Http\Resources;

use App\Models\Group;
use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'score' => $this->score,
            'link' => $this->link,
            'group' => Group::find($this->group_id)->name,
            'created' => $this->created_at,
        ];
    }
}
