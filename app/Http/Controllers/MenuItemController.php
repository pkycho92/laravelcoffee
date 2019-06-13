<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;

class MenuItemController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($type)
    {

        return MenuItem::orderBy('position', 'ASC')->get()->filter(function ($item) use ($type){

            return ($item->type == $type) ? true : false;
        });
    }

    public function store(Request $request)
    {
        MenuItem::create($request->json()->all());
    }

    public function show($id)
    {
        return MenuItem::find($id);
    }

    public function update($id, Request $request)
    {
        $menuItem = MenuItem::find($id);
        $menuItem->position = $request->position;
        $menuItem->save();
    }

    public function destroy($id)
    {
        $menuItem = MenuItem::find($id);
        $menuItem -> delete();
    }

}

