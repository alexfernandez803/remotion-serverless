import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  status: number | undefined;
  constructor(message: string) {
    super(message);
  }
}

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    var err = new CustomError("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");

    err.status = 401;
    return next(err);
  }

  var auth = Buffer.from(authheader.split(" ")[1], "base64")
    .toString("ascii")
    .split(":");
  var user = auth[0];
  var pass = auth[1];

  if (user == process.env.API_USERNAME && pass == process.env.API_PASSWORD) {
    // If Authorized user
    next();
  } else {
    var err = new CustomError("You are not authorized!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }
}
