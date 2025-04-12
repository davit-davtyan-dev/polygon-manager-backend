import express from "express";
import polygonRouter from "./polygon/router";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import sleepMiddleware from "./middlewares/sleepMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";

const app = express();
app.use(express.json());
app.use(sleepMiddleware);
app.use(corsMiddleware);

app.use("/polygon", polygonRouter);

app.use(errorHandler);

export default app;
