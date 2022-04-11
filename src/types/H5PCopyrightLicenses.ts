import { H5PCCVersions } from "./H5PCCVersions";

export type H5PCopyrightLicenses = {
  U: string;

  "CC BY": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC BY-SA": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC BY-ND": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC BY-NC": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC BY-NC-SA": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC BY-NC-ND": {
    label: string;
    link: string;
    versions: H5PCCVersions;
  };

  "CC0 1.0": {
    label: string;
    link: string;
  };

  "GNU GPL": {
    label: string;
    link: string;
    linkVersions: {
      v3: string;
      v2: string;
      v1: string;
    };
    versions: {
      default: string;
      v3: string;
      v2: string;
      v1: string;
    };
  };

  PD: {
    label: string;
    versions: {
      "CC0 1.0": {
        label: string;
        link: string;
      };
      "CC PDM": {
        label: string;
        link: string;
      };
    };
  };

  "ODC PDDL": string;

  "CC PDM": {
    label: string;
    link: string;
  };

  C: string;
};
