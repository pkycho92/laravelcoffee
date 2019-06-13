<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\About;

class AboutController extends Controller
{

    public function index()
    {
        return About::orderBy('position', 'ASC')->get();
     }


    public function store(Request $request)
    {
        About::create($request->json()->all());
    }

    public function show($id)
    {
        return About::find($id);
    }

    public function update($id, Request $request)
    {
        $about = About::find($id);
        $about->position = $request->position;
        $about->save();
    }

    public function destroy($id)
    {
        $about = About::find($id);
        $about -> delete();
    }

}