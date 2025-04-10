import mongoose from "mongoose";

export type Point = [number, number];

export type Polygon = {
  name: string;
  points: Array<Point>;
};

const PolygonSchema = new mongoose.Schema<Polygon>({
  name: { type: String, required: [true, "Please provide name"] },
  points: {
    type: [Number],
    validate: {
      validator: (value: Array<number>) => value.length === 2,
      message: () => "Points must be an array with 2 numbers",
    },
  },
});

export const PolygonModel = mongoose.model("Polygon", PolygonSchema);
