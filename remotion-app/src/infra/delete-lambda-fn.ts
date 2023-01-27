import { deleteFunction, getFunctions } from "@remotion/lambda";
import dotenv from "dotenv";
import { getAccountCount } from "./get-account-count";
import { usedRegions } from "./regions";
import { setEnvForKey } from "./set-env-for-key";
dotenv.config();

const count = getAccountCount();
console.log(`Found ${count} accounts. Deploying...`);

const deleteFn = async () => {
  for (let i = 1; i <= count; i++) {
    for (const region of usedRegions) {
      setEnvForKey(i);

      const functions = await getFunctions({
        region,
        compatibleOnly: false,
      });

      for (const fn of functions) {
        console.log(`Deleting ${fn.functionName}`);
        await deleteFunction({
          region,
          functionName: fn.functionName,
        });
        console.log(`Deleted ${fn.functionName}`);
      }
    }
  }
};

deleteFn()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
