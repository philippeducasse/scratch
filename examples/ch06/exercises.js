import { ARRAY_DIF_OP, arrayDiffSequence } from "../../packages/runtime/src/utils/arrays.js";

const oldArray = ["D", "A", "A", "B", "C"];
const newArray = ["C", "K", "D", "A", "B"];

const sequence = arrayDiffSequence(oldArray, newArray);

console.log(sequence);

function applyArraysDiffSequence(array, sequence) {
  const newArr = [];

  for (let op of sequence) {
    console.log("state:", newArr, op);
    switch (op.op) {
      case ARRAY_DIF_OP.ADD:
        newArr.splice(op.index, 0, op.item);
        console.log("adding item", newArr);
        break;
      case ARRAY_DIF_OP.REMOVE:
        array.splice(op.index, 1);
        console.log("removing item", newArr);
        break;
      case ARRAY_DIF_OP.MOVE:
        newArr.splice(op.index, 0, array.splice(op.from, 1)[0]);
        console.log("moving item", newArr);
        break;
      default:
        newArr.push(op.item);
        break;
    }
  }
  return newArr;
}

const test = applyArraysDiffSequence(oldArray, sequence);

console.log("result: ", test);
