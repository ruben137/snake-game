// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const weightedNodes = [];
  startNode.distance = 0;
  // obtiene todos los nodos en un arreglo de una dimension

  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    let closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    if (closestNode.isBody) continue;
    if (closestNode.isWeighted) {
      weightedNodes.push(closestNode);
      continue;
    }
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) {
      if (weightedNodes.length) {
        closestNode = weightedNodes.shift();
      } else {
        return visitedNodesInOrder;
      }
    }
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); //up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); //down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); //right
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getAllNodes(grid) {
  return grid.reduce((a, b) => [...b, ...a], []);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

let grid = [
  [
    [
      { front: "red", up: "green", left: "yellow" },
      { front: "red", up: "green" },
      { front: "red", up: "green", right: "white" },
    ],
    [
      { front: "red", left: "yellow" },
      { front: "red" },
      { front: "red", right: "white" },
    ],
    [
      { front: "red", left: "yellow",bottom:"blue" },
      { front: "red",bottom:"blue" },
      { front: "red", right: "white" ,bottom:"blue"},
    ],
  ],
  [0, 0, 0],
  [0, 0, 0],
];
