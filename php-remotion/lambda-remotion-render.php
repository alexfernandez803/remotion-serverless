<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/utils.php';

use Aws\Lambda\LambdaClient;

$region = 'ap-southeast-2';
$bucketName = "remotionlambda-apsoutheast2-qv16gcf02l";
$functionName = "remotion-render-3-3-78-mem2048mb-disk2048mb-240sec";
$serverUrl = "https://remotionlambda-apsoutheast2-qv16gcf02l.s3.ap-southeast-2.amazonaws.com/sites/remotion-render-app-3.3.78/index.html";

$client = LambdaClient::factory([
    'version' => 'latest',
    'region' => $region,
    // 'credentials' => [
    //     'key'    => 'YOUR_AWS_ACCESS_KEY_ID',
    //     'secret' => 'YOUR_AWS_SECRET_ACCESS_KEY',
    //  ]
]);

$data = array("data" => "");
$input = serializeInputProps(
    $data,
    $region,
    "video-or-audio",
    null
);
$params = array(
    "serveUrl" => $serverUrl,
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
    "forceBucketName" => $bucketName,
);

try {
    // Invoke the Lambda function
    $result = $client->invoke([
        'InvocationType' => 'RequestResponse',
        'FunctionName' => $functionName,
        'Payload' => json_encode($params),
    ]);

    $json_response = $result['Payload']->getContents();
    echo $json_response;
} catch (AwsException $e) {
    // Handle the exception
    echo $e->getMessage();
}
