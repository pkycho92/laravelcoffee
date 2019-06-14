<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DBIntegrationTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testPost()
    {
        $article = new Article();
        $article->fill([
            'decription' => 'test',
            'image' => 'test',
            'name' => 'test',
            'position' => 4
        ]);
        $id = $article->save();
        $this->assertNotEmpty($id);
    }
    public function testDelete()
    {
        $article = Article::where('image','test');
        $res = $article->delete();
        $this->assertEquals($res,1);
    }
}
