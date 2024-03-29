import { Injectable } from '@angular/core';
import {DisjointSet} from "./entities/DisjointSet";
import {SimpleGraph} from "./entities/SimpleGraph";

@Injectable({
  providedIn: 'root'
})
export class GraphGeneratorService {

  constructor() { }

  converter(graph: SimpleGraph, numberOfRobots: number, startNodes: string): string {
    let result = '';
    let startNodeCounter = 1; // because of start nodes

    for (let i = 0; i < graph.getNumberOfNodes(); ++i) {

      /** Creating edge and node connections */
      result += (i+1) + ':';
      let firstInLine = true;

      for (let j = 0; j < graph.getNumberOfNodes(); ++j) {
        if (graph.hasEdge(i, j)) {
          if (firstInLine) {
            firstInLine = false;
          } else {
            result += ',';
          }
          result += (j+1);
        }
      }

      /** Distribute robots equally on nodes */
      const startNodesLength = startNodes.split(',').length;
      const balanced = numberOfRobots - (numberOfRobots % startNodesLength);
      let leftOvers = [];
      for (let i = numberOfRobots; i > balanced; i--) {
        leftOvers.push(i);
      }
      leftOvers = leftOvers.reverse();

      if (startNodes.includes((i+1) + '')) {
        result += ':';
        let first = true; // because of commas
        for (let k = startNodeCounter; k <= balanced; k += startNodesLength) {
          if (first) {
            result += k;
            first = false;
          } else {
            result += ',' + k;
          }
        }
        if (startNodeCounter <= leftOvers.length) {
          result += ',' + leftOvers[startNodeCounter-1];
        }
        startNodeCounter++;
      }

      if (i !== graph.getNumberOfNodes() - 1) {
        result += '\n';
      }
    }

    return result;
  }

  generateCompleteGraph(size: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(size);

    for (let i = 0; i < size - 1; ++i) {
      for (let j = i + 1; j < size; ++j) {
        graph.addEdge(i, j);
      }
    }

    return this.converter(graph, robots, startNodes);
  }

  generateCircleGraph(size: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(size);

    for (let i = 0; i < size - 1; ++i) {
      graph.addEdge(i, i + 1);
    }
    graph.addEdge(0, size - 1);

    return this.converter(graph, robots, startNodes);
  }

  generateSimpleLine(size: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(size);
    for (let i = 0; i < size - 1; ++i) {
        graph.addEdge(i, i + 1);
    }

    return this.converter(graph, robots, startNodes);
  }

  generateBarbellGraph(numOfNodes: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(numOfNodes);

    for (let i = 0; i < numOfNodes / 3 - 1; ++i) {
      for (let j = i + 1; j < numOfNodes / 3; ++j) {
        graph.addEdge(i, j);
        graph.addEdge(i + (2 * numOfNodes / 3), j + (2 * numOfNodes / 3));
      }
    }

    for (let i = (numOfNodes / 3 - 1); i < (2 * numOfNodes / 3); ++i) {
      graph.addEdge(i, i + 1);
    }

    return this.converter(graph, robots, startNodes);
  }

  generateLollipopGraph(numOfNodes: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(numOfNodes);

    for (let i = 0; i < numOfNodes / 2 - 1; ++i) {
      for (let j = i + 1; j < numOfNodes / 2; ++j) {
        graph.addEdge(i, j);
      }
    }

    for (let i = (numOfNodes / 2 - 1); i < (numOfNodes - 1); ++i) {
      graph.addEdge(i, i + 1);
    }

    return this.converter(graph, robots, startNodes);
  }

  generateSpecialLine(numOfNodes: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(numOfNodes);

    for (let i = 0; i < numOfNodes; ++i) {
      if (i % 2 == 0) {
        if (i > 0) {
          graph.addEdge(i, i - 2);
        }
        if (i > 0 && i < numOfNodes - 1) {
          graph.addEdge(i, i + 2);
        }
      } else {
        graph.addEdge(i, i - 1);
      }
    }

    return this.converter(graph, robots, startNodes);
  }

  isInRange(node: number, numOfNodes: number) {
    return node >= 0 && node < numOfNodes;
  }

  isInLineRange(node: number, line: number, sqrRoot: number) {
    return node >= (line * sqrRoot) && node < ((line + 1) * sqrRoot);
  }

  generateGridGraph(numOfNodes: number, robots: number, startNodes: string) {
    const sqrRoot = Math.floor(Math.sqrt(numOfNodes));
    let line = 0;

    const graph = new SimpleGraph(numOfNodes);

    for (let i = 0; i < numOfNodes; ++i) {
      if (i > 0 && i % sqrRoot == 0) {
        line++;
      }
      if (this.isInLineRange(i - 1, line, sqrRoot)) {
        graph.addEdge(i, i - 1);
      }
      if (this.isInLineRange(i + 1, line, sqrRoot)) {
        graph.addEdge(i, i + 1);
      }
      if (this.isInRange(i + sqrRoot, numOfNodes)) {
        graph.addEdge(i, i + sqrRoot);
      }
      if (this.isInRange(i - sqrRoot, numOfNodes)) {
        graph.addEdge(i, i - sqrRoot);
      }
    }

    return this.converter(graph, robots, startNodes);
  }

  // Hypercube

  generateHyperCube(numOfNodes: number, robots: number, startNodes: string) {
    const graph = new SimpleGraph(numOfNodes);
    for (let i = 0; i < numOfNodes; ++i) {
      for (let j = 0; j < Math.log2(numOfNodes); ++j) {
        graph.addEdge(i, i ^ Math.pow(2, j));
      }
    }

    return this.converter(graph, robots, startNodes);
  }

  // Random graph

  generateERRandomGraph(numOfNodes: number, robots: number, startNodes: string) {
    let p = Math.log2(numOfNodes) / numOfNodes;
    let graph;

    let disjointSet = new DisjointSet(numOfNodes);
    while (disjointSet.numberOfComponents > 1) {
      graph = new SimpleGraph(numOfNodes);
      for (let i = 0; i < numOfNodes; ++i) {
        for (let j = 0; j < numOfNodes; ++j) {
          if (i != j && Math.random() <= p) {
            graph.addEdge(i, j);
            disjointSet.unionComponents(i, j);
          }
        }
      }
    }

    return this.converter(graph, robots, startNodes);
  }

  generateGraph(type: string, nodes: number, robots: number, startNodes: string): string {
    switch(type) {
      case 'SIMPLE_LINE': return this.generateSimpleLine(nodes, robots, startNodes);
      case 'CIRCLE': return this.generateCircleGraph(nodes, robots, startNodes);
      case 'COMPLETE': return this.generateCompleteGraph(nodes, robots, startNodes);
      case 'BARBELL': return this.generateBarbellGraph(nodes, robots, startNodes);
      case 'LOLLIPOP': return this.generateLollipopGraph(nodes, robots, startNodes);
      case 'SPECIAL_LINE': return this.generateSpecialLine(nodes, robots, startNodes);
      case 'GRID': return this.generateGridGraph(nodes, robots, startNodes);
      case 'HYPER_CUBE': return this.generateHyperCube(nodes, robots, startNodes);
      case 'ER_RANDOM': return this.generateERRandomGraph(nodes, robots, startNodes);
    }
  }

}
