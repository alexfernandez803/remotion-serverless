<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class RenderController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        $jsonData = $response->json();

        return response()->json($jsonData);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function render()
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        $jsonData = $response->json();

        return response()->json($jsonData);
    }
}
