import run from "aocrunner";

const fakeInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

type Direction = "forward" | "up" | "down";

interface Position {
  horizontal: number;
  depth: number;
}

interface Movement {
  direction: Direction;
  distance: number;
}

interface ComplexPosition extends Position {
  aim: number;
}

function instanceOfComplexPosition(
  position: Position | ComplexPosition,
): position is ComplexPosition {
  return "aim" in position;
}

const parseInput = (rawInput: string) => rawInput;

const formatInput = (input: string) => {
  const data: [Direction, number][] = input.split("\n").map((line) => {
    const splitLine = line.split(" ");
    return [splitLine[0] as Direction, parseInt(splitLine[1])];
  });
  return data;
};

const calculatePosition = (position: Position, movement: Movement) => {
  const { distance, direction } = movement;
  const { horizontal, depth } = position;

  const newHorizontal =
    direction === "forward" ? horizontal + distance : horizontal;
  const newDepth =
    direction === "up"
      ? depth - distance
      : direction === "down"
      ? depth + distance
      : depth;

  const newPosition = {
    horizontal: newHorizontal,
    depth: newDepth,
  };

  return newPosition;
};

const calculateComplexPosition = (
  position: ComplexPosition,
  movement: Movement,
) => {
  const { direction, distance } = movement;
  const { horizontal, depth, aim } = position;

  const newHorizontal =
    direction === "forward" ? horizontal + distance : horizontal;
  const newDepth = direction === "forward" ? depth + aim * distance : depth;
  const newAim =
    direction === "up"
      ? aim - distance
      : direction === "down"
      ? aim + distance
      : aim;

  return {
    horizontal: newHorizontal,
    depth: newDepth,
    aim: newAim,
  };
};

const getFinalResult = (
  startingPosition: Position | ComplexPosition,
  data: [Direction, number][],
) => {
  const finalPosition = data.reduce((acc, next) => {
    const [direction, distance] = next;

    if (instanceOfComplexPosition(acc)) {
      return calculateComplexPosition(acc, { direction, distance });
    } else {
      return calculatePosition(acc, { direction, distance });
    }
  }, startingPosition);
  return finalPosition.horizontal * finalPosition.depth;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);

  const startingPosition = {
    horizontal: 0,
    depth: 0,
  };

  const res = getFinalResult(startingPosition, formattedInput);
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);

  const startingPosition = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  const res = getFinalResult(startingPosition, formattedInput);

  return res;
};

run({
  part1: {
    tests: [{ input: ``, expected: 150 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: ``, expected: 900 }],
    solution: part2,
  },
  trimTestInputs: true,
});
