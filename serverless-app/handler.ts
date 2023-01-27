import { Handler } from "aws-lambda";

export const render: Handler = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v0.1! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
