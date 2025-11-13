# Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Testing

### Unit Tests
```bash
npm run test
```

Runs Vitest tests for:
- Grid utilities
- Snake movement and collision
- RNG functionality
- Item mechanics

### E2E Tests
```bash
npm run test:e2e
```

Runs Playwright tests for:
- Menu navigation
- Game start and controls
- Settings changes
- Score tracking

## Code Quality

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## PWA Installation

After building the project:
1. Serve the `dist` folder using a web server
2. Open in a browser (Chrome, Edge, Safari)
3. Look for the "Install" button in the address bar
4. The game can now be played offline!

## Development Notes

- Game runs at 60 FPS with configurable tick rate (10-20 TPS)
- Uses Canvas 2D for rendering with dirty rendering optimization
- Zustand for lightweight state management
- Local storage for profile, settings, and rankings
- Seeded RNG for reproducible gameplay

## File Structure

```
├── src/
│   ├── game/          # Core game logic (engine, snake, items, etc.)
│   ├── state/         # Zustand store
│   ├── ui/            # React components
│   ├── utils/         # Storage and input handlers
│   ├── App.tsx        # Main app
│   └── main.tsx       # Entry point
├── tests/             # E2E tests
├── public/            # Static assets
└── dist/              # Production build (after npm run build)
```

## Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

### Test Failures
- For E2E tests, ensure dev server is running
- Check that port 5173 is available

### PWA Not Working
- PWA requires HTTPS in production (or localhost)
- Check browser console for service worker errors
- Clear browser cache and re-register service worker

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Game targets 60 FPS
- Lower grid size in settings for slower devices
- Reduce tick rate for easier gameplay
- Disable effects if needed for better performance

