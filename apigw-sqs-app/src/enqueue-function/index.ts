/* eslint-disable @typescript-eslint/require-await */
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

export async function main(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  console.log("Enqueue function..");

  return {
    body: JSON.stringify({ isSuccess: true }),
    statusCode: 200,
  };
}
