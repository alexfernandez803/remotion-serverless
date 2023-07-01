import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
/* eslint-disable @typescript-eslint/require-await */
import { renderMediaOnLambda } from "@remotion/lambda/client";
import { COMP_NAME } from "./config";

export const handler = async function (
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    console.log(`event => renderMediaOnLambda`);
    const { renderId, bucketName } = await renderMediaOnLambda({
      region: "ap-southeast-2",
      functionName: "remotion-render-3-3-101-mem2048mb-disk2048mb-240sec",
      serveUrl:
        "https://remotionlambda-apsoutheast2-qv16gcf02l.s3.ap-southeast-2.amazonaws.com/sites/remotion-render-app-3.3.101/index.html",

      composition: COMP_NAME,
      inputProps: {},
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      privacy: "private",
      enableStreaming: true /* ,
      onProgress: (progress) => {
        console.log("data");
        console.log(progress);
      }, */,
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
