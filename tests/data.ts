export const singlePolygonData = {
  name: "P1",
  points: [
    [0, 0],
    [0, 30],
    [30, 0],
  ],
};

export const noData = {};
export const noPointsData = { name: "P2" };
export const emptyPointsData = { name: "P2", points: [] };
export const notEnoughPointsData = { name: "P2", points: [[0, 0]] };
export const invalidPointsData = { name: "P2", points: [[0, 0], [0], [1, 0]] };
export const notNumberPointsData = {
  name: "P2",
  points: [
    [0, 0],
    [0, "string"],
    [1, 0],
  ],
};
