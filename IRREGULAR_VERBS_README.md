# Irregular Verb Game Component 🎮

An interactive React component for learning English irregular verbs with two engaging game modes: **Multiple Choice** and **Drag & Drop**.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.4-pink)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.2-teal)

## ✨ Features

- **Two Game Modes**:
  - 🎯 **Multiple Choice**: Sequential questions for V2 (Past Simple) and V3 (Past Participle)
  - 🎨 **Drag & Drop**: Interactive drag-and-drop interface with colorful chips
  
- **Built-in Verb List**: 80+ common irregular verbs included by default
- **Customizable**: Supply your own verb list or use the default
- **Beautiful UI**: Modern gradient backgrounds and smooth animations
- **Responsive Design**: Works on desktop and mobile devices
- **Progress Tracking**: Score tracking and visual progress indicators
- **Smart Learning**: Wrong answers are re-queued for practice

## 📦 Installation

### Prerequisites

```bash
npm install react react-dom framer-motion
```

### Required Dependencies

- React 18+
- Framer Motion 10+
- TailwindCSS (for styling)

## 🚀 Quick Start

### Basic Usage

```jsx
import IrregularVerbGame from './IrregularVerbGame';

function App() {
  return <IrregularVerbGame mode="drag" />;
}
```

### Multiple Choice Mode

```jsx
import { IrregularVerbChoiceGame } from './IrregularVerbGame';

function App() {
  return (
    <IrregularVerbChoiceGame
      optionsCount={4}
      initialBatchSize={10}
      onFinish={(results) => {
        console.log(`Final Score: ${results.score}/${results.attempts}`);
      }}
    />
  );
}
```

### Drag & Drop Mode

```jsx
import { IrregularVerbDragGame } from './IrregularVerbGame';

function App() {
  return (
    <IrregularVerbDragGame
      roundSize={3}
      distractorPairs={1}
      onFinish={(results) => {
        console.log(`Final Score: ${results.score}/${results.attempts}`);
      }}
    />
  );
}
```

### Custom Verb List

```jsx
import IrregularVerbGame from './IrregularVerbGame';

const myVerbs = [
  { v1: "go", v2: "went", v3: "gone" },
  { v1: "see", v2: "saw", v3: "seen" },
  { v1: "do", v2: "did", v3: "done" },
];

function App() {
  return <IrregularVerbGame mode="choice" verbs={myVerbs} />;
}
```

## 📋 API Reference

### `IrregularVerbGame` (Default Export)

Main wrapper component that switches between game modes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"choice" \| "drag"` | `"drag"` | Game mode to use |
| `verbs` | `Array<{v1, v2, v3}>` | `DEFAULT_VERBS` | Custom verb list |
| `optionsCount` | `number` | `4` | Number of options (choice mode) |
| `initialBatchSize` | `number` | `10` | Verbs per batch (choice mode) |
| `roundSize` | `number` | `3` | Verbs per round (drag mode) |
| `distractorPairs` | `number` | `1` | Extra wrong answers (drag mode) |
| `onFinish` | `(results) => void` | `undefined` | Callback when game completes |

### `IrregularVerbChoiceGame`

Multiple choice quiz component.

**Props:**
- `verbs`: Array of verb objects
- `optionsCount`: Number of answer choices (default: 4)
- `initialBatchSize`: Number of verbs per level (default: 10)
- `onFinish`: Callback function with `{score, attempts}`

**Features:**
- Sequential V2 and V3 questions for each verb
- Wrong answers re-appear later for practice
- Level-based progression
- Immediate feedback with correct answers shown

### `IrregularVerbDragGame`

Drag-and-drop matching game.

**Props:**
- `verbs`: Array of verb objects
- `roundSize`: Number of verbs per round (default: 3)
- `distractorPairs`: Number of distractor verbs (default: 1)
- `onFinish`: Callback function with `{score, attempts}`

**Features:**
- Drag colorful chips into V2/V3 boxes
- Click placed chips to remove them
- Automatic checking when all boxes filled
- Visual feedback (green=correct, red=wrong)
- Shows correct answers for mistakes

## 🎨 Styling

The component uses TailwindCSS utility classes. Make sure you have TailwindCSS configured in your project.

### Required Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📚 Default Verb List

The component includes 80+ common irregular verbs:

- be, beat, become, begin, break, bring, build, buy, catch, choose...
- All with correct V2 (Past Simple) and V3 (Past Participle) forms
- Includes variants like "was/were" for "be" and "got/gotten" for "get"

## 🎯 Use Cases

- **Educational Apps**: English learning platforms
- **Classroom Tools**: Interactive teaching materials
- **Language Learning**: Self-study practice
- **Quiz Applications**: Assessment and testing
- **Kids Learning**: Fun and engaging interface

## 🛠️ Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more verbs
- Improve animations
- Add new game modes
- Enhance mobile experience
- Fix bugs

## 🙏 Acknowledgments

- Built with React and Framer Motion
- Styled with TailwindCSS
- Inspired by modern language learning apps

## 📞 Support

If you have questions or need help, please open an issue on GitHub.

---

Made with ❤️ for English learners everywhere

