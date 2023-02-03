/* eslint-disable @typescript-eslint/require-await */
import { getFunctions, renderMediaOnLambda } from "@remotion/lambda/client";
import { Handler } from "aws-lambda";
import { COMP_NAME, SITE_ID } from "../config";
import { getRandomRegion } from "../utils/regions";

export const main: Handler = async (event: any) => {
  console.log("Inside Render woop woop");

  const data = event.body;

  console.log(data);
  try {
    const region = getRandomRegion();
    const [first] = await getFunctions({
      compatibleOnly: true,
      region,
    });
    const { renderId, bucketName } = await renderMediaOnLambda({
      region: region,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: COMP_NAME,
      inputProps: {},
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      privacy: "private",
    });

    console.log(`RenderId=${renderId}, bucketName=${bucketName}`);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Video sent for rendering.",
          renderId,
          bucketName,
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
