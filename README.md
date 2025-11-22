# Shani's English Learning Games 🚀

An interactive English learning platform featuring vocabulary games and irregular verb practice with multiple engaging game modes.

## 🎮 Game Modes

### Vocabulary Games

#### 1. Multiple Choice Game (Easy)
- Choose the correct answer from 4 options
- Both English → Hebrew and Hebrew → English
- 20 questions per game
- Great for beginners

#### 2. Typing Challenge (Hard)
- Type the English translation yourself
- Hebrew → English only
- 20 questions per game
- Tests spelling and recall

### Irregular Verb Games ⭐ NEW

#### 3. Multiple Choice Verbs
- Sequential questions for V2 (Past Simple) and V3 (Past Participle)
- 4 answer choices per question
- Wrong answers reappear for extra practice
- Progress through multiple levels
- 80+ built-in irregular verbs

#### 4. Drag & Drop Verbs
- Drag colorful word chips into V2/V3 boxes
- Visual feedback (green=correct, red=wrong)
- Shows correct answers for mistakes
- Interactive and fun interface
- Perfect for kinesthetic learners

## 📚 Features

### Vocabulary Games
- **84 Vocabulary Words** from Shani's custom word list
- **Separate Leaderboards** for each game mode
- **Progress Tracking** with score percentages
- **CSV Upload** - use your own word lists

### Irregular Verb Games
- **80+ Irregular Verbs** built-in (be, go, see, do, make, etc.)
- **Two Interactive Modes** - Multiple Choice & Drag-Drop
- **Smart Learning** - wrong answers reappear for practice
- **Customizable** - use your own verb lists
- **Beautiful Animations** - smooth transitions with Framer Motion

### General
- **Responsive Design** works on desktop, tablet, and mobile
- **Beautiful UI** with gradient backgrounds and smooth animations
- **Modular Components** - easy to integrate into other projects

## 🚀 Getting Started

### Prerequisites
- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd EnglishTest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📝 Word List

The app uses a CSV file (`English-Hebrew-Words_Shani.csv`) with 84 vocabulary words. You can upload your own CSV file with the format:

```
english,hebrew
Article,מאמר
Care,להיות אכפת
...
```

## 🌐 Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

## 🛠️ Technologies

- **React** - UI framework
- **Framer Motion** - Smooth animations and gestures
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Create React App** - Build setup

## 📦 Component Documentation

### Irregular Verb Game Component

The irregular verb game is available as a standalone, reusable React component. See [`IRREGULAR_VERBS_README.md`](./IRREGULAR_VERBS_README.md) for detailed documentation including:

- Installation instructions
- API reference
- Usage examples
- Customization options
- Integration guide

**Quick Example:**
```jsx
import IrregularVerbGame from './src/IrregularVerbGame';

function App() {
  return <IrregularVerbGame mode="drag" />;
}
```

**Demo Component:**
Check out `src/IrregularVerbGameDemo.jsx` for a complete demo with mode switching and custom configurations.

## 📄 License

This project is for educational purposes.

---

Made with ❤️ for Shani
