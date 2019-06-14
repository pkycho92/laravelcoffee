<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLoginCorrect()
    {
        $this->json('POST', '/admin', ['username' => 'peter', 'password' => 'peter'])->
        assertSee('adminIndex');
    }
    public function testLoginIncorrect()
    {
        $this->json('POST', '/admin', ['username' => 'foo', 'password' => 'bar'])->
        assertDontSee('adminIndex');
    }
}
