<?php

namespace App\Http\Controllers;

use App\Services\RemotionService;
use Illuminate\Http\Request;

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

    public function render(Request $request)
    {
        try {
            $inputProps = array();

            if ($request->has('data')) {
                $inputProps = $request->input('data');
            }

            $jsonData = RemotionService::render($inputProps);
            return $this->sendResponse(json_decode($jsonData), 'Render Successful.');
        } catch (Exception $e) {
            return response()->json(array(
                "message" => $e->getMessage(),
            ), 500);
        }

    }
}
