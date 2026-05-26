# AGENTS.md — AI Assistant Guide

This file provides context for AI coding assistants (opencode, Cursor, Windsurf, etc.)
to understand the project structure, conventions, and workflows.

## Project Overview

- **Name**: Relax Sound — Premium Relaxation Sound App
- **Description**: A premium relaxation sound application with timer, ambient sound mixing, 3D audio visualizer, and meditation features
- **Stack**: React 18 + TypeScript 5.5 (strict) + Vite 6 + Tailwind CSS 3.4
- **Routing**: React Router 6 (client-side)
- **State**: React Context + localStorage
- **Audio Engine**: Howler.js
- **3D Graphics**: Three.js
- **Animation**: Framer Motion
- **UI Library**: shadcn/ui (Radix primitives)
- **Mobile**: Capacitor 7 (iOS + Android)
- **Package Manager**: npm (lockfile: package-lock.json)
- **Build**: `npm run build` → outputs to `dist/`
- **Dev**: `npm run dev` → http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui primitives (Radix-based)
│   ├── audio/        # Audio player components (Howler.js)
│   ├── timer/        # Timer and countdown components
│   ├── visualizer/   # Three.js 3D visualizer components
│   ├── mixer/        # Ambient sound mixer components
│   └── vinyl/        # Vinyl record player UI components
├── context/          # React context providers (Audio, Timer, Theme, etc.)
├── hooks/            # Custom React hooks (useAudio, useTimer, useLocalStorage)
├── lib/              # Utility functions and helpers
├── pages/            # Route-level page components
├── utils/            # Shared utility functions
├── assets/           # Compiled assets (images, icons)
├── App.tsx           # Root application component with routing
├── main.tsx          # Application entry point
└── globals.css       # Global styles and Tailwind directives
```

## Key Conventions

### Components
- Functional components with hooks only (no class components)
- Props typed as `interface ComponentNameProps`
- One component per file (except tightly-coupled sub-components)
- Custom hooks: `useXxx` naming pattern

### Imports (ordered)
1. React
2. Third-party libraries
3. Internal `@/` aliases
4. Styles (when applicable)

### Styling
- Tailwind utility classes first; `cn()` helper for composition
- Mobile-first responsive design (sm → md → lg → xl)
- Framer Motion for animations
- CSS variables for theme colors

### State Management
- React Context for cross-cutting concerns (audio, timer, theme)
- `useLocalStorage<T>` hook for persistence
- No Redux/Zustand (kept intentionally simple)

### Audio
- Howler.js via abstracted `useAudio` hook
- Sound instances managed through context
- Audio files lazy-loaded on demand
- Volume normalization across channels

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (HMR) |
| `npm run build` | Production build |
| `npm run build:dev` | Development mode build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript check |

## Important Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component with routing and providers |
| `src/main.tsx` | Application entry point |
| `src/globals.css` | Tailwind directives and CSS variables |
| `src/context/AudioContext.tsx` | Audio playback state management |
| `src/context/TimerContext.tsx` | Timer and countdown state |
| `src/context/ThemeContext.tsx` | Dark/light theme management |
| `src/hooks/useAudio.ts` | Howler.js audio abstraction hook |
| `src/hooks/useTimer.ts` | Timer logic and countdown hook |
| `src/hooks/useLocalStorage.ts` | Generic localStorage persistence |
| `src/components/audio/AudioPlayer.tsx` | Main audio player component |
| `src/components/visualizer/AudioVisualizer.tsx` | Three.js 3D visualizer |
| `src/components/vinyl/VinylPlayer.tsx` | Vinyl record UI component |
| `src/components/mixer/SoundMixer.tsx` | Multi-layer ambient mixer |
| `capacitor.config.ts` | Capacitor native configuration |
| `tailwind.config.ts` | Tailwind CSS theme customization |

## Known Patterns

### Adding a New Component
1. Create file in `src/components/<category>/` with PascalCase name
2. Define props interface
3. Export as named export
4. Import via `@/components/<category>/ComponentName`

### Adding a New Page
1. Create file in `src/pages/`
2. Export as default export
3. Add route in `src/App.tsx`

### Adding a New Context
1. Create file in `src/context/`
2. Export Provider + consumer hook
3. Wrap in `src/App.tsx`

### Adding a New Sound
1. Place audio file in `public/audio/`
2. Register in sound library configuration
3. Add thumbnail in `public/images/sounds/`
4. Test playback with `useAudio` hook

### Adding a New Visualizer Mode
1. Create shader/component in `src/components/visualizer/modes/`
2. Register in visualizer configuration
3. Add control UI to visualizer panel
