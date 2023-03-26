import { getFunctions, renderMediaOnLambda } from "@remotion/lambda/client";
import { COMP_NAME, SITE_ID } from "../config";
import { getRandomRegion } from "../utils/regions";
import { AssumeRoleCommand } from "@aws-sdk/client-sts";
import { client } from "../libs/stsclient";
import config from "../config";
export const render = async () => {
  // Returns a set of temporary security credentials that you can use to
  // access Amazon Web Services resources that you might not normally
  // have access to.
  const command = new AssumeRoleCommand({
    // The Amazon Resource Name (ARN) of the role to assume.
    RoleArn: config.remotionRoleArn,
    // An identifier for the assumed role session.
    RoleSessionName: config.remotionRoleSession,
    // The duration, in seconds, of the role session. The value specified
    // can range from 900 seconds (15 minutes) up to the maximum session
    // duration set for the role.
    DurationSeconds: 900,
  });
  const response = await client.send(command);

  process.env["AWS_ACCESS_KEY_ID"] = response.Credentials?.AccessKeyId ?? "";
  process.env["AWS_SECRET_ACCESS_KEY"] =
    response.Credentials?.SecretAccessKey ?? "";
  process.env["AWS_SESSION_TOKEN"] = response.Credentials?.SessionToken ?? "";

  const region = getRandomRegion();
  const [first] = await getFunctions({
    compatibleOnly: true,
    region,
  });

  return await renderMediaOnLambda({
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
};
