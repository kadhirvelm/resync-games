
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GameState
 * 
 */
export type GameState = $Result.DefaultSelection<Prisma.$GameStatePayload>
/**
 * Model PlayersInGame
 * 
 */
export type PlayersInGame = $Result.DefaultSelection<Prisma.$PlayersInGamePayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CurrentGameState: {
  waiting: 'waiting',
  playing: 'playing',
  finished: 'finished'
};

export type CurrentGameState = (typeof CurrentGameState)[keyof typeof CurrentGameState]

}

export type CurrentGameState = $Enums.CurrentGameState

export const CurrentGameState: typeof $Enums.CurrentGameState

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GameStates
 * const gameStates = await prisma.gameState.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GameStates
   * const gameStates = await prisma.gameState.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.gameState`: Exposes CRUD operations for the **GameState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameStates
    * const gameStates = await prisma.gameState.findMany()
    * ```
    */
  get gameState(): Prisma.GameStateDelegate<ExtArgs>;

  /**
   * `prisma.playersInGame`: Exposes CRUD operations for the **PlayersInGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayersInGames
    * const playersInGames = await prisma.playersInGame.findMany()
    * ```
    */
  get playersInGame(): Prisma.PlayersInGameDelegate<ExtArgs>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.17.0
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    GameState: 'GameState',
    PlayersInGame: 'PlayersInGame',
    Player: 'Player'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "gameState" | "playersInGame" | "player"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GameState: {
        payload: Prisma.$GameStatePayload<ExtArgs>
        fields: Prisma.GameStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          findFirst: {
            args: Prisma.GameStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          findMany: {
            args: Prisma.GameStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>[]
          }
          create: {
            args: Prisma.GameStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          createMany: {
            args: Prisma.GameStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>[]
          }
          delete: {
            args: Prisma.GameStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          update: {
            args: Prisma.GameStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          deleteMany: {
            args: Prisma.GameStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          aggregate: {
            args: Prisma.GameStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameState>
          }
          groupBy: {
            args: Prisma.GameStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameStateCountArgs<ExtArgs>
            result: $Utils.Optional<GameStateCountAggregateOutputType> | number
          }
        }
      }
      PlayersInGame: {
        payload: Prisma.$PlayersInGamePayload<ExtArgs>
        fields: Prisma.PlayersInGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayersInGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayersInGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          findFirst: {
            args: Prisma.PlayersInGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayersInGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          findMany: {
            args: Prisma.PlayersInGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>[]
          }
          create: {
            args: Prisma.PlayersInGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          createMany: {
            args: Prisma.PlayersInGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayersInGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>[]
          }
          delete: {
            args: Prisma.PlayersInGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          update: {
            args: Prisma.PlayersInGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          deleteMany: {
            args: Prisma.PlayersInGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayersInGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayersInGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayersInGamePayload>
          }
          aggregate: {
            args: Prisma.PlayersInGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayersInGame>
          }
          groupBy: {
            args: Prisma.PlayersInGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayersInGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayersInGameCountArgs<ExtArgs>
            result: $Utils.Optional<PlayersInGameCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type GameStateCountOutputType
   */

  export type GameStateCountOutputType = {
    PlayersInGame: number
  }

  export type GameStateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlayersInGame?: boolean | GameStateCountOutputTypeCountPlayersInGameArgs
  }

  // Custom InputTypes
  /**
   * GameStateCountOutputType without action
   */
  export type GameStateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameStateCountOutputType
     */
    select?: GameStateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameStateCountOutputType without action
   */
  export type GameStateCountOutputTypeCountPlayersInGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayersInGameWhereInput
  }


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    PlayersInGame: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlayersInGame?: boolean | PlayerCountOutputTypeCountPlayersInGameArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountPlayersInGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayersInGameWhereInput
  }


  /**
   * Models
   */

  /**
   * Model GameState
   */

  export type AggregateGameState = {
    _count: GameStateCountAggregateOutputType | null
    _min: GameStateMinAggregateOutputType | null
    _max: GameStateMaxAggregateOutputType | null
  }

  export type GameStateMinAggregateOutputType = {
    gameId: string | null
    currentGameState: $Enums.CurrentGameState | null
    gameType: string | null
    version: string | null
    lastUpdatedAt: Date | null
  }

  export type GameStateMaxAggregateOutputType = {
    gameId: string | null
    currentGameState: $Enums.CurrentGameState | null
    gameType: string | null
    version: string | null
    lastUpdatedAt: Date | null
  }

  export type GameStateCountAggregateOutputType = {
    gameId: number
    gameState: number
    gameConfiguration: number
    currentGameState: number
    gameType: number
    version: number
    lastUpdatedAt: number
    _all: number
  }


  export type GameStateMinAggregateInputType = {
    gameId?: true
    currentGameState?: true
    gameType?: true
    version?: true
    lastUpdatedAt?: true
  }

  export type GameStateMaxAggregateInputType = {
    gameId?: true
    currentGameState?: true
    gameType?: true
    version?: true
    lastUpdatedAt?: true
  }

  export type GameStateCountAggregateInputType = {
    gameId?: true
    gameState?: true
    gameConfiguration?: true
    currentGameState?: true
    gameType?: true
    version?: true
    lastUpdatedAt?: true
    _all?: true
  }

  export type GameStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameState to aggregate.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameStates
    **/
    _count?: true | GameStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameStateMaxAggregateInputType
  }

  export type GetGameStateAggregateType<T extends GameStateAggregateArgs> = {
        [P in keyof T & keyof AggregateGameState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameState[P]>
      : GetScalarType<T[P], AggregateGameState[P]>
  }




  export type GameStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameStateWhereInput
    orderBy?: GameStateOrderByWithAggregationInput | GameStateOrderByWithAggregationInput[]
    by: GameStateScalarFieldEnum[] | GameStateScalarFieldEnum
    having?: GameStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameStateCountAggregateInputType | true
    _min?: GameStateMinAggregateInputType
    _max?: GameStateMaxAggregateInputType
  }

  export type GameStateGroupByOutputType = {
    gameId: string
    gameState: JsonValue
    gameConfiguration: JsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt: Date
    _count: GameStateCountAggregateOutputType | null
    _min: GameStateMinAggregateOutputType | null
    _max: GameStateMaxAggregateOutputType | null
  }

  type GetGameStateGroupByPayload<T extends GameStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameStateGroupByOutputType[P]>
            : GetScalarType<T[P], GameStateGroupByOutputType[P]>
        }
      >
    >


  export type GameStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gameId?: boolean
    gameState?: boolean
    gameConfiguration?: boolean
    currentGameState?: boolean
    gameType?: boolean
    version?: boolean
    lastUpdatedAt?: boolean
    PlayersInGame?: boolean | GameState$PlayersInGameArgs<ExtArgs>
    _count?: boolean | GameStateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameState"]>

  export type GameStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gameId?: boolean
    gameState?: boolean
    gameConfiguration?: boolean
    currentGameState?: boolean
    gameType?: boolean
    version?: boolean
    lastUpdatedAt?: boolean
  }, ExtArgs["result"]["gameState"]>

  export type GameStateSelectScalar = {
    gameId?: boolean
    gameState?: boolean
    gameConfiguration?: boolean
    currentGameState?: boolean
    gameType?: boolean
    version?: boolean
    lastUpdatedAt?: boolean
  }

  export type GameStateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlayersInGame?: boolean | GameState$PlayersInGameArgs<ExtArgs>
    _count?: boolean | GameStateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameStateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GameStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameState"
    objects: {
      PlayersInGame: Prisma.$PlayersInGamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      gameId: string
      gameState: Prisma.JsonValue
      gameConfiguration: Prisma.JsonValue
      currentGameState: $Enums.CurrentGameState
      gameType: string
      version: string
      lastUpdatedAt: Date
    }, ExtArgs["result"]["gameState"]>
    composites: {}
  }

  type GameStateGetPayload<S extends boolean | null | undefined | GameStateDefaultArgs> = $Result.GetResult<Prisma.$GameStatePayload, S>

  type GameStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameStateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameStateCountAggregateInputType | true
    }

  export interface GameStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameState'], meta: { name: 'GameState' } }
    /**
     * Find zero or one GameState that matches the filter.
     * @param {GameStateFindUniqueArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameStateFindUniqueArgs>(args: SelectSubset<T, GameStateFindUniqueArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameState that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameStateFindUniqueOrThrowArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameStateFindUniqueOrThrowArgs>(args: SelectSubset<T, GameStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindFirstArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameStateFindFirstArgs>(args?: SelectSubset<T, GameStateFindFirstArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindFirstOrThrowArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameStateFindFirstOrThrowArgs>(args?: SelectSubset<T, GameStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameStates
     * const gameStates = await prisma.gameState.findMany()
     * 
     * // Get first 10 GameStates
     * const gameStates = await prisma.gameState.findMany({ take: 10 })
     * 
     * // Only select the `gameId`
     * const gameStateWithGameIdOnly = await prisma.gameState.findMany({ select: { gameId: true } })
     * 
     */
    findMany<T extends GameStateFindManyArgs>(args?: SelectSubset<T, GameStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameState.
     * @param {GameStateCreateArgs} args - Arguments to create a GameState.
     * @example
     * // Create one GameState
     * const GameState = await prisma.gameState.create({
     *   data: {
     *     // ... data to create a GameState
     *   }
     * })
     * 
     */
    create<T extends GameStateCreateArgs>(args: SelectSubset<T, GameStateCreateArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameStates.
     * @param {GameStateCreateManyArgs} args - Arguments to create many GameStates.
     * @example
     * // Create many GameStates
     * const gameState = await prisma.gameState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameStateCreateManyArgs>(args?: SelectSubset<T, GameStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameStates and returns the data saved in the database.
     * @param {GameStateCreateManyAndReturnArgs} args - Arguments to create many GameStates.
     * @example
     * // Create many GameStates
     * const gameState = await prisma.gameState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameStates and only return the `gameId`
     * const gameStateWithGameIdOnly = await prisma.gameState.createManyAndReturn({ 
     *   select: { gameId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameStateCreateManyAndReturnArgs>(args?: SelectSubset<T, GameStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameState.
     * @param {GameStateDeleteArgs} args - Arguments to delete one GameState.
     * @example
     * // Delete one GameState
     * const GameState = await prisma.gameState.delete({
     *   where: {
     *     // ... filter to delete one GameState
     *   }
     * })
     * 
     */
    delete<T extends GameStateDeleteArgs>(args: SelectSubset<T, GameStateDeleteArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameState.
     * @param {GameStateUpdateArgs} args - Arguments to update one GameState.
     * @example
     * // Update one GameState
     * const gameState = await prisma.gameState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameStateUpdateArgs>(args: SelectSubset<T, GameStateUpdateArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameStates.
     * @param {GameStateDeleteManyArgs} args - Arguments to filter GameStates to delete.
     * @example
     * // Delete a few GameStates
     * const { count } = await prisma.gameState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameStateDeleteManyArgs>(args?: SelectSubset<T, GameStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameStates
     * const gameState = await prisma.gameState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameStateUpdateManyArgs>(args: SelectSubset<T, GameStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameState.
     * @param {GameStateUpsertArgs} args - Arguments to update or create a GameState.
     * @example
     * // Update or create a GameState
     * const gameState = await prisma.gameState.upsert({
     *   create: {
     *     // ... data to create a GameState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameState we want to update
     *   }
     * })
     */
    upsert<T extends GameStateUpsertArgs>(args: SelectSubset<T, GameStateUpsertArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateCountArgs} args - Arguments to filter GameStates to count.
     * @example
     * // Count the number of GameStates
     * const count = await prisma.gameState.count({
     *   where: {
     *     // ... the filter for the GameStates we want to count
     *   }
     * })
    **/
    count<T extends GameStateCountArgs>(
      args?: Subset<T, GameStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameStateAggregateArgs>(args: Subset<T, GameStateAggregateArgs>): Prisma.PrismaPromise<GetGameStateAggregateType<T>>

    /**
     * Group by GameState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameStateGroupByArgs['orderBy'] }
        : { orderBy?: GameStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameState model
   */
  readonly fields: GameStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    PlayersInGame<T extends GameState$PlayersInGameArgs<ExtArgs> = {}>(args?: Subset<T, GameState$PlayersInGameArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameState model
   */ 
  interface GameStateFieldRefs {
    readonly gameId: FieldRef<"GameState", 'String'>
    readonly gameState: FieldRef<"GameState", 'Json'>
    readonly gameConfiguration: FieldRef<"GameState", 'Json'>
    readonly currentGameState: FieldRef<"GameState", 'CurrentGameState'>
    readonly gameType: FieldRef<"GameState", 'String'>
    readonly version: FieldRef<"GameState", 'String'>
    readonly lastUpdatedAt: FieldRef<"GameState", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameState findUnique
   */
  export type GameStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState findUniqueOrThrow
   */
  export type GameStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState findFirst
   */
  export type GameStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStates.
     */
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState findFirstOrThrow
   */
  export type GameStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStates.
     */
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState findMany
   */
  export type GameStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameStates to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState create
   */
  export type GameStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The data needed to create a GameState.
     */
    data: XOR<GameStateCreateInput, GameStateUncheckedCreateInput>
  }

  /**
   * GameState createMany
   */
  export type GameStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameStates.
     */
    data: GameStateCreateManyInput | GameStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameState createManyAndReturn
   */
  export type GameStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameStates.
     */
    data: GameStateCreateManyInput | GameStateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameState update
   */
  export type GameStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The data needed to update a GameState.
     */
    data: XOR<GameStateUpdateInput, GameStateUncheckedUpdateInput>
    /**
     * Choose, which GameState to update.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState updateMany
   */
  export type GameStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameStates.
     */
    data: XOR<GameStateUpdateManyMutationInput, GameStateUncheckedUpdateManyInput>
    /**
     * Filter which GameStates to update
     */
    where?: GameStateWhereInput
  }

  /**
   * GameState upsert
   */
  export type GameStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The filter to search for the GameState to update in case it exists.
     */
    where: GameStateWhereUniqueInput
    /**
     * In case the GameState found by the `where` argument doesn't exist, create a new GameState with this data.
     */
    create: XOR<GameStateCreateInput, GameStateUncheckedCreateInput>
    /**
     * In case the GameState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameStateUpdateInput, GameStateUncheckedUpdateInput>
  }

  /**
   * GameState delete
   */
  export type GameStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter which GameState to delete.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState deleteMany
   */
  export type GameStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameStates to delete
     */
    where?: GameStateWhereInput
  }

  /**
   * GameState.PlayersInGame
   */
  export type GameState$PlayersInGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    where?: PlayersInGameWhereInput
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    cursor?: PlayersInGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayersInGameScalarFieldEnum | PlayersInGameScalarFieldEnum[]
  }

  /**
   * GameState without action
   */
  export type GameStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
  }


  /**
   * Model PlayersInGame
   */

  export type AggregatePlayersInGame = {
    _count: PlayersInGameCountAggregateOutputType | null
    _min: PlayersInGameMinAggregateOutputType | null
    _max: PlayersInGameMaxAggregateOutputType | null
  }

  export type PlayersInGameMinAggregateOutputType = {
    playersInGameIdentifier: string | null
    gameId: string | null
    playerId: string | null
  }

  export type PlayersInGameMaxAggregateOutputType = {
    playersInGameIdentifier: string | null
    gameId: string | null
    playerId: string | null
  }

  export type PlayersInGameCountAggregateOutputType = {
    playersInGameIdentifier: number
    gameId: number
    playerId: number
    _all: number
  }


  export type PlayersInGameMinAggregateInputType = {
    playersInGameIdentifier?: true
    gameId?: true
    playerId?: true
  }

  export type PlayersInGameMaxAggregateInputType = {
    playersInGameIdentifier?: true
    gameId?: true
    playerId?: true
  }

  export type PlayersInGameCountAggregateInputType = {
    playersInGameIdentifier?: true
    gameId?: true
    playerId?: true
    _all?: true
  }

  export type PlayersInGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayersInGame to aggregate.
     */
    where?: PlayersInGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayersInGames to fetch.
     */
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayersInGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayersInGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayersInGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlayersInGames
    **/
    _count?: true | PlayersInGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayersInGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayersInGameMaxAggregateInputType
  }

  export type GetPlayersInGameAggregateType<T extends PlayersInGameAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayersInGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayersInGame[P]>
      : GetScalarType<T[P], AggregatePlayersInGame[P]>
  }




  export type PlayersInGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayersInGameWhereInput
    orderBy?: PlayersInGameOrderByWithAggregationInput | PlayersInGameOrderByWithAggregationInput[]
    by: PlayersInGameScalarFieldEnum[] | PlayersInGameScalarFieldEnum
    having?: PlayersInGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayersInGameCountAggregateInputType | true
    _min?: PlayersInGameMinAggregateInputType
    _max?: PlayersInGameMaxAggregateInputType
  }

  export type PlayersInGameGroupByOutputType = {
    playersInGameIdentifier: string
    gameId: string
    playerId: string
    _count: PlayersInGameCountAggregateOutputType | null
    _min: PlayersInGameMinAggregateOutputType | null
    _max: PlayersInGameMaxAggregateOutputType | null
  }

  type GetPlayersInGameGroupByPayload<T extends PlayersInGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayersInGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayersInGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayersInGameGroupByOutputType[P]>
            : GetScalarType<T[P], PlayersInGameGroupByOutputType[P]>
        }
      >
    >


  export type PlayersInGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playersInGameIdentifier?: boolean
    gameId?: boolean
    playerId?: boolean
    game?: boolean | GameStateDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playersInGame"]>

  export type PlayersInGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playersInGameIdentifier?: boolean
    gameId?: boolean
    playerId?: boolean
    game?: boolean | GameStateDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playersInGame"]>

  export type PlayersInGameSelectScalar = {
    playersInGameIdentifier?: boolean
    gameId?: boolean
    playerId?: boolean
  }

  export type PlayersInGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameStateDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PlayersInGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameStateDefaultArgs<ExtArgs>
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $PlayersInGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlayersInGame"
    objects: {
      game: Prisma.$GameStatePayload<ExtArgs>
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      playersInGameIdentifier: string
      gameId: string
      playerId: string
    }, ExtArgs["result"]["playersInGame"]>
    composites: {}
  }

  type PlayersInGameGetPayload<S extends boolean | null | undefined | PlayersInGameDefaultArgs> = $Result.GetResult<Prisma.$PlayersInGamePayload, S>

  type PlayersInGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlayersInGameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayersInGameCountAggregateInputType | true
    }

  export interface PlayersInGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlayersInGame'], meta: { name: 'PlayersInGame' } }
    /**
     * Find zero or one PlayersInGame that matches the filter.
     * @param {PlayersInGameFindUniqueArgs} args - Arguments to find a PlayersInGame
     * @example
     * // Get one PlayersInGame
     * const playersInGame = await prisma.playersInGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayersInGameFindUniqueArgs>(args: SelectSubset<T, PlayersInGameFindUniqueArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlayersInGame that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlayersInGameFindUniqueOrThrowArgs} args - Arguments to find a PlayersInGame
     * @example
     * // Get one PlayersInGame
     * const playersInGame = await prisma.playersInGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayersInGameFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayersInGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlayersInGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameFindFirstArgs} args - Arguments to find a PlayersInGame
     * @example
     * // Get one PlayersInGame
     * const playersInGame = await prisma.playersInGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayersInGameFindFirstArgs>(args?: SelectSubset<T, PlayersInGameFindFirstArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlayersInGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameFindFirstOrThrowArgs} args - Arguments to find a PlayersInGame
     * @example
     * // Get one PlayersInGame
     * const playersInGame = await prisma.playersInGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayersInGameFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayersInGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlayersInGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayersInGames
     * const playersInGames = await prisma.playersInGame.findMany()
     * 
     * // Get first 10 PlayersInGames
     * const playersInGames = await prisma.playersInGame.findMany({ take: 10 })
     * 
     * // Only select the `playersInGameIdentifier`
     * const playersInGameWithPlayersInGameIdentifierOnly = await prisma.playersInGame.findMany({ select: { playersInGameIdentifier: true } })
     * 
     */
    findMany<T extends PlayersInGameFindManyArgs>(args?: SelectSubset<T, PlayersInGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlayersInGame.
     * @param {PlayersInGameCreateArgs} args - Arguments to create a PlayersInGame.
     * @example
     * // Create one PlayersInGame
     * const PlayersInGame = await prisma.playersInGame.create({
     *   data: {
     *     // ... data to create a PlayersInGame
     *   }
     * })
     * 
     */
    create<T extends PlayersInGameCreateArgs>(args: SelectSubset<T, PlayersInGameCreateArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlayersInGames.
     * @param {PlayersInGameCreateManyArgs} args - Arguments to create many PlayersInGames.
     * @example
     * // Create many PlayersInGames
     * const playersInGame = await prisma.playersInGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayersInGameCreateManyArgs>(args?: SelectSubset<T, PlayersInGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlayersInGames and returns the data saved in the database.
     * @param {PlayersInGameCreateManyAndReturnArgs} args - Arguments to create many PlayersInGames.
     * @example
     * // Create many PlayersInGames
     * const playersInGame = await prisma.playersInGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlayersInGames and only return the `playersInGameIdentifier`
     * const playersInGameWithPlayersInGameIdentifierOnly = await prisma.playersInGame.createManyAndReturn({ 
     *   select: { playersInGameIdentifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayersInGameCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayersInGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlayersInGame.
     * @param {PlayersInGameDeleteArgs} args - Arguments to delete one PlayersInGame.
     * @example
     * // Delete one PlayersInGame
     * const PlayersInGame = await prisma.playersInGame.delete({
     *   where: {
     *     // ... filter to delete one PlayersInGame
     *   }
     * })
     * 
     */
    delete<T extends PlayersInGameDeleteArgs>(args: SelectSubset<T, PlayersInGameDeleteArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlayersInGame.
     * @param {PlayersInGameUpdateArgs} args - Arguments to update one PlayersInGame.
     * @example
     * // Update one PlayersInGame
     * const playersInGame = await prisma.playersInGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayersInGameUpdateArgs>(args: SelectSubset<T, PlayersInGameUpdateArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlayersInGames.
     * @param {PlayersInGameDeleteManyArgs} args - Arguments to filter PlayersInGames to delete.
     * @example
     * // Delete a few PlayersInGames
     * const { count } = await prisma.playersInGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayersInGameDeleteManyArgs>(args?: SelectSubset<T, PlayersInGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayersInGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayersInGames
     * const playersInGame = await prisma.playersInGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayersInGameUpdateManyArgs>(args: SelectSubset<T, PlayersInGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlayersInGame.
     * @param {PlayersInGameUpsertArgs} args - Arguments to update or create a PlayersInGame.
     * @example
     * // Update or create a PlayersInGame
     * const playersInGame = await prisma.playersInGame.upsert({
     *   create: {
     *     // ... data to create a PlayersInGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayersInGame we want to update
     *   }
     * })
     */
    upsert<T extends PlayersInGameUpsertArgs>(args: SelectSubset<T, PlayersInGameUpsertArgs<ExtArgs>>): Prisma__PlayersInGameClient<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlayersInGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameCountArgs} args - Arguments to filter PlayersInGames to count.
     * @example
     * // Count the number of PlayersInGames
     * const count = await prisma.playersInGame.count({
     *   where: {
     *     // ... the filter for the PlayersInGames we want to count
     *   }
     * })
    **/
    count<T extends PlayersInGameCountArgs>(
      args?: Subset<T, PlayersInGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayersInGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayersInGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayersInGameAggregateArgs>(args: Subset<T, PlayersInGameAggregateArgs>): Prisma.PrismaPromise<GetPlayersInGameAggregateType<T>>

    /**
     * Group by PlayersInGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayersInGameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayersInGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayersInGameGroupByArgs['orderBy'] }
        : { orderBy?: PlayersInGameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayersInGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayersInGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlayersInGame model
   */
  readonly fields: PlayersInGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayersInGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayersInGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameStateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameStateDefaultArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlayersInGame model
   */ 
  interface PlayersInGameFieldRefs {
    readonly playersInGameIdentifier: FieldRef<"PlayersInGame", 'String'>
    readonly gameId: FieldRef<"PlayersInGame", 'String'>
    readonly playerId: FieldRef<"PlayersInGame", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlayersInGame findUnique
   */
  export type PlayersInGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter, which PlayersInGame to fetch.
     */
    where: PlayersInGameWhereUniqueInput
  }

  /**
   * PlayersInGame findUniqueOrThrow
   */
  export type PlayersInGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter, which PlayersInGame to fetch.
     */
    where: PlayersInGameWhereUniqueInput
  }

  /**
   * PlayersInGame findFirst
   */
  export type PlayersInGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter, which PlayersInGame to fetch.
     */
    where?: PlayersInGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayersInGames to fetch.
     */
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayersInGames.
     */
    cursor?: PlayersInGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayersInGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayersInGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayersInGames.
     */
    distinct?: PlayersInGameScalarFieldEnum | PlayersInGameScalarFieldEnum[]
  }

  /**
   * PlayersInGame findFirstOrThrow
   */
  export type PlayersInGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter, which PlayersInGame to fetch.
     */
    where?: PlayersInGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayersInGames to fetch.
     */
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayersInGames.
     */
    cursor?: PlayersInGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayersInGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayersInGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayersInGames.
     */
    distinct?: PlayersInGameScalarFieldEnum | PlayersInGameScalarFieldEnum[]
  }

  /**
   * PlayersInGame findMany
   */
  export type PlayersInGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter, which PlayersInGames to fetch.
     */
    where?: PlayersInGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayersInGames to fetch.
     */
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlayersInGames.
     */
    cursor?: PlayersInGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayersInGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayersInGames.
     */
    skip?: number
    distinct?: PlayersInGameScalarFieldEnum | PlayersInGameScalarFieldEnum[]
  }

  /**
   * PlayersInGame create
   */
  export type PlayersInGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * The data needed to create a PlayersInGame.
     */
    data: XOR<PlayersInGameCreateInput, PlayersInGameUncheckedCreateInput>
  }

  /**
   * PlayersInGame createMany
   */
  export type PlayersInGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlayersInGames.
     */
    data: PlayersInGameCreateManyInput | PlayersInGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayersInGame createManyAndReturn
   */
  export type PlayersInGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlayersInGames.
     */
    data: PlayersInGameCreateManyInput | PlayersInGameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayersInGame update
   */
  export type PlayersInGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * The data needed to update a PlayersInGame.
     */
    data: XOR<PlayersInGameUpdateInput, PlayersInGameUncheckedUpdateInput>
    /**
     * Choose, which PlayersInGame to update.
     */
    where: PlayersInGameWhereUniqueInput
  }

  /**
   * PlayersInGame updateMany
   */
  export type PlayersInGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlayersInGames.
     */
    data: XOR<PlayersInGameUpdateManyMutationInput, PlayersInGameUncheckedUpdateManyInput>
    /**
     * Filter which PlayersInGames to update
     */
    where?: PlayersInGameWhereInput
  }

  /**
   * PlayersInGame upsert
   */
  export type PlayersInGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * The filter to search for the PlayersInGame to update in case it exists.
     */
    where: PlayersInGameWhereUniqueInput
    /**
     * In case the PlayersInGame found by the `where` argument doesn't exist, create a new PlayersInGame with this data.
     */
    create: XOR<PlayersInGameCreateInput, PlayersInGameUncheckedCreateInput>
    /**
     * In case the PlayersInGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayersInGameUpdateInput, PlayersInGameUncheckedUpdateInput>
  }

  /**
   * PlayersInGame delete
   */
  export type PlayersInGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    /**
     * Filter which PlayersInGame to delete.
     */
    where: PlayersInGameWhereUniqueInput
  }

  /**
   * PlayersInGame deleteMany
   */
  export type PlayersInGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayersInGames to delete
     */
    where?: PlayersInGameWhereInput
  }

  /**
   * PlayersInGame without action
   */
  export type PlayersInGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerMinAggregateOutputType = {
    playerId: string | null
    displayName: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    playerId: string | null
    displayName: string | null
  }

  export type PlayerCountAggregateOutputType = {
    playerId: number
    displayName: number
    _all: number
  }


  export type PlayerMinAggregateInputType = {
    playerId?: true
    displayName?: true
  }

  export type PlayerMaxAggregateInputType = {
    playerId?: true
    displayName?: true
  }

  export type PlayerCountAggregateInputType = {
    playerId?: true
    displayName?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    playerId: string
    displayName: string
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerId?: boolean
    displayName?: boolean
    PlayersInGame?: boolean | Player$PlayersInGameArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerId?: boolean
    displayName?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    playerId?: boolean
    displayName?: boolean
  }

  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PlayersInGame?: boolean | Player$PlayersInGameArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      PlayersInGame: Prisma.$PlayersInGamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      playerId: string
      displayName: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `playerId`
     * const playerWithPlayerIdOnly = await prisma.player.findMany({ select: { playerId: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `playerId`
     * const playerWithPlayerIdOnly = await prisma.player.createManyAndReturn({ 
     *   select: { playerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    PlayersInGame<T extends Player$PlayersInGameArgs<ExtArgs> = {}>(args?: Subset<T, Player$PlayersInGameArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayersInGamePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */ 
  interface PlayerFieldRefs {
    readonly playerId: FieldRef<"Player", 'String'>
    readonly displayName: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
  }

  /**
   * Player.PlayersInGame
   */
  export type Player$PlayersInGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayersInGame
     */
    select?: PlayersInGameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayersInGameInclude<ExtArgs> | null
    where?: PlayersInGameWhereInput
    orderBy?: PlayersInGameOrderByWithRelationInput | PlayersInGameOrderByWithRelationInput[]
    cursor?: PlayersInGameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayersInGameScalarFieldEnum | PlayersInGameScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GameStateScalarFieldEnum: {
    gameId: 'gameId',
    gameState: 'gameState',
    gameConfiguration: 'gameConfiguration',
    currentGameState: 'currentGameState',
    gameType: 'gameType',
    version: 'version',
    lastUpdatedAt: 'lastUpdatedAt'
  };

  export type GameStateScalarFieldEnum = (typeof GameStateScalarFieldEnum)[keyof typeof GameStateScalarFieldEnum]


  export const PlayersInGameScalarFieldEnum: {
    playersInGameIdentifier: 'playersInGameIdentifier',
    gameId: 'gameId',
    playerId: 'playerId'
  };

  export type PlayersInGameScalarFieldEnum = (typeof PlayersInGameScalarFieldEnum)[keyof typeof PlayersInGameScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    playerId: 'playerId',
    displayName: 'displayName'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'CurrentGameState'
   */
  export type EnumCurrentGameStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrentGameState'>
    


  /**
   * Reference to a field of type 'CurrentGameState[]'
   */
  export type ListEnumCurrentGameStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrentGameState[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type GameStateWhereInput = {
    AND?: GameStateWhereInput | GameStateWhereInput[]
    OR?: GameStateWhereInput[]
    NOT?: GameStateWhereInput | GameStateWhereInput[]
    gameId?: StringFilter<"GameState"> | string
    gameState?: JsonFilter<"GameState">
    gameConfiguration?: JsonFilter<"GameState">
    currentGameState?: EnumCurrentGameStateFilter<"GameState"> | $Enums.CurrentGameState
    gameType?: StringFilter<"GameState"> | string
    version?: StringFilter<"GameState"> | string
    lastUpdatedAt?: DateTimeFilter<"GameState"> | Date | string
    PlayersInGame?: PlayersInGameListRelationFilter
  }

  export type GameStateOrderByWithRelationInput = {
    gameId?: SortOrder
    gameState?: SortOrder
    gameConfiguration?: SortOrder
    currentGameState?: SortOrder
    gameType?: SortOrder
    version?: SortOrder
    lastUpdatedAt?: SortOrder
    PlayersInGame?: PlayersInGameOrderByRelationAggregateInput
  }

  export type GameStateWhereUniqueInput = Prisma.AtLeast<{
    gameId?: string
    AND?: GameStateWhereInput | GameStateWhereInput[]
    OR?: GameStateWhereInput[]
    NOT?: GameStateWhereInput | GameStateWhereInput[]
    gameState?: JsonFilter<"GameState">
    gameConfiguration?: JsonFilter<"GameState">
    currentGameState?: EnumCurrentGameStateFilter<"GameState"> | $Enums.CurrentGameState
    gameType?: StringFilter<"GameState"> | string
    version?: StringFilter<"GameState"> | string
    lastUpdatedAt?: DateTimeFilter<"GameState"> | Date | string
    PlayersInGame?: PlayersInGameListRelationFilter
  }, "gameId">

  export type GameStateOrderByWithAggregationInput = {
    gameId?: SortOrder
    gameState?: SortOrder
    gameConfiguration?: SortOrder
    currentGameState?: SortOrder
    gameType?: SortOrder
    version?: SortOrder
    lastUpdatedAt?: SortOrder
    _count?: GameStateCountOrderByAggregateInput
    _max?: GameStateMaxOrderByAggregateInput
    _min?: GameStateMinOrderByAggregateInput
  }

  export type GameStateScalarWhereWithAggregatesInput = {
    AND?: GameStateScalarWhereWithAggregatesInput | GameStateScalarWhereWithAggregatesInput[]
    OR?: GameStateScalarWhereWithAggregatesInput[]
    NOT?: GameStateScalarWhereWithAggregatesInput | GameStateScalarWhereWithAggregatesInput[]
    gameId?: StringWithAggregatesFilter<"GameState"> | string
    gameState?: JsonWithAggregatesFilter<"GameState">
    gameConfiguration?: JsonWithAggregatesFilter<"GameState">
    currentGameState?: EnumCurrentGameStateWithAggregatesFilter<"GameState"> | $Enums.CurrentGameState
    gameType?: StringWithAggregatesFilter<"GameState"> | string
    version?: StringWithAggregatesFilter<"GameState"> | string
    lastUpdatedAt?: DateTimeWithAggregatesFilter<"GameState"> | Date | string
  }

  export type PlayersInGameWhereInput = {
    AND?: PlayersInGameWhereInput | PlayersInGameWhereInput[]
    OR?: PlayersInGameWhereInput[]
    NOT?: PlayersInGameWhereInput | PlayersInGameWhereInput[]
    playersInGameIdentifier?: StringFilter<"PlayersInGame"> | string
    gameId?: StringFilter<"PlayersInGame"> | string
    playerId?: StringFilter<"PlayersInGame"> | string
    game?: XOR<GameStateRelationFilter, GameStateWhereInput>
    player?: XOR<PlayerRelationFilter, PlayerWhereInput>
  }

  export type PlayersInGameOrderByWithRelationInput = {
    playersInGameIdentifier?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    game?: GameStateOrderByWithRelationInput
    player?: PlayerOrderByWithRelationInput
  }

  export type PlayersInGameWhereUniqueInput = Prisma.AtLeast<{
    playersInGameIdentifier?: string
    AND?: PlayersInGameWhereInput | PlayersInGameWhereInput[]
    OR?: PlayersInGameWhereInput[]
    NOT?: PlayersInGameWhereInput | PlayersInGameWhereInput[]
    gameId?: StringFilter<"PlayersInGame"> | string
    playerId?: StringFilter<"PlayersInGame"> | string
    game?: XOR<GameStateRelationFilter, GameStateWhereInput>
    player?: XOR<PlayerRelationFilter, PlayerWhereInput>
  }, "playersInGameIdentifier">

  export type PlayersInGameOrderByWithAggregationInput = {
    playersInGameIdentifier?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
    _count?: PlayersInGameCountOrderByAggregateInput
    _max?: PlayersInGameMaxOrderByAggregateInput
    _min?: PlayersInGameMinOrderByAggregateInput
  }

  export type PlayersInGameScalarWhereWithAggregatesInput = {
    AND?: PlayersInGameScalarWhereWithAggregatesInput | PlayersInGameScalarWhereWithAggregatesInput[]
    OR?: PlayersInGameScalarWhereWithAggregatesInput[]
    NOT?: PlayersInGameScalarWhereWithAggregatesInput | PlayersInGameScalarWhereWithAggregatesInput[]
    playersInGameIdentifier?: StringWithAggregatesFilter<"PlayersInGame"> | string
    gameId?: StringWithAggregatesFilter<"PlayersInGame"> | string
    playerId?: StringWithAggregatesFilter<"PlayersInGame"> | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    playerId?: StringFilter<"Player"> | string
    displayName?: StringFilter<"Player"> | string
    PlayersInGame?: PlayersInGameListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    playerId?: SortOrder
    displayName?: SortOrder
    PlayersInGame?: PlayersInGameOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    playerId?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    displayName?: StringFilter<"Player"> | string
    PlayersInGame?: PlayersInGameListRelationFilter
  }, "playerId">

  export type PlayerOrderByWithAggregationInput = {
    playerId?: SortOrder
    displayName?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    playerId?: StringWithAggregatesFilter<"Player"> | string
    displayName?: StringWithAggregatesFilter<"Player"> | string
  }

  export type GameStateCreateInput = {
    gameId?: string
    gameState: JsonNullValueInput | InputJsonValue
    gameConfiguration: JsonNullValueInput | InputJsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt?: Date | string
    PlayersInGame?: PlayersInGameCreateNestedManyWithoutGameInput
  }

  export type GameStateUncheckedCreateInput = {
    gameId?: string
    gameState: JsonNullValueInput | InputJsonValue
    gameConfiguration: JsonNullValueInput | InputJsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt?: Date | string
    PlayersInGame?: PlayersInGameUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameStateUpdateInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PlayersInGame?: PlayersInGameUpdateManyWithoutGameNestedInput
  }

  export type GameStateUncheckedUpdateInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PlayersInGame?: PlayersInGameUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameStateCreateManyInput = {
    gameId?: string
    gameState: JsonNullValueInput | InputJsonValue
    gameConfiguration: JsonNullValueInput | InputJsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt?: Date | string
  }

  export type GameStateUpdateManyMutationInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStateUncheckedUpdateManyInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayersInGameCreateInput = {
    playersInGameIdentifier?: string
    game: GameStateCreateNestedOneWithoutPlayersInGameInput
    player: PlayerCreateNestedOneWithoutPlayersInGameInput
  }

  export type PlayersInGameUncheckedCreateInput = {
    playersInGameIdentifier?: string
    gameId: string
    playerId: string
  }

  export type PlayersInGameUpdateInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    game?: GameStateUpdateOneRequiredWithoutPlayersInGameNestedInput
    player?: PlayerUpdateOneRequiredWithoutPlayersInGameNestedInput
  }

  export type PlayersInGameUncheckedUpdateInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameCreateManyInput = {
    playersInGameIdentifier?: string
    gameId: string
    playerId: string
  }

  export type PlayersInGameUpdateManyMutationInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameUncheckedUpdateManyInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerCreateInput = {
    playerId?: string
    displayName: string
    PlayersInGame?: PlayersInGameCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    playerId?: string
    displayName: string
    PlayersInGame?: PlayersInGameUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    PlayersInGame?: PlayersInGameUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    PlayersInGame?: PlayersInGameUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    playerId?: string
    displayName: string
  }

  export type PlayerUpdateManyMutationInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumCurrentGameStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrentGameState | EnumCurrentGameStateFieldRefInput<$PrismaModel>
    in?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrentGameStateFilter<$PrismaModel> | $Enums.CurrentGameState
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlayersInGameListRelationFilter = {
    every?: PlayersInGameWhereInput
    some?: PlayersInGameWhereInput
    none?: PlayersInGameWhereInput
  }

  export type PlayersInGameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameStateCountOrderByAggregateInput = {
    gameId?: SortOrder
    gameState?: SortOrder
    gameConfiguration?: SortOrder
    currentGameState?: SortOrder
    gameType?: SortOrder
    version?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type GameStateMaxOrderByAggregateInput = {
    gameId?: SortOrder
    currentGameState?: SortOrder
    gameType?: SortOrder
    version?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type GameStateMinOrderByAggregateInput = {
    gameId?: SortOrder
    currentGameState?: SortOrder
    gameType?: SortOrder
    version?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumCurrentGameStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrentGameState | EnumCurrentGameStateFieldRefInput<$PrismaModel>
    in?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrentGameStateWithAggregatesFilter<$PrismaModel> | $Enums.CurrentGameState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrentGameStateFilter<$PrismaModel>
    _max?: NestedEnumCurrentGameStateFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GameStateRelationFilter = {
    is?: GameStateWhereInput
    isNot?: GameStateWhereInput
  }

  export type PlayerRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type PlayersInGameCountOrderByAggregateInput = {
    playersInGameIdentifier?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
  }

  export type PlayersInGameMaxOrderByAggregateInput = {
    playersInGameIdentifier?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
  }

  export type PlayersInGameMinOrderByAggregateInput = {
    playersInGameIdentifier?: SortOrder
    gameId?: SortOrder
    playerId?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    playerId?: SortOrder
    displayName?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    playerId?: SortOrder
    displayName?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    playerId?: SortOrder
    displayName?: SortOrder
  }

  export type PlayersInGameCreateNestedManyWithoutGameInput = {
    create?: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput> | PlayersInGameCreateWithoutGameInput[] | PlayersInGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutGameInput | PlayersInGameCreateOrConnectWithoutGameInput[]
    createMany?: PlayersInGameCreateManyGameInputEnvelope
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
  }

  export type PlayersInGameUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput> | PlayersInGameCreateWithoutGameInput[] | PlayersInGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutGameInput | PlayersInGameCreateOrConnectWithoutGameInput[]
    createMany?: PlayersInGameCreateManyGameInputEnvelope
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCurrentGameStateFieldUpdateOperationsInput = {
    set?: $Enums.CurrentGameState
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlayersInGameUpdateManyWithoutGameNestedInput = {
    create?: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput> | PlayersInGameCreateWithoutGameInput[] | PlayersInGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutGameInput | PlayersInGameCreateOrConnectWithoutGameInput[]
    upsert?: PlayersInGameUpsertWithWhereUniqueWithoutGameInput | PlayersInGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PlayersInGameCreateManyGameInputEnvelope
    set?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    disconnect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    delete?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    update?: PlayersInGameUpdateWithWhereUniqueWithoutGameInput | PlayersInGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PlayersInGameUpdateManyWithWhereWithoutGameInput | PlayersInGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
  }

  export type PlayersInGameUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput> | PlayersInGameCreateWithoutGameInput[] | PlayersInGameUncheckedCreateWithoutGameInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutGameInput | PlayersInGameCreateOrConnectWithoutGameInput[]
    upsert?: PlayersInGameUpsertWithWhereUniqueWithoutGameInput | PlayersInGameUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: PlayersInGameCreateManyGameInputEnvelope
    set?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    disconnect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    delete?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    update?: PlayersInGameUpdateWithWhereUniqueWithoutGameInput | PlayersInGameUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: PlayersInGameUpdateManyWithWhereWithoutGameInput | PlayersInGameUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
  }

  export type GameStateCreateNestedOneWithoutPlayersInGameInput = {
    create?: XOR<GameStateCreateWithoutPlayersInGameInput, GameStateUncheckedCreateWithoutPlayersInGameInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutPlayersInGameInput
    connect?: GameStateWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutPlayersInGameInput = {
    create?: XOR<PlayerCreateWithoutPlayersInGameInput, PlayerUncheckedCreateWithoutPlayersInGameInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutPlayersInGameInput
    connect?: PlayerWhereUniqueInput
  }

  export type GameStateUpdateOneRequiredWithoutPlayersInGameNestedInput = {
    create?: XOR<GameStateCreateWithoutPlayersInGameInput, GameStateUncheckedCreateWithoutPlayersInGameInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutPlayersInGameInput
    upsert?: GameStateUpsertWithoutPlayersInGameInput
    connect?: GameStateWhereUniqueInput
    update?: XOR<XOR<GameStateUpdateToOneWithWhereWithoutPlayersInGameInput, GameStateUpdateWithoutPlayersInGameInput>, GameStateUncheckedUpdateWithoutPlayersInGameInput>
  }

  export type PlayerUpdateOneRequiredWithoutPlayersInGameNestedInput = {
    create?: XOR<PlayerCreateWithoutPlayersInGameInput, PlayerUncheckedCreateWithoutPlayersInGameInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutPlayersInGameInput
    upsert?: PlayerUpsertWithoutPlayersInGameInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutPlayersInGameInput, PlayerUpdateWithoutPlayersInGameInput>, PlayerUncheckedUpdateWithoutPlayersInGameInput>
  }

  export type PlayersInGameCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput> | PlayersInGameCreateWithoutPlayerInput[] | PlayersInGameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutPlayerInput | PlayersInGameCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayersInGameCreateManyPlayerInputEnvelope
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
  }

  export type PlayersInGameUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput> | PlayersInGameCreateWithoutPlayerInput[] | PlayersInGameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutPlayerInput | PlayersInGameCreateOrConnectWithoutPlayerInput[]
    createMany?: PlayersInGameCreateManyPlayerInputEnvelope
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
  }

  export type PlayersInGameUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput> | PlayersInGameCreateWithoutPlayerInput[] | PlayersInGameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutPlayerInput | PlayersInGameCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayersInGameUpsertWithWhereUniqueWithoutPlayerInput | PlayersInGameUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayersInGameCreateManyPlayerInputEnvelope
    set?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    disconnect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    delete?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    update?: PlayersInGameUpdateWithWhereUniqueWithoutPlayerInput | PlayersInGameUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayersInGameUpdateManyWithWhereWithoutPlayerInput | PlayersInGameUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
  }

  export type PlayersInGameUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput> | PlayersInGameCreateWithoutPlayerInput[] | PlayersInGameUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: PlayersInGameCreateOrConnectWithoutPlayerInput | PlayersInGameCreateOrConnectWithoutPlayerInput[]
    upsert?: PlayersInGameUpsertWithWhereUniqueWithoutPlayerInput | PlayersInGameUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: PlayersInGameCreateManyPlayerInputEnvelope
    set?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    disconnect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    delete?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    connect?: PlayersInGameWhereUniqueInput | PlayersInGameWhereUniqueInput[]
    update?: PlayersInGameUpdateWithWhereUniqueWithoutPlayerInput | PlayersInGameUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: PlayersInGameUpdateManyWithWhereWithoutPlayerInput | PlayersInGameUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCurrentGameStateFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrentGameState | EnumCurrentGameStateFieldRefInput<$PrismaModel>
    in?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrentGameStateFilter<$PrismaModel> | $Enums.CurrentGameState
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumCurrentGameStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrentGameState | EnumCurrentGameStateFieldRefInput<$PrismaModel>
    in?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrentGameState[] | ListEnumCurrentGameStateFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrentGameStateWithAggregatesFilter<$PrismaModel> | $Enums.CurrentGameState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrentGameStateFilter<$PrismaModel>
    _max?: NestedEnumCurrentGameStateFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlayersInGameCreateWithoutGameInput = {
    playersInGameIdentifier?: string
    player: PlayerCreateNestedOneWithoutPlayersInGameInput
  }

  export type PlayersInGameUncheckedCreateWithoutGameInput = {
    playersInGameIdentifier?: string
    playerId: string
  }

  export type PlayersInGameCreateOrConnectWithoutGameInput = {
    where: PlayersInGameWhereUniqueInput
    create: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput>
  }

  export type PlayersInGameCreateManyGameInputEnvelope = {
    data: PlayersInGameCreateManyGameInput | PlayersInGameCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type PlayersInGameUpsertWithWhereUniqueWithoutGameInput = {
    where: PlayersInGameWhereUniqueInput
    update: XOR<PlayersInGameUpdateWithoutGameInput, PlayersInGameUncheckedUpdateWithoutGameInput>
    create: XOR<PlayersInGameCreateWithoutGameInput, PlayersInGameUncheckedCreateWithoutGameInput>
  }

  export type PlayersInGameUpdateWithWhereUniqueWithoutGameInput = {
    where: PlayersInGameWhereUniqueInput
    data: XOR<PlayersInGameUpdateWithoutGameInput, PlayersInGameUncheckedUpdateWithoutGameInput>
  }

  export type PlayersInGameUpdateManyWithWhereWithoutGameInput = {
    where: PlayersInGameScalarWhereInput
    data: XOR<PlayersInGameUpdateManyMutationInput, PlayersInGameUncheckedUpdateManyWithoutGameInput>
  }

  export type PlayersInGameScalarWhereInput = {
    AND?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
    OR?: PlayersInGameScalarWhereInput[]
    NOT?: PlayersInGameScalarWhereInput | PlayersInGameScalarWhereInput[]
    playersInGameIdentifier?: StringFilter<"PlayersInGame"> | string
    gameId?: StringFilter<"PlayersInGame"> | string
    playerId?: StringFilter<"PlayersInGame"> | string
  }

  export type GameStateCreateWithoutPlayersInGameInput = {
    gameId?: string
    gameState: JsonNullValueInput | InputJsonValue
    gameConfiguration: JsonNullValueInput | InputJsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt?: Date | string
  }

  export type GameStateUncheckedCreateWithoutPlayersInGameInput = {
    gameId?: string
    gameState: JsonNullValueInput | InputJsonValue
    gameConfiguration: JsonNullValueInput | InputJsonValue
    currentGameState: $Enums.CurrentGameState
    gameType: string
    version: string
    lastUpdatedAt?: Date | string
  }

  export type GameStateCreateOrConnectWithoutPlayersInGameInput = {
    where: GameStateWhereUniqueInput
    create: XOR<GameStateCreateWithoutPlayersInGameInput, GameStateUncheckedCreateWithoutPlayersInGameInput>
  }

  export type PlayerCreateWithoutPlayersInGameInput = {
    playerId?: string
    displayName: string
  }

  export type PlayerUncheckedCreateWithoutPlayersInGameInput = {
    playerId?: string
    displayName: string
  }

  export type PlayerCreateOrConnectWithoutPlayersInGameInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutPlayersInGameInput, PlayerUncheckedCreateWithoutPlayersInGameInput>
  }

  export type GameStateUpsertWithoutPlayersInGameInput = {
    update: XOR<GameStateUpdateWithoutPlayersInGameInput, GameStateUncheckedUpdateWithoutPlayersInGameInput>
    create: XOR<GameStateCreateWithoutPlayersInGameInput, GameStateUncheckedCreateWithoutPlayersInGameInput>
    where?: GameStateWhereInput
  }

  export type GameStateUpdateToOneWithWhereWithoutPlayersInGameInput = {
    where?: GameStateWhereInput
    data: XOR<GameStateUpdateWithoutPlayersInGameInput, GameStateUncheckedUpdateWithoutPlayersInGameInput>
  }

  export type GameStateUpdateWithoutPlayersInGameInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStateUncheckedUpdateWithoutPlayersInGameInput = {
    gameId?: StringFieldUpdateOperationsInput | string
    gameState?: JsonNullValueInput | InputJsonValue
    gameConfiguration?: JsonNullValueInput | InputJsonValue
    currentGameState?: EnumCurrentGameStateFieldUpdateOperationsInput | $Enums.CurrentGameState
    gameType?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUpsertWithoutPlayersInGameInput = {
    update: XOR<PlayerUpdateWithoutPlayersInGameInput, PlayerUncheckedUpdateWithoutPlayersInGameInput>
    create: XOR<PlayerCreateWithoutPlayersInGameInput, PlayerUncheckedCreateWithoutPlayersInGameInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutPlayersInGameInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutPlayersInGameInput, PlayerUncheckedUpdateWithoutPlayersInGameInput>
  }

  export type PlayerUpdateWithoutPlayersInGameInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateWithoutPlayersInGameInput = {
    playerId?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameCreateWithoutPlayerInput = {
    playersInGameIdentifier?: string
    game: GameStateCreateNestedOneWithoutPlayersInGameInput
  }

  export type PlayersInGameUncheckedCreateWithoutPlayerInput = {
    playersInGameIdentifier?: string
    gameId: string
  }

  export type PlayersInGameCreateOrConnectWithoutPlayerInput = {
    where: PlayersInGameWhereUniqueInput
    create: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput>
  }

  export type PlayersInGameCreateManyPlayerInputEnvelope = {
    data: PlayersInGameCreateManyPlayerInput | PlayersInGameCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type PlayersInGameUpsertWithWhereUniqueWithoutPlayerInput = {
    where: PlayersInGameWhereUniqueInput
    update: XOR<PlayersInGameUpdateWithoutPlayerInput, PlayersInGameUncheckedUpdateWithoutPlayerInput>
    create: XOR<PlayersInGameCreateWithoutPlayerInput, PlayersInGameUncheckedCreateWithoutPlayerInput>
  }

  export type PlayersInGameUpdateWithWhereUniqueWithoutPlayerInput = {
    where: PlayersInGameWhereUniqueInput
    data: XOR<PlayersInGameUpdateWithoutPlayerInput, PlayersInGameUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayersInGameUpdateManyWithWhereWithoutPlayerInput = {
    where: PlayersInGameScalarWhereInput
    data: XOR<PlayersInGameUpdateManyMutationInput, PlayersInGameUncheckedUpdateManyWithoutPlayerInput>
  }

  export type PlayersInGameCreateManyGameInput = {
    playersInGameIdentifier?: string
    playerId: string
  }

  export type PlayersInGameUpdateWithoutGameInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    player?: PlayerUpdateOneRequiredWithoutPlayersInGameNestedInput
  }

  export type PlayersInGameUncheckedUpdateWithoutGameInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameUncheckedUpdateManyWithoutGameInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameCreateManyPlayerInput = {
    playersInGameIdentifier?: string
    gameId: string
  }

  export type PlayersInGameUpdateWithoutPlayerInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    game?: GameStateUpdateOneRequiredWithoutPlayersInGameNestedInput
  }

  export type PlayersInGameUncheckedUpdateWithoutPlayerInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayersInGameUncheckedUpdateManyWithoutPlayerInput = {
    playersInGameIdentifier?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use GameStateCountOutputTypeDefaultArgs instead
     */
    export type GameStateCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameStateCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayerCountOutputTypeDefaultArgs instead
     */
    export type PlayerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameStateDefaultArgs instead
     */
    export type GameStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameStateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayersInGameDefaultArgs instead
     */
    export type PlayersInGameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayersInGameDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayerDefaultArgs instead
     */
    export type PlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayerDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}