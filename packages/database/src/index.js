
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.17.0
 * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
 */
Prisma.prismaVersion = {
  client: "5.17.0",
  engine: "393aa359c9ad4a4bb28630fb5613f9c281cde053"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
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


  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TileMapScalarFieldEnum = {
  tileMapId: 'tileMapId',
  createdAt: 'createdAt',
  startingTileId: 'startingTileId'
};

exports.Prisma.TileScalarFieldEnum = {
  tileId: 'tileId',
  createdAt: 'createdAt',
  posX: 'posX',
  posY: 'posY',
  image: 'image',
  tileMapId: 'tileMapId'
};

exports.Prisma.EdgeScalarFieldEnum = {
  edgeId: 'edgeId',
  createdAt: 'createdAt',
  flavorText: 'flavorText',
  toTileId: 'toTileId',
  fromTileId: 'fromTileId'
};

exports.Prisma.TileGameScalarFieldEnum = {
  tileGameId: 'tileGameId',
  createdAt: 'createdAt',
  tileMapId: 'tileMapId',
  name: 'name',
  state: 'state'
};

exports.Prisma.TilePawnScalarFieldEnum = {
  tilePawnId: 'tilePawnId',
  createdAt: 'createdAt',
  onTileId: 'onTileId',
  tileGameId: 'tileGameId',
  color: 'color'
};

exports.Prisma.GameStateScalarFieldEnum = {
  gameId: 'gameId',
  gameState: 'gameState',
  gameConfiguration: 'gameConfiguration',
  currentGameState: 'currentGameState',
  gameType: 'gameType',
  version: 'version',
  lastUpdatedAt: 'lastUpdatedAt'
};

exports.Prisma.PlayersInGameScalarFieldEnum = {
  playersInGameIdentifier: 'playersInGameIdentifier',
  gameId: 'gameId',
  playerId: 'playerId'
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
exports.CurrentGameState = exports.$Enums.CurrentGameState = {
  waiting: 'waiting',
  playing: 'playing',
  finished: 'finished'
};

exports.Prisma.ModelName = {
  TileMap: 'TileMap',
  Tile: 'Tile',
  Edge: 'Edge',
  TileGame: 'TileGame',
  TilePawn: 'TilePawn',
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
        "value": "linux-arm64-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/resync-games/packages/database/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../prisma",
  "clientVersion": "5.17.0",
  "engineVersion": "393aa359c9ad4a4bb28630fb5613f9c281cde053",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_HOST_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_HOST_URL\")\n}\n\nmodel TileMap {\n  tileMapId String   @id @default(cuid()) @map(\"tile_map_id\")\n  createdAt DateTime @default(now())\n\n  startingTileId String @map(\"starting_tile_id\")\n\n  tiles    Tile[]     @relation(\"map\")\n  TileGame TileGame[]\n}\n\nmodel Tile {\n  tileId    String   @id @default(cuid()) @map(\"tile_id\")\n  createdAt DateTime @default(now())\n\n  posX      Int    @map(\"pos_x\")\n  posY      Int    @map(\"pos_y\")\n  image     String @map(\"image\")\n  tileMapId String @map(\"tile_map_id\")\n\n  tileMap  TileMap    @relation(fields: [tileMapId], references: [tileMapId], name: \"map\")\n  fromTile Edge[]     @relation(\"from_tile\")\n  toTile   Edge[]     @relation(\"to_tile\")\n  TilePawn TilePawn[]\n}\n\nmodel Edge {\n  edgeId    String   @id @default(cuid()) @map(\"edge_id\")\n  createdAt DateTime @default(now())\n\n  flavorText String @map(\"flavor_text\")\n  toTileId   String @map(\"to_tile_id\")\n  fromTileId String @map(\"from_tile_id\")\n\n  fromTile Tile @relation(fields: [fromTileId], references: [tileId], name: \"from_tile\")\n  toTile   Tile @relation(fields: [toTileId], references: [tileId], name: \"to_tile\")\n}\n\nmodel TileGame {\n  tileGameId String   @id @default(cuid()) @map(\"tile_game_id\")\n  createdAt  DateTime @default(now())\n\n  tileMapId String @map(\"tile_map_id\")\n  name      String @map(\"name\")\n  state     String @map(\"state\")\n\n  tileMap  TileMap    @relation(fields: [tileMapId], references: [tileMapId])\n  TilePawn TilePawn[]\n}\n\nmodel TilePawn {\n  tilePawnId String   @id @default(cuid()) @map(\"tile_pawn_id\")\n  createdAt  DateTime @default(now())\n\n  onTileId   String @map(\"tile_id\")\n  tileGameId String @map(\"tile_game_id\")\n  color      String @map(\"color\")\n\n  onTile   Tile     @relation(fields: [onTileId], references: [tileId])\n  tileGame TileGame @relation(fields: [tileGameId], references: [tileGameId])\n}\n\nenum CurrentGameState {\n  waiting\n  playing\n  finished\n}\n\nmodel GameState {\n  gameId            String           @id @default(cuid()) @map(\"game_id\")\n  gameState         Json             @map(\"game_state\")\n  gameConfiguration Json             @map(\"game_configuration\")\n  currentGameState  CurrentGameState @map(\"current_game_state\")\n  gameType          String           @map(\"game_type\")\n  version           String           @map(\"version\")\n  lastUpdatedAt     DateTime         @default(now()) @map(\"last_update_timestamp\")\n\n  PlayersInGame PlayersInGame[]\n}\n\nmodel PlayersInGame {\n  playersInGameIdentifier String @id @default(cuid()) @map(\"players_in_game_identifier\")\n  gameId                  String @map(\"game_id\")\n  playerId                String @map(\"player_id\")\n\n  game   GameState @relation(fields: [gameId], references: [gameId])\n  player Player    @relation(fields: [playerId], references: [playerId])\n}\n\nmodel Player {\n  playerId    String @id @default(cuid()) @map(\"player_id\")\n  displayName String @map(\"display_name\")\n\n  PlayersInGame PlayersInGame[]\n}\n",
  "inlineSchemaHash": "d4c91b1544f9d19b7d00878a04442c841db408447b51f4404861ff12b1c14cf0",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src",
    "",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"TileMap\":{\"dbName\":null,\"fields\":[{\"name\":\"tileMapId\",\"dbName\":\"tile_map_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startingTileId\",\"dbName\":\"starting_tile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tile\",\"relationName\":\"map\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TileGame\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TileGame\",\"relationName\":\"TileGameToTileMap\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Tile\":{\"dbName\":null,\"fields\":[{\"name\":\"tileId\",\"dbName\":\"tile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posX\",\"dbName\":\"pos_x\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posY\",\"dbName\":\"pos_y\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"dbName\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileMapId\",\"dbName\":\"tile_map_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileMap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TileMap\",\"relationName\":\"map\",\"relationFromFields\":[\"tileMapId\"],\"relationToFields\":[\"tileMapId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromTile\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Edge\",\"relationName\":\"from_tile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toTile\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Edge\",\"relationName\":\"to_tile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TilePawn\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TilePawn\",\"relationName\":\"TileToTilePawn\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Edge\":{\"dbName\":null,\"fields\":[{\"name\":\"edgeId\",\"dbName\":\"edge_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flavorText\",\"dbName\":\"flavor_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toTileId\",\"dbName\":\"to_tile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromTileId\",\"dbName\":\"from_tile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromTile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tile\",\"relationName\":\"from_tile\",\"relationFromFields\":[\"fromTileId\"],\"relationToFields\":[\"tileId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toTile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tile\",\"relationName\":\"to_tile\",\"relationFromFields\":[\"toTileId\"],\"relationToFields\":[\"tileId\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TileGame\":{\"dbName\":null,\"fields\":[{\"name\":\"tileGameId\",\"dbName\":\"tile_game_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileMapId\",\"dbName\":\"tile_map_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"dbName\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"dbName\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileMap\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TileMap\",\"relationName\":\"TileGameToTileMap\",\"relationFromFields\":[\"tileMapId\"],\"relationToFields\":[\"tileMapId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"TilePawn\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TilePawn\",\"relationName\":\"TileGameToTilePawn\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TilePawn\":{\"dbName\":null,\"fields\":[{\"name\":\"tilePawnId\",\"dbName\":\"tile_pawn_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"onTileId\",\"dbName\":\"tile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileGameId\",\"dbName\":\"tile_game_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"color\",\"dbName\":\"color\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"onTile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tile\",\"relationName\":\"TileToTilePawn\",\"relationFromFields\":[\"onTileId\"],\"relationToFields\":[\"tileId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tileGame\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TileGame\",\"relationName\":\"TileGameToTilePawn\",\"relationFromFields\":[\"tileGameId\"],\"relationToFields\":[\"tileGameId\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GameState\":{\"dbName\":null,\"fields\":[{\"name\":\"gameId\",\"dbName\":\"game_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameState\",\"dbName\":\"game_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameConfiguration\",\"dbName\":\"game_configuration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentGameState\",\"dbName\":\"current_game_state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CurrentGameState\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameType\",\"dbName\":\"game_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"dbName\":\"version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUpdatedAt\",\"dbName\":\"last_update_timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PlayersInGame\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlayersInGame\",\"relationName\":\"GameStateToPlayersInGame\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PlayersInGame\":{\"dbName\":null,\"fields\":[{\"name\":\"playersInGameIdentifier\",\"dbName\":\"players_in_game_identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameId\",\"dbName\":\"game_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"game\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GameState\",\"relationName\":\"GameStateToPlayersInGame\",\"relationFromFields\":[\"gameId\"],\"relationToFields\":[\"gameId\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"player\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Player\",\"relationName\":\"PlayerToPlayersInGame\",\"relationFromFields\":[\"playerId\"],\"relationToFields\":[\"playerId\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Player\":{\"dbName\":null,\"fields\":[{\"name\":\"playerId\",\"dbName\":\"player_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"dbName\":\"display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PlayersInGame\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlayersInGame\",\"relationName\":\"PlayerToPlayersInGame\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"CurrentGameState\":{\"values\":[{\"name\":\"waiting\",\"dbName\":null},{\"name\":\"playing\",\"dbName\":null},{\"name\":\"finished\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-linux-arm64-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/libquery_engine-linux-arm64-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/schema.prisma")
