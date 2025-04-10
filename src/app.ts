import express from "express";
import { connect as connectMongoose } from "./mongoose";
import polygonRouter from "./polygon/router";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import sleepMiddleware from "./middlewares/sleepMiddleware";
import { PORT } from "./constants";
import corsMiddleware from "./middlewares/corsMiddleware";

connectMongoose();
const app = express();
app.use(express.json());
app.use(sleepMiddleware);
app.use(corsMiddleware);

app.use("/polygon", polygonRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
