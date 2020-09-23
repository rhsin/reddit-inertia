<?php

namespace App\Http\Controllers;

use App\Http\Resources\Group as GroupResource;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GroupResource::collection(Group::all()->sortByDesc('size'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('user', Group::class);
        $validatedData = $request->validate([
            'name' => ['required', 'unique:groups', 'min:3'],
            'size' => ['integer']
        ]);
        $group = Group::create($validatedData);
        return response($group->id, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        $group = Group::find($id);
        $this->authorize('user', $group);
        $validatedData = $request->validate([
            'name' => ['required', 'unique:groups', 'min:3'],
            'size' => ['integer', 'max:6']
        ]);
        $group->update($validatedData);
        return response('Updated!', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::find($id);
        $this->authorize('user', $group);
        $group->delete();
        return response('Deleted!', 204);
    }
}
