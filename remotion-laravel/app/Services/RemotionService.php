<?php

namespace App\Services;

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Http;

class RemotionService extends Facade
{
    public static function render()
    {

        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        if ($response->ok()) {
            return $response->json();
        }

        return null;
    }
}
