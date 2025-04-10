import express from "express";
import bodyParser from "body-parser";
import { connect as connectMongoose } from "./mongoose";
import polygonRouter from "./polygon/router";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import sleepMiddleware from "./middlewares/sleepMiddleware";
import { PORT } from "./constants";

connectMongoose();
const app = express();
app.use(bodyParser.json());
app.use(sleepMiddleware);

app.use("/polygon", polygonRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
