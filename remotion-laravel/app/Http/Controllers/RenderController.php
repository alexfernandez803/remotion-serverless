<?php

namespace App\Http\Controllers;

use App\Services\RemotionService;

class RenderController extends BaseController
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

    public function render()
    {
        try {
            $inputProps = array();

            if ($request->has('data')) {
                $inputProps = $request->input('data');
            }

            $jsonData = RemotionService::render($inputProps);
            return response()->json(json_decode($jsonData), 200);
        } catch (Exception $e) {
            return response()->json(array(
                "message" => $e->getMessage(),
            ), 500);
        }

    }
}
