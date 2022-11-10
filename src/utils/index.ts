import { TypeNode } from "../components/Snake";

export function getTail(head: TypeNode | null) {
  const tail = [];
  let currentNode = head;
  while (currentNode !== null) {
    tail.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return tail;
}
