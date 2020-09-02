import { Vertex } from "./vertex";

const setUpCleanVertex = (name: string) => {
  return new Vertex(name);
};

test("Expect Vertex to be empty without parameter edges", () => {
  const vertex = setUpCleanVertex("A");
  expect(vertex.edges.length).toBe(0);
});

test("Expect adjacent to exist on addAdjacent", async () => {
  const vertex = setUpCleanVertex("A");
  const secondVertexName = "B";
  vertex.addAdjacent(secondVertexName, 5);
  expect(vertex.isConnectedTo(secondVertexName)).toBeTruthy();
});

test("Expect shortestPath to be infinity if no route exists", () => {
  const vertex = setUpCleanVertex("A");
  const secondVertexName = "B";
  expect(vertex.findShortestPathWeight("B")).toBe(Infinity);
});

test("Expect shortestPath to be least weight if multiple paths exist", () => {
  const vertex = setUpCleanVertex("A");
  const secondVertexName = "B";
  vertex.addAdjacent(secondVertexName, 7);
  vertex.addAdjacent(secondVertexName, 5);
  vertex.addAdjacent(secondVertexName, 6);
  expect(vertex.findShortestPathWeight("B")).toBe(5);
});
