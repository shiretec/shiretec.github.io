export const fetchCount = async (
  count: number = 2,
  timeout: number = 2000,
): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(count);
    }, timeout);
  });
};
