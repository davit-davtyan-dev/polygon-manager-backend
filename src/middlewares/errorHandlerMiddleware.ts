import InterceptableError from "../interceptableError";
import { IS_DEVELOPMENT } from "../constants";

import type { NextFunction, Request, Response } from "express";
import type { RouteParameters } from "express-serve-static-core";

export default function errorHandlerMiddleware<
  R extends string,
  P = RouteParameters<R>
>(err: any, _req: Request<P>, res: Response, _next: NextFunction) {
  const error: {
    statusCode: number;
    message: string;
    actualError?: any;
  } = {
    statusCode: 500,
    message: "An unexpected error occurred",
  };

  if (err instanceof InterceptableError) {
    error.statusCode = err.statusCode;
    error.message = err.message;
  } else if (IS_DEVELOPMENT) {
    error.actualError = err;
  }

  res.status(err.statusCode).json(error);
}
