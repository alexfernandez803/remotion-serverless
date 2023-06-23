import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class ApiGatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,

    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const apiLambda = new lambdaNodejs.NodejsFunction(
      this,
      "awesome-api-lambda",
      {
        entry: "./src/api-lambda.ts",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_18_X,
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
        },
        bundling: {
          nodeModules: ["remotion", "@remotion/lambda"],
        },
      }
    );

    const awesomeApi = new apigw.RestApi(this, "awesome-api", {
      endpointTypes: [apigw.EndpointType.REGIONAL],
      deploy: true,
      deployOptions: {
        stageName: "prod",
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    // PATH => /awesomeapi
    const awesomeApiResource = awesomeApi.root.addResource("remotion-api");
    awesomeApiResource.addMethod(
      "GET",
      new apigw.LambdaIntegration(apiLambda),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
        //  authorizer: authorizer,
        //authorizationType: apigw.AuthorizationType.CUSTOM,
      }
    );
  }
}
