<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/utils.php';

use Aws\Lambda\LambdaClient;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$region = $_ENV['REMOTION_APP_REGION'];
$bucketName = $_ENV['REMOTION_APP_BUCKET'];
$functionName = $_ENV['REMOTION_APP_FUNCTION_NAME'];
$serveUrl = $_ENV["REMOTION_APP_SERVE_URL"];

$credential = null;

if ($_ENV["REMOTION_APP_IS_ASSUME_ROLE"] === true) {
    $credential = assumeRole($_ENV["REMOTION_APP_REGION"],
        $_ENV["REMOTION_APP_ROLE_ARN"], $_ENV["REMOTION_APP_ROLE_SESSION_NAME"]);
}

$client = LambdaClient::factory([
    'version' => 'latest',
    'region' => $region,
    'credentials' => $credential,
]);

$data = array("data" => "");
$input = serializeInputProps(
    $data,
    $region,
    "video-or-audio",
    null
);
$params = array(
    "serveUrl" => $serveUrl,
    "inputProps" => $input,
    "composition" => "main",
    "type" => "start",
    "codec" => "h264",
    "version" => "4.0.18",
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
