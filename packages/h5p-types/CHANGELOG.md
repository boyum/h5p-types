# Changelog

### [2.0.1](https://github.com/boyum/h5p-types/compare/v2.0.0...v2.0.1) (2023-06-04)


### Documentation

* add links to packages ([46327c8](https://github.com/boyum/h5p-types/commit/46327c87790fb6cf399055ee66a7033593184b85))
* add readme for root project ([6eaf4c5](https://github.com/boyum/h5p-types/commit/6eaf4c5c5d44a1a56eddb0479c324b56d055f690))
* clean up changelog ([269f784](https://github.com/boyum/h5p-types/commit/269f784e7eb0f3d631f7f2dcf98b9b0880ca75f5))


### Build System

* 1.0.6 ([063f4e2](https://github.com/boyum/h5p-types/commit/063f4e280c5aeb77b01774e802f188da56c8a891))
* 2.0.1 ([b2c9cc3](https://github.com/boyum/h5p-types/commit/b2c9cc32915110d069d05d2f6f20b6c5c85b75ed))
* add `homepage` to package.json ([9afa516](https://github.com/boyum/h5p-types/commit/9afa516311c79b1e33c316691f0a55f380d24bc1))
* add `typecheck` commands ([d8794e5](https://github.com/boyum/h5p-types/commit/d8794e5b26812c09454471d050eb693e6b8fe4a3))
* install both arm64 and x64 versions of turbo ([b296b50](https://github.com/boyum/h5p-types/commit/b296b504bac3e708f67c113d8bbb80231e832979))
* move `prettierignore` to root project ([38ef9eb](https://github.com/boyum/h5p-types/commit/38ef9ebd9a4cdab6fccef1a6270b9dbedc7da917))
* refactor project into a monorepo with Turborepo ([9489743](https://github.com/boyum/h5p-types/commit/9489743625e75c2c9e8e1fbab6e83d477fb1900a))
* refactor project into a monorepo with Turborepo ([3e2fe78](https://github.com/boyum/h5p-types/commit/3e2fe783e6795d10627055486b3e8c63058edb56))
* v2.0.0 ([802f963](https://github.com/boyum/h5p-types/commit/802f9632a4e63f64193daec82a030b6131e20b13))

## [2.0.0](https://github.com/boyum/h5p-types/compare/v1.18.1...v2.0.0) (2023-05-31)


### Tests

* add example projects for h5p content type and widget ([89a69cc](https://github.com/boyum/h5p-types/commit/89a69cc53b379fb21bb752a24f7c776ae4c881aa))

### Build System

* set minimum TS version to 4.9 ([4a6d287](https://github.com/boyum/h5p-types/commit/4a6d2874965de8405c9fb6a304f7d42d026aba8a))

### [1.18.1](https://github.com/boyum/h5p-types/compare/v1.18.0...v1.18.1) (2023-05-16)


### Bug Fixes

* **H5PEditor:** `createButon` -> `createButton` ([#192](https://github.com/boyum/h5p-types/issues/192)) ([ae6d9c8](https://github.com/boyum/h5p-types/commit/ae6d9c8c865900a56bb2a6915d9b6df641c24670))


### Build System

* update deps ([6543213](https://github.com/boyum/h5p-types/commit/6543213e383f9836156fbe6da88eab47a04ab2d9))
* update vm2 to 3.9.19 ([e194b39](https://github.com/boyum/h5p-types/commit/e194b39229202c81945986cbe094b829197925e3))

## [1.18.0](https://github.com/boyum/h5p-types/compare/v1.17.0...v1.18.0) (2023-05-04)


### Features

* **translation-params:** add possibility for optional prefix ([#188](https://github.com/boyum/h5p-types/issues/188)) ([de06e6b](https://github.com/boyum/h5p-types/commit/de06e6b44031172e61a944f33c03f6f72a328e54))

## [1.17.0](https://github.com/boyum/h5p-types/compare/v1.16.2...v1.17.0) (2023-05-03)


### Code Refactoring

* **H5PObject:** change from type to interface ([#187](https://github.com/boyum/h5p-types/issues/187)) ([26bd616](https://github.com/boyum/h5p-types/commit/26bd616d10571ba9336a172a052cf66c16ac57cb))

### [1.16.2](https://github.com/boyum/h5p-types/compare/v1.16.1...v1.16.2) (2023-04-23)


### Bug Fixes

* make `XAPIInteractionType` a union of specified interaction types and H5P specific ones ([5020935](https://github.com/boyum/h5p-types/commit/5020935298b86e41d6ced3704a203445128510dc))

### [1.16.1](https://github.com/boyum/h5p-types/compare/v1.16.0...v1.16.1) (2023-04-21)


### Features

* export XAPIData ([3fb8ede](https://github.com/boyum/h5p-types/commit/3fb8ede3a6495a7e7013fd55865667b12a4e3eed))

## [1.16.0](https://github.com/boyum/h5p-types/compare/v1.15.2...v1.16.0) (2023-04-21)


### Features

* add H5P specific XAPIInteractionType `compound` ([b7f457e](https://github.com/boyum/h5p-types/commit/b7f457ee08cadcfa18cb7520acaba7f750e8f1d1))

### [1.15.2](https://github.com/boyum/h5p-types/compare/v1.15.1...v1.15.2) (2023-04-21)


### Features

* export EventDispatcher and InferL10nType ([207d4a3](https://github.com/boyum/h5p-types/commit/207d4a3c498e9919cbfd7f49298feb72bdc80d5b))


### Tests

* import tests from module instead of directly from files ([80cca01](https://github.com/boyum/h5p-types/commit/80cca010cb6ee77bcbc391c6321c1b39531a45d8))


### Build System

* update `@tsconfig/strictest` to v2 ([c8faee0](https://github.com/boyum/h5p-types/commit/c8faee036ef75b071b2354f10837cef316148cb1))

### [1.15.1](https://github.com/boyum/h5p-types/compare/v1.15.0...v1.15.1) (2023-04-21)


### Bug Fixes

* improve XAPI related types ([#177](https://github.com/boyum/h5p-types/issues/177)) ([e43f5c4](https://github.com/boyum/h5p-types/commit/e43f5c4b248a758ccc23693396fe8bb5b7467a2f))
* update dependency with critical vulnerability ([bb04a93](https://github.com/boyum/h5p-types/commit/bb04a935d752a1d93f4112d09bb8de25e07f57d7))

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

### [1.11.1](https://github.com/boyum/h5p-types/compare/v1.11.0...v1.11.1) (2023-02-21)


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

### [1.8.2](https://github.com/boyum/h5p-types/compare/v1.8.1...v1.8.2) (2023-02-09)


### Bug Fixes

* export every `H5PField*` type ([afe4cd3](https://github.com/boyum/h5p-types/commit/afe4cd3d20797fcc9e459f4b1e649de58d0904de))

### [1.8.1](https://github.com/boyum/h5p-types/compare/v1.8.0...v1.8.1) (2023-02-09)


### Bug Fixes

* add `type-fest` as prod dependency ([9517386](https://github.com/boyum/h5p-types/commit/95173865c51a191168702994bc32884d4e7c547c))

## [1.8.0](https://github.com/boyum/h5p-types/compare/v1.7.1...v1.8.0) (2023-02-09)


### Code Refactoring

* explicitly export types ([#137](https://github.com/boyum/h5p-types/issues/137)) ([e43b7f7](https://github.com/boyum/h5p-types/commit/e43b7f75f63e93dbd4d2a9f911e907773a7a4fed))


### Build System

* use `conventionalcommits` as release-it preset ([98b296a](https://github.com/boyum/h5p-types/commit/98b296ab80e722c7216a46c86297c7e5d050cfe6))

## [1.7.1](https://github.com/boyum/h5p-types/compare/v1.7.0...v1.7.1) (2023-02-09)