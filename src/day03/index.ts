import run from "aocrunner";
import { sum } from "../utils.js";

const fakeInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const parseInput = (rawInput: string) => rawInput;

const formatInput = (input: string) => {
  return input.split("\n");
};

const getColumns = (data: string[]) => {
  const columns = new Array(data[0].length).fill(null).map((_e, i) => {
    return data.map((e) => {
      return parseInt(e[i]);
    });
  });
  return columns;
};

const getGammaRateList = (columns: number[][]) => {
  const gammaRate = columns.map((column) => {
    const total = sum(column);
    return total >= Math.floor(column.length / 2) ? 1 : 0;
  });

  return gammaRate;
};

const getDecimalFromList = (list: (0 | 1)[]) => {
  return parseInt(list.join(""), 2);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);

  const columns = getColumns(formattedInput);
  const gammaRateList = getGammaRateList(columns);
  const epsilonRateList = gammaRateList.map((num) => (num === 1 ? 0 : 1));

  const res =
    getDecimalFromList(gammaRateList) * getDecimalFromList(epsilonRateList);
  return res;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const formattedInput = formatInput(input);
  const columns = getColumns(formattedInput);

  const oxygen = columns.reduce((acc, _next, index) => {
    if (acc.length === 1) {
      return acc;
    }
    const updatedColumn = acc.map((e) => parseInt(e[index]));
    const highest =
      sum(updatedColumn) >= Math.round(updatedColumn.length / 2) ? 1 : 0;

    const filteredData = acc.filter((e) => {
      return e[index] === highest.toString();
    });
    return (acc = filteredData);
  }, formattedInput);

  const co2 = columns.reduce((acc, _next, index) => {
    if (acc.length === 1) {
      return acc;
    }
    const updatedColumn = acc.map((e) => parseInt(e[index]));

    const lowest =
      sum(updatedColumn) >= Math.round(updatedColumn.length / 2) ? 0 : 1;

    const filteredData = acc.filter((e) => {
      return e[index] === lowest.toString();
    });
    return (acc = filteredData);
  }, formattedInput);

  const res = parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
  return res;
};

run({
  part1: {
    tests: [{ input: fakeInput, expected: 198 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: ``, expected: 230 }],
    solution: part2,
  },
  trimTestInputs: true,
});
