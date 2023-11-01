const logPrefix = "[storybook-addon-h5p]";

export const info = (...args: Parameters<typeof console.info>) =>
  console.info(logPrefix, ...args);

export const error = (...args: Parameters<typeof console.error>) =>
  console.error(logPrefix, ...args);
