
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
 * Model TileMap
 * 
 */
export type TileMap = $Result.DefaultSelection<Prisma.$TileMapPayload>
/**
 * Model Tile
 * 
 */
export type Tile = $Result.DefaultSelection<Prisma.$TilePayload>
/**
 * Model Edge
 * 
 */
export type Edge = $Result.DefaultSelection<Prisma.$EdgePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more TileMaps
 * const tileMaps = await prisma.tileMap.findMany()
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
   * // Fetch zero or more TileMaps
   * const tileMaps = await prisma.tileMap.findMany()
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
   * `prisma.tileMap`: Exposes CRUD operations for the **TileMap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TileMaps
    * const tileMaps = await prisma.tileMap.findMany()
    * ```
    */
  get tileMap(): Prisma.TileMapDelegate<ExtArgs>;

  /**
   * `prisma.tile`: Exposes CRUD operations for the **Tile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tiles
    * const tiles = await prisma.tile.findMany()
    * ```
    */
  get tile(): Prisma.TileDelegate<ExtArgs>;

  /**
   * `prisma.edge`: Exposes CRUD operations for the **Edge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Edges
    * const edges = await prisma.edge.findMany()
    * ```
    */
  get edge(): Prisma.EdgeDelegate<ExtArgs>;
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
    TileMap: 'TileMap',
    Tile: 'Tile',
    Edge: 'Edge'
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
      modelProps: "tileMap" | "tile" | "edge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TileMap: {
        payload: Prisma.$TileMapPayload<ExtArgs>
        fields: Prisma.TileMapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TileMapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TileMapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          findFirst: {
            args: Prisma.TileMapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TileMapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          findMany: {
            args: Prisma.TileMapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>[]
          }
          create: {
            args: Prisma.TileMapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          createMany: {
            args: Prisma.TileMapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TileMapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>[]
          }
          delete: {
            args: Prisma.TileMapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          update: {
            args: Prisma.TileMapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          deleteMany: {
            args: Prisma.TileMapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TileMapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TileMapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TileMapPayload>
          }
          aggregate: {
            args: Prisma.TileMapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTileMap>
          }
          groupBy: {
            args: Prisma.TileMapGroupByArgs<ExtArgs>
            result: $Utils.Optional<TileMapGroupByOutputType>[]
          }
          count: {
            args: Prisma.TileMapCountArgs<ExtArgs>
            result: $Utils.Optional<TileMapCountAggregateOutputType> | number
          }
        }
      }
      Tile: {
        payload: Prisma.$TilePayload<ExtArgs>
        fields: Prisma.TileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          findFirst: {
            args: Prisma.TileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          findMany: {
            args: Prisma.TileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>[]
          }
          create: {
            args: Prisma.TileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          createMany: {
            args: Prisma.TileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>[]
          }
          delete: {
            args: Prisma.TileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          update: {
            args: Prisma.TileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          deleteMany: {
            args: Prisma.TileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TilePayload>
          }
          aggregate: {
            args: Prisma.TileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTile>
          }
          groupBy: {
            args: Prisma.TileGroupByArgs<ExtArgs>
            result: $Utils.Optional<TileGroupByOutputType>[]
          }
          count: {
            args: Prisma.TileCountArgs<ExtArgs>
            result: $Utils.Optional<TileCountAggregateOutputType> | number
          }
        }
      }
      Edge: {
        payload: Prisma.$EdgePayload<ExtArgs>
        fields: Prisma.EdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          findFirst: {
            args: Prisma.EdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          findMany: {
            args: Prisma.EdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>[]
          }
          create: {
            args: Prisma.EdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          createMany: {
            args: Prisma.EdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>[]
          }
          delete: {
            args: Prisma.EdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          update: {
            args: Prisma.EdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          deleteMany: {
            args: Prisma.EdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdgePayload>
          }
          aggregate: {
            args: Prisma.EdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEdge>
          }
          groupBy: {
            args: Prisma.EdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EdgeCountArgs<ExtArgs>
            result: $Utils.Optional<EdgeCountAggregateOutputType> | number
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
   * Count Type TileMapCountOutputType
   */

  export type TileMapCountOutputType = {
    tiles: number
  }

  export type TileMapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tiles?: boolean | TileMapCountOutputTypeCountTilesArgs
  }

  // Custom InputTypes
  /**
   * TileMapCountOutputType without action
   */
  export type TileMapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMapCountOutputType
     */
    select?: TileMapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TileMapCountOutputType without action
   */
  export type TileMapCountOutputTypeCountTilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileWhereInput
  }


  /**
   * Count Type TileCountOutputType
   */

  export type TileCountOutputType = {
    fromTile: number
    toTile: number
  }

  export type TileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromTile?: boolean | TileCountOutputTypeCountFromTileArgs
    toTile?: boolean | TileCountOutputTypeCountToTileArgs
  }

  // Custom InputTypes
  /**
   * TileCountOutputType without action
   */
  export type TileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileCountOutputType
     */
    select?: TileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TileCountOutputType without action
   */
  export type TileCountOutputTypeCountFromTileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EdgeWhereInput
  }

  /**
   * TileCountOutputType without action
   */
  export type TileCountOutputTypeCountToTileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EdgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model TileMap
   */

  export type AggregateTileMap = {
    _count: TileMapCountAggregateOutputType | null
    _min: TileMapMinAggregateOutputType | null
    _max: TileMapMaxAggregateOutputType | null
  }

  export type TileMapMinAggregateOutputType = {
    tileMapId: string | null
    createdAt: Date | null
    startingTileId: string | null
  }

  export type TileMapMaxAggregateOutputType = {
    tileMapId: string | null
    createdAt: Date | null
    startingTileId: string | null
  }

  export type TileMapCountAggregateOutputType = {
    tileMapId: number
    createdAt: number
    startingTileId: number
    _all: number
  }


  export type TileMapMinAggregateInputType = {
    tileMapId?: true
    createdAt?: true
    startingTileId?: true
  }

  export type TileMapMaxAggregateInputType = {
    tileMapId?: true
    createdAt?: true
    startingTileId?: true
  }

  export type TileMapCountAggregateInputType = {
    tileMapId?: true
    createdAt?: true
    startingTileId?: true
    _all?: true
  }

  export type TileMapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileMap to aggregate.
     */
    where?: TileMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileMaps to fetch.
     */
    orderBy?: TileMapOrderByWithRelationInput | TileMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TileMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TileMaps
    **/
    _count?: true | TileMapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TileMapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TileMapMaxAggregateInputType
  }

  export type GetTileMapAggregateType<T extends TileMapAggregateArgs> = {
        [P in keyof T & keyof AggregateTileMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTileMap[P]>
      : GetScalarType<T[P], AggregateTileMap[P]>
  }




  export type TileMapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileMapWhereInput
    orderBy?: TileMapOrderByWithAggregationInput | TileMapOrderByWithAggregationInput[]
    by: TileMapScalarFieldEnum[] | TileMapScalarFieldEnum
    having?: TileMapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TileMapCountAggregateInputType | true
    _min?: TileMapMinAggregateInputType
    _max?: TileMapMaxAggregateInputType
  }

  export type TileMapGroupByOutputType = {
    tileMapId: string
    createdAt: Date
    startingTileId: string
    _count: TileMapCountAggregateOutputType | null
    _min: TileMapMinAggregateOutputType | null
    _max: TileMapMaxAggregateOutputType | null
  }

  type GetTileMapGroupByPayload<T extends TileMapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TileMapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TileMapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TileMapGroupByOutputType[P]>
            : GetScalarType<T[P], TileMapGroupByOutputType[P]>
        }
      >
    >


  export type TileMapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tileMapId?: boolean
    createdAt?: boolean
    startingTileId?: boolean
    tiles?: boolean | TileMap$tilesArgs<ExtArgs>
    _count?: boolean | TileMapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tileMap"]>

  export type TileMapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tileMapId?: boolean
    createdAt?: boolean
    startingTileId?: boolean
  }, ExtArgs["result"]["tileMap"]>

  export type TileMapSelectScalar = {
    tileMapId?: boolean
    createdAt?: boolean
    startingTileId?: boolean
  }

  export type TileMapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tiles?: boolean | TileMap$tilesArgs<ExtArgs>
    _count?: boolean | TileMapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TileMapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TileMapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TileMap"
    objects: {
      tiles: Prisma.$TilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tileMapId: string
      createdAt: Date
      startingTileId: string
    }, ExtArgs["result"]["tileMap"]>
    composites: {}
  }

  type TileMapGetPayload<S extends boolean | null | undefined | TileMapDefaultArgs> = $Result.GetResult<Prisma.$TileMapPayload, S>

  type TileMapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TileMapFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TileMapCountAggregateInputType | true
    }

  export interface TileMapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TileMap'], meta: { name: 'TileMap' } }
    /**
     * Find zero or one TileMap that matches the filter.
     * @param {TileMapFindUniqueArgs} args - Arguments to find a TileMap
     * @example
     * // Get one TileMap
     * const tileMap = await prisma.tileMap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TileMapFindUniqueArgs>(args: SelectSubset<T, TileMapFindUniqueArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TileMap that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TileMapFindUniqueOrThrowArgs} args - Arguments to find a TileMap
     * @example
     * // Get one TileMap
     * const tileMap = await prisma.tileMap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TileMapFindUniqueOrThrowArgs>(args: SelectSubset<T, TileMapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TileMap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapFindFirstArgs} args - Arguments to find a TileMap
     * @example
     * // Get one TileMap
     * const tileMap = await prisma.tileMap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TileMapFindFirstArgs>(args?: SelectSubset<T, TileMapFindFirstArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TileMap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapFindFirstOrThrowArgs} args - Arguments to find a TileMap
     * @example
     * // Get one TileMap
     * const tileMap = await prisma.tileMap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TileMapFindFirstOrThrowArgs>(args?: SelectSubset<T, TileMapFindFirstOrThrowArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TileMaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TileMaps
     * const tileMaps = await prisma.tileMap.findMany()
     * 
     * // Get first 10 TileMaps
     * const tileMaps = await prisma.tileMap.findMany({ take: 10 })
     * 
     * // Only select the `tileMapId`
     * const tileMapWithTileMapIdOnly = await prisma.tileMap.findMany({ select: { tileMapId: true } })
     * 
     */
    findMany<T extends TileMapFindManyArgs>(args?: SelectSubset<T, TileMapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TileMap.
     * @param {TileMapCreateArgs} args - Arguments to create a TileMap.
     * @example
     * // Create one TileMap
     * const TileMap = await prisma.tileMap.create({
     *   data: {
     *     // ... data to create a TileMap
     *   }
     * })
     * 
     */
    create<T extends TileMapCreateArgs>(args: SelectSubset<T, TileMapCreateArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TileMaps.
     * @param {TileMapCreateManyArgs} args - Arguments to create many TileMaps.
     * @example
     * // Create many TileMaps
     * const tileMap = await prisma.tileMap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TileMapCreateManyArgs>(args?: SelectSubset<T, TileMapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TileMaps and returns the data saved in the database.
     * @param {TileMapCreateManyAndReturnArgs} args - Arguments to create many TileMaps.
     * @example
     * // Create many TileMaps
     * const tileMap = await prisma.tileMap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TileMaps and only return the `tileMapId`
     * const tileMapWithTileMapIdOnly = await prisma.tileMap.createManyAndReturn({ 
     *   select: { tileMapId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TileMapCreateManyAndReturnArgs>(args?: SelectSubset<T, TileMapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TileMap.
     * @param {TileMapDeleteArgs} args - Arguments to delete one TileMap.
     * @example
     * // Delete one TileMap
     * const TileMap = await prisma.tileMap.delete({
     *   where: {
     *     // ... filter to delete one TileMap
     *   }
     * })
     * 
     */
    delete<T extends TileMapDeleteArgs>(args: SelectSubset<T, TileMapDeleteArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TileMap.
     * @param {TileMapUpdateArgs} args - Arguments to update one TileMap.
     * @example
     * // Update one TileMap
     * const tileMap = await prisma.tileMap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TileMapUpdateArgs>(args: SelectSubset<T, TileMapUpdateArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TileMaps.
     * @param {TileMapDeleteManyArgs} args - Arguments to filter TileMaps to delete.
     * @example
     * // Delete a few TileMaps
     * const { count } = await prisma.tileMap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TileMapDeleteManyArgs>(args?: SelectSubset<T, TileMapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TileMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TileMaps
     * const tileMap = await prisma.tileMap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TileMapUpdateManyArgs>(args: SelectSubset<T, TileMapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TileMap.
     * @param {TileMapUpsertArgs} args - Arguments to update or create a TileMap.
     * @example
     * // Update or create a TileMap
     * const tileMap = await prisma.tileMap.upsert({
     *   create: {
     *     // ... data to create a TileMap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TileMap we want to update
     *   }
     * })
     */
    upsert<T extends TileMapUpsertArgs>(args: SelectSubset<T, TileMapUpsertArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TileMaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapCountArgs} args - Arguments to filter TileMaps to count.
     * @example
     * // Count the number of TileMaps
     * const count = await prisma.tileMap.count({
     *   where: {
     *     // ... the filter for the TileMaps we want to count
     *   }
     * })
    **/
    count<T extends TileMapCountArgs>(
      args?: Subset<T, TileMapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TileMapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TileMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TileMapAggregateArgs>(args: Subset<T, TileMapAggregateArgs>): Prisma.PrismaPromise<GetTileMapAggregateType<T>>

    /**
     * Group by TileMap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileMapGroupByArgs} args - Group by arguments.
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
      T extends TileMapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TileMapGroupByArgs['orderBy'] }
        : { orderBy?: TileMapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TileMapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTileMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TileMap model
   */
  readonly fields: TileMapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TileMap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TileMapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tiles<T extends TileMap$tilesArgs<ExtArgs> = {}>(args?: Subset<T, TileMap$tilesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the TileMap model
   */ 
  interface TileMapFieldRefs {
    readonly tileMapId: FieldRef<"TileMap", 'String'>
    readonly createdAt: FieldRef<"TileMap", 'DateTime'>
    readonly startingTileId: FieldRef<"TileMap", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TileMap findUnique
   */
  export type TileMapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter, which TileMap to fetch.
     */
    where: TileMapWhereUniqueInput
  }

  /**
   * TileMap findUniqueOrThrow
   */
  export type TileMapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter, which TileMap to fetch.
     */
    where: TileMapWhereUniqueInput
  }

  /**
   * TileMap findFirst
   */
  export type TileMapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter, which TileMap to fetch.
     */
    where?: TileMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileMaps to fetch.
     */
    orderBy?: TileMapOrderByWithRelationInput | TileMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileMaps.
     */
    cursor?: TileMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileMaps.
     */
    distinct?: TileMapScalarFieldEnum | TileMapScalarFieldEnum[]
  }

  /**
   * TileMap findFirstOrThrow
   */
  export type TileMapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter, which TileMap to fetch.
     */
    where?: TileMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileMaps to fetch.
     */
    orderBy?: TileMapOrderByWithRelationInput | TileMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TileMaps.
     */
    cursor?: TileMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileMaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TileMaps.
     */
    distinct?: TileMapScalarFieldEnum | TileMapScalarFieldEnum[]
  }

  /**
   * TileMap findMany
   */
  export type TileMapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter, which TileMaps to fetch.
     */
    where?: TileMapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TileMaps to fetch.
     */
    orderBy?: TileMapOrderByWithRelationInput | TileMapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TileMaps.
     */
    cursor?: TileMapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TileMaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TileMaps.
     */
    skip?: number
    distinct?: TileMapScalarFieldEnum | TileMapScalarFieldEnum[]
  }

  /**
   * TileMap create
   */
  export type TileMapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * The data needed to create a TileMap.
     */
    data: XOR<TileMapCreateInput, TileMapUncheckedCreateInput>
  }

  /**
   * TileMap createMany
   */
  export type TileMapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TileMaps.
     */
    data: TileMapCreateManyInput | TileMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TileMap createManyAndReturn
   */
  export type TileMapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TileMaps.
     */
    data: TileMapCreateManyInput | TileMapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TileMap update
   */
  export type TileMapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * The data needed to update a TileMap.
     */
    data: XOR<TileMapUpdateInput, TileMapUncheckedUpdateInput>
    /**
     * Choose, which TileMap to update.
     */
    where: TileMapWhereUniqueInput
  }

  /**
   * TileMap updateMany
   */
  export type TileMapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TileMaps.
     */
    data: XOR<TileMapUpdateManyMutationInput, TileMapUncheckedUpdateManyInput>
    /**
     * Filter which TileMaps to update
     */
    where?: TileMapWhereInput
  }

  /**
   * TileMap upsert
   */
  export type TileMapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * The filter to search for the TileMap to update in case it exists.
     */
    where: TileMapWhereUniqueInput
    /**
     * In case the TileMap found by the `where` argument doesn't exist, create a new TileMap with this data.
     */
    create: XOR<TileMapCreateInput, TileMapUncheckedCreateInput>
    /**
     * In case the TileMap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TileMapUpdateInput, TileMapUncheckedUpdateInput>
  }

  /**
   * TileMap delete
   */
  export type TileMapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
    /**
     * Filter which TileMap to delete.
     */
    where: TileMapWhereUniqueInput
  }

  /**
   * TileMap deleteMany
   */
  export type TileMapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TileMaps to delete
     */
    where?: TileMapWhereInput
  }

  /**
   * TileMap.tiles
   */
  export type TileMap$tilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    where?: TileWhereInput
    orderBy?: TileOrderByWithRelationInput | TileOrderByWithRelationInput[]
    cursor?: TileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TileScalarFieldEnum | TileScalarFieldEnum[]
  }

  /**
   * TileMap without action
   */
  export type TileMapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TileMap
     */
    select?: TileMapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileMapInclude<ExtArgs> | null
  }


  /**
   * Model Tile
   */

  export type AggregateTile = {
    _count: TileCountAggregateOutputType | null
    _min: TileMinAggregateOutputType | null
    _max: TileMaxAggregateOutputType | null
  }

  export type TileMinAggregateOutputType = {
    tileId: string | null
    createdAt: Date | null
    image: string | null
    tileMapId: string | null
  }

  export type TileMaxAggregateOutputType = {
    tileId: string | null
    createdAt: Date | null
    image: string | null
    tileMapId: string | null
  }

  export type TileCountAggregateOutputType = {
    tileId: number
    createdAt: number
    image: number
    tileMapId: number
    _all: number
  }


  export type TileMinAggregateInputType = {
    tileId?: true
    createdAt?: true
    image?: true
    tileMapId?: true
  }

  export type TileMaxAggregateInputType = {
    tileId?: true
    createdAt?: true
    image?: true
    tileMapId?: true
  }

  export type TileCountAggregateInputType = {
    tileId?: true
    createdAt?: true
    image?: true
    tileMapId?: true
    _all?: true
  }

  export type TileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tile to aggregate.
     */
    where?: TileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiles to fetch.
     */
    orderBy?: TileOrderByWithRelationInput | TileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tiles
    **/
    _count?: true | TileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TileMaxAggregateInputType
  }

  export type GetTileAggregateType<T extends TileAggregateArgs> = {
        [P in keyof T & keyof AggregateTile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTile[P]>
      : GetScalarType<T[P], AggregateTile[P]>
  }




  export type TileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TileWhereInput
    orderBy?: TileOrderByWithAggregationInput | TileOrderByWithAggregationInput[]
    by: TileScalarFieldEnum[] | TileScalarFieldEnum
    having?: TileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TileCountAggregateInputType | true
    _min?: TileMinAggregateInputType
    _max?: TileMaxAggregateInputType
  }

  export type TileGroupByOutputType = {
    tileId: string
    createdAt: Date
    image: string
    tileMapId: string
    _count: TileCountAggregateOutputType | null
    _min: TileMinAggregateOutputType | null
    _max: TileMaxAggregateOutputType | null
  }

  type GetTileGroupByPayload<T extends TileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TileGroupByOutputType[P]>
            : GetScalarType<T[P], TileGroupByOutputType[P]>
        }
      >
    >


  export type TileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tileId?: boolean
    createdAt?: boolean
    image?: boolean
    tileMapId?: boolean
    tileMap?: boolean | TileMapDefaultArgs<ExtArgs>
    fromTile?: boolean | Tile$fromTileArgs<ExtArgs>
    toTile?: boolean | Tile$toTileArgs<ExtArgs>
    _count?: boolean | TileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tile"]>

  export type TileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tileId?: boolean
    createdAt?: boolean
    image?: boolean
    tileMapId?: boolean
    tileMap?: boolean | TileMapDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tile"]>

  export type TileSelectScalar = {
    tileId?: boolean
    createdAt?: boolean
    image?: boolean
    tileMapId?: boolean
  }

  export type TileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tileMap?: boolean | TileMapDefaultArgs<ExtArgs>
    fromTile?: boolean | Tile$fromTileArgs<ExtArgs>
    toTile?: boolean | Tile$toTileArgs<ExtArgs>
    _count?: boolean | TileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tileMap?: boolean | TileMapDefaultArgs<ExtArgs>
  }

  export type $TilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tile"
    objects: {
      tileMap: Prisma.$TileMapPayload<ExtArgs>
      fromTile: Prisma.$EdgePayload<ExtArgs>[]
      toTile: Prisma.$EdgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tileId: string
      createdAt: Date
      image: string
      tileMapId: string
    }, ExtArgs["result"]["tile"]>
    composites: {}
  }

  type TileGetPayload<S extends boolean | null | undefined | TileDefaultArgs> = $Result.GetResult<Prisma.$TilePayload, S>

  type TileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TileCountAggregateInputType | true
    }

  export interface TileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tile'], meta: { name: 'Tile' } }
    /**
     * Find zero or one Tile that matches the filter.
     * @param {TileFindUniqueArgs} args - Arguments to find a Tile
     * @example
     * // Get one Tile
     * const tile = await prisma.tile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TileFindUniqueArgs>(args: SelectSubset<T, TileFindUniqueArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TileFindUniqueOrThrowArgs} args - Arguments to find a Tile
     * @example
     * // Get one Tile
     * const tile = await prisma.tile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TileFindUniqueOrThrowArgs>(args: SelectSubset<T, TileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileFindFirstArgs} args - Arguments to find a Tile
     * @example
     * // Get one Tile
     * const tile = await prisma.tile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TileFindFirstArgs>(args?: SelectSubset<T, TileFindFirstArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileFindFirstOrThrowArgs} args - Arguments to find a Tile
     * @example
     * // Get one Tile
     * const tile = await prisma.tile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TileFindFirstOrThrowArgs>(args?: SelectSubset<T, TileFindFirstOrThrowArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tiles
     * const tiles = await prisma.tile.findMany()
     * 
     * // Get first 10 Tiles
     * const tiles = await prisma.tile.findMany({ take: 10 })
     * 
     * // Only select the `tileId`
     * const tileWithTileIdOnly = await prisma.tile.findMany({ select: { tileId: true } })
     * 
     */
    findMany<T extends TileFindManyArgs>(args?: SelectSubset<T, TileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tile.
     * @param {TileCreateArgs} args - Arguments to create a Tile.
     * @example
     * // Create one Tile
     * const Tile = await prisma.tile.create({
     *   data: {
     *     // ... data to create a Tile
     *   }
     * })
     * 
     */
    create<T extends TileCreateArgs>(args: SelectSubset<T, TileCreateArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tiles.
     * @param {TileCreateManyArgs} args - Arguments to create many Tiles.
     * @example
     * // Create many Tiles
     * const tile = await prisma.tile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TileCreateManyArgs>(args?: SelectSubset<T, TileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tiles and returns the data saved in the database.
     * @param {TileCreateManyAndReturnArgs} args - Arguments to create many Tiles.
     * @example
     * // Create many Tiles
     * const tile = await prisma.tile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tiles and only return the `tileId`
     * const tileWithTileIdOnly = await prisma.tile.createManyAndReturn({ 
     *   select: { tileId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TileCreateManyAndReturnArgs>(args?: SelectSubset<T, TileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tile.
     * @param {TileDeleteArgs} args - Arguments to delete one Tile.
     * @example
     * // Delete one Tile
     * const Tile = await prisma.tile.delete({
     *   where: {
     *     // ... filter to delete one Tile
     *   }
     * })
     * 
     */
    delete<T extends TileDeleteArgs>(args: SelectSubset<T, TileDeleteArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tile.
     * @param {TileUpdateArgs} args - Arguments to update one Tile.
     * @example
     * // Update one Tile
     * const tile = await prisma.tile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TileUpdateArgs>(args: SelectSubset<T, TileUpdateArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tiles.
     * @param {TileDeleteManyArgs} args - Arguments to filter Tiles to delete.
     * @example
     * // Delete a few Tiles
     * const { count } = await prisma.tile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TileDeleteManyArgs>(args?: SelectSubset<T, TileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tiles
     * const tile = await prisma.tile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TileUpdateManyArgs>(args: SelectSubset<T, TileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tile.
     * @param {TileUpsertArgs} args - Arguments to update or create a Tile.
     * @example
     * // Update or create a Tile
     * const tile = await prisma.tile.upsert({
     *   create: {
     *     // ... data to create a Tile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tile we want to update
     *   }
     * })
     */
    upsert<T extends TileUpsertArgs>(args: SelectSubset<T, TileUpsertArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileCountArgs} args - Arguments to filter Tiles to count.
     * @example
     * // Count the number of Tiles
     * const count = await prisma.tile.count({
     *   where: {
     *     // ... the filter for the Tiles we want to count
     *   }
     * })
    **/
    count<T extends TileCountArgs>(
      args?: Subset<T, TileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TileAggregateArgs>(args: Subset<T, TileAggregateArgs>): Prisma.PrismaPromise<GetTileAggregateType<T>>

    /**
     * Group by Tile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TileGroupByArgs} args - Group by arguments.
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
      T extends TileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TileGroupByArgs['orderBy'] }
        : { orderBy?: TileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tile model
   */
  readonly fields: TileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tileMap<T extends TileMapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TileMapDefaultArgs<ExtArgs>>): Prisma__TileMapClient<$Result.GetResult<Prisma.$TileMapPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    fromTile<T extends Tile$fromTileArgs<ExtArgs> = {}>(args?: Subset<T, Tile$fromTileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findMany"> | Null>
    toTile<T extends Tile$toTileArgs<ExtArgs> = {}>(args?: Subset<T, Tile$toTileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Tile model
   */ 
  interface TileFieldRefs {
    readonly tileId: FieldRef<"Tile", 'String'>
    readonly createdAt: FieldRef<"Tile", 'DateTime'>
    readonly image: FieldRef<"Tile", 'String'>
    readonly tileMapId: FieldRef<"Tile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tile findUnique
   */
  export type TileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter, which Tile to fetch.
     */
    where: TileWhereUniqueInput
  }

  /**
   * Tile findUniqueOrThrow
   */
  export type TileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter, which Tile to fetch.
     */
    where: TileWhereUniqueInput
  }

  /**
   * Tile findFirst
   */
  export type TileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter, which Tile to fetch.
     */
    where?: TileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiles to fetch.
     */
    orderBy?: TileOrderByWithRelationInput | TileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiles.
     */
    cursor?: TileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiles.
     */
    distinct?: TileScalarFieldEnum | TileScalarFieldEnum[]
  }

  /**
   * Tile findFirstOrThrow
   */
  export type TileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter, which Tile to fetch.
     */
    where?: TileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiles to fetch.
     */
    orderBy?: TileOrderByWithRelationInput | TileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiles.
     */
    cursor?: TileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiles.
     */
    distinct?: TileScalarFieldEnum | TileScalarFieldEnum[]
  }

  /**
   * Tile findMany
   */
  export type TileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter, which Tiles to fetch.
     */
    where?: TileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiles to fetch.
     */
    orderBy?: TileOrderByWithRelationInput | TileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tiles.
     */
    cursor?: TileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiles.
     */
    skip?: number
    distinct?: TileScalarFieldEnum | TileScalarFieldEnum[]
  }

  /**
   * Tile create
   */
  export type TileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * The data needed to create a Tile.
     */
    data: XOR<TileCreateInput, TileUncheckedCreateInput>
  }

  /**
   * Tile createMany
   */
  export type TileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tiles.
     */
    data: TileCreateManyInput | TileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tile createManyAndReturn
   */
  export type TileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tiles.
     */
    data: TileCreateManyInput | TileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tile update
   */
  export type TileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * The data needed to update a Tile.
     */
    data: XOR<TileUpdateInput, TileUncheckedUpdateInput>
    /**
     * Choose, which Tile to update.
     */
    where: TileWhereUniqueInput
  }

  /**
   * Tile updateMany
   */
  export type TileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tiles.
     */
    data: XOR<TileUpdateManyMutationInput, TileUncheckedUpdateManyInput>
    /**
     * Filter which Tiles to update
     */
    where?: TileWhereInput
  }

  /**
   * Tile upsert
   */
  export type TileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * The filter to search for the Tile to update in case it exists.
     */
    where: TileWhereUniqueInput
    /**
     * In case the Tile found by the `where` argument doesn't exist, create a new Tile with this data.
     */
    create: XOR<TileCreateInput, TileUncheckedCreateInput>
    /**
     * In case the Tile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TileUpdateInput, TileUncheckedUpdateInput>
  }

  /**
   * Tile delete
   */
  export type TileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
    /**
     * Filter which Tile to delete.
     */
    where: TileWhereUniqueInput
  }

  /**
   * Tile deleteMany
   */
  export type TileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tiles to delete
     */
    where?: TileWhereInput
  }

  /**
   * Tile.fromTile
   */
  export type Tile$fromTileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    where?: EdgeWhereInput
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    cursor?: EdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EdgeScalarFieldEnum | EdgeScalarFieldEnum[]
  }

  /**
   * Tile.toTile
   */
  export type Tile$toTileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    where?: EdgeWhereInput
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    cursor?: EdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EdgeScalarFieldEnum | EdgeScalarFieldEnum[]
  }

  /**
   * Tile without action
   */
  export type TileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tile
     */
    select?: TileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TileInclude<ExtArgs> | null
  }


  /**
   * Model Edge
   */

  export type AggregateEdge = {
    _count: EdgeCountAggregateOutputType | null
    _min: EdgeMinAggregateOutputType | null
    _max: EdgeMaxAggregateOutputType | null
  }

  export type EdgeMinAggregateOutputType = {
    edgeId: string | null
    createdAt: Date | null
    flavorText: string | null
    toTileId: string | null
    fromTileId: string | null
  }

  export type EdgeMaxAggregateOutputType = {
    edgeId: string | null
    createdAt: Date | null
    flavorText: string | null
    toTileId: string | null
    fromTileId: string | null
  }

  export type EdgeCountAggregateOutputType = {
    edgeId: number
    createdAt: number
    flavorText: number
    toTileId: number
    fromTileId: number
    _all: number
  }


  export type EdgeMinAggregateInputType = {
    edgeId?: true
    createdAt?: true
    flavorText?: true
    toTileId?: true
    fromTileId?: true
  }

  export type EdgeMaxAggregateInputType = {
    edgeId?: true
    createdAt?: true
    flavorText?: true
    toTileId?: true
    fromTileId?: true
  }

  export type EdgeCountAggregateInputType = {
    edgeId?: true
    createdAt?: true
    flavorText?: true
    toTileId?: true
    fromTileId?: true
    _all?: true
  }

  export type EdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Edge to aggregate.
     */
    where?: EdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Edges to fetch.
     */
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Edges
    **/
    _count?: true | EdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EdgeMaxAggregateInputType
  }

  export type GetEdgeAggregateType<T extends EdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEdge[P]>
      : GetScalarType<T[P], AggregateEdge[P]>
  }




  export type EdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EdgeWhereInput
    orderBy?: EdgeOrderByWithAggregationInput | EdgeOrderByWithAggregationInput[]
    by: EdgeScalarFieldEnum[] | EdgeScalarFieldEnum
    having?: EdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EdgeCountAggregateInputType | true
    _min?: EdgeMinAggregateInputType
    _max?: EdgeMaxAggregateInputType
  }

  export type EdgeGroupByOutputType = {
    edgeId: string
    createdAt: Date
    flavorText: string
    toTileId: string
    fromTileId: string
    _count: EdgeCountAggregateOutputType | null
    _min: EdgeMinAggregateOutputType | null
    _max: EdgeMaxAggregateOutputType | null
  }

  type GetEdgeGroupByPayload<T extends EdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EdgeGroupByOutputType[P]>
            : GetScalarType<T[P], EdgeGroupByOutputType[P]>
        }
      >
    >


  export type EdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    edgeId?: boolean
    createdAt?: boolean
    flavorText?: boolean
    toTileId?: boolean
    fromTileId?: boolean
    fromTile?: boolean | TileDefaultArgs<ExtArgs>
    toTile?: boolean | TileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["edge"]>

  export type EdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    edgeId?: boolean
    createdAt?: boolean
    flavorText?: boolean
    toTileId?: boolean
    fromTileId?: boolean
    fromTile?: boolean | TileDefaultArgs<ExtArgs>
    toTile?: boolean | TileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["edge"]>

  export type EdgeSelectScalar = {
    edgeId?: boolean
    createdAt?: boolean
    flavorText?: boolean
    toTileId?: boolean
    fromTileId?: boolean
  }

  export type EdgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromTile?: boolean | TileDefaultArgs<ExtArgs>
    toTile?: boolean | TileDefaultArgs<ExtArgs>
  }
  export type EdgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromTile?: boolean | TileDefaultArgs<ExtArgs>
    toTile?: boolean | TileDefaultArgs<ExtArgs>
  }

  export type $EdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Edge"
    objects: {
      fromTile: Prisma.$TilePayload<ExtArgs>
      toTile: Prisma.$TilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      edgeId: string
      createdAt: Date
      flavorText: string
      toTileId: string
      fromTileId: string
    }, ExtArgs["result"]["edge"]>
    composites: {}
  }

  type EdgeGetPayload<S extends boolean | null | undefined | EdgeDefaultArgs> = $Result.GetResult<Prisma.$EdgePayload, S>

  type EdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EdgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EdgeCountAggregateInputType | true
    }

  export interface EdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Edge'], meta: { name: 'Edge' } }
    /**
     * Find zero or one Edge that matches the filter.
     * @param {EdgeFindUniqueArgs} args - Arguments to find a Edge
     * @example
     * // Get one Edge
     * const edge = await prisma.edge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EdgeFindUniqueArgs>(args: SelectSubset<T, EdgeFindUniqueArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Edge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EdgeFindUniqueOrThrowArgs} args - Arguments to find a Edge
     * @example
     * // Get one Edge
     * const edge = await prisma.edge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, EdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Edge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeFindFirstArgs} args - Arguments to find a Edge
     * @example
     * // Get one Edge
     * const edge = await prisma.edge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EdgeFindFirstArgs>(args?: SelectSubset<T, EdgeFindFirstArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Edge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeFindFirstOrThrowArgs} args - Arguments to find a Edge
     * @example
     * // Get one Edge
     * const edge = await prisma.edge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, EdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Edges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Edges
     * const edges = await prisma.edge.findMany()
     * 
     * // Get first 10 Edges
     * const edges = await prisma.edge.findMany({ take: 10 })
     * 
     * // Only select the `edgeId`
     * const edgeWithEdgeIdOnly = await prisma.edge.findMany({ select: { edgeId: true } })
     * 
     */
    findMany<T extends EdgeFindManyArgs>(args?: SelectSubset<T, EdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Edge.
     * @param {EdgeCreateArgs} args - Arguments to create a Edge.
     * @example
     * // Create one Edge
     * const Edge = await prisma.edge.create({
     *   data: {
     *     // ... data to create a Edge
     *   }
     * })
     * 
     */
    create<T extends EdgeCreateArgs>(args: SelectSubset<T, EdgeCreateArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Edges.
     * @param {EdgeCreateManyArgs} args - Arguments to create many Edges.
     * @example
     * // Create many Edges
     * const edge = await prisma.edge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EdgeCreateManyArgs>(args?: SelectSubset<T, EdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Edges and returns the data saved in the database.
     * @param {EdgeCreateManyAndReturnArgs} args - Arguments to create many Edges.
     * @example
     * // Create many Edges
     * const edge = await prisma.edge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Edges and only return the `edgeId`
     * const edgeWithEdgeIdOnly = await prisma.edge.createManyAndReturn({ 
     *   select: { edgeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, EdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Edge.
     * @param {EdgeDeleteArgs} args - Arguments to delete one Edge.
     * @example
     * // Delete one Edge
     * const Edge = await prisma.edge.delete({
     *   where: {
     *     // ... filter to delete one Edge
     *   }
     * })
     * 
     */
    delete<T extends EdgeDeleteArgs>(args: SelectSubset<T, EdgeDeleteArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Edge.
     * @param {EdgeUpdateArgs} args - Arguments to update one Edge.
     * @example
     * // Update one Edge
     * const edge = await prisma.edge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EdgeUpdateArgs>(args: SelectSubset<T, EdgeUpdateArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Edges.
     * @param {EdgeDeleteManyArgs} args - Arguments to filter Edges to delete.
     * @example
     * // Delete a few Edges
     * const { count } = await prisma.edge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EdgeDeleteManyArgs>(args?: SelectSubset<T, EdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Edges
     * const edge = await prisma.edge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EdgeUpdateManyArgs>(args: SelectSubset<T, EdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Edge.
     * @param {EdgeUpsertArgs} args - Arguments to update or create a Edge.
     * @example
     * // Update or create a Edge
     * const edge = await prisma.edge.upsert({
     *   create: {
     *     // ... data to create a Edge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Edge we want to update
     *   }
     * })
     */
    upsert<T extends EdgeUpsertArgs>(args: SelectSubset<T, EdgeUpsertArgs<ExtArgs>>): Prisma__EdgeClient<$Result.GetResult<Prisma.$EdgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Edges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeCountArgs} args - Arguments to filter Edges to count.
     * @example
     * // Count the number of Edges
     * const count = await prisma.edge.count({
     *   where: {
     *     // ... the filter for the Edges we want to count
     *   }
     * })
    **/
    count<T extends EdgeCountArgs>(
      args?: Subset<T, EdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Edge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EdgeAggregateArgs>(args: Subset<T, EdgeAggregateArgs>): Prisma.PrismaPromise<GetEdgeAggregateType<T>>

    /**
     * Group by Edge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdgeGroupByArgs} args - Group by arguments.
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
      T extends EdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EdgeGroupByArgs['orderBy'] }
        : { orderBy?: EdgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Edge model
   */
  readonly fields: EdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Edge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromTile<T extends TileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TileDefaultArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    toTile<T extends TileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TileDefaultArgs<ExtArgs>>): Prisma__TileClient<$Result.GetResult<Prisma.$TilePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Edge model
   */ 
  interface EdgeFieldRefs {
    readonly edgeId: FieldRef<"Edge", 'String'>
    readonly createdAt: FieldRef<"Edge", 'DateTime'>
    readonly flavorText: FieldRef<"Edge", 'String'>
    readonly toTileId: FieldRef<"Edge", 'String'>
    readonly fromTileId: FieldRef<"Edge", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Edge findUnique
   */
  export type EdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter, which Edge to fetch.
     */
    where: EdgeWhereUniqueInput
  }

  /**
   * Edge findUniqueOrThrow
   */
  export type EdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter, which Edge to fetch.
     */
    where: EdgeWhereUniqueInput
  }

  /**
   * Edge findFirst
   */
  export type EdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter, which Edge to fetch.
     */
    where?: EdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Edges to fetch.
     */
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Edges.
     */
    cursor?: EdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Edges.
     */
    distinct?: EdgeScalarFieldEnum | EdgeScalarFieldEnum[]
  }

  /**
   * Edge findFirstOrThrow
   */
  export type EdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter, which Edge to fetch.
     */
    where?: EdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Edges to fetch.
     */
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Edges.
     */
    cursor?: EdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Edges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Edges.
     */
    distinct?: EdgeScalarFieldEnum | EdgeScalarFieldEnum[]
  }

  /**
   * Edge findMany
   */
  export type EdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter, which Edges to fetch.
     */
    where?: EdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Edges to fetch.
     */
    orderBy?: EdgeOrderByWithRelationInput | EdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Edges.
     */
    cursor?: EdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Edges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Edges.
     */
    skip?: number
    distinct?: EdgeScalarFieldEnum | EdgeScalarFieldEnum[]
  }

  /**
   * Edge create
   */
  export type EdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * The data needed to create a Edge.
     */
    data: XOR<EdgeCreateInput, EdgeUncheckedCreateInput>
  }

  /**
   * Edge createMany
   */
  export type EdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Edges.
     */
    data: EdgeCreateManyInput | EdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Edge createManyAndReturn
   */
  export type EdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Edges.
     */
    data: EdgeCreateManyInput | EdgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Edge update
   */
  export type EdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * The data needed to update a Edge.
     */
    data: XOR<EdgeUpdateInput, EdgeUncheckedUpdateInput>
    /**
     * Choose, which Edge to update.
     */
    where: EdgeWhereUniqueInput
  }

  /**
   * Edge updateMany
   */
  export type EdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Edges.
     */
    data: XOR<EdgeUpdateManyMutationInput, EdgeUncheckedUpdateManyInput>
    /**
     * Filter which Edges to update
     */
    where?: EdgeWhereInput
  }

  /**
   * Edge upsert
   */
  export type EdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * The filter to search for the Edge to update in case it exists.
     */
    where: EdgeWhereUniqueInput
    /**
     * In case the Edge found by the `where` argument doesn't exist, create a new Edge with this data.
     */
    create: XOR<EdgeCreateInput, EdgeUncheckedCreateInput>
    /**
     * In case the Edge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EdgeUpdateInput, EdgeUncheckedUpdateInput>
  }

  /**
   * Edge delete
   */
  export type EdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
    /**
     * Filter which Edge to delete.
     */
    where: EdgeWhereUniqueInput
  }

  /**
   * Edge deleteMany
   */
  export type EdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Edges to delete
     */
    where?: EdgeWhereInput
  }

  /**
   * Edge without action
   */
  export type EdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Edge
     */
    select?: EdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EdgeInclude<ExtArgs> | null
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


  export const TileMapScalarFieldEnum: {
    tileMapId: 'tileMapId',
    createdAt: 'createdAt',
    startingTileId: 'startingTileId'
  };

  export type TileMapScalarFieldEnum = (typeof TileMapScalarFieldEnum)[keyof typeof TileMapScalarFieldEnum]


  export const TileScalarFieldEnum: {
    tileId: 'tileId',
    createdAt: 'createdAt',
    image: 'image',
    tileMapId: 'tileMapId'
  };

  export type TileScalarFieldEnum = (typeof TileScalarFieldEnum)[keyof typeof TileScalarFieldEnum]


  export const EdgeScalarFieldEnum: {
    edgeId: 'edgeId',
    createdAt: 'createdAt',
    flavorText: 'flavorText',
    toTileId: 'toTileId',
    fromTileId: 'fromTileId'
  };

  export type EdgeScalarFieldEnum = (typeof EdgeScalarFieldEnum)[keyof typeof EdgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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


  export type TileMapWhereInput = {
    AND?: TileMapWhereInput | TileMapWhereInput[]
    OR?: TileMapWhereInput[]
    NOT?: TileMapWhereInput | TileMapWhereInput[]
    tileMapId?: StringFilter<"TileMap"> | string
    createdAt?: DateTimeFilter<"TileMap"> | Date | string
    startingTileId?: StringFilter<"TileMap"> | string
    tiles?: TileListRelationFilter
  }

  export type TileMapOrderByWithRelationInput = {
    tileMapId?: SortOrder
    createdAt?: SortOrder
    startingTileId?: SortOrder
    tiles?: TileOrderByRelationAggregateInput
  }

  export type TileMapWhereUniqueInput = Prisma.AtLeast<{
    tileMapId?: string
    AND?: TileMapWhereInput | TileMapWhereInput[]
    OR?: TileMapWhereInput[]
    NOT?: TileMapWhereInput | TileMapWhereInput[]
    createdAt?: DateTimeFilter<"TileMap"> | Date | string
    startingTileId?: StringFilter<"TileMap"> | string
    tiles?: TileListRelationFilter
  }, "tileMapId">

  export type TileMapOrderByWithAggregationInput = {
    tileMapId?: SortOrder
    createdAt?: SortOrder
    startingTileId?: SortOrder
    _count?: TileMapCountOrderByAggregateInput
    _max?: TileMapMaxOrderByAggregateInput
    _min?: TileMapMinOrderByAggregateInput
  }

  export type TileMapScalarWhereWithAggregatesInput = {
    AND?: TileMapScalarWhereWithAggregatesInput | TileMapScalarWhereWithAggregatesInput[]
    OR?: TileMapScalarWhereWithAggregatesInput[]
    NOT?: TileMapScalarWhereWithAggregatesInput | TileMapScalarWhereWithAggregatesInput[]
    tileMapId?: StringWithAggregatesFilter<"TileMap"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TileMap"> | Date | string
    startingTileId?: StringWithAggregatesFilter<"TileMap"> | string
  }

  export type TileWhereInput = {
    AND?: TileWhereInput | TileWhereInput[]
    OR?: TileWhereInput[]
    NOT?: TileWhereInput | TileWhereInput[]
    tileId?: StringFilter<"Tile"> | string
    createdAt?: DateTimeFilter<"Tile"> | Date | string
    image?: StringFilter<"Tile"> | string
    tileMapId?: StringFilter<"Tile"> | string
    tileMap?: XOR<TileMapRelationFilter, TileMapWhereInput>
    fromTile?: EdgeListRelationFilter
    toTile?: EdgeListRelationFilter
  }

  export type TileOrderByWithRelationInput = {
    tileId?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    tileMapId?: SortOrder
    tileMap?: TileMapOrderByWithRelationInput
    fromTile?: EdgeOrderByRelationAggregateInput
    toTile?: EdgeOrderByRelationAggregateInput
  }

  export type TileWhereUniqueInput = Prisma.AtLeast<{
    tileId?: string
    AND?: TileWhereInput | TileWhereInput[]
    OR?: TileWhereInput[]
    NOT?: TileWhereInput | TileWhereInput[]
    createdAt?: DateTimeFilter<"Tile"> | Date | string
    image?: StringFilter<"Tile"> | string
    tileMapId?: StringFilter<"Tile"> | string
    tileMap?: XOR<TileMapRelationFilter, TileMapWhereInput>
    fromTile?: EdgeListRelationFilter
    toTile?: EdgeListRelationFilter
  }, "tileId">

  export type TileOrderByWithAggregationInput = {
    tileId?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    tileMapId?: SortOrder
    _count?: TileCountOrderByAggregateInput
    _max?: TileMaxOrderByAggregateInput
    _min?: TileMinOrderByAggregateInput
  }

  export type TileScalarWhereWithAggregatesInput = {
    AND?: TileScalarWhereWithAggregatesInput | TileScalarWhereWithAggregatesInput[]
    OR?: TileScalarWhereWithAggregatesInput[]
    NOT?: TileScalarWhereWithAggregatesInput | TileScalarWhereWithAggregatesInput[]
    tileId?: StringWithAggregatesFilter<"Tile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tile"> | Date | string
    image?: StringWithAggregatesFilter<"Tile"> | string
    tileMapId?: StringWithAggregatesFilter<"Tile"> | string
  }

  export type EdgeWhereInput = {
    AND?: EdgeWhereInput | EdgeWhereInput[]
    OR?: EdgeWhereInput[]
    NOT?: EdgeWhereInput | EdgeWhereInput[]
    edgeId?: StringFilter<"Edge"> | string
    createdAt?: DateTimeFilter<"Edge"> | Date | string
    flavorText?: StringFilter<"Edge"> | string
    toTileId?: StringFilter<"Edge"> | string
    fromTileId?: StringFilter<"Edge"> | string
    fromTile?: XOR<TileRelationFilter, TileWhereInput>
    toTile?: XOR<TileRelationFilter, TileWhereInput>
  }

  export type EdgeOrderByWithRelationInput = {
    edgeId?: SortOrder
    createdAt?: SortOrder
    flavorText?: SortOrder
    toTileId?: SortOrder
    fromTileId?: SortOrder
    fromTile?: TileOrderByWithRelationInput
    toTile?: TileOrderByWithRelationInput
  }

  export type EdgeWhereUniqueInput = Prisma.AtLeast<{
    edgeId?: string
    AND?: EdgeWhereInput | EdgeWhereInput[]
    OR?: EdgeWhereInput[]
    NOT?: EdgeWhereInput | EdgeWhereInput[]
    createdAt?: DateTimeFilter<"Edge"> | Date | string
    flavorText?: StringFilter<"Edge"> | string
    toTileId?: StringFilter<"Edge"> | string
    fromTileId?: StringFilter<"Edge"> | string
    fromTile?: XOR<TileRelationFilter, TileWhereInput>
    toTile?: XOR<TileRelationFilter, TileWhereInput>
  }, "edgeId">

  export type EdgeOrderByWithAggregationInput = {
    edgeId?: SortOrder
    createdAt?: SortOrder
    flavorText?: SortOrder
    toTileId?: SortOrder
    fromTileId?: SortOrder
    _count?: EdgeCountOrderByAggregateInput
    _max?: EdgeMaxOrderByAggregateInput
    _min?: EdgeMinOrderByAggregateInput
  }

  export type EdgeScalarWhereWithAggregatesInput = {
    AND?: EdgeScalarWhereWithAggregatesInput | EdgeScalarWhereWithAggregatesInput[]
    OR?: EdgeScalarWhereWithAggregatesInput[]
    NOT?: EdgeScalarWhereWithAggregatesInput | EdgeScalarWhereWithAggregatesInput[]
    edgeId?: StringWithAggregatesFilter<"Edge"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Edge"> | Date | string
    flavorText?: StringWithAggregatesFilter<"Edge"> | string
    toTileId?: StringWithAggregatesFilter<"Edge"> | string
    fromTileId?: StringWithAggregatesFilter<"Edge"> | string
  }

  export type TileMapCreateInput = {
    tileMapId?: string
    createdAt?: Date | string
    startingTileId: string
    tiles?: TileCreateNestedManyWithoutTileMapInput
  }

  export type TileMapUncheckedCreateInput = {
    tileMapId?: string
    createdAt?: Date | string
    startingTileId: string
    tiles?: TileUncheckedCreateNestedManyWithoutTileMapInput
  }

  export type TileMapUpdateInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
    tiles?: TileUpdateManyWithoutTileMapNestedInput
  }

  export type TileMapUncheckedUpdateInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
    tiles?: TileUncheckedUpdateManyWithoutTileMapNestedInput
  }

  export type TileMapCreateManyInput = {
    tileMapId?: string
    createdAt?: Date | string
    startingTileId: string
  }

  export type TileMapUpdateManyMutationInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
  }

  export type TileMapUncheckedUpdateManyInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
  }

  export type TileCreateInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMap: TileMapCreateNestedOneWithoutTilesInput
    fromTile?: EdgeCreateNestedManyWithoutFromTileInput
    toTile?: EdgeCreateNestedManyWithoutToTileInput
  }

  export type TileUncheckedCreateInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMapId: string
    fromTile?: EdgeUncheckedCreateNestedManyWithoutFromTileInput
    toTile?: EdgeUncheckedCreateNestedManyWithoutToTileInput
  }

  export type TileUpdateInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMap?: TileMapUpdateOneRequiredWithoutTilesNestedInput
    fromTile?: EdgeUpdateManyWithoutFromTileNestedInput
    toTile?: EdgeUpdateManyWithoutToTileNestedInput
  }

  export type TileUncheckedUpdateInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMapId?: StringFieldUpdateOperationsInput | string
    fromTile?: EdgeUncheckedUpdateManyWithoutFromTileNestedInput
    toTile?: EdgeUncheckedUpdateManyWithoutToTileNestedInput
  }

  export type TileCreateManyInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMapId: string
  }

  export type TileUpdateManyMutationInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
  }

  export type TileUncheckedUpdateManyInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMapId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeCreateInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    fromTile: TileCreateNestedOneWithoutFromTileInput
    toTile: TileCreateNestedOneWithoutToTileInput
  }

  export type EdgeUncheckedCreateInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    toTileId: string
    fromTileId: string
  }

  export type EdgeUpdateInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    fromTile?: TileUpdateOneRequiredWithoutFromTileNestedInput
    toTile?: TileUpdateOneRequiredWithoutToTileNestedInput
  }

  export type EdgeUncheckedUpdateInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    toTileId?: StringFieldUpdateOperationsInput | string
    fromTileId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeCreateManyInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    toTileId: string
    fromTileId: string
  }

  export type EdgeUpdateManyMutationInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeUncheckedUpdateManyInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    toTileId?: StringFieldUpdateOperationsInput | string
    fromTileId?: StringFieldUpdateOperationsInput | string
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

  export type TileListRelationFilter = {
    every?: TileWhereInput
    some?: TileWhereInput
    none?: TileWhereInput
  }

  export type TileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TileMapCountOrderByAggregateInput = {
    tileMapId?: SortOrder
    createdAt?: SortOrder
    startingTileId?: SortOrder
  }

  export type TileMapMaxOrderByAggregateInput = {
    tileMapId?: SortOrder
    createdAt?: SortOrder
    startingTileId?: SortOrder
  }

  export type TileMapMinOrderByAggregateInput = {
    tileMapId?: SortOrder
    createdAt?: SortOrder
    startingTileId?: SortOrder
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

  export type TileMapRelationFilter = {
    is?: TileMapWhereInput
    isNot?: TileMapWhereInput
  }

  export type EdgeListRelationFilter = {
    every?: EdgeWhereInput
    some?: EdgeWhereInput
    none?: EdgeWhereInput
  }

  export type EdgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TileCountOrderByAggregateInput = {
    tileId?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    tileMapId?: SortOrder
  }

  export type TileMaxOrderByAggregateInput = {
    tileId?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    tileMapId?: SortOrder
  }

  export type TileMinOrderByAggregateInput = {
    tileId?: SortOrder
    createdAt?: SortOrder
    image?: SortOrder
    tileMapId?: SortOrder
  }

  export type TileRelationFilter = {
    is?: TileWhereInput
    isNot?: TileWhereInput
  }

  export type EdgeCountOrderByAggregateInput = {
    edgeId?: SortOrder
    createdAt?: SortOrder
    flavorText?: SortOrder
    toTileId?: SortOrder
    fromTileId?: SortOrder
  }

  export type EdgeMaxOrderByAggregateInput = {
    edgeId?: SortOrder
    createdAt?: SortOrder
    flavorText?: SortOrder
    toTileId?: SortOrder
    fromTileId?: SortOrder
  }

  export type EdgeMinOrderByAggregateInput = {
    edgeId?: SortOrder
    createdAt?: SortOrder
    flavorText?: SortOrder
    toTileId?: SortOrder
    fromTileId?: SortOrder
  }

  export type TileCreateNestedManyWithoutTileMapInput = {
    create?: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput> | TileCreateWithoutTileMapInput[] | TileUncheckedCreateWithoutTileMapInput[]
    connectOrCreate?: TileCreateOrConnectWithoutTileMapInput | TileCreateOrConnectWithoutTileMapInput[]
    createMany?: TileCreateManyTileMapInputEnvelope
    connect?: TileWhereUniqueInput | TileWhereUniqueInput[]
  }

  export type TileUncheckedCreateNestedManyWithoutTileMapInput = {
    create?: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput> | TileCreateWithoutTileMapInput[] | TileUncheckedCreateWithoutTileMapInput[]
    connectOrCreate?: TileCreateOrConnectWithoutTileMapInput | TileCreateOrConnectWithoutTileMapInput[]
    createMany?: TileCreateManyTileMapInputEnvelope
    connect?: TileWhereUniqueInput | TileWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TileUpdateManyWithoutTileMapNestedInput = {
    create?: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput> | TileCreateWithoutTileMapInput[] | TileUncheckedCreateWithoutTileMapInput[]
    connectOrCreate?: TileCreateOrConnectWithoutTileMapInput | TileCreateOrConnectWithoutTileMapInput[]
    upsert?: TileUpsertWithWhereUniqueWithoutTileMapInput | TileUpsertWithWhereUniqueWithoutTileMapInput[]
    createMany?: TileCreateManyTileMapInputEnvelope
    set?: TileWhereUniqueInput | TileWhereUniqueInput[]
    disconnect?: TileWhereUniqueInput | TileWhereUniqueInput[]
    delete?: TileWhereUniqueInput | TileWhereUniqueInput[]
    connect?: TileWhereUniqueInput | TileWhereUniqueInput[]
    update?: TileUpdateWithWhereUniqueWithoutTileMapInput | TileUpdateWithWhereUniqueWithoutTileMapInput[]
    updateMany?: TileUpdateManyWithWhereWithoutTileMapInput | TileUpdateManyWithWhereWithoutTileMapInput[]
    deleteMany?: TileScalarWhereInput | TileScalarWhereInput[]
  }

  export type TileUncheckedUpdateManyWithoutTileMapNestedInput = {
    create?: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput> | TileCreateWithoutTileMapInput[] | TileUncheckedCreateWithoutTileMapInput[]
    connectOrCreate?: TileCreateOrConnectWithoutTileMapInput | TileCreateOrConnectWithoutTileMapInput[]
    upsert?: TileUpsertWithWhereUniqueWithoutTileMapInput | TileUpsertWithWhereUniqueWithoutTileMapInput[]
    createMany?: TileCreateManyTileMapInputEnvelope
    set?: TileWhereUniqueInput | TileWhereUniqueInput[]
    disconnect?: TileWhereUniqueInput | TileWhereUniqueInput[]
    delete?: TileWhereUniqueInput | TileWhereUniqueInput[]
    connect?: TileWhereUniqueInput | TileWhereUniqueInput[]
    update?: TileUpdateWithWhereUniqueWithoutTileMapInput | TileUpdateWithWhereUniqueWithoutTileMapInput[]
    updateMany?: TileUpdateManyWithWhereWithoutTileMapInput | TileUpdateManyWithWhereWithoutTileMapInput[]
    deleteMany?: TileScalarWhereInput | TileScalarWhereInput[]
  }

  export type TileMapCreateNestedOneWithoutTilesInput = {
    create?: XOR<TileMapCreateWithoutTilesInput, TileMapUncheckedCreateWithoutTilesInput>
    connectOrCreate?: TileMapCreateOrConnectWithoutTilesInput
    connect?: TileMapWhereUniqueInput
  }

  export type EdgeCreateNestedManyWithoutFromTileInput = {
    create?: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput> | EdgeCreateWithoutFromTileInput[] | EdgeUncheckedCreateWithoutFromTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutFromTileInput | EdgeCreateOrConnectWithoutFromTileInput[]
    createMany?: EdgeCreateManyFromTileInputEnvelope
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
  }

  export type EdgeCreateNestedManyWithoutToTileInput = {
    create?: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput> | EdgeCreateWithoutToTileInput[] | EdgeUncheckedCreateWithoutToTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutToTileInput | EdgeCreateOrConnectWithoutToTileInput[]
    createMany?: EdgeCreateManyToTileInputEnvelope
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
  }

  export type EdgeUncheckedCreateNestedManyWithoutFromTileInput = {
    create?: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput> | EdgeCreateWithoutFromTileInput[] | EdgeUncheckedCreateWithoutFromTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutFromTileInput | EdgeCreateOrConnectWithoutFromTileInput[]
    createMany?: EdgeCreateManyFromTileInputEnvelope
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
  }

  export type EdgeUncheckedCreateNestedManyWithoutToTileInput = {
    create?: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput> | EdgeCreateWithoutToTileInput[] | EdgeUncheckedCreateWithoutToTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutToTileInput | EdgeCreateOrConnectWithoutToTileInput[]
    createMany?: EdgeCreateManyToTileInputEnvelope
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
  }

  export type TileMapUpdateOneRequiredWithoutTilesNestedInput = {
    create?: XOR<TileMapCreateWithoutTilesInput, TileMapUncheckedCreateWithoutTilesInput>
    connectOrCreate?: TileMapCreateOrConnectWithoutTilesInput
    upsert?: TileMapUpsertWithoutTilesInput
    connect?: TileMapWhereUniqueInput
    update?: XOR<XOR<TileMapUpdateToOneWithWhereWithoutTilesInput, TileMapUpdateWithoutTilesInput>, TileMapUncheckedUpdateWithoutTilesInput>
  }

  export type EdgeUpdateManyWithoutFromTileNestedInput = {
    create?: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput> | EdgeCreateWithoutFromTileInput[] | EdgeUncheckedCreateWithoutFromTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutFromTileInput | EdgeCreateOrConnectWithoutFromTileInput[]
    upsert?: EdgeUpsertWithWhereUniqueWithoutFromTileInput | EdgeUpsertWithWhereUniqueWithoutFromTileInput[]
    createMany?: EdgeCreateManyFromTileInputEnvelope
    set?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    disconnect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    delete?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    update?: EdgeUpdateWithWhereUniqueWithoutFromTileInput | EdgeUpdateWithWhereUniqueWithoutFromTileInput[]
    updateMany?: EdgeUpdateManyWithWhereWithoutFromTileInput | EdgeUpdateManyWithWhereWithoutFromTileInput[]
    deleteMany?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
  }

  export type EdgeUpdateManyWithoutToTileNestedInput = {
    create?: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput> | EdgeCreateWithoutToTileInput[] | EdgeUncheckedCreateWithoutToTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutToTileInput | EdgeCreateOrConnectWithoutToTileInput[]
    upsert?: EdgeUpsertWithWhereUniqueWithoutToTileInput | EdgeUpsertWithWhereUniqueWithoutToTileInput[]
    createMany?: EdgeCreateManyToTileInputEnvelope
    set?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    disconnect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    delete?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    update?: EdgeUpdateWithWhereUniqueWithoutToTileInput | EdgeUpdateWithWhereUniqueWithoutToTileInput[]
    updateMany?: EdgeUpdateManyWithWhereWithoutToTileInput | EdgeUpdateManyWithWhereWithoutToTileInput[]
    deleteMany?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
  }

  export type EdgeUncheckedUpdateManyWithoutFromTileNestedInput = {
    create?: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput> | EdgeCreateWithoutFromTileInput[] | EdgeUncheckedCreateWithoutFromTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutFromTileInput | EdgeCreateOrConnectWithoutFromTileInput[]
    upsert?: EdgeUpsertWithWhereUniqueWithoutFromTileInput | EdgeUpsertWithWhereUniqueWithoutFromTileInput[]
    createMany?: EdgeCreateManyFromTileInputEnvelope
    set?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    disconnect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    delete?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    update?: EdgeUpdateWithWhereUniqueWithoutFromTileInput | EdgeUpdateWithWhereUniqueWithoutFromTileInput[]
    updateMany?: EdgeUpdateManyWithWhereWithoutFromTileInput | EdgeUpdateManyWithWhereWithoutFromTileInput[]
    deleteMany?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
  }

  export type EdgeUncheckedUpdateManyWithoutToTileNestedInput = {
    create?: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput> | EdgeCreateWithoutToTileInput[] | EdgeUncheckedCreateWithoutToTileInput[]
    connectOrCreate?: EdgeCreateOrConnectWithoutToTileInput | EdgeCreateOrConnectWithoutToTileInput[]
    upsert?: EdgeUpsertWithWhereUniqueWithoutToTileInput | EdgeUpsertWithWhereUniqueWithoutToTileInput[]
    createMany?: EdgeCreateManyToTileInputEnvelope
    set?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    disconnect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    delete?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    connect?: EdgeWhereUniqueInput | EdgeWhereUniqueInput[]
    update?: EdgeUpdateWithWhereUniqueWithoutToTileInput | EdgeUpdateWithWhereUniqueWithoutToTileInput[]
    updateMany?: EdgeUpdateManyWithWhereWithoutToTileInput | EdgeUpdateManyWithWhereWithoutToTileInput[]
    deleteMany?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
  }

  export type TileCreateNestedOneWithoutFromTileInput = {
    create?: XOR<TileCreateWithoutFromTileInput, TileUncheckedCreateWithoutFromTileInput>
    connectOrCreate?: TileCreateOrConnectWithoutFromTileInput
    connect?: TileWhereUniqueInput
  }

  export type TileCreateNestedOneWithoutToTileInput = {
    create?: XOR<TileCreateWithoutToTileInput, TileUncheckedCreateWithoutToTileInput>
    connectOrCreate?: TileCreateOrConnectWithoutToTileInput
    connect?: TileWhereUniqueInput
  }

  export type TileUpdateOneRequiredWithoutFromTileNestedInput = {
    create?: XOR<TileCreateWithoutFromTileInput, TileUncheckedCreateWithoutFromTileInput>
    connectOrCreate?: TileCreateOrConnectWithoutFromTileInput
    upsert?: TileUpsertWithoutFromTileInput
    connect?: TileWhereUniqueInput
    update?: XOR<XOR<TileUpdateToOneWithWhereWithoutFromTileInput, TileUpdateWithoutFromTileInput>, TileUncheckedUpdateWithoutFromTileInput>
  }

  export type TileUpdateOneRequiredWithoutToTileNestedInput = {
    create?: XOR<TileCreateWithoutToTileInput, TileUncheckedCreateWithoutToTileInput>
    connectOrCreate?: TileCreateOrConnectWithoutToTileInput
    upsert?: TileUpsertWithoutToTileInput
    connect?: TileWhereUniqueInput
    update?: XOR<XOR<TileUpdateToOneWithWhereWithoutToTileInput, TileUpdateWithoutToTileInput>, TileUncheckedUpdateWithoutToTileInput>
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

  export type TileCreateWithoutTileMapInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    fromTile?: EdgeCreateNestedManyWithoutFromTileInput
    toTile?: EdgeCreateNestedManyWithoutToTileInput
  }

  export type TileUncheckedCreateWithoutTileMapInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    fromTile?: EdgeUncheckedCreateNestedManyWithoutFromTileInput
    toTile?: EdgeUncheckedCreateNestedManyWithoutToTileInput
  }

  export type TileCreateOrConnectWithoutTileMapInput = {
    where: TileWhereUniqueInput
    create: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput>
  }

  export type TileCreateManyTileMapInputEnvelope = {
    data: TileCreateManyTileMapInput | TileCreateManyTileMapInput[]
    skipDuplicates?: boolean
  }

  export type TileUpsertWithWhereUniqueWithoutTileMapInput = {
    where: TileWhereUniqueInput
    update: XOR<TileUpdateWithoutTileMapInput, TileUncheckedUpdateWithoutTileMapInput>
    create: XOR<TileCreateWithoutTileMapInput, TileUncheckedCreateWithoutTileMapInput>
  }

  export type TileUpdateWithWhereUniqueWithoutTileMapInput = {
    where: TileWhereUniqueInput
    data: XOR<TileUpdateWithoutTileMapInput, TileUncheckedUpdateWithoutTileMapInput>
  }

  export type TileUpdateManyWithWhereWithoutTileMapInput = {
    where: TileScalarWhereInput
    data: XOR<TileUpdateManyMutationInput, TileUncheckedUpdateManyWithoutTileMapInput>
  }

  export type TileScalarWhereInput = {
    AND?: TileScalarWhereInput | TileScalarWhereInput[]
    OR?: TileScalarWhereInput[]
    NOT?: TileScalarWhereInput | TileScalarWhereInput[]
    tileId?: StringFilter<"Tile"> | string
    createdAt?: DateTimeFilter<"Tile"> | Date | string
    image?: StringFilter<"Tile"> | string
    tileMapId?: StringFilter<"Tile"> | string
  }

  export type TileMapCreateWithoutTilesInput = {
    tileMapId?: string
    createdAt?: Date | string
    startingTileId: string
  }

  export type TileMapUncheckedCreateWithoutTilesInput = {
    tileMapId?: string
    createdAt?: Date | string
    startingTileId: string
  }

  export type TileMapCreateOrConnectWithoutTilesInput = {
    where: TileMapWhereUniqueInput
    create: XOR<TileMapCreateWithoutTilesInput, TileMapUncheckedCreateWithoutTilesInput>
  }

  export type EdgeCreateWithoutFromTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    toTile: TileCreateNestedOneWithoutToTileInput
  }

  export type EdgeUncheckedCreateWithoutFromTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    toTileId: string
  }

  export type EdgeCreateOrConnectWithoutFromTileInput = {
    where: EdgeWhereUniqueInput
    create: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput>
  }

  export type EdgeCreateManyFromTileInputEnvelope = {
    data: EdgeCreateManyFromTileInput | EdgeCreateManyFromTileInput[]
    skipDuplicates?: boolean
  }

  export type EdgeCreateWithoutToTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    fromTile: TileCreateNestedOneWithoutFromTileInput
  }

  export type EdgeUncheckedCreateWithoutToTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    fromTileId: string
  }

  export type EdgeCreateOrConnectWithoutToTileInput = {
    where: EdgeWhereUniqueInput
    create: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput>
  }

  export type EdgeCreateManyToTileInputEnvelope = {
    data: EdgeCreateManyToTileInput | EdgeCreateManyToTileInput[]
    skipDuplicates?: boolean
  }

  export type TileMapUpsertWithoutTilesInput = {
    update: XOR<TileMapUpdateWithoutTilesInput, TileMapUncheckedUpdateWithoutTilesInput>
    create: XOR<TileMapCreateWithoutTilesInput, TileMapUncheckedCreateWithoutTilesInput>
    where?: TileMapWhereInput
  }

  export type TileMapUpdateToOneWithWhereWithoutTilesInput = {
    where?: TileMapWhereInput
    data: XOR<TileMapUpdateWithoutTilesInput, TileMapUncheckedUpdateWithoutTilesInput>
  }

  export type TileMapUpdateWithoutTilesInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
  }

  export type TileMapUncheckedUpdateWithoutTilesInput = {
    tileMapId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startingTileId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeUpsertWithWhereUniqueWithoutFromTileInput = {
    where: EdgeWhereUniqueInput
    update: XOR<EdgeUpdateWithoutFromTileInput, EdgeUncheckedUpdateWithoutFromTileInput>
    create: XOR<EdgeCreateWithoutFromTileInput, EdgeUncheckedCreateWithoutFromTileInput>
  }

  export type EdgeUpdateWithWhereUniqueWithoutFromTileInput = {
    where: EdgeWhereUniqueInput
    data: XOR<EdgeUpdateWithoutFromTileInput, EdgeUncheckedUpdateWithoutFromTileInput>
  }

  export type EdgeUpdateManyWithWhereWithoutFromTileInput = {
    where: EdgeScalarWhereInput
    data: XOR<EdgeUpdateManyMutationInput, EdgeUncheckedUpdateManyWithoutFromTileInput>
  }

  export type EdgeScalarWhereInput = {
    AND?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
    OR?: EdgeScalarWhereInput[]
    NOT?: EdgeScalarWhereInput | EdgeScalarWhereInput[]
    edgeId?: StringFilter<"Edge"> | string
    createdAt?: DateTimeFilter<"Edge"> | Date | string
    flavorText?: StringFilter<"Edge"> | string
    toTileId?: StringFilter<"Edge"> | string
    fromTileId?: StringFilter<"Edge"> | string
  }

  export type EdgeUpsertWithWhereUniqueWithoutToTileInput = {
    where: EdgeWhereUniqueInput
    update: XOR<EdgeUpdateWithoutToTileInput, EdgeUncheckedUpdateWithoutToTileInput>
    create: XOR<EdgeCreateWithoutToTileInput, EdgeUncheckedCreateWithoutToTileInput>
  }

  export type EdgeUpdateWithWhereUniqueWithoutToTileInput = {
    where: EdgeWhereUniqueInput
    data: XOR<EdgeUpdateWithoutToTileInput, EdgeUncheckedUpdateWithoutToTileInput>
  }

  export type EdgeUpdateManyWithWhereWithoutToTileInput = {
    where: EdgeScalarWhereInput
    data: XOR<EdgeUpdateManyMutationInput, EdgeUncheckedUpdateManyWithoutToTileInput>
  }

  export type TileCreateWithoutFromTileInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMap: TileMapCreateNestedOneWithoutTilesInput
    toTile?: EdgeCreateNestedManyWithoutToTileInput
  }

  export type TileUncheckedCreateWithoutFromTileInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMapId: string
    toTile?: EdgeUncheckedCreateNestedManyWithoutToTileInput
  }

  export type TileCreateOrConnectWithoutFromTileInput = {
    where: TileWhereUniqueInput
    create: XOR<TileCreateWithoutFromTileInput, TileUncheckedCreateWithoutFromTileInput>
  }

  export type TileCreateWithoutToTileInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMap: TileMapCreateNestedOneWithoutTilesInput
    fromTile?: EdgeCreateNestedManyWithoutFromTileInput
  }

  export type TileUncheckedCreateWithoutToTileInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
    tileMapId: string
    fromTile?: EdgeUncheckedCreateNestedManyWithoutFromTileInput
  }

  export type TileCreateOrConnectWithoutToTileInput = {
    where: TileWhereUniqueInput
    create: XOR<TileCreateWithoutToTileInput, TileUncheckedCreateWithoutToTileInput>
  }

  export type TileUpsertWithoutFromTileInput = {
    update: XOR<TileUpdateWithoutFromTileInput, TileUncheckedUpdateWithoutFromTileInput>
    create: XOR<TileCreateWithoutFromTileInput, TileUncheckedCreateWithoutFromTileInput>
    where?: TileWhereInput
  }

  export type TileUpdateToOneWithWhereWithoutFromTileInput = {
    where?: TileWhereInput
    data: XOR<TileUpdateWithoutFromTileInput, TileUncheckedUpdateWithoutFromTileInput>
  }

  export type TileUpdateWithoutFromTileInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMap?: TileMapUpdateOneRequiredWithoutTilesNestedInput
    toTile?: EdgeUpdateManyWithoutToTileNestedInput
  }

  export type TileUncheckedUpdateWithoutFromTileInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMapId?: StringFieldUpdateOperationsInput | string
    toTile?: EdgeUncheckedUpdateManyWithoutToTileNestedInput
  }

  export type TileUpsertWithoutToTileInput = {
    update: XOR<TileUpdateWithoutToTileInput, TileUncheckedUpdateWithoutToTileInput>
    create: XOR<TileCreateWithoutToTileInput, TileUncheckedCreateWithoutToTileInput>
    where?: TileWhereInput
  }

  export type TileUpdateToOneWithWhereWithoutToTileInput = {
    where?: TileWhereInput
    data: XOR<TileUpdateWithoutToTileInput, TileUncheckedUpdateWithoutToTileInput>
  }

  export type TileUpdateWithoutToTileInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMap?: TileMapUpdateOneRequiredWithoutTilesNestedInput
    fromTile?: EdgeUpdateManyWithoutFromTileNestedInput
  }

  export type TileUncheckedUpdateWithoutToTileInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    tileMapId?: StringFieldUpdateOperationsInput | string
    fromTile?: EdgeUncheckedUpdateManyWithoutFromTileNestedInput
  }

  export type TileCreateManyTileMapInput = {
    tileId?: string
    createdAt?: Date | string
    image: string
  }

  export type TileUpdateWithoutTileMapInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    fromTile?: EdgeUpdateManyWithoutFromTileNestedInput
    toTile?: EdgeUpdateManyWithoutToTileNestedInput
  }

  export type TileUncheckedUpdateWithoutTileMapInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
    fromTile?: EdgeUncheckedUpdateManyWithoutFromTileNestedInput
    toTile?: EdgeUncheckedUpdateManyWithoutToTileNestedInput
  }

  export type TileUncheckedUpdateManyWithoutTileMapInput = {
    tileId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeCreateManyFromTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    toTileId: string
  }

  export type EdgeCreateManyToTileInput = {
    edgeId?: string
    createdAt?: Date | string
    flavorText: string
    fromTileId: string
  }

  export type EdgeUpdateWithoutFromTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    toTile?: TileUpdateOneRequiredWithoutToTileNestedInput
  }

  export type EdgeUncheckedUpdateWithoutFromTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    toTileId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeUncheckedUpdateManyWithoutFromTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    toTileId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeUpdateWithoutToTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    fromTile?: TileUpdateOneRequiredWithoutFromTileNestedInput
  }

  export type EdgeUncheckedUpdateWithoutToTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    fromTileId?: StringFieldUpdateOperationsInput | string
  }

  export type EdgeUncheckedUpdateManyWithoutToTileInput = {
    edgeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flavorText?: StringFieldUpdateOperationsInput | string
    fromTileId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TileMapCountOutputTypeDefaultArgs instead
     */
    export type TileMapCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TileMapCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TileCountOutputTypeDefaultArgs instead
     */
    export type TileCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TileCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TileMapDefaultArgs instead
     */
    export type TileMapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TileMapDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TileDefaultArgs instead
     */
    export type TileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EdgeDefaultArgs instead
     */
    export type EdgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EdgeDefaultArgs<ExtArgs>

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