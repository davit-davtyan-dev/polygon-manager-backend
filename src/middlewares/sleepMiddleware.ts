import { SLEEP_MILLIS } from "../constants";
import type { NextFunction, Request, Response } from "express";

export default function sleepMiddleware(
  _req: Request,
  _res: Response,
  next: NextFunction
) {
  setTimeout(next, SLEEP_MILLIS);
}
