import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
