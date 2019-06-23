<?php

function makeResponse($data = null, $key = 'data', $validation = null, $code = 200, $headers = [])
{
    $successCodes = [200, 201, 202];

    return response()->json([
        "status" => in_array($code, $successCodes),
        "{$key}" => $data,
        "errors" => $validation
    ], $code, $headers);
}
