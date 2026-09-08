const styleId = "h5p-word-typing-game-editor-style";

const css = `
.h5p-word-typing-game-editor {
  padding: 12px;
  font-family: "Courier New", Courier, monospace;
  color: #333;
}

.h5p-word-typing-game-editor__label {
  display: block;
  margin: 0 0 4px;
  font-weight: bold;
  font-size: 14px;
}

.h5p-word-typing-game-editor__select,
.h5p-word-typing-game-editor__textarea {
  display: block;
  width: 100%;
  padding: 6px 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;
}

.h5p-word-typing-game-editor__textarea {
  min-height: 120px;
  resize: vertical;
}

.h5p-word-typing-game-editor__info {
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
}
`;

export function ensureEditorStyles(): void {
  if (document.getElementById(styleId) !== null) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}
