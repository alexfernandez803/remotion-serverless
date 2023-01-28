import { getFunctions } from "@remotion/lambda/client";
import { Handler } from "aws-lambda";
import { getRandomRegion } from "./utils/regions";
import { getRenderProgress } from "@remotion/lambda/client";
import { getFinality } from "./utils/progress";
import { presignUrl } from "@remotion/lambda";

export const progress: Handler = async (event: any) => {
  try {
    const renderId = event.pathParameters.renderId;
    const bucketName = event.queryStringParameters.bucketName;

    const region = getRandomRegion();
    const [first] = await getFunctions({
      compatibleOnly: true,
      region,
    });

    const progress = await getRenderProgress({
      renderId,
      bucketName,
      functionName: first.functionName,
      region,
    });

    const finality = getFinality(progress);

    let mediaUrl = null;
    if (finality?.type === "success") {
      mediaUrl = await presignUrl({
        region,
        bucketName: progress.outBucket ?? "",
        objectKey: progress.outKey ?? "",
        expiresInSeconds: 900,
        checkIfObjectExists: true,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Render found.",
          renderId,
          bucketName,
          finality,
          mediaUrl,
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: err,
        },
        null,
        2
      ),
    };
  }
};
