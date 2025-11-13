# 🚀 Quick Start Guide

## One-Line Start

```bash
npm install && npm run dev
```

Then open **http://localhost:5173** in your browser!

---

## Step-by-Step

### 1️⃣ Install Dependencies (First Time Only)
```bash
npm install
```
This installs React, TypeScript, Vite, Zustand, Tailwind, and all other dependencies.

### 2️⃣ Start Development Server
```bash
npm run dev
```
The game will open at http://localhost:5173

### 3️⃣ Play!
- Click **"Start Game"** on the main menu
- Use **Arrow Keys** or **WASD** to control the snake
- Press **Space** to pause
- Eat apples 🍎 to grow and score points!

---

## Controls

| Input | Action |
|-------|--------|
| ⬆️ Arrow Up / W | Move Up |
| ⬇️ Arrow Down / S | Move Down |
| ⬅️ Arrow Left / A | Move Left |
| ➡️ Arrow Right / D | Move Right |
| Space / Escape | Pause Game |
| 👆 Swipe | Mobile Control |

---

## Game Modes

### 🧱 Normal Mode
Hit the wall and you die. Classic snake!

### 🔄 Wrap Mode
Pass through walls and appear on the opposite side.

### ⚠️ Obstacles Mode
Random barriers on the grid. Avoid them!

---

## Items & Power-ups

| Item | Effect | Points | Duration |
|------|--------|--------|----------|
| 🍎 Apple | Grow +1 | +10 | Permanent |
| ⭐ Bonus | Grow +2 | +50 | 5 seconds |
| 💣 Bomb | Death! | 0 | 6 seconds |
| 🐌 Slow | 40% slower | +20 | 5 seconds |
| 🛡️ Invincible | Immune | +30 | 5 seconds |

---

## Building for Production

```bash
npm run build
```
Creates optimized build in `dist/` folder.

```bash
npm run preview
```
Preview the production build locally.

---

## Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

---

## PWA Installation

After building:
1. Serve the `dist` folder on HTTPS
2. Open in Chrome/Edge/Safari
3. Click "Install" button in address bar
4. Play offline anytime!

---

## Customization

### Change Game Speed
1. Go to ⚙️ **Settings**
2. Adjust **Speed** slider (5-20 TPS)
3. Start new game

### Change Grid Size
1. Go to ⚙️ **Settings**
2. Adjust **Grid Width** and **Grid Height**
3. Start new game

### Toggle Features
- **Sound Effects**: On/Off
- **Vibration**: On/Off (mobile)
- **Wall Mode**: Normal / Wrap / Obstacles

---

## Tips for High Scores

1. 🎯 **Plan Ahead**: Look where items spawn
2. 🔄 **Use Wrap Mode**: Easier to survive longer
3. 🛡️ **Grab Invincible**: Ignore collisions temporarily
4. 🐌 **Use Slow Power**: Gives you time to think
5. 💣 **Avoid Bombs**: They expire after 6 seconds
6. 📊 **Complete Missions**: Earn bonus points

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Game Laggy
1. Go to Settings
2. Reduce Grid Size (e.g., 20x15)
3. Lower Speed

---

## Project Structure

```
SnakeGame/
├── src/
│   ├── game/       # Core game logic
│   ├── ui/         # React components
│   ├── state/      # Zustand store
│   └── utils/      # Helpers
├── tests/          # E2E tests
├── public/         # Static assets
└── dist/           # Production build
```

---

## Need Help?

- 📖 Check `README.md` for detailed documentation
- 🎯 See `FEATURES.md` for complete feature list
- 🛠️ Read `SETUP.md` for advanced setup
- 🐛 Check browser console for errors

---

## Have Fun! 🎮🐍

Enjoy the game and feel free to customize it further!

