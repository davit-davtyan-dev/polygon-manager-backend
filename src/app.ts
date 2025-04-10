import express from "express";
import bodyParser from "body-parser";
import { connect as connectMongoose } from "./mongoose";
import polygonRouter from "./polygon/router";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import { PORT } from "./constants";

connectMongoose();
const app = express();
app.use(bodyParser.json());

app.use("/polygon", polygonRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
