import run from "aocrunner";

const fakeInput = "3,4,3,1,2";

const parseInput = (rawInput: string) => rawInput;

const formatInput = (input: string) => {
  const numArray = input.split(",").map((string) => parseInt(string));
  return numArray;
};

const solvePart1 = (input: string, days: number) => {
  const initialState = formatInput(input);

  const startArray = new Array(days).fill(null);

  const result: number[] = startArray.reduce(
    (acc: number[], next: number[]) => {
      let newFish = 0;

      const updatedFishInfo = acc.map((fish) => {
        if (fish === 0) {
          newFish++;
          return 6;
        } else {
          return fish - 1;
        }
      });
      const newFishList = new Array(newFish).fill(8);
      const updatedList = [...updatedFishInfo, ...newFishList];

      newFish = 0;
      acc = updatedList;

      return acc;
    },
    initialState,
  );

  return result.length;
};

const countValue = (arr: number[], num: number) => {
  const sum = arr.reduce((acc, next) => {
    return (acc = next === num ? acc + 1 : acc);
  }, 0);
  return sum;
};

const solvePart2 = (input: string, days: number, cycleLength = 6) => {
  const initialState = formatInput(input);

  // Create a starting object or array, with one index per possible countdown value (0-8)
  // [0,1,1,2,1,0,0,0,0];
  // Map over the days
  // For each value, find the new one by looking at the previous value.
  // Example: if there are 3 "1" on day 2, then on day 3 there will be 3 "0".

  const initialValues = new Array(9).fill(null).map((_e, index) => {
    const nbOfFish = countValue(initialState, index);
    return nbOfFish;
  });

  const daysArray = new Array(days).fill(null).map((_e, i) => i);

  const finalValues = daysArray.reduce((acc) => {
    const updatedArray = acc.map((_e, index, array) => {
      if (index === array.length - 1) {
        return array[0];
      } else if (index === cycleLength) {
        return array[cycleLength + 1] + array[0];
      } else {
        return array[index + 1];
      }
    });

    return (acc = updatedArray);
  }, initialValues);

  const res = finalValues.reduce((acc, next) => {
    return acc + next;
  }, 0);

  return res;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const res = solvePart1(input, 80);
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const res = solvePart2(input, 256);
  return res;
};

run({
  part1: {
    tests: [{ input: fakeInput, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: fakeInput, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
