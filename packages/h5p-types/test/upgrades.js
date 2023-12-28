// @ts-check

/** @type {import('h5p-types').H5PUpgrades} */
var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades["MyContentType"] = {
  1: {
    0: (/** @type {Record<string, unknown>} */ params, finished) => {
      if (typeof params["text"] !== "string") {
        finished(
          `The \`text\` field was expected to be a string, but was a ${typeof params[
            "text"
          ]}"`,
        );

        return;
      }

      // Trim params.text
      params["text"] = params["text"].trim();

      finished(null, params);
    },
  },
};
