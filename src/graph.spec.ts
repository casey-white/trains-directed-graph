import { Graph } from "./graph";
import { Vertex } from "./vertex";

const initGraph = () => {
  return new Graph();
};

test("Expect a fresh graph to have no vertex", () => {
  const graph = initGraph();
  expect(Object.values(graph.vertices).length).toBe(0);
});

test("Expect that no duplicate vertex name can be entered", () => {
  const graph = initGraph();
  graph.addVertex("A");
  try {
    expect(graph.addVertex("A")).toThrowError(
      `GraphError: Vertex A already exists on graph`
    );
  } catch (err) {
    expect(err.message).toBe("GraphError: Vertex A already exists on graph");
  }
});

test("Expect that parseRoute will add vertex on no existance", () => {
  const graph = initGraph();
  graph.parseRoute("AB5");
  expect(graph.doesVertexExist("A")).toBeTruthy();
  expect(graph.doesVertexExist("B")).toBeTruthy();
});

test("Expect that parseRoute start vertex will have an edge with end vertex", () => {
  const graph = initGraph();
  graph.parseRoute("AB5");
  const startVertex = graph.vertices["A"];
  expect(startVertex && startVertex.isConnectedTo("B")).toBeTruthy();
});
