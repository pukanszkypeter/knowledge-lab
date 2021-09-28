export enum NodeState {
    PENDING = '#ff0000',
    VISITED = '#ff9900',
    OCCUPIED = '#33cc33'
}

export enum RobotState {
    SEARCHING = 'SEARCHING',
    FINISHED = 'FINISHED'
}

export class GraphState {

    nodes: {id: number, label: string, state?: NodeState}[];
    edges: {from: number, to: number, color: string}[];
    robots: {id: number, on: number, state: RobotState, color: string}[];

    constructor(nodes: {id: number, label: string, state?: NodeState}[],
        edges: {from: number, to: number, color: string}[],
        robots: {id: number, on: number, state: RobotState, color: string}[]) {
        this.nodes = nodes;
        this.edges = edges;
        this.robots = robots;
    }

}