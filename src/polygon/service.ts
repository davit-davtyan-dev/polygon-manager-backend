import { Polygon, PolygonModel } from "./model";
import { handleMongooseError } from "../mongoose";

export async function createPolygon(polygon: Polygon) {
  try {
    const newPolygon = await PolygonModel.create(polygon);
    return newPolygon;
  } catch (err) {
    handleMongooseError(err);
  }
}

export async function fetchPolygons() {
  try {
    const polygons = await PolygonModel.find();
    return polygons;
  } catch (err) {
    handleMongooseError(err);
  }
}
