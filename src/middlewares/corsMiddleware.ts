import cors from "cors";
import { ORIGIN_WHITELIST } from "../constants";
import InterceptableError from "../interceptableError";

const corsMiddleware = cors({
  origin: (origin, callback) => {
    console.log(origin, "origin");
    if (ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new InterceptableError(500, `Not allowed by CORS origin: ${origin}`)
      );
    }
  },
});

export default corsMiddleware;
