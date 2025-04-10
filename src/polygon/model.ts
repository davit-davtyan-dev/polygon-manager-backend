import mongoose from "mongoose";

export type Point = [number, number];

export type Polygon = {
  name: string;
  points: Array<Point>;
};

const PolygonSchema = new mongoose.Schema<Polygon>({
  name: { type: String, required: [true, "Please provide name"] },
  points: {
    type: [[Number]],
    validate: {
      validator: (value: Array<Array<number>>) =>
        value.length >= 3 &&
        value.every((point) => Array.isArray(point) && point.length === 2),
      message: (props) => {
        const value = props.value as Array<Array<number>>;
        if (value.length < 3) {
          return "Please provide at least 3 points";
        }

        if (
          value.some((point) => !Array.isArray(point) || point.length !== 2)
        ) {
          return "Each point must be an array with 2 numbers";
        }

        return "Please provide valid points";
      },
    },
  },
});

export const PolygonModel = mongoose.model("Polygon", PolygonSchema);
