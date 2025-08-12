# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a platform for creating multiplayer web games, similar to Jackbox or Drawbattle.io. The project is a monorepo using Bun and Turborepo with separate packages for API definitions, backend (NestJS), frontend (Next.js), database (Prisma), and shared game logic.

## Development Commands

### Environment Setup
- `bun install` - Install all dependencies
- `bun dev` - Start full development environment (runs docker for DB, then starts backend and frontend via turbo)
- `bun dev:reset` - Reset and start development environment
- `bun dev:local` - Start local development environment

### Build & Check
- `turbo run ci` - Run continuous integration (build + lint)
- `turbo run check` - Run type checking across all packages
- `turbo run build` - Build all packages
- `turbo run lint` - Lint all packages

### Package-Specific Commands
- Backend: `bun run dev` (in packages/backend)
- Frontend: `bun run dev` (in packages/frontend) 
- Database: `bunx prisma migrate dev` for migrations
- Tests: `bun test` (uses Jest in backend, configured per package)

## Architecture

### Monorepo Structure
- `packages/api/` - TypeScript API definitions and service interfaces shared between frontend and backend
- `packages/backend/` - NestJS server with Socket.IO for real-time communication
- `packages/frontend/` - Next.js 15 app with React 19 and Redux Toolkit
- `packages/database/` - Prisma client and schema definitions
- `packages/games/` - Shared game logic between frontend and backend

### Game Development Architecture

Games are implemented across three main registries:

1. **Backend Game Server** (`packages/games/src/backend/backendRegistry.ts`)
   - Implement `IGameServer` interface with game state and configuration types
   - Required: `createGame`, `onChangeState`
   - Optional: `onPlayerJoin`, `onPlayerLeave`, `tickGameState`, `onGameStateChange`, `onChangeConfiguration`

2. **Frontend Components** (`packages/games/src/frontend/frontendRegistry.tsx`)
   - Implement `FrontendRegisteredGame` interface
   - Components: `gameConfiguration`, `gameEntry`, `globalScreen`, `tutorialScreen`
   - State: `initialLocalState` for client-side state management

3. **Game Registry** (`packages/games/src/shared/gamesRegistry.ts`)
   - Register game in `GAME_SLUGS` array
   - Add metadata to `GAME_REGISTRY` with name, description, version, and tags

### State Management

The platform provides automatic state reconciliation between clients using two methods:
- `top-level`: Uses most recent top-level timestamp
- `closest`: Deep comparison of nested state objects looking for latest write timestamp

Client-side uses Redux Toolkit with automatic state synchronization via WebSocket.

### Real-time Communication

Uses Socket.IO for bidirectional communication between frontend and backend. Game state updates are automatically synchronized across all connected clients.

## Technology Stack

### Runtime & Package Management
- **Bun** - Primary runtime and package manager (not Node.js/npm)
- Use `bun run <script>` instead of `npm run`
- Use `bun test` instead of jest/vitest commands
- Bun automatically loads .env files

### Backend
- NestJS 11.x with Express
- Socket.IO for WebSocket communication
- Prisma with Neon PostgreSQL adapter
- PM2 for production process management

### Frontend  
- Next.js 15 with React 19
- Socket.IO Client for real-time updates
- Redux Toolkit for state management
- Radix UI components
- Phaser.js for game rendering
- SCSS modules for styling

### Database
- PostgreSQL (Neon in production, Docker for local development)
- Prisma ORM with migrations in `packages/database/prisma/`

### Development Tools
- TypeScript 5.8 across all packages
- ESLint 9.x with React and TypeScript rules
- Prettier for code formatting
- Turborepo for monorepo build orchestration
- Docker Compose for local PostgreSQL

## Environment Variables

Required for development:
- `GAME_STATE_DATABASE_HOST_URL` - Postgres connection URL
- `GAME_STATE_DIRECT_URL` - Direct Postgres connection for Prisma
- `NODE_ENV` - "development" or "production"
- `PUBLIC_URL` - Application public URL (auto-set to local IP during dev)
- `GAME_ORCHESTRATOR` - Boolean flag for game orchestration

## Game Examples

Reference implementations available:
- **Fishbowl** - Word-guessing party game (completed)
- **The Stock Times** - Team-based stock market simulation (completed)  
- **Pong** - Multiplayer pong (in development)
- **Trivia** - Question-answer game (in development)

## Package Management Rules

The project has Cursor rules configured to prefer Bun over Node.js/npm:
- Use `bun <file>` instead of `node <file>` 
- Use `bun install` instead of `npm install`
- Use `bun test` instead of jest/vitest directly
- Use `bun run <script>` instead of npm/yarn run