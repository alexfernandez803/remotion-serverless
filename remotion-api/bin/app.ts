import * as cdk from "aws-cdk-lib";
import { ApiGatewayStack } from "../lib/api-gateway-stack";

const app = new cdk.App();
new ApiGatewayStack(app, "ApiGatewayStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
