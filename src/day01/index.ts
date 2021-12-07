import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const fakeInput = `199
200
208
210
200
207
240
269
260
263`;

const formatData = (input: string) => {
  const data = input.split("\n").map((e) => parseInt(e));
  return data;
};

function generateArrayWindows<T>(array: Array<T>) {
  const windows = array.reduce((acc: Array<T[]>, next, index, arr) => {
    if (index === 0 || index === arr.length - 1) {
      return acc;
    }
    const window = [arr[index - 1], next, arr[index + 1]];
    acc = [...acc, [...window]];
    return acc;
  }, []);
  return windows;
}

function calculateNbOfIncrease(depths: number[]): number {
  const nbOfIncreases = depths.reduce((acc, next, index, arr) => {
    if (index === 0) {
      return acc;
    }
    return (acc = next > arr[index - 1] ? acc + 1 : acc);
  }, 0);
  return nbOfIncreases;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const depths = formatData(input);
  const nbOfIncreases = calculateNbOfIncrease(depths);
  return nbOfIncreases;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const depths = formatData(input);
  const windows = generateArrayWindows(depths);
  const depthSums = windows.map((window) =>
    window.reduce((acc, next) => {
      return (acc = acc + next);
    }, 0),
  );

  const nbOfIncreases = calculateNbOfIncrease(depthSums);
  return nbOfIncreases;
};

run({
  part1: {
    tests: [{ input: ``, expected: 7 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: ``, expected: 5 }],
    solution: part2,
  },
  trimTestInputs: true,
});
