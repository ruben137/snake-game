import { blueGrey } from "@mui/material/colors";
import React, { useEffect, useMemo, useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { useInterval } from "../hooks/useInterval";
import Node from "./Node";
import PauseIcon from "@mui/icons-material/Pause";
import { Backdrop, Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PixelTypography from "./PixelTypography";
export type Matrix = TypeNode[][];
export type TypeNode = {
  isHead: boolean;
  isBody: boolean;
  isFruit: boolean;
  isWall: boolean;
  row: number;
  col: number;
  previousNode: TypeNode | null;
  index: number;
  distance: number;
  isVisited: boolean;
};
const getAllNodes = (grid: Matrix) => grid.reduce((a, b) => [...b, ...a], []);
const handleIndex = (row: number, col: number) => {
  if (row === 6 && col === 4) {
    return 0;
  }
  if (row === 6 && col === 5) {
    return 1;
  }
  if (row === 6 && col === 6) {
    return 2;
  }
  // if (row === 6 && col === 7) {
  //   return 3;
  // }
  return -1;
};
const handleBody = (row: number, col: number) => {
  if (row === 6 && col === 5) {
    return true;
  }
  if (row === 6 && col === 6) {
    return true;
  }
  // if (row === 6 && col === 7) {
  //   return true;
  // }
  return false;
};
type Eye = {
  right?: number;
  left?: number;
  bottom?: number;
  top?: number;
};
export interface EyesPosition {
  eye1: Eye;
  eye2: Eye;
}
type Move = "left" | "right" | "up" | "down" | "auto";
const Snake = () => {
  let [matrix, setMatrix] = useState<Matrix>([]);
  const [start, setStart] = useState<boolean>(false);
  const [auto, setAuto] = useState<boolean>(false);
  const [lastKey, setLastKey] = useState(37);
  const [timer, setTimer] = useState<number | null>(null);
  const [gameover, setGameOver] = useState(false);
  const [win, setWin] = useState<boolean>(false);
  const left = {
    eye1: { right: 0 },
    eye2: { bottom: 0, right: 0 },
  };
  const right = {
    eye1: { left: 0 },
    eye2: { bottom: 0, left: 0 },
  };
  const up = {
    eye1: { left: 0, bottom: 0 },
    eye2: { bottom: 0, right: 0 },
  };
  const down = {
    eye1: { left: 0 },
    eye2: { top: 0, right: 0 },
  };
  const [eyesPosition, setEyesPosition] = useState<EyesPosition>({
    eye1: { right: 0 },
    eye2: { bottom: 0, right: 0 },
  });
  const colLength = 17;
  const rowLength = 17;
  const generateNodes = () => {
    const grid: Matrix = [];

    for (let row = 0; row < rowLength; row++) {
      const currentRow: TypeNode[] = [];
      for (let col = 0; col < colLength; col++) {
        const wall =
          row === 0 ||
          row === rowLength - 1 ||
          col === 0 ||
          col === colLength - 1;
        const currentNode: TypeNode = {
          col,
          row,
          isHead: col === 4 && row === 6,
          isBody: handleBody(row, col),
          isFruit: col === 6 && row === 5,
          isWall: wall,
          previousNode: null,
          index: handleIndex(row, col),
          distance: Infinity,
          isVisited: false,
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }

    return grid;
  };
  const handlePause = () => {
    if (timer) {
      setTimer(null);
    } else {
      setTimer(150);
    }
  };
  const handleGenerateNewFruit = (grid: Matrix) => {
    const newFruit = getAllNodes(grid)
      .filter((node) => !node.isWall && node.index === -1)
      .sort(() => Math.random() - 0.5)[0];
    grid[newFruit.row][newFruit.col].isFruit = true;
  };

  const handleGetMovement = (grid: Matrix, node: TypeNode, index: number) => {
    const neighbors = [];
    const moves: Move[] = [];
    const { col, row } = node;

    if (row > 0) {
      const newNeighbor = grid[row - 1][col];
      neighbors.push(newNeighbor);
      moves.push("down");
    }
    if (row < grid.length - 1) {
      const newNeighbor = grid[row + 1][col];
      neighbors.push(newNeighbor);
      moves.push("up");
    }
    if (col > 0) {
      const newNeighbor = grid[row][col - 1];
      neighbors.push(newNeighbor);
      moves.push("right");
    }
    if (col < grid[0].length - 1) {
      const newNeighbor = grid[row][col + 1];
      neighbors.push(newNeighbor);
      moves.push("left");
    }

    const neighborIndex = neighbors.findIndex(
      (neighbor) => !neighbor.isHead && neighbor.index === index + 1
    );
    return {
      neighbor: neighbors[neighborIndex],
      move: moves[neighborIndex],
    };
  };

  const handleAddNode = (grid: Matrix, node: TypeNode, move: string) => {
    if (move === "down") {
      grid[node.row - 1][node.col].isBody = true;
      grid[node.row - 1][node.col].index = node.index + 1;
    }
    if (move === "up") {
      grid[node.row + 1][node.col].isBody = true;
      grid[node.row + 1][node.col].index = node.index + 1;
    }
    if (move === "left") {
      grid[node.row][node.col + 1].isBody = true;
      grid[node.row][node.col + 1].index = node.index + 1;
    }
    if (move === "right") {
      grid[node.row][node.col - 1].isBody = true;
      grid[node.row][node.col - 1].index = node.index + 1;
    }
  };

  const handleMoveSnake = (
    grid: Matrix,
    node: TypeNode,
    lastNode: TypeNode,
    direction: Move,
    fruit?: boolean
  ) => {
    let newNode = handleGetNewNode(grid, node, direction);
    const lose = handleLoseGame(newNode, grid);
    if (lose) {
      return;
    }
    let prevNode: TypeNode = node;
    if (node.isHead) {
      prevNode = { ...node, index: -1, isHead: false };
      newNode = { ...newNode, index: 0, isHead: true };
    }
    if (node.isBody) {
      prevNode = { ...node, index: -1, isBody: false };
      newNode = { ...newNode, index: node.index, isBody: true };
    }
    grid[newNode.row][newNode.col] = newNode;
    grid[prevNode.row][prevNode.col] = prevNode;

    if (newNode.isFruit) {
      fruit = true;
      grid[newNode.row][newNode.col].isFruit = false;
      handleGenerateNewFruit(grid);
    }

    const { neighbor, move } = handleGetMovement(grid, node, node.index);
    if (neighbor?.index === lastNode?.index && fruit) {
      handleAddNode(grid, lastNode, move);
    }
    if (neighbor && move) {
      handleMoveSnake(grid, neighbor, lastNode, move, fruit);
    }
  };
  const handleMoveSnakeAuto = (
    grid: Matrix,
    node: TypeNode,
    nextNode: TypeNode,
    lastNode: TypeNode,
    direction: Move,
    fruit?: boolean
  ) => {
    let newNode = handleGetNewNode(grid, nextNode, direction);
    const lose = handleLoseGame(newNode, grid);
    if (lose) {
      return;
    }
    let prevNode: TypeNode = node;
    if (node.isHead) {
      prevNode = { ...node, index: -1, isHead: false };
      newNode = { ...newNode, index: 0, isHead: true };
    }
    if (node.isBody) {
      prevNode = { ...node, index: -1, isBody: false };
      newNode = { ...newNode, index: node.index, isBody: true };
    }
    grid[newNode.row][newNode.col] = newNode;
    grid[prevNode.row][prevNode.col] = prevNode;

    if (newNode.isFruit) {
      grid[newNode.row][newNode.col].isFruit = false;
      // fruit=true
      handleGenerateNewFruit(grid);
    }

    const { neighbor, move } = handleGetMovement(grid, node, node.index);
    if (neighbor?.index === lastNode?.index && fruit) {
      handleAddNode(grid, lastNode, move);
    }
    if (neighbor && move) {
      handleMoveSnake(grid, neighbor, lastNode, move, fruit);
    }
  };
  const handleGetNewNode = (grid: Matrix, node: TypeNode, move: Move) => {
    switch (move) {
      case "left":
        return grid[node.row][node.col - 1];
      case "right":
        return grid[node.row][node.col + 1];
      case "up":
        return grid[node.row - 1][node.col];
      case "down":
        return grid[node.row + 1][node.col];
      case "auto":
        return grid[node.row][node.col];
    }
  };

  const [node, setNode] = useState<TypeNode | null>(null);
  const allNodes = getAllNodes(matrix);
  const head = allNodes.find((node) => node.isHead);
  const handleAuto = () => {
    if (!auto) return;
    const allNodes = getAllNodes(matrix);
    const fruit = allNodes.find((node) => node.isFruit);
    if (head && fruit) {
      const visitedNodes = dijkstra(
        matrix,
        matrix[head.row][head.col],
        matrix[fruit.row][fruit.col]
      );
      const shortestPath = getNodesInShortestPathOrder(
        matrix[fruit.row][fruit.col]
      ).slice(1);
      const path = shortestPath.length
        ? shortestPath
        : getNodesInShortestPathOrder(visitedNodes && visitedNodes[1]).slice(1);
      setTimer(path.length * 150);

      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        setTimeout(() => {
          setNode(node);
        }, 150 * i);
      }
    }
  };

  useEffect(() => {
    if (node) {
      const allNodes = getAllNodes(matrix);
      const snake = allNodes
        .filter((node: TypeNode) => node.index > -1)
        .sort((a, b) => a.index - b.index);

      if (head) {
        const lastNode = snake[snake.length - 1];
        handleMoveSnakeAuto(matrix, head, node, lastNode, "auto");
        setMatrix(
          [...matrix].map((row) =>
            row.map((col) => ({
              ...col,
              isVisited: false,
              distance: Infinity,
              previousNode: null,
            }))
          )
        );
      }
    }
  }, [node]);
  useInterval(() => {
    moveSnake(lastKey);
  }, timer);
  const moveSnake = (key: number) => {
    const head = allNodes.find((node) => node.isHead);
    const snake = allNodes
      .filter((node: TypeNode) => node.index > -1)
      .sort((a, b) => a.index - b.index);
    const lastNode = snake[snake.length - 1];
    if (key === 38) {
      if (head) {
        let newNode = handleGetNewNode(matrix, head, "up");
        if (newNode.index === 1) {
          handleMoveSnake(matrix, head, lastNode, "down");
          setLastKey(40);
          return;
        } else {
          handleMoveSnake(matrix, head, lastNode, "up");
        }
        setEyesPosition(up);
      }
    } else if (key === 40) {
      if (head) {
        let newNode = handleGetNewNode(matrix, head, "down");
        if (newNode.index === 1) {
          handleMoveSnake(matrix, head, lastNode, "up");
          setLastKey(38);
          return;
        }
        handleMoveSnake(matrix, head, lastNode, "down");
        setEyesPosition(down);
      }
    } else if (key === 37) {
      if (head) {
        let newNode = handleGetNewNode(matrix, head, "left");
        if (newNode.index === 1) {
          handleMoveSnake(matrix, head, lastNode, "right");
          setLastKey(39);
          return;
        }
        handleMoveSnake(matrix, head, lastNode, "left");
        setEyesPosition(left);
      }
    } else if (key === 39) {
      if (head) {
        let newNode = handleGetNewNode(matrix, head, "right");
        if (newNode.index === 1) {
          handleMoveSnake(matrix, head, lastNode, "left");
          setLastKey(37);
          return;
        }
        handleMoveSnake(matrix, head, lastNode, "right");
        setEyesPosition(right);
      }
    }
    setMatrix([...matrix]);
  };
  function checkKey(e: any) {
    if (gameover) {
      return;
    }
    if (e.keyCode === 27) {
      setTimer(timer ? null : 150);
      return;
    }
    if (!timer) {
      return;
    }
    if (lastKey === e.keyCode) return;
    if (e.keyCode === 40) {
      setLastKey(e.keyCode);
    }
    if (e.keyCode === 38) {
      setLastKey(e.keyCode);
    }

    if (e.keyCode === 37) {
      setLastKey(e.keyCode);
    }
    if (e.keyCode === 39) {
      setLastKey(e.keyCode);
    }
  }
  const handleLoseGame = (newNode: TypeNode, grid: Matrix) => {
    if (newNode.isBody || newNode.isWall) {
      setGameOver(true);
      setTimer(null);
      return true;
    }
    return false;
  };
  const handleRestartGame = () => {
    setGameOver(false);
    const initMatrix = generateNodes();
    setMatrix(initMatrix);
    setTimer(150);
    setStart(true);
    setWin(false);
  };
  const handleFinishGame = () => {
    setGameOver(false);
    const initMatrix = generateNodes();
    setMatrix(initMatrix);
    setTimer(null);
    setStart(false);
    setWin(false);
  };

  useEffect(() => {
    const matrix = generateNodes();
    setMatrix(matrix);
  }, []);

  document.onkeydown = checkKey;
  const snake = allNodes
    .filter((node: TypeNode) => node.index > -1)
    .sort((a, b) => a.index - b.index);

  const handleWin = (snake: TypeNode[]) => {
    if (snake.length === colLength * rowLength) {
      setWin(true);
      setTimer(null);
    }
  };
  useEffect(() => {
    handleWin(snake);
  }, [snake]);
  return (
    <div
      style={{
        width: `100%`,
        display: "flex",
        flexWrap: "wrap",
        outline: `1px solid lightgray`,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          px: 1,
          alignItems: "center",
          bgcolor: "#4a752c",
          zIndex: 13,
        }}
      >
        {!auto && (
          <PixelTypography
            textAlign="center"
            onClick={handleRestartGame}
            sx={{ color: "#fff" }}
          >
            {snake.length - 3}
          </PixelTypography>
        )}
        {!auto && (
          <IconButton size="small" onClick={handlePause} disabled={!start}>
            {!timer ? (
              <PlayArrowIcon sx={{ color: "#fff" }} />
            ) : (
              <PauseIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        )}
      </Box>
      <Backdrop open={gameover} sx={{ position: "absolute", zIndex: 13 }}>
        <PixelTypography
          variant="h4"
          lineHeight={0.7}
          sx={{ color: "#fff" }}
          textAlign="center"
        >
          GAME <br />
          OVER
          <br />
          <span style={{ fontSize: "16px", cursor: "pointer" }}>
            PLAY AGAIN?
          </span>{" "}
          <br />
          <span
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleRestartGame();
            }}
          >
            YES
          </span>{" "}
          <span
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleFinishGame();
            }}
          >
            NO
          </span>
        </PixelTypography>{" "}
      </Backdrop>
      <Backdrop
        open={!timer && !gameover && start && !win}
        sx={{ position: "absolute", zIndex: 11 }}
      >
        <PixelTypography
          variant="h4"
          lineHeight={0.7}
          sx={{ color: "#fff" }}
          textAlign="center"
        >
          PAUSED
        </PixelTypography>{" "}
      </Backdrop>
      <Backdrop open={!start} sx={{ position: "absolute", zIndex: 11 }}>
        <PixelTypography
          variant="h5"
          lineHeight={0.7}
          sx={{ color: "#fff", cursor: "pointer" }}
          textAlign="center"
          onClick={handleRestartGame}
        >
          START GAME
        </PixelTypography>{" "}
      </Backdrop>
      <Backdrop open={win} sx={{ position: "absolute", zIndex: 11 }}>
        <PixelTypography
          variant="h5"
          lineHeight={0.7}
          sx={{ color: "#fff", cursor: "pointer" }}
          textAlign="center"
          onClick={handleRestartGame}
        >
          YOU WIN!
          <br />
          <span style={{ fontSize: "16px", cursor: "pointer" }}>
            PLAY AGAIN?
          </span>{" "}
          <br />
          <span
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => handleRestartGame()}
          >
            YES
          </span>{" "}
          <span
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleFinishGame();
            }}
          >
            NO
          </span>
        </PixelTypography>{" "}
      </Backdrop>

      {matrix.map((row: any, ix: number) => (
        <React.Fragment key={ix}>
          {row.map((col: TypeNode, iy: number) => (
            <Node
              key={iy}
              index={iy}
              node={col}
              colLength={colLength}
              eyesPosition={eyesPosition}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Snake;
