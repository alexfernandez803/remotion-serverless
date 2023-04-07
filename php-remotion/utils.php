<?php

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
