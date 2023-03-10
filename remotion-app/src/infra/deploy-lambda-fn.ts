import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
} from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { SITE_ID } from "./../config";
import { getAccountCount } from "./get-account-count";
import { usedRegions } from "./regions";
import { setEnvForKey } from "./set-env-for-key";
dotenv.config();

const count = getAccountCount();
console.log(`Found ${count} accounts. Deploying...`);

const REMOTION_COMPOSTION_PATH = "src/remotion/index.tsx";
const execute = async () => {
  for (let i = 1; i <= count; i++) {
    for (const region of usedRegions) {
      setEnvForKey(i);
      const { functionName, alreadyExisted } = await deployFunction({
        architecture: "arm64",
        createCloudWatchLogGroup: true,
        memorySizeInMb: 2048,
        timeoutInSeconds: 240,
        region,
      });
      console.log(
        `${
          alreadyExisted ? "Ensured" : "Deployed"
        } function "${functionName}" to ${region} in account ${i}`
      );
      const { bucketName } = await getOrCreateBucket({ region });
      const entryPoint = path.join(process.cwd(), REMOTION_COMPOSTION_PATH);
      console.log(`entryPoint ${entryPoint}`);
      const { serveUrl } = await deploySite({
        siteName: SITE_ID,
        bucketName,
        entryPoint,
        region,
      });
      console.log(
        `Deployed site to ${region} in account ${i} under ${serveUrl}`
      );
    }
  }
};

execute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
