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
        Article::create($request->json()->all());
    }

    public function show($id)
    {
        return Article::find($id);
    }

    public function update($id, Request $request)
    {
        $article = Article::find($id);
        $article->position = $request->position;
        $article->save();
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        $article -> delete();
    }

}

