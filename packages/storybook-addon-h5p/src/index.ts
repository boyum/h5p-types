import { promises as fs } from "node:fs";
import simpleGit from "simple-git";
import { info, error } from "./log.utils";
import { cacheDirectory } from "./constants";

const git = simpleGit();

type Library = {
  libraryName: string;
  version: `${number}.${number}`;
  url: string;
};

async function exists(directory: string) {
  return await fs.stat(directory).catch(() => false);
}

/**
 * Git clones all repositories that aren't already cloned into the cache directory.
 */
export async function initialize(libraries: Library[]) {
  const cacheDirectoryExists = await exists(cacheDirectory);
  if (!cacheDirectoryExists) {
    info("Creating cache directory");

    await fs.mkdir(cacheDirectory, { recursive: true });
  }

  const promises = libraries.map(async module => {
    info(`Checking if ${module.libraryName} is already cloned`);

    const directories = [
      `${cacheDirectory}/${module.libraryName}`,
      `${cacheDirectory}/${module.libraryName}-${module.version}`,
    ];
    const directory = directories.find(
      async directory => await exists(directory),
    );

    if (directory) {
      info(`Fetching ${directory} from cache`);
    } else {
      info(
        `Cloning ${module.libraryName} ${module.version} from ${module.url}`,
      );

      const directory = `${cacheDirectory}/${module.libraryName}-${module.version}`;

      git.clone(module.url, directory);
    }
  });

  const erroredPromises: { library: Library; reason: unknown }[] = [];

  (await Promise.allSettled(promises)).forEach((result, index) => {
    const wasRejected = result.status === "rejected";

    if (wasRejected) {
      const library = libraries[index]!;

      erroredPromises.push({
        library,
        reason: result.reason,
      });
    }
  });

  if (erroredPromises.length > 0) {
    error("Failed to clone the following repositories:");

    erroredPromises.forEach(({ library, reason }) => {
      const { libraryName, version } = library;

      error(`${libraryName} ${version}:`, reason);
    });
  }
}
