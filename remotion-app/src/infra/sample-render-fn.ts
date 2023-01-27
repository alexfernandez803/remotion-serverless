import { getFunctions, renderMediaOnLambda } from "@remotion/lambda/client";
import { getRandomRegion } from "./regions";
import { COMP_NAME, SITE_ID } from "../config";
import dotenv from "dotenv";
import { getRandomAwsAccount } from "./get-random-aws-account";
import { setEnvForKey } from "./set-env-for-key";
dotenv.config();

const execute = async () => {
  try {
    const region = getRandomRegion();
    const account = getRandomAwsAccount();
    setEnvForKey(account);
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
      downloadBehavior: {
        type: "download",
        fileName: `sampleRender.mp4`,
      },
    });

    console.log(`RenderId=${renderId}, bucketName=${bucketName}`);
  } catch (err) {
    console.log("Error", err);
  }
};

execute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
