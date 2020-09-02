import { Vertex } from "./vertex";

export class Graph {
  public vertices: { [key: string]: Vertex };

  constructor() {
    this.vertices = {};
  }

  /**
   * Ensure that vertex exists withing the graph
   * @param name - the key of the given graph
   */
  public doesVertexExist(name: string): boolean {
    return !!this.vertices[name];
  }

  /**
   * Check if vertex does not exists, then add vertex. Else throw error
   * @param name - the key of the given graph
   */
  public addVertex(name: string): void {
    const vertexExists = this.doesVertexExist(name);
    if (vertexExists) {
      throw new Error(`GraphError: Vertex ${name} already exists on graph`);
    }
    this.vertices[name] = new Vertex(name);
  }

  /**
   * Parse a route of the given format "NameNameWeight"
   * @param route - string representation of a route
   */
  public parseRoute(route: string): void {
    const [start, end, weight] = route;

    let startVertexExists = this.doesVertexExist(start);
    const endVertexExists = this.doesVertexExist(end);

    if (!startVertexExists) {
      this.addVertex(start);
    }

    const startVertex = this.vertices[start];

    if (!endVertexExists) {
      this.addVertex(end);
    }

    // I don't like this if statement, but mismatched node versions
    // lead to an error with testing
    startVertex && startVertex.addAdjacent(end, parseInt(weight, 10));
  }

  /**
   * Alias for Vertex.isConnectedTo
   * @param start - the starting vertex
   * @param end - the ending vertex
   */
  public doesRouteExist(start: string, end: string): boolean {
    return this.vertices[start].isConnectedTo(end);
  }

  /**
   * Alias for Vertex.findShortestPathWeight
   * @param start - the starting vertex
   * @param end - the ending vertex
   */
  public findPathWeight(start: string, end: string): number {
    return this.vertices[start].findShortestPathWeight(end);
  }

  /**
   * Finds the magnitude of the walk of the input route.
   * @param path - A string representation of the route where each character is a stop
   */
  public findWalkWeight(path: string): number | "NO SUCH ROUTE" {
    const pathArray = [...path];
    let pathMagnitude = 0;

    for (let i = 0; i < pathArray.length - 1; i++) {
      const [start, end] = [pathArray[i], pathArray[i + 1]];

      if (!this.doesVertexExist(start)) {
        throw new Error(`GraphError: Vertex ${start} does not exist on graph`);
      }

      if (!this.doesRouteExist(start, end)) {
        return "NO SUCH ROUTE";
      }

      pathMagnitude += this.findPathWeight(start, end);
    }

    return pathMagnitude;
  }

  /**
   * Public method to run a recursive DFS variant algorithm to find paths and there weights
   * @param start - the node we are starting on
   * @param goal - the node we want to finish with
   * @param numSteps - the max number of steps
   * @param strict - whether we want to track paths with just the max number of steps
   */
  public findAllPaths(
    start: string,
    goal: string,
    numSteps: number,
    strict: boolean = false
  ) {
    const paths: { weight: number; path: string[] }[] = [];
    let weight = 0;
    let steps = 1;

    const stack = [...this.vertices[start].edges];

    while (stack.length > 0) {
      const nextNode = stack.pop();
      if (nextNode) {
        weight += nextNode.weight;
        this._findAllPaths(
          nextNode.end,
          goal,
          steps,
          numSteps,
          paths,
          [start],
          nextNode.weight,
          strict
        );
      }
    }

    return paths;
  }

  /**
   * Private method to run a recursive DFS variant algorithm to find paths and there weights
   * @param start - the current node
   * @param goal - the node that we want to get to
   * @param steps - the current amount of steps used
   * @param numSteps - the max number of steps available
   * @param paths - the paths variable which holds references from other branches
   * @param currentPath - the current branches path
   * @param weight - the current branches weight
   * @param strict - whether we want to track paths with just the max number of steps
   */
  private _findAllPaths(
    start: string,
    goal: string,
    steps: number,
    numSteps: number,
    paths: { weight: number; path: string[] }[],
    currentPath: string[],
    weight: number,
    strict: boolean
  ): void {
    currentPath = [...currentPath, start];
    if (steps <= numSteps) {
      if (start === goal) {
        if (strict && steps === numSteps) {
          paths.push({ path: currentPath, weight });
        } else if (!strict && steps <= numSteps) {
          paths.push({ path: currentPath, weight });
        }
      }
      steps += 1;
      const stack = [...this.vertices[start].edges];
      while (stack.length > 0) {
        const nextNode = stack.pop();
        if (nextNode) {
          const currentWeight = weight + nextNode.weight;
          this._findAllPaths(
            nextNode.end,
            goal,
            steps,
            numSteps,
            paths,
            currentPath,
            currentWeight,
            strict
          );
        }
      }
    }
  }
}
