import { Request, Response, NextFunction } from "express";
import { CustomError } from "./authentication";

export const errorHandler = (
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Error handling middleware functionality
  console.log(`error ${error.message}`); // log the error
  const status = error.status || 400;
  response.setHeader("Content-Type", "application/json");
  // send back an easily understandable error message to the caller
  response
    .status(status)

    .send(
      JSON.stringify({
        message: error.message,
      })
    );
};
