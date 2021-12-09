import run from "aocrunner";
import { sum } from "../utils.js";

const fakeInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const formatInput = (input: string) => {
  return input.split("\n").map((e) => e.split("").map((e) => Number(e)));
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);

  const lowPoints = formattedInput
    .map((list, listIndex, listArray) => {
      return list.filter((number, index, arr) => {
        const right = arr[index + 1];
        const left = arr[index - 1];
        const up = listArray[listIndex - 1]?.[index];
        const down = listArray[listIndex + 1]?.[index];

        const neighbors = [right, left, up, down, number].filter(
          (n) => n !== undefined,
        );

        const duplicateNumber = neighbors.filter(
          (neighbor) => neighbor === number,
        );
        if (duplicateNumber.length > 1) {
          return false;
        } else {
          const lowest = Math.min(...neighbors);
          return lowest === number;
        }
      });
    })
    .flat();

  console.log(lowPoints);
  const res = sum(lowPoints.map((height) => 1 + height));
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [{ input: ``, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
