import run from "aocrunner";

const fakeInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

type Direction = "forward" | "up" | "down";

const parseInput = (rawInput: string) => rawInput;

const formatInput = (input: string) => {
  const data: [Direction, number][] = input.split("\n").map((line) => {
    const splitLine = line.split(" ");
    return [splitLine[0] as Direction, parseInt(splitLine[1])];
  });
  return data;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);

  const startingPosition = {
    horizontal: 0,
    depth: 0,
  };

  const finalPosition = formattedInput.reduce((acc, next) => {
    const [direction, distance] = next;

    const horizontal =
      direction === "forward" ? acc.horizontal + distance : acc.horizontal;
    const depth =
      direction === "up"
        ? acc.depth - distance
        : direction === "down"
        ? acc.depth + distance
        : acc.depth;

    const newPosition = {
      horizontal,
      depth,
    };

    return (acc = newPosition);
  }, startingPosition);

  const res = finalPosition.horizontal * finalPosition.depth;
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [{ input: ``, expected: 150 }],
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
