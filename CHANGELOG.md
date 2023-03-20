# Changelog

## [1.15.0](https://github.com/boyum/h5p-types/compare/v1.14.0...v1.15.0) (2023-03-20)


### Features

* **translation-params:** split by returns and stop characters ([ad955c8](https://github.com/boyum/h5p-types/commit/ad955c81b5e8ab5fabba4205ab8285b606ee4313))
* **xapievent:** type `getVerb` correctly ([#158](https://github.com/boyum/h5p-types/issues/158)) ([392f788](https://github.com/boyum/h5p-types/commit/392f788846b82fe15517adfb67b7bc0f72cbed53))

## [1.14.0](https://github.com/boyum/h5p-types/compare/v1.13.1...v1.14.0) (2023-03-17)


### Features

* **event-dispatcher:** on/once: if event name is "xAPI", return (e: XAPIEvent) => void; ([#156](https://github.com/boyum/h5p-types/issues/156)) ([1f841f4](https://github.com/boyum/h5p-types/commit/1f841f43ed3920126d52a860ea00b0125be8b43e))

### [1.13.1](https://github.com/boyum/h5p-types/compare/v1.13.0...v1.13.1) (2023-03-16)

## [1.13.0](https://github.com/boyum/h5p-types/compare/v1.12.0...v1.13.0) (2023-03-16)


### Features

* extras with state ([#155](https://github.com/boyum/h5p-types/issues/155)) ([d5ea59d](https://github.com/boyum/h5p-types/commit/d5ea59ded7f850b83e5f95ed0c2c1a47d7474d6c))

## [1.12.0](https://github.com/boyum/h5p-types/compare/v1.11.1...v1.12.0) (2023-02-21)


### Features

* infer that H5PFieldLibrary returns `IH5PContentType` ([#145](https://github.com/boyum/h5p-types/issues/145)) ([bf9d43e](https://github.com/boyum/h5p-types/commit/bf9d43e210c2c036999a17b410e460e44a4023fe))

## [1.11.1](https://github.com/boyum/h5p-types/compare/v1.11.0...v1.11.1) (2023-02-21)


### Features

* allow `IH5PResumableType#getCurrentState` to return `undefined` ([f73c030](https://github.com/boyum/h5p-types/commit/f73c03099f5b11405d60a71f961056640e217199))

## [1.11.0](https://github.com/boyum/h5p-types/compare/v1.10.0...v1.11.0) (2023-02-20)


### Features

* IH5PResumableType ([#143](https://github.com/boyum/h5p-types/issues/143)) ([5a15c90](https://github.com/boyum/h5p-types/commit/5a15c90b6d8a9e67d834faa86d67f5c4edc1723a))

## [1.10.0](https://github.com/boyum/h5p-types/compare/v1.9.0...v1.10.0) (2023-02-17)


### Features

* `IH5PQuestionType` to be used with content types that use some sort of score system ([#142](https://github.com/boyum/h5p-types/issues/142)) ([f97579e](https://github.com/boyum/h5p-types/commit/f97579e19a3480c933374aaba37aae995559b6bd))

## [1.9.0](https://github.com/boyum/h5p-types/compare/v1.8.2...v1.9.0) (2023-02-11)


### Features

* use the `TranslationParams` type to infer translation params ([#139](https://github.com/boyum/h5p-types/issues/139)) ([c8f0a21](https://github.com/boyum/h5p-types/commit/c8f0a21cf9c4e7ef43078f31a39aaf2519fbe101))

## [1.8.2](https://github.com/boyum/h5p-types/compare/v1.8.1...v1.8.2) (2023-02-09)


### Bug Fixes

* export every `H5PField*` type ([afe4cd3](https://github.com/boyum/h5p-types/commit/afe4cd3d20797fcc9e459f4b1e649de58d0904de))

## [1.8.1](https://github.com/boyum/h5p-types/compare/v1.8.0...v1.8.1) (2023-02-09)


### Bug Fixes

* add `type-fest` as prod dependency ([9517386](https://github.com/boyum/h5p-types/commit/95173865c51a191168702994bc32884d4e7c547c))

## [1.8.0](https://github.com/boyum/h5p-types/compare/v1.7.1...v1.8.0) (2023-02-09)


### Code Refactoring

* explicitly export types ([#137](https://github.com/boyum/h5p-types/issues/137)) ([e43b7f7](https://github.com/boyum/h5p-types/commit/e43b7f75f63e93dbd4d2a9f911e907773a7a4fed))


### Build System

* use `conventionalcommits` as release-it preset ([98b296a](https://github.com/boyum/h5p-types/commit/98b296ab80e722c7216a46c86297c7e5d050cfe6))

## [1.7.1](https://github.com/boyum/h5p-types/compare/v1.7.0...v1.7.1) (2023-02-09)