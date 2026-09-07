import { installH5PMocks } from "../src/index.js";

// The H5P mocks must be in place before any content type/widget module is
// evaluated, since `h5p-utils` captures `window.H5P` at import time.
installH5PMocks();

const preview = {
  parameters: {
    layout: "padded",
  },
};

export default preview;
