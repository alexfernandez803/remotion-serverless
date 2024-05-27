<?php

namespace App\Services;

use Aws\Lambda\LambdaClient;
use Illuminate\Support\Facades\Facade;

class RemotionService extends Facade
{
    public static function render($inputProps)
    {
        $instance = new self();
        return $instance->renderOps($inputProps);
    }

    public function renderOps($inputProps = array())
    {

        $region = env("REMOTION_APP_REGION");
        $bucketName = env("REMOTION_APP_BUCKET");
        $functionName = env("REMOTION_APP_FUNCTION_NAME");
        $serveUrl = env("REMOTION_APP_SERVE_URL");

        $credential = null;

        if (env("REMOTION_APP_IS_ASSUME_ROLE", false) === true) {
            $credential = $this->assumeRole(env("REMOTION_APP_REGION"),
                env("REMOTION_APP_ROLE_ARN"), env("REMOTION_APP_ROLE_SESSION_NAME"));
        }

        $client = LambdaClient::factory([
            'version' => 'latest',
            'region' => $region,
            'credentials' => $credential,
        ]);
        $input = $this->serializeInputProps(
            $inputProps,
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
            "version" => "4.0.164",
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
            return $json_response;
        } catch (AwsException $e) {
            return $e;
        }

    }

    private function randomHash($options = ['randomInTests' => false]): string
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Added the alphabet string to use in generating the random hash
        $length = 10; // Changed the length of the hash to a variable that can be modified

        if ($options['randomInTests']) {
            srand(1234); // Added srand() function to initialize the random number generator to produce the same sequence of numbers every time for testing purposes.
        }

        return join('', array_map(function () use ($alphabet) { // Added "use" keyword to access the $alphabet variable within the anonymous function
            return $alphabet[rand(0, strlen($alphabet) - 1)];
        }, array_fill(0, $length, 1)));
    }

    public function serializeInputProps($inputProps, string $region, string $type, ?string $userSpecifiedBucketName): array
    {
        try {
            $payload = json_encode($inputProps);
            $hash = $this->randomHash();

            $MAX_INLINE_PAYLOAD_SIZE = $type === 'still' ? 5000000 : 200000;

            if (strlen($payload) > $MAX_INLINE_PAYLOAD_SIZE) {

                throw new Exception(
                    sprintf(
                        "Warning: inputProps are over %dKB (%dKB) in size.\n This is not currently supported.",
                        round($MAX_INLINE_PAYLOAD_SIZE / 1000),
                        ceil(strlen($payload) / 1024)
                    )

                );

            }

            return [
                'type' => 'payload',
                'payload' => $payload,
            ];
        } catch (Exception $e) {
            throw new Exception(
                'Error serializing inputProps. Check it has no circular references or reduce the size if the object is big.'
            );
        }
    }

    public function assumeRole($region = 'ap-southeast-2', $ARN, $sessionName)
    {
        $stsClient = new Aws\Sts\StsClient([
            'region' => $region,
            'version' => 'latest',
        ]);

        $result = $stsClient->AssumeRole([
            'RoleArn' => $ARN,
            'RoleSessionName' => $sessionName,
        ]);

        return [
            'key' => $result['Credentials']['AccessKeyId'],
            'secret' => $result['Credentials']['SecretAccessKey'],
            'token' => $result['Credentials']['SessionToken'],
        ];
    }

}
