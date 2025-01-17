export const calculateDistance = (pos1: [number, number], pos2: [number, number]): number => {
  const [row1, col1] = pos1;
  const [row2, col2] = pos2;
  return Math.sqrt(Math.pow(row2 - row1, 2) + Math.pow(col2 - col1, 2));
};
