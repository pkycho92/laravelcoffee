<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::post('/admin', 'LoginController@authenticate');

Route::get('/index', function () {
    return view('index');
});

Route::get('/error', function () {
    return view('errorPage');
});

Route::get('/admin', function () {
    return view('login');
});

Route::get('/logout', function () {
    return view('login');
});


Route::match(array('PATCH'), '/abouts/{id}', 'AboutController@update');

Route::match(array('PATCH'), '/articles/{id}', 'ArticleController@update');

Route::match(array('PATCH'), '/menuItems/{id}', 'MenuItemController@update');

Route::match(array('GET'), '/menuItems/types/{type}', 'MenuItemController@index');

Route::resource('articles', 'ArticleController');

Route::resource('abouts', 'AboutController');

Route::resource('menuItems', 'MenuItemController');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
