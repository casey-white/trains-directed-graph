import { Graph } from "./graph";

const graphInputs = [
  "AB5",
  "BC4",
  "CD8",
  "DC8",
  "DE6",
  "AD5",
  "CE2",
  "EB3",
  "AE7",
];

const initGraph = () => {
  const graph = new Graph();
  return graphInputs.reduce<Graph>((graphState: Graph, newRoute: string) => {
    graphState.parseRoute(newRoute);
    return graphState;
  }, graph);
};

test("Expect the following routes to exist", () => {
  const graph = initGraph();
  graphInputs.forEach((route: string) => {
    const [start, end, weight] = route;

    expect(graph.doesRouteExist(start, end)).toBeTruthy();
    expect(graph.findPathWeight(start, end)).toBe(parseInt(weight, 10));
  });
});

/** TEST CASES */

test("The distance of the route A-B-C should be weight 9", () => {
  const graph = initGraph();
  expect(graph.findWalkWeight("ABC")).toBe(9);
});

test("The distance of the route A-D should be weight 5", () => {
  const graph = initGraph();
  expect(graph.findWalkWeight("AD")).toBe(5);
});

test("The distance of the route A-D-C should be weight 13", () => {
  const graph = initGraph();
  expect(graph.findWalkWeight("ADC")).toBe(13);
});

test("The distance of the route A-E-B-C-D should be weight 22", () => {
  const graph = initGraph();
  expect(graph.findWalkWeight("AEBCD")).toBe(22);
});

test("The distance of the route A-E-D should not exist", () => {
  const graph = initGraph();
  expect(graph.findWalkWeight("AED")).toBe("NO SUCH ROUTE");
});

test("The number of trips starting at C and ending at C with a maximum of 3 stops.", () => {
  const graph = initGraph();
  expect(graph.findAllPaths("C", "C", 3).length).toBe(2);
});

test("The number of trips starting at A and ending at C with a exactly 4 stops.", () => {
  const graph = initGraph();

  expect(graph.findAllPaths("A", "C", 4, true).length).toBe(3);
});

test("The length of the shortest route (in terms of distance to travel) from A to C.", () => {
  const graph = initGraph();
  // slight assumption here that no path with more than 10 steps will be the smallest
  expect(
    Math.min(...graph.findAllPaths("A", "C", 10).map((path) => path.weight))
  ).toBe(9);
});

test("The length of the shortest route (in terms of distance to travel) from B to B.", () => {
  const graph = initGraph();
  // slight assumption here that no path with more than 10 steps will be the smallest
  expect(
    Math.min(...graph.findAllPaths("B", "B", 10).map((path) => path.weight))
  ).toBe(9);
});

test("The number of different routes from C to C with a distance of less than 30.", () => {
  const graph = initGraph();

  // slight assumption here that no path with more than 10 steps will be the smallest
  expect(
    graph.findAllPaths("C", "C", 10).filter((path) => path.weight < 30).length
  ).toBe(7);
});
