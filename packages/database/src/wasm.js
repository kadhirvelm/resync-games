
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.GameStateScalarFieldEnum = {
  gameId: 'gameId',
  gameState: 'gameState',
  gameConfiguration: 'gameConfiguration',
  currentGameState: 'currentGameState',
  gameType: 'gameType',
  gameName: 'gameName',
  version: 'version',
  lastUpdatedAt: 'lastUpdatedAt'
};

exports.Prisma.PlayersInGameScalarFieldEnum = {
  gameId: 'gameId',
  playerId: 'playerId',
  team: 'team',
  connectionStatus: 'connectionStatus'
};

exports.Prisma.PlayerScalarFieldEnum = {
  playerId: 'playerId',
  displayName: 'displayName'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.CurrentGameState = exports.$Enums.CurrentGameState = {
  waiting: 'waiting',
  playing: 'playing',
  finished: 'finished'
};

exports.ConnectionStatus = exports.$Enums.ConnectionStatus = {
  connected: 'connected',
  disconnected: 'disconnected'
};

exports.Prisma.ModelName = {
  GameState: 'GameState',
  PlayersInGame: 'PlayersInGame',
  Player: 'Player'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/resync-games/packages/database/src",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "linux-arm64-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "darwin-arm64"
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/home/resync-games/packages/database/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../prisma",
  "clientVersion": "6.4.1",
  "engineVersion": "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "GAME_STATE_DATABASE_HOST_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src\"\n  previewFeatures = [\"driverAdapters\"]\n  binaryTargets   = [\"linux-arm64-openssl-3.0.x\", \"darwin-arm64\"]\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"GAME_STATE_DATABASE_HOST_URL\")\n  directUrl = env(\"GAME_STATE_DIRECT_URL\")\n}\n\nenum CurrentGameState {\n  waiting\n  playing\n  finished\n}\n\nmodel GameState {\n  gameId            String           @id @default(cuid()) @map(\"game_id\")\n  gameState         Json             @map(\"game_state\")\n  gameConfiguration Json             @map(\"game_configuration\")\n  currentGameState  CurrentGameState @map(\"current_game_state\")\n  gameType          String           @map(\"game_type\")\n  gameName          String           @default(\"Example game\") @map(\"game_name\")\n  version           String           @map(\"version\")\n  lastUpdatedAt     DateTime         @default(now()) @map(\"last_update_timestamp\")\n\n  PlayersInGame PlayersInGame[]\n}\n\nenum ConnectionStatus {\n  connected\n  disconnected\n}\n\nmodel PlayersInGame {\n  gameId   String @map(\"game_id\")\n  playerId String @map(\"player_id\")\n  team     Int?   @map(\"team\")\n\n  game             GameState        @relation(fields: [gameId], references: [gameId])\n  player           Player           @relation(fields: [playerId], references: [playerId])\n  connectionStatus ConnectionStatus @default(connected) @map(\"connection_status\")\n\n  @@id([gameId, playerId])\n  @@unique([gameId, playerId])\n}\n\nmodel Player {\n  playerId    String @id @default(cuid()) @map(\"player_id\")\n  displayName String @map(\"display_name\")\n\n  PlayersInGame PlayersInGame[]\n}\n",
  "inlineSchemaHash": "4cfe26c31620ad09de762c694c25d19fe8f252ef0aabce383eb88e96b53165b7",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"GameState\":{\"fields\":[{\"name\":\"gameId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"game_id\"},{\"name\":\"gameState\",\"kind\":\"scalar\",\"type\":\"Json\",\"dbName\":\"game_state\"},{\"name\":\"gameConfiguration\",\"kind\":\"scalar\",\"type\":\"Json\",\"dbName\":\"game_configuration\"},{\"name\":\"currentGameState\",\"kind\":\"enum\",\"type\":\"CurrentGameState\",\"dbName\":\"current_game_state\"},{\"name\":\"gameType\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"game_type\"},{\"name\":\"gameName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"game_name\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"version\"},{\"name\":\"lastUpdatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"last_update_timestamp\"},{\"name\":\"PlayersInGame\",\"kind\":\"object\",\"type\":\"PlayersInGame\",\"relationName\":\"GameStateToPlayersInGame\"}],\"dbName\":null},\"PlayersInGame\":{\"fields\":[{\"name\":\"gameId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"game_id\"},{\"name\":\"playerId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"player_id\"},{\"name\":\"team\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"team\"},{\"name\":\"game\",\"kind\":\"object\",\"type\":\"GameState\",\"relationName\":\"GameStateToPlayersInGame\"},{\"name\":\"player\",\"kind\":\"object\",\"type\":\"Player\",\"relationName\":\"PlayerToPlayersInGame\"},{\"name\":\"connectionStatus\",\"kind\":\"enum\",\"type\":\"ConnectionStatus\",\"dbName\":\"connection_status\"}],\"dbName\":null},\"Player\":{\"fields\":[{\"name\":\"playerId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"player_id\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"display_name\"},{\"name\":\"PlayersInGame\",\"kind\":\"object\",\"type\":\"PlayersInGame\",\"relationName\":\"PlayerToPlayersInGame\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    GAME_STATE_DATABASE_HOST_URL: typeof globalThis !== 'undefined' && globalThis['GAME_STATE_DATABASE_HOST_URL'] || typeof process !== 'undefined' && process.env && process.env.GAME_STATE_DATABASE_HOST_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

