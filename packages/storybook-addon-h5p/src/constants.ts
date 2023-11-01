export const ADDON_ID = "storybook-addon-h5p";

const RESULT = `${ADDON_ID}/result`;
const REQUEST = `${ADDON_ID}/request`;
const RUNNING = `${ADDON_ID}/running`;
const ERROR = `${ADDON_ID}/error`;
const MANUAL = `${ADDON_ID}/manual`;

export const EVENTS = { RESULT, REQUEST, RUNNING, ERROR, MANUAL };

export const cacheDirectory = ".storybook/.h5p-cache";
