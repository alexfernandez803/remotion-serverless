<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/utils.php';

use Aws\Lambda\LambdaClient;
$region = 'ap-southeast-2';

$client = LambdaClient::factory([
    'version' => 'latest',
    'region' => 'ap-southeast-2',
]);

$data = array("data" => "yeas");
$input = serializeInputProps(
    $data,
    $region,
    "video-or-audio",
    null
);
$params = array(
    "serveUrl" => "https://remotionlambda-apsoutheast2-qv16gcf02l.s3.ap-southeast-2.amazonaws.com/sites/remotion-render-app-3.3.78/index.html",
    "inputProps" => $input,
    "composition" => "main",
    "type" => "start",
    "codec" => "h264",
    "version" => "3.3.78",
    "codec" => "h264",
    "imageFormat" => "jpeg",
    "crf" => 1,
    "envVariables" => array(),
    "quality" => 80,
    "maxRetries" => 1,
    "privacy" => 'public',
    "logLevel" => 'info',
    "frameRange" => null,
    "outName" => null,
    "timeoutInMilliseconds" => 30000,
    "chromiumOptions" => array(),
    "scale" => 1,
    "everyNthFrame" => 1,
    "numberOfGifLoops" => 0,
    "concurrencyPerLambda" => 1,
    "downloadBehavior" => array(
        "type" => "play-in-browser",
    ),
    "muted" => false,
    "overwrite" => false,
    "audioBitrate" => null,
    "videoBitrate" => null,
    "webhook" => null,
    "forceHeight" => null,
    "forceWidth" => null,
    "bucketName" => null,
    "audioCodec" => null,
    "forceBucketName" => "remotionlambda-apsoutheast2-qv16gcf02l",
);

$result = $client->invoke([
    'InvocationType' => 'RequestResponse',
    'FunctionName' => 'remotion-render-3-3-78-mem2048mb-disk2048mb-240sec',
    'Payload' => json_encode($params),

]);

var_dump($result);
