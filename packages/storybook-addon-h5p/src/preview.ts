import { addons } from "@storybook/preview-api";
import { EVENTS, cacheDirectory } from "./constants";

const channel = addons.getChannel();

const handleRequest = async () => {
  await run();
};

const run = async () => {
  channel.emit(EVENTS.RUNNING);

  const allLibraries = cacheDirectory;
};

channel.on(EVENTS.REQUEST, handleRequest);
channel.on(EVENTS.MANUAL, run);
