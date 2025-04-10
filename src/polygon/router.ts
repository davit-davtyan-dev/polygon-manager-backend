import express from "express";
import { createPolygon, fetchPolygons } from "./service";

const polygonRouter = express.Router();

polygonRouter.post("/", async (req, res, next) => {
  try {
    const newPolygon = await createPolygon(req.body);

    res.send(newPolygon);
  } catch (err) {
    next(err);
  }
});

polygonRouter.get("/", async (req, res, next) => {
  try {
    const polygons = await fetchPolygons();

    res.send(polygons);
  } catch (err) {
    next(err);
  }
});

export default polygonRouter;
