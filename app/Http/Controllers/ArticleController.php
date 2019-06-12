<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class ArticleController extends Controller
{

    public function index()
    {
        return Article::orderBy('position', 'ASC')->get();
     }


    public function store(Request $request)
    {
        Article::create($request->json->all());
        return response()->setStatusCode(201);
    }

    public function show($id)
    {
        return Article::find($id);
    }

    public function update($id, Request $request)
    {
        Article::save($request->json->all());
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        $article -> delete();
    }

}

