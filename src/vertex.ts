import { IEdge } from "./edge";

export class Vertex {
  public name: string;
  public edges: IEdge[];

  /**
   * Vertex class - Represetation of the vertex of a graph
   *
   * @param {string} name: string representation of vertex name
   * @param {string[]} edges:
   */
  constructor(name: string, edges?: IEdge[]) {
    this.name = name;
    this.edges = edges || [];
  }

  /**
   * Check if the Vertex is connected to the following vertex
   * @param name - the name of the vertex we are checking connection to
   *
   * @returns {boolean} if the vertex does not have an edge with the choosen vertex
   */
  public isConnectedTo(name: string): boolean {
    return this.edges.some((edge: IEdge) => {
      return edge.end === name;
    });
  }

  /**
   * Find the path of the shortest route between two adjacent vertices. Assuming more than one is possible
   *
   * @param {string} name - the name of the vertices to find the shortest edge weight
   *
   * @returns {number} - either infinity or the weight of the route path
   */
  public findShortestPathWeight(name: string): number {
    if (!this.isConnectedTo(name)) {
      return Infinity;
    }

    const paths = this.edges.filter((edge: IEdge) => {
      return edge.end === name;
    });

    return Math.min(
      ...paths.map((path: IEdge) => {
        return path.weight;
      })
    );
  }

  /**
   * Adds an adjacent edge
   * @param name - the name of the vertex
   * @param weight - the weight of the path
   */
  public addAdjacent(name: string, weight: number): void {
    this.edges.push({
      start: this.name,
      end: name,
      weight,
    });
  }
}
