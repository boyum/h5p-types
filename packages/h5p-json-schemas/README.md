# h5p-json-schemas

This repository contains JSON schemas for H5P content types and libraries.
The schemas can be used to improve developer experience when creating H5P related JSON files such as `library.json` and `semantics.json`.

The files are deployed to <https://h5p-schema.sindre.is> on the format `<file-name>.schema.json`.

- [library.json](https://h5p-schema.sindre.is/library.schema.json)
- [semantics.json](https://h5p-schema.sindre.is/semantics.schema.json)

## Usage

`library.json`:

```json
{
  "$schema": "https://h5p-schema.sindre.is/library.schema.json",
  "title": "My Library",
  "machineName": "H5P.MyLibrary",
  "majorVersion": 1,
  "minorVersion": 0,
  "patchVersion": 0
}
```
