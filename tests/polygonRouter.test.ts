import request from "supertest";
import app from "../src/app";
import { connectTestDb } from "./mongoose";
import {
  singlePolygonData,
  noData,
  noPointsData,
  emptyPointsData,
  notEnoughPointsData,
  invalidPointsData,
  notNumberPointsData,
} from "./data";

describe("Polygon router", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  test("GET /polygon should return an empty array in the beginning", async () => {
    const response = await request(app).get("/polygon");
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject([]);
  });

  test("POST /polygon should create and return a polygon", async () => {
    const response = await request(app)
      .post("/polygon")
      .send(singlePolygonData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body?._id).toBeTruthy();
    expect(response.body?.name).toBe(singlePolygonData.name);
    expect(response.body?.points).toMatchObject(singlePolygonData.points);
  });

  test("GET /polygon should return new created polygon", async () => {
    const response = await request(app).get("/polygon");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(singlePolygonData.name);
  });

  test("POST /polygon creation should fail bacause of no data", async () => {
    const response = await request(app)
      .post("/polygon")
      .send(noData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(422);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe("Please provide name");
  });

  test("POST /polygon creation should fail bacause of missing points data", async () => {
    const response1 = await request(app)
      .post("/polygon")
      .send(noPointsData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const response2 = await request(app)
      .post("/polygon")
      .send(emptyPointsData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    const response3 = await request(app)
      .post("/polygon")
      .send(notEnoughPointsData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response1.statusCode).toBe(422);
    expect(response1.error).toBeTruthy();
    expect(response1.body.message).toBe("Please provide at least 3 points");
    expect(response2.statusCode).toBe(422);
    expect(response2.error).toBeTruthy();
    expect(response2.body.message).toBe("Please provide at least 3 points");
    expect(response3.statusCode).toBe(422);
    expect(response3.error).toBeTruthy();
    expect(response3.body.message).toBe("Please provide at least 3 points");
  });

  test("POST /polygon creation should fail bacause of invalid points data", async () => {
    const response = await request(app)
      .post("/polygon")
      .send(invalidPointsData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(422);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe(
      "Each point must be an array with 2 numbers"
    );
  });

  test("POST /polygon creation should fail bacause of invalid type points data", async () => {
    const response = await request(app)
      .post("/polygon")
      .send(notNumberPointsData)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(415);
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe("Invalid value type for points.1");
  });

  test("DELETE /polygon should remove the single polygon", async () => {
    const polygonsReponse = await request(app).get("/polygon");
    const polygons = polygonsReponse.body;

    expect(polygonsReponse.statusCode).toBe(200);
    expect(polygons.length).toBe(1);
    const polygonToDelete = polygons[0];

    const deleteResponse = await request(app).delete(
      `/polygon/${polygonToDelete._id}`
    );
    expect(deleteResponse.statusCode).toBe(200);

    const polygonsReponseAfterDelete = await request(app).get("/polygon");
    expect(polygonsReponseAfterDelete.statusCode).toBe(200);
    expect(polygonsReponseAfterDelete.body.length).toBe(0);
  });
});
