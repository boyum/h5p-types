# H5P Word Typing Game — Implementation Plan

## Context

The user wants to create a new H5P content type: a **word typing game** adapted from `~/dev/personal/starry-night` (a ThreeJS 3D typing idle game). The H5P version will be **simplified to 2D/DOM**, keeping only the core mechanic: words fall from the top, the player types them before they reach the bottom.

The project requires:
1. A **user-facing content type** (the game itself)
2. An **editor widget** for configuring languages and word lists
3. A **word lists package** with ~1000–5000 words for English and Norwegian Bokmål
4. A **Storybook harness** (publishable package) for dev/test of both components

---

## New Packages

### 1. `packages/h5p-word-typing-game-words/` — Shared word lists

**Purpose:** Provide prebuilt word lists as a standalone, importable package.

```
packages/h5p-word-typing-game-words/
├── package.json          # name: h5p-word-typing-game-words, type: module
├── tsconfig.json         # extends tsconfig-base
├── src/
│   ├── index.ts          # exports getWords(lang) + type WordList
│   ├── en.ts             # export const en: string[] (~2000 words)
│   └── nb.ts             # export const nb: string[] (~2000 words, Norwegian Bokmål)
└── dist/                 # built output
```

- Each word list is a simple `string[]` export
- `getWords(lang: "en" | "nb"): string[]` helper function
- Words: common, everyday vocabulary, 3–12 letters, lowercase
- **English:** Pull from a public-domain word frequency list (e.g., the top ~2000 most common English words)
- **Norwegian Bokmål:** Pull from a public-domain Norwegian word list (e.g., Riksmålsordlisten or a frequency corpus)
- Both lists will be curated/generated to be clean (no profanity, no proper nouns, no multi-word phrases)

### 2. `examples/h5p-word-typing-game/` — User-facing content type

**Purpose:** The game itself — words fall, player types, score accumulates.

```
examples/h5p-word-typing-game/
├── package.json
├── tsconfig.json
├── library.json
├── semantics.json
├── semantics.json.d.ts    # auto-generated
├── library.json.d.ts      # auto-generated
├── src/
│   ├── h5p-word-typing-game.ts   # main entry — ContentType class
│   ├── Game.ts                   # game engine (spawn, fall, type, score)
│   ├── WordElement.ts            # single falling word (DOM element)
│   └── types.ts                  # Params, State, Word interface
├── h5p-extensions.d.ts           # import "h5p-types-joubel-ui"
└── webpack.config.js
```

**Key design:**
- Extends `H5PResumableContentType<Params, State>` (resumable — saves score/difficulty/active words)
- **State:** `{ score: number, difficulty: number, activeWords: ActiveWord[], highScore: number }`
- **Params** (from semantics.json): language, fallSpeed, spawnRate, l10n strings

**Game mechanics (adapted from starry-night, simplified):**
- Words are absolutely-positioned `<span>` elements inside the wrapper
- `requestAnimationFrame` loop moves words downward based on `fallSpeed × difficulty`
- Player types into a hidden input; matching prefix highlights the best-matching word
- Completing a word: remove it, increase score (word length × difficulty multiplier), bump difficulty
- Word reaches bottom: remove it, no penalty (or optional: score penalty — configurable)
- Difficulty: gradually increases `fallSpeed` and `spawnRate` over time
- Game over: optional (after N misses) or endless mode — controlled by a `behaviour.allowGameOver` boolean in semantics

**2D visual design:**
- Dark background (configurable via CSS)
- Words are white text, matched prefix highlighted in accent color
- Simple CSS transitions for word removal (fade out)
- Score display in corner
- Start/pause overlay

### 3. `examples/h5p-word-typing-game-editor/` — Editor widget

**Purpose:** Custom H5P editor widget for configuring the game — language selection, word lists, difficulty.

```
examples/h5p-word-typing-game-editor/
├── package.json
├── tsconfig.json
├── library.json
├── src/
│   ├── h5p-word-typing-game-editor.ts   # main entry — Widget class
│   └── EditorUI.ts                       # DOM rendering for the editor form
└── webpack.config.js
```

**Key design:**
- Extends `H5PWidget<H5PFieldGroup, Params>` implementing `IH5PWidget`
- Registered via `registerWidget("H5PWordTypingGame", "H5PWordTypingGameEditor", Widget)`
- Uses `H5PEditor.processSemanticsChunk` for standard fields
- Custom DOM for the word list editor section

**Editor UI features:**
- Language dropdown (English, Norwegian Bokmål) — selecting loads prefilled words
- "Use custom words" toggle — when on, shows textarea for pasting words
- Prefilled word count display (e.g., "2,347 words loaded")
- Difficulty sliders/number inputs (fall speed, spawn rate)
- All standard l10n fields for translatable UI strings

### 4. `packages/h5p-storybook-harness/` — Storybook dev/test harness

**Purpose:** Storybook setup for developing and testing H5P content types. Eventually publishable to npm.

```
packages/h5p-storybook-harness/
├── package.json
├── tsconfig.json
├── .storybook/
│   ├── main.ts              # Storybook config (stories glob, addons, framework)
│   └── preview.ts           # decorators, global types
├── src/
│   ├── decorators/
│   │   └── H5PDecorator.tsx # provides H5PContext, ContentIdContext, LocalizationContext mocks
│   ├── utils/
│   │   └── renderH5P.ts     # helper to instantiate a content type with mock params
│   ├── stories/
│   │   ├── WordTypingGame.stories.ts
│   │   └── WordTypingGameEditor.stories.ts
│   └── index.ts             # public API exports (for npm publishing)
└── vite.config.ts           # Vite for Storybook + build for npm
```

**H5P mocking strategy:**
- `H5PContext` value: mock object with `trigger()`, `on()` stubs
- `ContentIdContext` value: fixed test content ID
- `LocalizationContext` value: default English l10n from semantics
- `window.H5P` / `window.H5PEditor` globals: minimal stubs
- `jQuery`: provided as a peer dependency or mocked minimally (H5PContentTypes expect `$wrapper`)

**Stories:**
- **Game — Default:** Game with English words, default settings, play interactively
- **Game — Norwegian:** Game with Norwegian word list
- **Game — Custom Words:** Game with user-provided word list
- **Editor — Default:** Editor widget with default params
- **Editor — With Config:** Editor widget pre-populated with saved params

---

## Existing Files to Modify

### Root `package.json`
- Add `"packages/h5p-word-typing-game-words"` to workspaces (already covered by `packages/*` glob)
- No change needed — `packages/*` glob already includes new packages

### Root `turbo.json`
- No change needed — existing `build`, `dev`, `typecheck` tasks apply to all workspace packages

---

## Implementation Order

1. **Word lists package** (`packages/h5p-word-typing-game-words/`)
   - Create `package.json`, `tsconfig.json`
   - Generate/curate English word list (`src/en.ts`)
   - Generate/curate Norwegian Bokmål word list (`src/nb.ts`)
   - Write `src/index.ts` with `getWords()` export
   - Build and verify

2. **Game content type** (`examples/h5p-word-typing-game/`)
   - Create `package.json`, `tsconfig.json`, `library.json`, `semantics.json`
   - Implement `Game.ts` — core game engine (DOM-based)
   - Implement `WordElement.ts` — single falling word
   - Implement `h5p-word-typing-game.ts` — H5P ContentType wrapper
   - Create `h5p-extensions.d.ts`
   - Configure webpack build
   - Build and typecheck

3. **Editor widget** (`examples/h5p-word-typing-game-editor/`)
   - Create `package.json`, `tsconfig.json`, `library.json`
   - Implement `EditorUI.ts` — DOM rendering for language/word config
   - Implement `h5p-word-typing-game-editor.ts` — H5P Widget wrapper
   - Configure webpack build
   - Build and typecheck

4. **Storybook harness** (`packages/h5p-storybook-harness/`)
   - Create `package.json`, `tsconfig.json`
   - Install and configure Storybook 8 with Vite
   - Create H5P mock decorator
   - Create stories for game and editor
   - Implement `renderH5P()` utility
   - Export public API for future npm publishing
   - Verify both stories render and are interactive

5. **Integration testing**
   - Run Storybook, verify game is playable
   - Verify editor configures game params correctly
   - Verify state save/restore (resumable)
   - Verify both languages work

---

## Key Conventions to Follow

- **Type inference:** `InferParamsFromSemantics<typeof semantics>` for params type
- **JSON DTS:** `unplugin-json-dts` webpack plugin auto-generates `*.json.d.ts`
- **Registration:** `registerContentType(name, Class)` for game, `registerWidget(h5pName, widgetName, Class)` for editor
- **Build:** webpack with `ts-loader` + `unplugin-json-dts` (matching existing examples)
- **tsconfig:** extend `tsconfig-base` for game/editor, standalone for word-lists package
- **Module format:** `"type": "module"` throughout
- **No comments** in code (repo convention)
- **Biome** for formatting/linting (no ESLint/Prettier)

---

## Verification

- `npm run typecheck` from root — all new packages pass
- `npm run build` from root — all new packages build successfully
- `npm run code-style` from root — Biome passes on all new files
- Storybook launches and both stories render interactively
- Game: words fall, typing completes them, score updates, state saves/resumes
- Editor: language selection loads prefilled words, custom word toggle works, params propagate to game
