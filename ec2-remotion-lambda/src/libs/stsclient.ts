import { STSClient } from "@aws-sdk/client-sts";
// Set the AWS Region.
const REGION = "ap-southeast-2";
// Create an AWS STS service client object.
export const client = new STSClient({ region: REGION });
