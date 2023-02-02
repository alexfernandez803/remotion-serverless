/* eslint-disable @typescript-eslint/require-await */
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "ap-southeast-2" });

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

const REMOTION_QUEUE_URL = process.env.REMOTION_QUEUE_URL;

export async function main(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  console.log("Enqueue function..");

  if (event.body) {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {},
      MessageBody: event.body,
      QueueUrl: REMOTION_QUEUE_URL,
    };

    try {
      const data = await sqsClient.send(new SendMessageCommand(params));
      if (data) {
        console.log("Success, message sent. MessageID:", data.MessageId);
        const message =
          "Message Send to SQS- Here is MessageId: " + data.MessageId;
        return {
          statusCode: 200,
          body: JSON.stringify({
            message,
          }),
        };
      } else {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Some error occured !!" }),
        };
      }
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid request" }),
  };
}
