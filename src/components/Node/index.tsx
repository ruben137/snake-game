import React from "react";
import { TypeNode, EyesPosition } from '../Snake';
import "./index.css";
interface Props {
  colLength: number;
  node: TypeNode;
  eyesPosition:EyesPosition;
  index:number
}
const Node = ({ colLength, node,eyesPosition ,index}: Props) => {
  const handleClassName = () => {
    if (node.isHead || node.isBody) {
      return "snake";
    }
    if (node.isWall) {
      return "wall";
    }
    if (node.isFruit) {
      return "fruit";
    }
    return node.row % 2
      ? index % 2
        ? "grass"
        : "grass2"
      : index % 2
      ? "grass2"
      : "grass";
  };
  const className = handleClassName();
  return (
    <div
      style={{
        position: "relative",
        width: `calc(100%/${colLength})`,
        paddingBottom: `calc(100%/${colLength})`,
      }}
      className={className}
      id={`${node.row}-${node.col}`}
    >
      {/* {node.isFruit && (
        <>
          <div
            style={{
              width: "2px",
              height: "5px",
              background: "#976e4c",
              left: 0,
              right: 0,
              margin: "auto",
              position: "absolute",
              zIndex:2
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "3px",
              background: "#49c527",
              left: 10,
              right: 0,
              margin: "auto",
              position: "absolute",
              zIndex:2
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "#e7471d",
              borderRadius: "50%",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
              position: "absolute",
              zIndex:2
            }}
          ></div>
          <div
            style={{
              width: "2px",
              height: "5px",
              background: "#000",
              top:3,
              left: 5,
              right: 0,
              margin: "auto",
              position: "absolute",
              opacity:0.1
            }}
          ></div>
          <div
            style={{
              width: "8px",
              height: "3px",
              background: "#000",
              top:3,
              left: 15,
              right: 0,
              margin: "auto",
              position: "absolute",
              opacity:0.1
            }}
          ></div>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "#000",
              borderRadius: "50%",
              left: 5,
              right: 0,
              top: 3,
              bottom: 0,
              margin: "auto",
              position: "absolute",
              opacity:0.1
            }}
          ></div>
        </>
      )} */}
      {node.isHead && (
        <>
          <div
            style={{
              width: "calc(100%/3)",
              height: 0,
              paddingBottom: "calc(100%/3)",
              position: "absolute",
              background: "#fff",
              ...eyesPosition.eye1,
            }}
          >
            <div
              style={{
                width: "calc(100%/2)",
                height: "0",
                background: "#000",
                paddingBottom: "calc(100%/2)",
              }}
            ></div>
          </div>
          <div
            style={{
              width: "calc(100%/3)",
              height: 0,
              paddingBottom: "calc(100%/3)",
              position: "absolute",
              background: "#fff",

              ...eyesPosition.eye2,
            }}
          >
            <div
              style={{
                width: "calc(100%/2)",
                height: "0",
                background: "#000",
                paddingBottom: "calc(100%/2)",
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Node;
