export const sum = (arr: number[]) => {
  return arr.reduce((acc, next) => {
    return (acc = acc + next);
  }, 0);
};
