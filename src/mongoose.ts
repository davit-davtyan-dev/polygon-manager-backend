import mongoose from "mongoose";
import { DB_URI } from "./constants";
import InterceptableError from "./interceptableError";

export async function connect() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to the DB");
  } catch (err) {
    console.error("Failed to connect to the DB");
    console.error(err);
  }
}

export function handleMongooseError(error: any) {
  if (error instanceof mongoose.Error.ValidationError) {
    const firstInvalidFieldError = Object.values(error.errors)[0];

    if (firstInvalidFieldError instanceof mongoose.Error.CastError) {
      throw new InterceptableError(
        415,
        `Invalid value type for ${firstInvalidFieldError.path}`
      );
    }

    throw new InterceptableError(422, firstInvalidFieldError.message);
  }

  throw error;
}
