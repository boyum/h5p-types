// import type { GluegunToolbox } from "gluegun";

// add your CLI-specific functionality here, which will then be accessible
// to your commands
// module.exports = (toolbox: GluegunToolbox) => {
// toolbox.foo = () => {
//   toolbox.print.info("called foo extension");
// };
// enable this if you want to read configuration in from
// the current folder's package.json (in a "h5p-generate-configs" property),
// h5p-generate-configs.config.json, etc.
// toolbox.config = {
//   ...toolbox.config,
//   ...toolbox.config.loadConfig("h5p-generate-configs", process.cwd())
// }
// };

// eslint-disable-next-line @typescript-eslint/no-empty-function
module.exports = (): void => {};
