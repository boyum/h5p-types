import type { GluegunCommand } from "gluegun";

const command: GluegunCommand = {
  name: "h5p-generate-configs",
  hidden: true,
  run: async toolbox => {
    toolbox.print.warning(
      "No program provided. Please run either `h5p-generate-configs generate-semantics|s` or `h5p-generate-configs generate-library|l`",
    );

    return 1;
  },
};

export default command;
