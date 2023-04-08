<?php

namespace App\Http\Controllers;

use App\Services\RemotionService;

class RenderController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {

        return response()->json(array(
            "message" => "Hello!",
        ));
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function render()
    {
        try {
            $jsonData = RemotionService::render();
            return response()->json(json_decode($jsonData), 200);
        } catch (Exception $e) {
            return response()->json(array(
                "message" => $e->getMessage(),
            ), 500);
        }

    }
}
