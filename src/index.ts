import { Vertex } from "./vertex";
import { Graph } from "./graph";
import fs from "fs";

const file = fs
  .readFileSync("./graph.txt", "utf8")
  .split(/[\r\n]+/)
  .filter((line: string) => {
    return line;
  });

const initGraph = (edges: string[]) => {
  const graph = new Graph();
  return edges.reduce<Graph>((graphState: Graph, newRoute: string) => {
    graphState.parseRoute(newRoute);
    return graphState;
  }, graph);
};

const graphRoute = file[0].split(", ");
let args = [...file.slice(1)];
const graph = initGraph(graphRoute);

args.forEach((arg) => {
  console.log(graph.findWalkWeight(arg));
});
