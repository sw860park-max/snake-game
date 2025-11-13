# 🐍 Snake Web Game

A modern implementation of the classic Snake game built with React, TypeScript, and Vite.

## Features

- **Classic Snake Gameplay**: Move, eat apples, grow, and avoid collisions
- **Multiple Wall Modes**: Normal (walls kill), Wrap (teleport to opposite side), Obstacles (random barriers)
- **Power-ups & Items**:
  - 🍎 Apple: Basic food (+1 length, +10 score)
  - ⭐ Bonus: Extra points (+2 length, +50 score)
  - 💣 Bomb: Instant death (unless invincible)
  - 🐌 Slow: Reduces game speed temporarily
  - 🛡️ Invincible: Temporary immunity to collisions
- **Mission System**: Complete challenges and daily missions
- **Achievements**: Unlock achievements by reaching milestones
- **Local Leaderboard**: Top 10 rankings saved locally
- **PWA Support**: Install and play offline
- **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for blazing fast builds
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Canvas 2D** for rendering
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **vite-plugin-pwa** for Progressive Web App support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

**Local only:**
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

**Network access (other devices on same Wi-Fi):**
```bash
# Use the network-enabled start script
start-network.bat

# Or manually:
npm run dev
# Then access from: http://[YOUR-IP]:5173
```

### Building

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deployment

**Quick Deploy to Vercel (Recommended):**
```bash
# One-time setup
npm install -g vercel

# Deploy (Windows)
deploy-vercel.bat

# Or manually
vercel --prod
```

**Other Options:**
- **Netlify**: Drag & drop `dist` folder to https://app.netlify.com/drop
- **GitHub Pages**: See `NETWORK_ACCESS.md`

See `NETWORK_ACCESS.md` for detailed deployment instructions.

### Testing

Run unit tests:
```bash
npm run test
```

Run E2E tests:
```bash
npm run test:e2e
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Controls

- **Arrow Keys** or **WASD**: Move snake
- **Space** or **Escape**: Pause game
- **Touch/Swipe**: Mobile controls

## Game Mechanics

- **Fixed Tick Loop**: 10-20 TPS (configurable)
- **60 FPS Rendering**: Smooth animation with requestAnimationFrame
- **Direction Queue**: Prevents 180° turns and input loss
- **Weighted Item Spawning**: Different items have different spawn rates
- **Item TTL**: Some items expire after a time
- **Colorblind-Friendly**: Distinct colors and emoji indicators

## Project Structure

```
src/
├── game/           # Core game logic
│   ├── engine.ts   # Game loop and state updates
│   ├── grid.ts     # Coordinate utilities
│   ├── snake.ts    # Snake movement and collision
│   ├── items.ts    # Item spawning and effects
│   ├── rng.ts      # Seeded random number generator
│   └── missions.ts # Mission and achievement logic
├── state/          # State management
│   └── store.ts    # Zustand store
├── ui/             # React components
│   ├── CanvasView.tsx
│   ├── Hud.tsx
│   ├── Menus.tsx
│   ├── Settings.tsx
│   └── Profile.tsx
├── utils/          # Utilities
│   ├── storage.ts  # Local storage
│   └── input.ts    # Keyboard and touch input
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Use **Conventional Commits** format
2. Run linter and formatter before committing
3. Write tests for new features
4. Maintain 60fps performance target

## License

MIT

## Acknowledgments

Built following modern web game development best practices with accessibility and performance in mind.

