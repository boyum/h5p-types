const styleId = "h5p-word-typing-game-style";

const css = `
.h5p-word-typing-game {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  background-color: #11111b;
  font-family: "Courier New", Courier, monospace;
  user-select: none;
  color: #f2f2f2;
}

.h5p-word-typing-game__play-area {
  position: absolute;
  inset: 0;
}

.h5p-word-typing-game__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.h5p-word-typing-game__falling-word {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 10px;
  font-size: 22px;
  font-weight: bold;
  white-space: nowrap;
  will-change: transform;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}

.h5p-word-typing-game__falling-word .typed-part {
  color: #ff4500;
}

.h5p-word-typing-game__falling-word--complete {
  color: #00ff00;
  transition: opacity 250ms ease-out, transform 250ms ease-out;
}

.h5p-word-typing-game__falling-word--complete .typed-part {
  color: #00ff00;
}

.h5p-word-typing-game__falling-word--missed {
  color: #ff3b3b;
  transition: opacity 300ms ease-out;
}

.h5p-word-typing-game__hud {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 24px;
  font-size: 16px;
  z-index: 2;
}

.h5p-word-typing-game__hud-value {
  color: #ffd700;
  font-weight: bold;
}

.h5p-word-typing-game__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
  background-color: rgba(17, 17, 27, 0.92);
  z-index: 3;
}

.h5p-word-typing-game__overlay[hidden] {
  display: none;
}

.h5p-word-typing-game__instruction {
  font-size: 18px;
  line-height: 1.6;
}

.h5p-word-typing-game__overlay-title {
  font-size: 26px;
  margin: 0;
}

.h5p-word-typing-game__button {
  padding: 10px 28px;
  border: none;
  border-radius: 4px;
  background-color: #34344a;
  color: #f2f2f2;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}

.h5p-word-typing-game__button:hover {
  background-color: #4a4a66;
}
`;

export function ensureGameStyles(): void {
  if (document.getElementById(styleId) !== null) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}
