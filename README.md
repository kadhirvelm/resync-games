# resync-games

## Overview
This is a platform for creating multiplayer web games, similar to Jackbox or Drawbattle.io. We wanted a place where we can experiment with various game concepts, without having to worry about the multiplayer aspects.

## How to build a game
The platform itself is not ready for general use, it's still clunky and hard to understand, but we're making progress! We'll have more detailed guides on how to build games in here once we've managed to create something compelling.

### Game Structure
To create a new game, you need to implement three main components:

1. **Backend Game Server** (`backendRegistry.ts`)
   - Implement the `IGameServer` interface with your game's state and configuration types
   - Required methods:
     - `createGame`: Initialize game state
     - `onChangeState`: Handle game state transitions
   - Optional methods:
     - `onPlayerJoin`: Handle new player initialization
     - `onPlayerLeave`: Clean up when players leave
     - `tickGameState`: Run game logic every 3 seconds
     - `onGameStateChange`: React to state changes
     - `onChangeConfiguration`: Handle configuration updates

2. **Frontend Components** (`frontendRegistry.tsx`)
   - Implement the `FrontendRegisteredGame` interface:
     - `gameConfiguration`: Define user-configurable game settings
     - `gameEntry`: Main game component (receives game state and local state)
     - `globalScreen`: Optional central display component
     - `initialLocalState`: Initial client-side state
     - `tutorialScreen`: Optional how-to-play component

3. **Game Registry** (`gamesRegistry.ts`)
   - Register your game in `GAME_SLUGS`
   - Add game metadata in `GAME_REGISTRY`:
     - name
     - description
     - version
     - tags (e.g., completed, in development)

### State Management
The platform provides built-in state management with the following features:

1. **Server-Side State**
   - Automatic state reconciliation between clients
   - Two reconciliation methods:
     - `top-level`: Uses most recent top-level timestamp
     - `closest`: Deep comparison of nested state objects looking for latest write timestamp
   - Periodic game ticks (every 3 seconds)
   - Player join/leave handling
   - Game state transitions (waiting → playing → finished)

2. **Client-Side State**
   - Local state management through Redux
   - Automatic state synchronization with server
   - Real-time updates via WebSocket
   - Type-safe state handling

### Example Implementation Flow
1. Create your game's state and configuration interfaces
2. Implement the backend game server with game logic
3. Create frontend components for:
   - Game configuration
   - Main game view
   - Global display (if needed)
   - Tutorial (if needed)
4. Register your game in all three registries
5. Add any necessary assets or additional components

### Available Games
Currently implemented games that can serve as examples:
- **Pong**: Classic multiplayer pong implementation -> WIP
- **Fishbowl**: Word-guessing party game with multiple rounds -> WIP
- **The Stock Times**: Team-based stock market simulation game

## Stack
* NextJS - frontend
* NestJS - backend
* Postgres - DB

Deployed on
* NextJS - vercel
* NestJS - AWS, EC2
* Postgres - Neon

## Package breakdown
* `api` -> the API definitions for the network calls between the backend and the frontend
* `backend` -> NestJS
* `database` -> prisma client
* `frontend` -> NextJS
* `games` -> shared between the backend and frontend packages, greatly simplifies the build tooling while still allowing the dev to share types between FE files and BE files when creating a game

## Development Setup

### Prerequisites
* Node.js >= 22
* Docker (for local development)
* Yarn 4.9.1 (the project uses PnP - Plug'n'Play)

### Environment Variables
The following environment variables are required:
* `GAME_STATE_DATABASE_HOST_URL` - Postgres database URL
* `GAME_STATE_DIRECT_URL` - Direct connection URL for Postgres (used by Prisma)
* `GAME_ORCHESTRATOR` - Boolean flag for game orchestration
* `NODE_ENV` - "production" or "development"

### Project Structure
The project is set up as a monorepo using:
* Yarn PnP (4.9.1) for package management
* Turborepo for build system orchestration
* Docker Compose for local development environment

### Key Technologies & Libraries
#### Frontend
* Next.js 15.x
* React 19.x
* Socket.IO Client for real-time communication
* Radix UI for components
* Redux Toolkit for state management
* Phaser.js for game rendering
* TypeScript 5.8

#### Backend
* NestJS 11.x
* Socket.IO for WebSocket support
* Prisma with Neon (PostgreSQL) adapter
* PM2 for process management in production
* TypeScript 5.8

#### Development Tools
* ESLint 9.x with TypeScript support
* Jest for testing
* Prettier for code formatting
* Docker Compose for local development
* Turborepo for monorepo management

### Getting Started
1. Clone the repository
2. Install dependencies: `yarn install`
3. Copy `.env.example` to `.env` and fill in the required variables
4. Start the development environment: `yarn docker`
5. Start the development servers:
   * Frontend: `yarn dev frontend`
   * Backend: `yarn dev backend`

### Build & Deployment
* Frontend is deployed to Vercel
* Backend is deployed to AWS EC2
* Database is hosted on Neon (PostgreSQL)

The repo uses Yarn PnP (4.9.1) for its package management (which in turn allows us to use docker-compose for local development) and Turborepo for its build system. We're aiming for a [zero-installs](https://yarnpkg.com/features/caching) setup, though we've got a few more steps to go.

### VSCode Extensions
Recommended extensions for development:
* Docker
* GitLens
* NPM IntelliSense
* ESLint
* ZipFS (for Yarn PnP)
* GitHub Copilot
* Prisma
