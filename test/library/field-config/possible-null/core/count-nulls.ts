export function countNulls(array: any[]): number {
  let count = 0;

  for (const dat of array) {
    if (dat.null === null) {
      count++;
    }
  }

  return count;
}
