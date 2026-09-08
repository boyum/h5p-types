import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.ts"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  addons: [],
};

export default config;
