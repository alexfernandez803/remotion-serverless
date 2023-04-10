<?php

namespace App\Http\Controllers;

use App\Services\RemotionService;
use Illuminate\Http\Request;

class RenderController extends BaseController
{

    public function index()
    {
        return $this->sendResponse(array(), 'Hello!');
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
            return $this->sendError($e->getMessage(), [], 500);
        }

    }
}
