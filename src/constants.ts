import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const SLEEP_MILLIS = Number(process.env.SLEEP_MILLIS || 5000);
