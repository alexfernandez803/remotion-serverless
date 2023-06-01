<?php

function randomHash($options = ['randomInTests' => false]): string
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

function serializeInputProps($inputProps, string $region, string $type, ?string $userSpecifiedBucketName): array
{
    try {
        $payload = json_encode($inputProps);
        $hash = randomHash();

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

function assumeRole($region, $ARN, $sessionName)
{

    try {
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
    } catch (AwsException $e) {
        // Handle the exception
        echo $e->getMessage();
        return null;
    }
}
