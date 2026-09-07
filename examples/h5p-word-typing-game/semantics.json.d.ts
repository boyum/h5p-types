declare const json: [
  {
    "label": "Task description",
    "name": "description",
    "description": "A guide telling the user how to play the game.",
    "type": "text",
    "optional": true
  },
  {
    "label": "Words",
    "name": "words",
    "type": "group",
    "widget": "WordTypingGameEditor",
    "importance": "low",
    "expanded": true,
    "fields": [
      {
        "label": "Language",
        "name": "language",
        "description": "Choose the language of the word list. The game comes with prefilled word lists.",
        "type": "select",
        "options": [
          { "value": "en", "label": "English" },
          { "value": "nb", "label": "Norwegian bokmål" }
        ],
        "default": "en"
      },
      {
        "label": "Custom words",
        "name": "customWords",
        "description": "Add your own words, one per line. If left empty, the prefilled word list for the chosen language is used.",
        "type": "text",
        "widget": "textarea",
        "optional": true
      }
    ]
  },
  {
    "name": "behaviour",
    "type": "group",
    "label": "Behavioural settings",
    "importance": "low",
    "description": "These options will let you control how the game behaves.",
    "fields": [
      {
        "label": "Fall speed",
        "name": "fallSpeed",
        "description": "How fast words fall, in pixels per second.",
        "type": "number",
        "min": 10,
        "max": 500,
        "default": 60,
        "unit": "px/s"
      },
      {
        "label": "Spawn interval",
        "name": "spawnInterval",
        "description": "Time between each word being spawned, in milliseconds.",
        "type": "number",
        "min": 500,
        "max": 10000,
        "default": 2000,
        "unit": "ms"
      },
      {
        "label": "Max words on screen",
        "name": "maxWordsOnScreen",
        "description": "Maximum number of words visible at the same time.",
        "type": "number",
        "min": 1,
        "max": 15,
        "default": 6
      },
      {
        "label": "Max misses",
        "name": "maxMisses",
        "description": "Number of missed words before the game ends. Set to 0 for endless play.",
        "type": "number",
        "min": 0,
        "max": 50,
        "default": 3
      },
      {
        "label": "Increase difficulty over time",
        "name": "increaseDifficulty",
        "description": "Words spawn faster and fall faster the longer you play.",
        "type": "boolean",
        "default": true
      }
    ]
  },
  {
    "label": "Localization",
    "name": "l10n",
    "type": "group",
    "importance": "low",
    "common": true,
    "fields": [
      {
        "label": "Instruction text",
        "name": "instructionText",
        "default": "Type the falling words before they reach the bottom!",
        "type": "text"
      },
      {
        "label": "Text for \"Start\" button",
        "name": "startButton",
        "default": "Start",
        "type": "text"
      },
      {
        "label": "Text for \"Restart\" button",
        "name": "restartButton",
        "default": "Restart",
        "type": "text"
      },
      {
        "label": "Score label",
        "name": "scoreLabel",
        "default": "Score",
        "type": "text"
      },
      {
        "label": "Missed label",
        "name": "missedLabel",
        "default": "Missed",
        "type": "text"
      },
      {
        "label": "Game over title",
        "name": "gameOverTitle",
        "default": "Game over",
        "type": "text"
      },
      {
        "label": "Game over description",
        "name": "gameOverDescription",
        "default": "You missed @missed word(s).",
        "type": "text"
      },
      {
        "label": "Final score description",
        "name": "finalScoreDescription",
        "default": "Your final score: @score",
        "type": "text"
      }
    ]
  }
]
export default json;