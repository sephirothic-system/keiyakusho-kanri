
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model UserGroup
 * 
 */
export type UserGroup = $Result.DefaultSelection<Prisma.$UserGroupPayload>
/**
 * Model Directory
 * 
 */
export type Directory = $Result.DefaultSelection<Prisma.$DirectoryPayload>
/**
 * Model DirectoryAccess
 * 
 */
export type DirectoryAccess = $Result.DefaultSelection<Prisma.$DirectoryAccessPayload>
/**
 * Model Contract
 * 
 */
export type Contract = $Result.DefaultSelection<Prisma.$ContractPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model ContractVersion
 * 
 */
export type ContractVersion = $Result.DefaultSelection<Prisma.$ContractVersionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model DocuSignEnvelope
 * 
 */
export type DocuSignEnvelope = $Result.DefaultSelection<Prisma.$DocuSignEnvelopePayload>
/**
 * Model DocuSignSigner
 * 
 */
export type DocuSignSigner = $Result.DefaultSelection<Prisma.$DocuSignSignerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Permission: {
  READ: 'READ',
  WRITE: 'WRITE'
};

export type Permission = (typeof Permission)[keyof typeof Permission]


export const ContractStatus: {
  DRAFT: 'DRAFT',
  REVIEW: 'REVIEW',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
};

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus]


export const DocuSignEnvelopeStatus: {
  CREATED: 'CREATED',
  SENT: 'SENT',
  COMPLETED: 'COMPLETED',
  DECLINED: 'DECLINED',
  VOIDED: 'VOIDED'
};

export type DocuSignEnvelopeStatus = (typeof DocuSignEnvelopeStatus)[keyof typeof DocuSignEnvelopeStatus]


export const DocuSignSignerStatus: {
  CREATED: 'CREATED',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  SIGNED: 'SIGNED',
  COMPLETED: 'COMPLETED',
  DECLINED: 'DECLINED'
};

export type DocuSignSignerStatus = (typeof DocuSignSignerStatus)[keyof typeof DocuSignSignerStatus]

}

export type Permission = $Enums.Permission

export const Permission: typeof $Enums.Permission

export type ContractStatus = $Enums.ContractStatus

export const ContractStatus: typeof $Enums.ContractStatus

export type DocuSignEnvelopeStatus = $Enums.DocuSignEnvelopeStatus

export const DocuSignEnvelopeStatus: typeof $Enums.DocuSignEnvelopeStatus

export type DocuSignSignerStatus = $Enums.DocuSignSignerStatus

export const DocuSignSignerStatus: typeof $Enums.DocuSignSignerStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGroup`: Exposes CRUD operations for the **UserGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGroups
    * const userGroups = await prisma.userGroup.findMany()
    * ```
    */
  get userGroup(): Prisma.UserGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.directory`: Exposes CRUD operations for the **Directory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Directories
    * const directories = await prisma.directory.findMany()
    * ```
    */
  get directory(): Prisma.DirectoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.directoryAccess`: Exposes CRUD operations for the **DirectoryAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DirectoryAccesses
    * const directoryAccesses = await prisma.directoryAccess.findMany()
    * ```
    */
  get directoryAccess(): Prisma.DirectoryAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contract`: Exposes CRUD operations for the **Contract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contracts
    * const contracts = await prisma.contract.findMany()
    * ```
    */
  get contract(): Prisma.ContractDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contractVersion`: Exposes CRUD operations for the **ContractVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractVersions
    * const contractVersions = await prisma.contractVersion.findMany()
    * ```
    */
  get contractVersion(): Prisma.ContractVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.docuSignEnvelope`: Exposes CRUD operations for the **DocuSignEnvelope** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocuSignEnvelopes
    * const docuSignEnvelopes = await prisma.docuSignEnvelope.findMany()
    * ```
    */
  get docuSignEnvelope(): Prisma.DocuSignEnvelopeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.docuSignSigner`: Exposes CRUD operations for the **DocuSignSigner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocuSignSigners
    * const docuSignSigners = await prisma.docuSignSigner.findMany()
    * ```
    */
  get docuSignSigner(): Prisma.DocuSignSignerDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    Group: 'Group',
    UserGroup: 'UserGroup',
    Directory: 'Directory',
    DirectoryAccess: 'DirectoryAccess',
    Contract: 'Contract',
    Category: 'Category',
    ContractVersion: 'ContractVersion',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    DocuSignEnvelope: 'DocuSignEnvelope',
    DocuSignSigner: 'DocuSignSigner'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "group" | "userGroup" | "directory" | "directoryAccess" | "contract" | "category" | "contractVersion" | "account" | "session" | "verificationToken" | "docuSignEnvelope" | "docuSignSigner"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      UserGroup: {
        payload: Prisma.$UserGroupPayload<ExtArgs>
        fields: Prisma.UserGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findFirst: {
            args: Prisma.UserGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          findMany: {
            args: Prisma.UserGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          create: {
            args: Prisma.UserGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          createMany: {
            args: Prisma.UserGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          delete: {
            args: Prisma.UserGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          update: {
            args: Prisma.UserGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          deleteMany: {
            args: Prisma.UserGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>[]
          }
          upsert: {
            args: Prisma.UserGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGroupPayload>
          }
          aggregate: {
            args: Prisma.UserGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGroup>
          }
          groupBy: {
            args: Prisma.UserGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGroupCountArgs<ExtArgs>
            result: $Utils.Optional<UserGroupCountAggregateOutputType> | number
          }
        }
      }
      Directory: {
        payload: Prisma.$DirectoryPayload<ExtArgs>
        fields: Prisma.DirectoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DirectoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DirectoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          findFirst: {
            args: Prisma.DirectoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DirectoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          findMany: {
            args: Prisma.DirectoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>[]
          }
          create: {
            args: Prisma.DirectoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          createMany: {
            args: Prisma.DirectoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DirectoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>[]
          }
          delete: {
            args: Prisma.DirectoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          update: {
            args: Prisma.DirectoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          deleteMany: {
            args: Prisma.DirectoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DirectoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DirectoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>[]
          }
          upsert: {
            args: Prisma.DirectoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryPayload>
          }
          aggregate: {
            args: Prisma.DirectoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDirectory>
          }
          groupBy: {
            args: Prisma.DirectoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DirectoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DirectoryCountArgs<ExtArgs>
            result: $Utils.Optional<DirectoryCountAggregateOutputType> | number
          }
        }
      }
      DirectoryAccess: {
        payload: Prisma.$DirectoryAccessPayload<ExtArgs>
        fields: Prisma.DirectoryAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DirectoryAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DirectoryAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          findFirst: {
            args: Prisma.DirectoryAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DirectoryAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          findMany: {
            args: Prisma.DirectoryAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>[]
          }
          create: {
            args: Prisma.DirectoryAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          createMany: {
            args: Prisma.DirectoryAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DirectoryAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>[]
          }
          delete: {
            args: Prisma.DirectoryAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          update: {
            args: Prisma.DirectoryAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          deleteMany: {
            args: Prisma.DirectoryAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DirectoryAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DirectoryAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>[]
          }
          upsert: {
            args: Prisma.DirectoryAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectoryAccessPayload>
          }
          aggregate: {
            args: Prisma.DirectoryAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDirectoryAccess>
          }
          groupBy: {
            args: Prisma.DirectoryAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<DirectoryAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.DirectoryAccessCountArgs<ExtArgs>
            result: $Utils.Optional<DirectoryAccessCountAggregateOutputType> | number
          }
        }
      }
      Contract: {
        payload: Prisma.$ContractPayload<ExtArgs>
        fields: Prisma.ContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findFirst: {
            args: Prisma.ContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findMany: {
            args: Prisma.ContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          create: {
            args: Prisma.ContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          createMany: {
            args: Prisma.ContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          delete: {
            args: Prisma.ContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          update: {
            args: Prisma.ContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          deleteMany: {
            args: Prisma.ContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          upsert: {
            args: Prisma.ContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          aggregate: {
            args: Prisma.ContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContract>
          }
          groupBy: {
            args: Prisma.ContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractCountArgs<ExtArgs>
            result: $Utils.Optional<ContractCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      ContractVersion: {
        payload: Prisma.$ContractVersionPayload<ExtArgs>
        fields: Prisma.ContractVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          findFirst: {
            args: Prisma.ContractVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          findMany: {
            args: Prisma.ContractVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>[]
          }
          create: {
            args: Prisma.ContractVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          createMany: {
            args: Prisma.ContractVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>[]
          }
          delete: {
            args: Prisma.ContractVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          update: {
            args: Prisma.ContractVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          deleteMany: {
            args: Prisma.ContractVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>[]
          }
          upsert: {
            args: Prisma.ContractVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractVersionPayload>
          }
          aggregate: {
            args: Prisma.ContractVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractVersion>
          }
          groupBy: {
            args: Prisma.ContractVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractVersionCountArgs<ExtArgs>
            result: $Utils.Optional<ContractVersionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      DocuSignEnvelope: {
        payload: Prisma.$DocuSignEnvelopePayload<ExtArgs>
        fields: Prisma.DocuSignEnvelopeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocuSignEnvelopeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocuSignEnvelopeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          findFirst: {
            args: Prisma.DocuSignEnvelopeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocuSignEnvelopeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          findMany: {
            args: Prisma.DocuSignEnvelopeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>[]
          }
          create: {
            args: Prisma.DocuSignEnvelopeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          createMany: {
            args: Prisma.DocuSignEnvelopeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocuSignEnvelopeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>[]
          }
          delete: {
            args: Prisma.DocuSignEnvelopeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          update: {
            args: Prisma.DocuSignEnvelopeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          deleteMany: {
            args: Prisma.DocuSignEnvelopeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocuSignEnvelopeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocuSignEnvelopeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>[]
          }
          upsert: {
            args: Prisma.DocuSignEnvelopeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignEnvelopePayload>
          }
          aggregate: {
            args: Prisma.DocuSignEnvelopeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocuSignEnvelope>
          }
          groupBy: {
            args: Prisma.DocuSignEnvelopeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocuSignEnvelopeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocuSignEnvelopeCountArgs<ExtArgs>
            result: $Utils.Optional<DocuSignEnvelopeCountAggregateOutputType> | number
          }
        }
      }
      DocuSignSigner: {
        payload: Prisma.$DocuSignSignerPayload<ExtArgs>
        fields: Prisma.DocuSignSignerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocuSignSignerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocuSignSignerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          findFirst: {
            args: Prisma.DocuSignSignerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocuSignSignerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          findMany: {
            args: Prisma.DocuSignSignerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>[]
          }
          create: {
            args: Prisma.DocuSignSignerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          createMany: {
            args: Prisma.DocuSignSignerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocuSignSignerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>[]
          }
          delete: {
            args: Prisma.DocuSignSignerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          update: {
            args: Prisma.DocuSignSignerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          deleteMany: {
            args: Prisma.DocuSignSignerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocuSignSignerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocuSignSignerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>[]
          }
          upsert: {
            args: Prisma.DocuSignSignerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocuSignSignerPayload>
          }
          aggregate: {
            args: Prisma.DocuSignSignerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocuSignSigner>
          }
          groupBy: {
            args: Prisma.DocuSignSignerGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocuSignSignerGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocuSignSignerCountArgs<ExtArgs>
            result: $Utils.Optional<DocuSignSignerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    group?: GroupOmit
    userGroup?: UserGroupOmit
    directory?: DirectoryOmit
    directoryAccess?: DirectoryAccessOmit
    contract?: ContractOmit
    category?: CategoryOmit
    contractVersion?: ContractVersionOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    docuSignEnvelope?: DocuSignEnvelopeOmit
    docuSignSigner?: DocuSignSignerOmit
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
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ownedContracts: number
    userGroups: number
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedContracts?: boolean | UserCountOutputTypeCountOwnedContractsArgs
    userGroups?: boolean | UserCountOutputTypeCountUserGroupsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    directoryAccess: number
    userGroups: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directoryAccess?: boolean | GroupCountOutputTypeCountDirectoryAccessArgs
    userGroups?: boolean | GroupCountOutputTypeCountUserGroupsArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountDirectoryAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectoryAccessWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountUserGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
  }


  /**
   * Count Type DirectoryCountOutputType
   */

  export type DirectoryCountOutputType = {
    contracts: number
    children: number
    directoryAccess: number
  }

  export type DirectoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contracts?: boolean | DirectoryCountOutputTypeCountContractsArgs
    children?: boolean | DirectoryCountOutputTypeCountChildrenArgs
    directoryAccess?: boolean | DirectoryCountOutputTypeCountDirectoryAccessArgs
  }

  // Custom InputTypes
  /**
   * DirectoryCountOutputType without action
   */
  export type DirectoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryCountOutputType
     */
    select?: DirectoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DirectoryCountOutputType without action
   */
  export type DirectoryCountOutputTypeCountContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
  }

  /**
   * DirectoryCountOutputType without action
   */
  export type DirectoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectoryWhereInput
  }

  /**
   * DirectoryCountOutputType without action
   */
  export type DirectoryCountOutputTypeCountDirectoryAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectoryAccessWhereInput
  }


  /**
   * Count Type ContractCountOutputType
   */

  export type ContractCountOutputType = {
    versions: number
    docuSignEnvelopes: number
  }

  export type ContractCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | ContractCountOutputTypeCountVersionsArgs
    docuSignEnvelopes?: boolean | ContractCountOutputTypeCountDocuSignEnvelopesArgs
  }

  // Custom InputTypes
  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractCountOutputType
     */
    select?: ContractCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractVersionWhereInput
  }

  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeCountDocuSignEnvelopesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocuSignEnvelopeWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    contracts: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contracts?: boolean | CategoryCountOutputTypeCountContractsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
  }


  /**
   * Count Type DocuSignEnvelopeCountOutputType
   */

  export type DocuSignEnvelopeCountOutputType = {
    signers: number
  }

  export type DocuSignEnvelopeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signers?: boolean | DocuSignEnvelopeCountOutputTypeCountSignersArgs
  }

  // Custom InputTypes
  /**
   * DocuSignEnvelopeCountOutputType without action
   */
  export type DocuSignEnvelopeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelopeCountOutputType
     */
    select?: DocuSignEnvelopeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocuSignEnvelopeCountOutputType without action
   */
  export type DocuSignEnvelopeCountOutputTypeCountSignersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocuSignSignerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    isActive: boolean | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    isActive: boolean | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    emailVerified: number
    image: number
    isActive: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    emailVerified?: true
    image?: true
    isActive?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    emailVerified?: true
    image?: true
    isActive?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    emailVerified?: true
    image?: true
    isActive?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    isActive: boolean
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownedContracts?: boolean | User$ownedContractsArgs<ExtArgs>
    userGroups?: boolean | User$userGroupsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "emailVerified" | "image" | "isActive" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedContracts?: boolean | User$ownedContractsArgs<ExtArgs>
    userGroups?: boolean | User$userGroupsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ownedContracts: Prisma.$ContractPayload<ExtArgs>[]
      userGroups: Prisma.$UserGroupPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string | null
      emailVerified: Date | null
      image: string | null
      isActive: boolean
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ownedContracts<T extends User$ownedContractsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedContractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGroups<T extends User$userGroupsArgs<ExtArgs> = {}>(args?: Subset<T, User$userGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ownedContracts
   */
  export type User$ownedContractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    cursor?: ContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * User.userGroups
   */
  export type User$userGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    cursor?: UserGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    directoryAccess?: boolean | Group$directoryAccessArgs<ExtArgs>
    userGroups?: boolean | Group$userGroupsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directoryAccess?: boolean | Group$directoryAccessArgs<ExtArgs>
    userGroups?: boolean | Group$userGroupsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      directoryAccess: Prisma.$DirectoryAccessPayload<ExtArgs>[]
      userGroups: Prisma.$UserGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    directoryAccess<T extends Group$directoryAccessArgs<ExtArgs> = {}>(args?: Subset<T, Group$directoryAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userGroups<T extends Group$userGroupsArgs<ExtArgs> = {}>(args?: Subset<T, Group$userGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly description: FieldRef<"Group", 'String'>
    readonly isActive: FieldRef<"Group", 'Boolean'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.directoryAccess
   */
  export type Group$directoryAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    where?: DirectoryAccessWhereInput
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    cursor?: DirectoryAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DirectoryAccessScalarFieldEnum | DirectoryAccessScalarFieldEnum[]
  }

  /**
   * Group.userGroups
   */
  export type Group$userGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    cursor?: UserGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model UserGroup
   */

  export type AggregateUserGroup = {
    _count: UserGroupCountAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  export type UserGroupMinAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    joinedAt: Date | null
  }

  export type UserGroupMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    groupId: string | null
    joinedAt: Date | null
  }

  export type UserGroupCountAggregateOutputType = {
    id: number
    userId: number
    groupId: number
    joinedAt: number
    _all: number
  }


  export type UserGroupMinAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    joinedAt?: true
  }

  export type UserGroupMaxAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    joinedAt?: true
  }

  export type UserGroupCountAggregateInputType = {
    id?: true
    userId?: true
    groupId?: true
    joinedAt?: true
    _all?: true
  }

  export type UserGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroup to aggregate.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGroups
    **/
    _count?: true | UserGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGroupMaxAggregateInputType
  }

  export type GetUserGroupAggregateType<T extends UserGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGroup[P]>
      : GetScalarType<T[P], AggregateUserGroup[P]>
  }




  export type UserGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGroupWhereInput
    orderBy?: UserGroupOrderByWithAggregationInput | UserGroupOrderByWithAggregationInput[]
    by: UserGroupScalarFieldEnum[] | UserGroupScalarFieldEnum
    having?: UserGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGroupCountAggregateInputType | true
    _min?: UserGroupMinAggregateInputType
    _max?: UserGroupMaxAggregateInputType
  }

  export type UserGroupGroupByOutputType = {
    id: string
    userId: string
    groupId: string
    joinedAt: Date
    _count: UserGroupCountAggregateOutputType | null
    _min: UserGroupMinAggregateOutputType | null
    _max: UserGroupMaxAggregateOutputType | null
  }

  type GetUserGroupGroupByPayload<T extends UserGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupGroupByOutputType[P]>
        }
      >
    >


  export type UserGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    joinedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    joinedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    groupId?: boolean
    joinedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGroup"]>

  export type UserGroupSelectScalar = {
    id?: boolean
    userId?: boolean
    groupId?: boolean
    joinedAt?: boolean
  }

  export type UserGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "groupId" | "joinedAt", ExtArgs["result"]["userGroup"]>
  export type UserGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGroup"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      groupId: string
      joinedAt: Date
    }, ExtArgs["result"]["userGroup"]>
    composites: {}
  }

  type UserGroupGetPayload<S extends boolean | null | undefined | UserGroupDefaultArgs> = $Result.GetResult<Prisma.$UserGroupPayload, S>

  type UserGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGroupCountAggregateInputType | true
    }

  export interface UserGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGroup'], meta: { name: 'UserGroup' } }
    /**
     * Find zero or one UserGroup that matches the filter.
     * @param {UserGroupFindUniqueArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGroupFindUniqueArgs>(args: SelectSubset<T, UserGroupFindUniqueArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGroupFindUniqueOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGroupFindFirstArgs>(args?: SelectSubset<T, UserGroupFindFirstArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindFirstOrThrowArgs} args - Arguments to find a UserGroup
     * @example
     * // Get one UserGroup
     * const userGroup = await prisma.userGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGroups
     * const userGroups = await prisma.userGroup.findMany()
     * 
     * // Get first 10 UserGroups
     * const userGroups = await prisma.userGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userGroupWithIdOnly = await prisma.userGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserGroupFindManyArgs>(args?: SelectSubset<T, UserGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGroup.
     * @param {UserGroupCreateArgs} args - Arguments to create a UserGroup.
     * @example
     * // Create one UserGroup
     * const UserGroup = await prisma.userGroup.create({
     *   data: {
     *     // ... data to create a UserGroup
     *   }
     * })
     * 
     */
    create<T extends UserGroupCreateArgs>(args: SelectSubset<T, UserGroupCreateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGroups.
     * @param {UserGroupCreateManyArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGroupCreateManyArgs>(args?: SelectSubset<T, UserGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGroups and returns the data saved in the database.
     * @param {UserGroupCreateManyAndReturnArgs} args - Arguments to create many UserGroups.
     * @example
     * // Create many UserGroups
     * const userGroup = await prisma.userGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGroups and only return the `id`
     * const userGroupWithIdOnly = await prisma.userGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGroup.
     * @param {UserGroupDeleteArgs} args - Arguments to delete one UserGroup.
     * @example
     * // Delete one UserGroup
     * const UserGroup = await prisma.userGroup.delete({
     *   where: {
     *     // ... filter to delete one UserGroup
     *   }
     * })
     * 
     */
    delete<T extends UserGroupDeleteArgs>(args: SelectSubset<T, UserGroupDeleteArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGroup.
     * @param {UserGroupUpdateArgs} args - Arguments to update one UserGroup.
     * @example
     * // Update one UserGroup
     * const userGroup = await prisma.userGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGroupUpdateArgs>(args: SelectSubset<T, UserGroupUpdateArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGroups.
     * @param {UserGroupDeleteManyArgs} args - Arguments to filter UserGroups to delete.
     * @example
     * // Delete a few UserGroups
     * const { count } = await prisma.userGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGroupDeleteManyArgs>(args?: SelectSubset<T, UserGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGroupUpdateManyArgs>(args: SelectSubset<T, UserGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGroups and returns the data updated in the database.
     * @param {UserGroupUpdateManyAndReturnArgs} args - Arguments to update many UserGroups.
     * @example
     * // Update many UserGroups
     * const userGroup = await prisma.userGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGroups and only return the `id`
     * const userGroupWithIdOnly = await prisma.userGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGroup.
     * @param {UserGroupUpsertArgs} args - Arguments to update or create a UserGroup.
     * @example
     * // Update or create a UserGroup
     * const userGroup = await prisma.userGroup.upsert({
     *   create: {
     *     // ... data to create a UserGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGroup we want to update
     *   }
     * })
     */
    upsert<T extends UserGroupUpsertArgs>(args: SelectSubset<T, UserGroupUpsertArgs<ExtArgs>>): Prisma__UserGroupClient<$Result.GetResult<Prisma.$UserGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupCountArgs} args - Arguments to filter UserGroups to count.
     * @example
     * // Count the number of UserGroups
     * const count = await prisma.userGroup.count({
     *   where: {
     *     // ... the filter for the UserGroups we want to count
     *   }
     * })
    **/
    count<T extends UserGroupCountArgs>(
      args?: Subset<T, UserGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserGroupAggregateArgs>(args: Subset<T, UserGroupAggregateArgs>): Prisma.PrismaPromise<GetUserGroupAggregateType<T>>

    /**
     * Group by UserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupGroupByArgs} args - Group by arguments.
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
      T extends UserGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGroup model
   */
  readonly fields: UserGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserGroup model
   */
  interface UserGroupFieldRefs {
    readonly id: FieldRef<"UserGroup", 'String'>
    readonly userId: FieldRef<"UserGroup", 'String'>
    readonly groupId: FieldRef<"UserGroup", 'String'>
    readonly joinedAt: FieldRef<"UserGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGroup findUnique
   */
  export type UserGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findUniqueOrThrow
   */
  export type UserGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup findFirst
   */
  export type UserGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findFirstOrThrow
   */
  export type UserGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroup to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGroups.
     */
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup findMany
   */
  export type UserGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter, which UserGroups to fetch.
     */
    where?: UserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGroups to fetch.
     */
    orderBy?: UserGroupOrderByWithRelationInput | UserGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGroups.
     */
    cursor?: UserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGroups.
     */
    skip?: number
    distinct?: UserGroupScalarFieldEnum | UserGroupScalarFieldEnum[]
  }

  /**
   * UserGroup create
   */
  export type UserGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGroup.
     */
    data: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
  }

  /**
   * UserGroup createMany
   */
  export type UserGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGroup createManyAndReturn
   */
  export type UserGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to create many UserGroups.
     */
    data: UserGroupCreateManyInput | UserGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup update
   */
  export type UserGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGroup.
     */
    data: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
    /**
     * Choose, which UserGroup to update.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup updateMany
   */
  export type UserGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
  }

  /**
   * UserGroup updateManyAndReturn
   */
  export type UserGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * The data used to update UserGroups.
     */
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyInput>
    /**
     * Filter which UserGroups to update
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGroup upsert
   */
  export type UserGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGroup to update in case it exists.
     */
    where: UserGroupWhereUniqueInput
    /**
     * In case the UserGroup found by the `where` argument doesn't exist, create a new UserGroup with this data.
     */
    create: XOR<UserGroupCreateInput, UserGroupUncheckedCreateInput>
    /**
     * In case the UserGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGroupUpdateInput, UserGroupUncheckedUpdateInput>
  }

  /**
   * UserGroup delete
   */
  export type UserGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
    /**
     * Filter which UserGroup to delete.
     */
    where: UserGroupWhereUniqueInput
  }

  /**
   * UserGroup deleteMany
   */
  export type UserGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGroups to delete
     */
    where?: UserGroupWhereInput
    /**
     * Limit how many UserGroups to delete.
     */
    limit?: number
  }

  /**
   * UserGroup without action
   */
  export type UserGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGroup
     */
    select?: UserGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGroup
     */
    omit?: UserGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGroupInclude<ExtArgs> | null
  }


  /**
   * Model Directory
   */

  export type AggregateDirectory = {
    _count: DirectoryCountAggregateOutputType | null
    _min: DirectoryMinAggregateOutputType | null
    _max: DirectoryMaxAggregateOutputType | null
  }

  export type DirectoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    parentId: string | null
    path: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DirectoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    parentId: string | null
    path: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DirectoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    parentId: number
    path: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DirectoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    parentId?: true
    path?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DirectoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    parentId?: true
    path?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DirectoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    parentId?: true
    path?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DirectoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Directory to aggregate.
     */
    where?: DirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directories to fetch.
     */
    orderBy?: DirectoryOrderByWithRelationInput | DirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Directories
    **/
    _count?: true | DirectoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DirectoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DirectoryMaxAggregateInputType
  }

  export type GetDirectoryAggregateType<T extends DirectoryAggregateArgs> = {
        [P in keyof T & keyof AggregateDirectory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDirectory[P]>
      : GetScalarType<T[P], AggregateDirectory[P]>
  }




  export type DirectoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectoryWhereInput
    orderBy?: DirectoryOrderByWithAggregationInput | DirectoryOrderByWithAggregationInput[]
    by: DirectoryScalarFieldEnum[] | DirectoryScalarFieldEnum
    having?: DirectoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DirectoryCountAggregateInputType | true
    _min?: DirectoryMinAggregateInputType
    _max?: DirectoryMaxAggregateInputType
  }

  export type DirectoryGroupByOutputType = {
    id: string
    name: string
    description: string | null
    parentId: string | null
    path: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: DirectoryCountAggregateOutputType | null
    _min: DirectoryMinAggregateOutputType | null
    _max: DirectoryMaxAggregateOutputType | null
  }

  type GetDirectoryGroupByPayload<T extends DirectoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DirectoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DirectoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DirectoryGroupByOutputType[P]>
            : GetScalarType<T[P], DirectoryGroupByOutputType[P]>
        }
      >
    >


  export type DirectorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    path?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contracts?: boolean | Directory$contractsArgs<ExtArgs>
    parent?: boolean | Directory$parentArgs<ExtArgs>
    children?: boolean | Directory$childrenArgs<ExtArgs>
    directoryAccess?: boolean | Directory$directoryAccessArgs<ExtArgs>
    _count?: boolean | DirectoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["directory"]>

  export type DirectorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    path?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Directory$parentArgs<ExtArgs>
  }, ExtArgs["result"]["directory"]>

  export type DirectorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    path?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Directory$parentArgs<ExtArgs>
  }, ExtArgs["result"]["directory"]>

  export type DirectorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    path?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DirectoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "parentId" | "path" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["directory"]>
  export type DirectoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contracts?: boolean | Directory$contractsArgs<ExtArgs>
    parent?: boolean | Directory$parentArgs<ExtArgs>
    children?: boolean | Directory$childrenArgs<ExtArgs>
    directoryAccess?: boolean | Directory$directoryAccessArgs<ExtArgs>
    _count?: boolean | DirectoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DirectoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Directory$parentArgs<ExtArgs>
  }
  export type DirectoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Directory$parentArgs<ExtArgs>
  }

  export type $DirectoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Directory"
    objects: {
      contracts: Prisma.$ContractPayload<ExtArgs>[]
      parent: Prisma.$DirectoryPayload<ExtArgs> | null
      children: Prisma.$DirectoryPayload<ExtArgs>[]
      directoryAccess: Prisma.$DirectoryAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      parentId: string | null
      path: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["directory"]>
    composites: {}
  }

  type DirectoryGetPayload<S extends boolean | null | undefined | DirectoryDefaultArgs> = $Result.GetResult<Prisma.$DirectoryPayload, S>

  type DirectoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DirectoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DirectoryCountAggregateInputType | true
    }

  export interface DirectoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Directory'], meta: { name: 'Directory' } }
    /**
     * Find zero or one Directory that matches the filter.
     * @param {DirectoryFindUniqueArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DirectoryFindUniqueArgs>(args: SelectSubset<T, DirectoryFindUniqueArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Directory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DirectoryFindUniqueOrThrowArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DirectoryFindUniqueOrThrowArgs>(args: SelectSubset<T, DirectoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Directory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryFindFirstArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DirectoryFindFirstArgs>(args?: SelectSubset<T, DirectoryFindFirstArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Directory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryFindFirstOrThrowArgs} args - Arguments to find a Directory
     * @example
     * // Get one Directory
     * const directory = await prisma.directory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DirectoryFindFirstOrThrowArgs>(args?: SelectSubset<T, DirectoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Directories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Directories
     * const directories = await prisma.directory.findMany()
     * 
     * // Get first 10 Directories
     * const directories = await prisma.directory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const directoryWithIdOnly = await prisma.directory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DirectoryFindManyArgs>(args?: SelectSubset<T, DirectoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Directory.
     * @param {DirectoryCreateArgs} args - Arguments to create a Directory.
     * @example
     * // Create one Directory
     * const Directory = await prisma.directory.create({
     *   data: {
     *     // ... data to create a Directory
     *   }
     * })
     * 
     */
    create<T extends DirectoryCreateArgs>(args: SelectSubset<T, DirectoryCreateArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Directories.
     * @param {DirectoryCreateManyArgs} args - Arguments to create many Directories.
     * @example
     * // Create many Directories
     * const directory = await prisma.directory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DirectoryCreateManyArgs>(args?: SelectSubset<T, DirectoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Directories and returns the data saved in the database.
     * @param {DirectoryCreateManyAndReturnArgs} args - Arguments to create many Directories.
     * @example
     * // Create many Directories
     * const directory = await prisma.directory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Directories and only return the `id`
     * const directoryWithIdOnly = await prisma.directory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DirectoryCreateManyAndReturnArgs>(args?: SelectSubset<T, DirectoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Directory.
     * @param {DirectoryDeleteArgs} args - Arguments to delete one Directory.
     * @example
     * // Delete one Directory
     * const Directory = await prisma.directory.delete({
     *   where: {
     *     // ... filter to delete one Directory
     *   }
     * })
     * 
     */
    delete<T extends DirectoryDeleteArgs>(args: SelectSubset<T, DirectoryDeleteArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Directory.
     * @param {DirectoryUpdateArgs} args - Arguments to update one Directory.
     * @example
     * // Update one Directory
     * const directory = await prisma.directory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DirectoryUpdateArgs>(args: SelectSubset<T, DirectoryUpdateArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Directories.
     * @param {DirectoryDeleteManyArgs} args - Arguments to filter Directories to delete.
     * @example
     * // Delete a few Directories
     * const { count } = await prisma.directory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DirectoryDeleteManyArgs>(args?: SelectSubset<T, DirectoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Directories
     * const directory = await prisma.directory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DirectoryUpdateManyArgs>(args: SelectSubset<T, DirectoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directories and returns the data updated in the database.
     * @param {DirectoryUpdateManyAndReturnArgs} args - Arguments to update many Directories.
     * @example
     * // Update many Directories
     * const directory = await prisma.directory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Directories and only return the `id`
     * const directoryWithIdOnly = await prisma.directory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DirectoryUpdateManyAndReturnArgs>(args: SelectSubset<T, DirectoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Directory.
     * @param {DirectoryUpsertArgs} args - Arguments to update or create a Directory.
     * @example
     * // Update or create a Directory
     * const directory = await prisma.directory.upsert({
     *   create: {
     *     // ... data to create a Directory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Directory we want to update
     *   }
     * })
     */
    upsert<T extends DirectoryUpsertArgs>(args: SelectSubset<T, DirectoryUpsertArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Directories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryCountArgs} args - Arguments to filter Directories to count.
     * @example
     * // Count the number of Directories
     * const count = await prisma.directory.count({
     *   where: {
     *     // ... the filter for the Directories we want to count
     *   }
     * })
    **/
    count<T extends DirectoryCountArgs>(
      args?: Subset<T, DirectoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DirectoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Directory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DirectoryAggregateArgs>(args: Subset<T, DirectoryAggregateArgs>): Prisma.PrismaPromise<GetDirectoryAggregateType<T>>

    /**
     * Group by Directory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryGroupByArgs} args - Group by arguments.
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
      T extends DirectoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DirectoryGroupByArgs['orderBy'] }
        : { orderBy?: DirectoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DirectoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDirectoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Directory model
   */
  readonly fields: DirectoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Directory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DirectoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contracts<T extends Directory$contractsArgs<ExtArgs> = {}>(args?: Subset<T, Directory$contractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent<T extends Directory$parentArgs<ExtArgs> = {}>(args?: Subset<T, Directory$parentArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Directory$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Directory$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    directoryAccess<T extends Directory$directoryAccessArgs<ExtArgs> = {}>(args?: Subset<T, Directory$directoryAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Directory model
   */
  interface DirectoryFieldRefs {
    readonly id: FieldRef<"Directory", 'String'>
    readonly name: FieldRef<"Directory", 'String'>
    readonly description: FieldRef<"Directory", 'String'>
    readonly parentId: FieldRef<"Directory", 'String'>
    readonly path: FieldRef<"Directory", 'String'>
    readonly isActive: FieldRef<"Directory", 'Boolean'>
    readonly createdAt: FieldRef<"Directory", 'DateTime'>
    readonly updatedAt: FieldRef<"Directory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Directory findUnique
   */
  export type DirectoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter, which Directory to fetch.
     */
    where: DirectoryWhereUniqueInput
  }

  /**
   * Directory findUniqueOrThrow
   */
  export type DirectoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter, which Directory to fetch.
     */
    where: DirectoryWhereUniqueInput
  }

  /**
   * Directory findFirst
   */
  export type DirectoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter, which Directory to fetch.
     */
    where?: DirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directories to fetch.
     */
    orderBy?: DirectoryOrderByWithRelationInput | DirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Directories.
     */
    cursor?: DirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Directories.
     */
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * Directory findFirstOrThrow
   */
  export type DirectoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter, which Directory to fetch.
     */
    where?: DirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directories to fetch.
     */
    orderBy?: DirectoryOrderByWithRelationInput | DirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Directories.
     */
    cursor?: DirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Directories.
     */
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * Directory findMany
   */
  export type DirectoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter, which Directories to fetch.
     */
    where?: DirectoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directories to fetch.
     */
    orderBy?: DirectoryOrderByWithRelationInput | DirectoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Directories.
     */
    cursor?: DirectoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directories.
     */
    skip?: number
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * Directory create
   */
  export type DirectoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Directory.
     */
    data: XOR<DirectoryCreateInput, DirectoryUncheckedCreateInput>
  }

  /**
   * Directory createMany
   */
  export type DirectoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Directories.
     */
    data: DirectoryCreateManyInput | DirectoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Directory createManyAndReturn
   */
  export type DirectoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * The data used to create many Directories.
     */
    data: DirectoryCreateManyInput | DirectoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Directory update
   */
  export type DirectoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Directory.
     */
    data: XOR<DirectoryUpdateInput, DirectoryUncheckedUpdateInput>
    /**
     * Choose, which Directory to update.
     */
    where: DirectoryWhereUniqueInput
  }

  /**
   * Directory updateMany
   */
  export type DirectoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Directories.
     */
    data: XOR<DirectoryUpdateManyMutationInput, DirectoryUncheckedUpdateManyInput>
    /**
     * Filter which Directories to update
     */
    where?: DirectoryWhereInput
    /**
     * Limit how many Directories to update.
     */
    limit?: number
  }

  /**
   * Directory updateManyAndReturn
   */
  export type DirectoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * The data used to update Directories.
     */
    data: XOR<DirectoryUpdateManyMutationInput, DirectoryUncheckedUpdateManyInput>
    /**
     * Filter which Directories to update
     */
    where?: DirectoryWhereInput
    /**
     * Limit how many Directories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Directory upsert
   */
  export type DirectoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Directory to update in case it exists.
     */
    where: DirectoryWhereUniqueInput
    /**
     * In case the Directory found by the `where` argument doesn't exist, create a new Directory with this data.
     */
    create: XOR<DirectoryCreateInput, DirectoryUncheckedCreateInput>
    /**
     * In case the Directory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DirectoryUpdateInput, DirectoryUncheckedUpdateInput>
  }

  /**
   * Directory delete
   */
  export type DirectoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    /**
     * Filter which Directory to delete.
     */
    where: DirectoryWhereUniqueInput
  }

  /**
   * Directory deleteMany
   */
  export type DirectoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Directories to delete
     */
    where?: DirectoryWhereInput
    /**
     * Limit how many Directories to delete.
     */
    limit?: number
  }

  /**
   * Directory.contracts
   */
  export type Directory$contractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    cursor?: ContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Directory.parent
   */
  export type Directory$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    where?: DirectoryWhereInput
  }

  /**
   * Directory.children
   */
  export type Directory$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
    where?: DirectoryWhereInput
    orderBy?: DirectoryOrderByWithRelationInput | DirectoryOrderByWithRelationInput[]
    cursor?: DirectoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DirectoryScalarFieldEnum | DirectoryScalarFieldEnum[]
  }

  /**
   * Directory.directoryAccess
   */
  export type Directory$directoryAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    where?: DirectoryAccessWhereInput
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    cursor?: DirectoryAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DirectoryAccessScalarFieldEnum | DirectoryAccessScalarFieldEnum[]
  }

  /**
   * Directory without action
   */
  export type DirectoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Directory
     */
    select?: DirectorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Directory
     */
    omit?: DirectoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryInclude<ExtArgs> | null
  }


  /**
   * Model DirectoryAccess
   */

  export type AggregateDirectoryAccess = {
    _count: DirectoryAccessCountAggregateOutputType | null
    _min: DirectoryAccessMinAggregateOutputType | null
    _max: DirectoryAccessMaxAggregateOutputType | null
  }

  export type DirectoryAccessMinAggregateOutputType = {
    id: string | null
    directoryId: string | null
    groupId: string | null
    permission: $Enums.Permission | null
    createdAt: Date | null
  }

  export type DirectoryAccessMaxAggregateOutputType = {
    id: string | null
    directoryId: string | null
    groupId: string | null
    permission: $Enums.Permission | null
    createdAt: Date | null
  }

  export type DirectoryAccessCountAggregateOutputType = {
    id: number
    directoryId: number
    groupId: number
    permission: number
    createdAt: number
    _all: number
  }


  export type DirectoryAccessMinAggregateInputType = {
    id?: true
    directoryId?: true
    groupId?: true
    permission?: true
    createdAt?: true
  }

  export type DirectoryAccessMaxAggregateInputType = {
    id?: true
    directoryId?: true
    groupId?: true
    permission?: true
    createdAt?: true
  }

  export type DirectoryAccessCountAggregateInputType = {
    id?: true
    directoryId?: true
    groupId?: true
    permission?: true
    createdAt?: true
    _all?: true
  }

  export type DirectoryAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DirectoryAccess to aggregate.
     */
    where?: DirectoryAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DirectoryAccesses to fetch.
     */
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DirectoryAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DirectoryAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DirectoryAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DirectoryAccesses
    **/
    _count?: true | DirectoryAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DirectoryAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DirectoryAccessMaxAggregateInputType
  }

  export type GetDirectoryAccessAggregateType<T extends DirectoryAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateDirectoryAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDirectoryAccess[P]>
      : GetScalarType<T[P], AggregateDirectoryAccess[P]>
  }




  export type DirectoryAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectoryAccessWhereInput
    orderBy?: DirectoryAccessOrderByWithAggregationInput | DirectoryAccessOrderByWithAggregationInput[]
    by: DirectoryAccessScalarFieldEnum[] | DirectoryAccessScalarFieldEnum
    having?: DirectoryAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DirectoryAccessCountAggregateInputType | true
    _min?: DirectoryAccessMinAggregateInputType
    _max?: DirectoryAccessMaxAggregateInputType
  }

  export type DirectoryAccessGroupByOutputType = {
    id: string
    directoryId: string
    groupId: string
    permission: $Enums.Permission
    createdAt: Date
    _count: DirectoryAccessCountAggregateOutputType | null
    _min: DirectoryAccessMinAggregateOutputType | null
    _max: DirectoryAccessMaxAggregateOutputType | null
  }

  type GetDirectoryAccessGroupByPayload<T extends DirectoryAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DirectoryAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DirectoryAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DirectoryAccessGroupByOutputType[P]>
            : GetScalarType<T[P], DirectoryAccessGroupByOutputType[P]>
        }
      >
    >


  export type DirectoryAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    directoryId?: boolean
    groupId?: boolean
    permission?: boolean
    createdAt?: boolean
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["directoryAccess"]>

  export type DirectoryAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    directoryId?: boolean
    groupId?: boolean
    permission?: boolean
    createdAt?: boolean
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["directoryAccess"]>

  export type DirectoryAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    directoryId?: boolean
    groupId?: boolean
    permission?: boolean
    createdAt?: boolean
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["directoryAccess"]>

  export type DirectoryAccessSelectScalar = {
    id?: boolean
    directoryId?: boolean
    groupId?: boolean
    permission?: boolean
    createdAt?: boolean
  }

  export type DirectoryAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "directoryId" | "groupId" | "permission" | "createdAt", ExtArgs["result"]["directoryAccess"]>
  export type DirectoryAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type DirectoryAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type DirectoryAccessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $DirectoryAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DirectoryAccess"
    objects: {
      directory: Prisma.$DirectoryPayload<ExtArgs>
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      directoryId: string
      groupId: string
      permission: $Enums.Permission
      createdAt: Date
    }, ExtArgs["result"]["directoryAccess"]>
    composites: {}
  }

  type DirectoryAccessGetPayload<S extends boolean | null | undefined | DirectoryAccessDefaultArgs> = $Result.GetResult<Prisma.$DirectoryAccessPayload, S>

  type DirectoryAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DirectoryAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DirectoryAccessCountAggregateInputType | true
    }

  export interface DirectoryAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DirectoryAccess'], meta: { name: 'DirectoryAccess' } }
    /**
     * Find zero or one DirectoryAccess that matches the filter.
     * @param {DirectoryAccessFindUniqueArgs} args - Arguments to find a DirectoryAccess
     * @example
     * // Get one DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DirectoryAccessFindUniqueArgs>(args: SelectSubset<T, DirectoryAccessFindUniqueArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DirectoryAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DirectoryAccessFindUniqueOrThrowArgs} args - Arguments to find a DirectoryAccess
     * @example
     * // Get one DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DirectoryAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, DirectoryAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DirectoryAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessFindFirstArgs} args - Arguments to find a DirectoryAccess
     * @example
     * // Get one DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DirectoryAccessFindFirstArgs>(args?: SelectSubset<T, DirectoryAccessFindFirstArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DirectoryAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessFindFirstOrThrowArgs} args - Arguments to find a DirectoryAccess
     * @example
     * // Get one DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DirectoryAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, DirectoryAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DirectoryAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DirectoryAccesses
     * const directoryAccesses = await prisma.directoryAccess.findMany()
     * 
     * // Get first 10 DirectoryAccesses
     * const directoryAccesses = await prisma.directoryAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const directoryAccessWithIdOnly = await prisma.directoryAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DirectoryAccessFindManyArgs>(args?: SelectSubset<T, DirectoryAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DirectoryAccess.
     * @param {DirectoryAccessCreateArgs} args - Arguments to create a DirectoryAccess.
     * @example
     * // Create one DirectoryAccess
     * const DirectoryAccess = await prisma.directoryAccess.create({
     *   data: {
     *     // ... data to create a DirectoryAccess
     *   }
     * })
     * 
     */
    create<T extends DirectoryAccessCreateArgs>(args: SelectSubset<T, DirectoryAccessCreateArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DirectoryAccesses.
     * @param {DirectoryAccessCreateManyArgs} args - Arguments to create many DirectoryAccesses.
     * @example
     * // Create many DirectoryAccesses
     * const directoryAccess = await prisma.directoryAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DirectoryAccessCreateManyArgs>(args?: SelectSubset<T, DirectoryAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DirectoryAccesses and returns the data saved in the database.
     * @param {DirectoryAccessCreateManyAndReturnArgs} args - Arguments to create many DirectoryAccesses.
     * @example
     * // Create many DirectoryAccesses
     * const directoryAccess = await prisma.directoryAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DirectoryAccesses and only return the `id`
     * const directoryAccessWithIdOnly = await prisma.directoryAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DirectoryAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, DirectoryAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DirectoryAccess.
     * @param {DirectoryAccessDeleteArgs} args - Arguments to delete one DirectoryAccess.
     * @example
     * // Delete one DirectoryAccess
     * const DirectoryAccess = await prisma.directoryAccess.delete({
     *   where: {
     *     // ... filter to delete one DirectoryAccess
     *   }
     * })
     * 
     */
    delete<T extends DirectoryAccessDeleteArgs>(args: SelectSubset<T, DirectoryAccessDeleteArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DirectoryAccess.
     * @param {DirectoryAccessUpdateArgs} args - Arguments to update one DirectoryAccess.
     * @example
     * // Update one DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DirectoryAccessUpdateArgs>(args: SelectSubset<T, DirectoryAccessUpdateArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DirectoryAccesses.
     * @param {DirectoryAccessDeleteManyArgs} args - Arguments to filter DirectoryAccesses to delete.
     * @example
     * // Delete a few DirectoryAccesses
     * const { count } = await prisma.directoryAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DirectoryAccessDeleteManyArgs>(args?: SelectSubset<T, DirectoryAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DirectoryAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DirectoryAccesses
     * const directoryAccess = await prisma.directoryAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DirectoryAccessUpdateManyArgs>(args: SelectSubset<T, DirectoryAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DirectoryAccesses and returns the data updated in the database.
     * @param {DirectoryAccessUpdateManyAndReturnArgs} args - Arguments to update many DirectoryAccesses.
     * @example
     * // Update many DirectoryAccesses
     * const directoryAccess = await prisma.directoryAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DirectoryAccesses and only return the `id`
     * const directoryAccessWithIdOnly = await prisma.directoryAccess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DirectoryAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, DirectoryAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DirectoryAccess.
     * @param {DirectoryAccessUpsertArgs} args - Arguments to update or create a DirectoryAccess.
     * @example
     * // Update or create a DirectoryAccess
     * const directoryAccess = await prisma.directoryAccess.upsert({
     *   create: {
     *     // ... data to create a DirectoryAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DirectoryAccess we want to update
     *   }
     * })
     */
    upsert<T extends DirectoryAccessUpsertArgs>(args: SelectSubset<T, DirectoryAccessUpsertArgs<ExtArgs>>): Prisma__DirectoryAccessClient<$Result.GetResult<Prisma.$DirectoryAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DirectoryAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessCountArgs} args - Arguments to filter DirectoryAccesses to count.
     * @example
     * // Count the number of DirectoryAccesses
     * const count = await prisma.directoryAccess.count({
     *   where: {
     *     // ... the filter for the DirectoryAccesses we want to count
     *   }
     * })
    **/
    count<T extends DirectoryAccessCountArgs>(
      args?: Subset<T, DirectoryAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DirectoryAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DirectoryAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DirectoryAccessAggregateArgs>(args: Subset<T, DirectoryAccessAggregateArgs>): Prisma.PrismaPromise<GetDirectoryAccessAggregateType<T>>

    /**
     * Group by DirectoryAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectoryAccessGroupByArgs} args - Group by arguments.
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
      T extends DirectoryAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DirectoryAccessGroupByArgs['orderBy'] }
        : { orderBy?: DirectoryAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DirectoryAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDirectoryAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DirectoryAccess model
   */
  readonly fields: DirectoryAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DirectoryAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DirectoryAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    directory<T extends DirectoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DirectoryDefaultArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DirectoryAccess model
   */
  interface DirectoryAccessFieldRefs {
    readonly id: FieldRef<"DirectoryAccess", 'String'>
    readonly directoryId: FieldRef<"DirectoryAccess", 'String'>
    readonly groupId: FieldRef<"DirectoryAccess", 'String'>
    readonly permission: FieldRef<"DirectoryAccess", 'Permission'>
    readonly createdAt: FieldRef<"DirectoryAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DirectoryAccess findUnique
   */
  export type DirectoryAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter, which DirectoryAccess to fetch.
     */
    where: DirectoryAccessWhereUniqueInput
  }

  /**
   * DirectoryAccess findUniqueOrThrow
   */
  export type DirectoryAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter, which DirectoryAccess to fetch.
     */
    where: DirectoryAccessWhereUniqueInput
  }

  /**
   * DirectoryAccess findFirst
   */
  export type DirectoryAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter, which DirectoryAccess to fetch.
     */
    where?: DirectoryAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DirectoryAccesses to fetch.
     */
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DirectoryAccesses.
     */
    cursor?: DirectoryAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DirectoryAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DirectoryAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DirectoryAccesses.
     */
    distinct?: DirectoryAccessScalarFieldEnum | DirectoryAccessScalarFieldEnum[]
  }

  /**
   * DirectoryAccess findFirstOrThrow
   */
  export type DirectoryAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter, which DirectoryAccess to fetch.
     */
    where?: DirectoryAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DirectoryAccesses to fetch.
     */
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DirectoryAccesses.
     */
    cursor?: DirectoryAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DirectoryAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DirectoryAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DirectoryAccesses.
     */
    distinct?: DirectoryAccessScalarFieldEnum | DirectoryAccessScalarFieldEnum[]
  }

  /**
   * DirectoryAccess findMany
   */
  export type DirectoryAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter, which DirectoryAccesses to fetch.
     */
    where?: DirectoryAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DirectoryAccesses to fetch.
     */
    orderBy?: DirectoryAccessOrderByWithRelationInput | DirectoryAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DirectoryAccesses.
     */
    cursor?: DirectoryAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DirectoryAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DirectoryAccesses.
     */
    skip?: number
    distinct?: DirectoryAccessScalarFieldEnum | DirectoryAccessScalarFieldEnum[]
  }

  /**
   * DirectoryAccess create
   */
  export type DirectoryAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a DirectoryAccess.
     */
    data: XOR<DirectoryAccessCreateInput, DirectoryAccessUncheckedCreateInput>
  }

  /**
   * DirectoryAccess createMany
   */
  export type DirectoryAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DirectoryAccesses.
     */
    data: DirectoryAccessCreateManyInput | DirectoryAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DirectoryAccess createManyAndReturn
   */
  export type DirectoryAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * The data used to create many DirectoryAccesses.
     */
    data: DirectoryAccessCreateManyInput | DirectoryAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DirectoryAccess update
   */
  export type DirectoryAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a DirectoryAccess.
     */
    data: XOR<DirectoryAccessUpdateInput, DirectoryAccessUncheckedUpdateInput>
    /**
     * Choose, which DirectoryAccess to update.
     */
    where: DirectoryAccessWhereUniqueInput
  }

  /**
   * DirectoryAccess updateMany
   */
  export type DirectoryAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DirectoryAccesses.
     */
    data: XOR<DirectoryAccessUpdateManyMutationInput, DirectoryAccessUncheckedUpdateManyInput>
    /**
     * Filter which DirectoryAccesses to update
     */
    where?: DirectoryAccessWhereInput
    /**
     * Limit how many DirectoryAccesses to update.
     */
    limit?: number
  }

  /**
   * DirectoryAccess updateManyAndReturn
   */
  export type DirectoryAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * The data used to update DirectoryAccesses.
     */
    data: XOR<DirectoryAccessUpdateManyMutationInput, DirectoryAccessUncheckedUpdateManyInput>
    /**
     * Filter which DirectoryAccesses to update
     */
    where?: DirectoryAccessWhereInput
    /**
     * Limit how many DirectoryAccesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DirectoryAccess upsert
   */
  export type DirectoryAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the DirectoryAccess to update in case it exists.
     */
    where: DirectoryAccessWhereUniqueInput
    /**
     * In case the DirectoryAccess found by the `where` argument doesn't exist, create a new DirectoryAccess with this data.
     */
    create: XOR<DirectoryAccessCreateInput, DirectoryAccessUncheckedCreateInput>
    /**
     * In case the DirectoryAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DirectoryAccessUpdateInput, DirectoryAccessUncheckedUpdateInput>
  }

  /**
   * DirectoryAccess delete
   */
  export type DirectoryAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
    /**
     * Filter which DirectoryAccess to delete.
     */
    where: DirectoryAccessWhereUniqueInput
  }

  /**
   * DirectoryAccess deleteMany
   */
  export type DirectoryAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DirectoryAccesses to delete
     */
    where?: DirectoryAccessWhereInput
    /**
     * Limit how many DirectoryAccesses to delete.
     */
    limit?: number
  }

  /**
   * DirectoryAccess without action
   */
  export type DirectoryAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectoryAccess
     */
    select?: DirectoryAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DirectoryAccess
     */
    omit?: DirectoryAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectoryAccessInclude<ExtArgs> | null
  }


  /**
   * Model Contract
   */

  export type AggregateContract = {
    _count: ContractCountAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  export type ContractMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: $Enums.ContractStatus | null
    contractNumber: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    directoryId: string | null
    categoryId: string | null
  }

  export type ContractMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: $Enums.ContractStatus | null
    contractNumber: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: string | null
    directoryId: string | null
    categoryId: string | null
  }

  export type ContractCountAggregateOutputType = {
    id: number
    title: number
    content: number
    status: number
    contractNumber: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    ownerId: number
    directoryId: number
    categoryId: number
    _all: number
  }


  export type ContractMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    contractNumber?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    directoryId?: true
    categoryId?: true
  }

  export type ContractMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    contractNumber?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    directoryId?: true
    categoryId?: true
  }

  export type ContractCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    contractNumber?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    directoryId?: true
    categoryId?: true
    _all?: true
  }

  export type ContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contract to aggregate.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contracts
    **/
    _count?: true | ContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractMaxAggregateInputType
  }

  export type GetContractAggregateType<T extends ContractAggregateArgs> = {
        [P in keyof T & keyof AggregateContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContract[P]>
      : GetScalarType<T[P], AggregateContract[P]>
  }




  export type ContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithAggregationInput | ContractOrderByWithAggregationInput[]
    by: ContractScalarFieldEnum[] | ContractScalarFieldEnum
    having?: ContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractCountAggregateInputType | true
    _min?: ContractMinAggregateInputType
    _max?: ContractMaxAggregateInputType
  }

  export type ContractGroupByOutputType = {
    id: string
    title: string
    content: string
    status: $Enums.ContractStatus
    contractNumber: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    ownerId: string
    directoryId: string
    categoryId: string | null
    _count: ContractCountAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  type GetContractGroupByPayload<T extends ContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractGroupByOutputType[P]>
            : GetScalarType<T[P], ContractGroupByOutputType[P]>
        }
      >
    >


  export type ContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    contractNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    directoryId?: boolean
    categoryId?: boolean
    versions?: boolean | Contract$versionsArgs<ExtArgs>
    docuSignEnvelopes?: boolean | Contract$docuSignEnvelopesArgs<ExtArgs>
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ContractCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    contractNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    directoryId?: boolean
    categoryId?: boolean
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    contractNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    directoryId?: boolean
    categoryId?: boolean
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    contractNumber?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownerId?: boolean
    directoryId?: boolean
    categoryId?: boolean
  }

  export type ContractOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "status" | "contractNumber" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "ownerId" | "directoryId" | "categoryId", ExtArgs["result"]["contract"]>
  export type ContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | Contract$versionsArgs<ExtArgs>
    docuSignEnvelopes?: boolean | Contract$docuSignEnvelopesArgs<ExtArgs>
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | ContractCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContractIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Contract$categoryArgs<ExtArgs>
    directory?: boolean | DirectoryDefaultArgs<ExtArgs>
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contract"
    objects: {
      versions: Prisma.$ContractVersionPayload<ExtArgs>[]
      docuSignEnvelopes: Prisma.$DocuSignEnvelopePayload<ExtArgs>[]
      category: Prisma.$CategoryPayload<ExtArgs> | null
      directory: Prisma.$DirectoryPayload<ExtArgs>
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      status: $Enums.ContractStatus
      contractNumber: string | null
      startDate: Date | null
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
      ownerId: string
      directoryId: string
      categoryId: string | null
    }, ExtArgs["result"]["contract"]>
    composites: {}
  }

  type ContractGetPayload<S extends boolean | null | undefined | ContractDefaultArgs> = $Result.GetResult<Prisma.$ContractPayload, S>

  type ContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractCountAggregateInputType | true
    }

  export interface ContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contract'], meta: { name: 'Contract' } }
    /**
     * Find zero or one Contract that matches the filter.
     * @param {ContractFindUniqueArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractFindUniqueArgs>(args: SelectSubset<T, ContractFindUniqueArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contract that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractFindUniqueOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractFindFirstArgs>(args?: SelectSubset<T, ContractFindFirstArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contracts
     * const contracts = await prisma.contract.findMany()
     * 
     * // Get first 10 Contracts
     * const contracts = await prisma.contract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractWithIdOnly = await prisma.contract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractFindManyArgs>(args?: SelectSubset<T, ContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contract.
     * @param {ContractCreateArgs} args - Arguments to create a Contract.
     * @example
     * // Create one Contract
     * const Contract = await prisma.contract.create({
     *   data: {
     *     // ... data to create a Contract
     *   }
     * })
     * 
     */
    create<T extends ContractCreateArgs>(args: SelectSubset<T, ContractCreateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contracts.
     * @param {ContractCreateManyArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractCreateManyArgs>(args?: SelectSubset<T, ContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contracts and returns the data saved in the database.
     * @param {ContractCreateManyAndReturnArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contract.
     * @param {ContractDeleteArgs} args - Arguments to delete one Contract.
     * @example
     * // Delete one Contract
     * const Contract = await prisma.contract.delete({
     *   where: {
     *     // ... filter to delete one Contract
     *   }
     * })
     * 
     */
    delete<T extends ContractDeleteArgs>(args: SelectSubset<T, ContractDeleteArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contract.
     * @param {ContractUpdateArgs} args - Arguments to update one Contract.
     * @example
     * // Update one Contract
     * const contract = await prisma.contract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractUpdateArgs>(args: SelectSubset<T, ContractUpdateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contracts.
     * @param {ContractDeleteManyArgs} args - Arguments to filter Contracts to delete.
     * @example
     * // Delete a few Contracts
     * const { count } = await prisma.contract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractDeleteManyArgs>(args?: SelectSubset<T, ContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractUpdateManyArgs>(args: SelectSubset<T, ContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts and returns the data updated in the database.
     * @param {ContractUpdateManyAndReturnArgs} args - Arguments to update many Contracts.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContractUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contract.
     * @param {ContractUpsertArgs} args - Arguments to update or create a Contract.
     * @example
     * // Update or create a Contract
     * const contract = await prisma.contract.upsert({
     *   create: {
     *     // ... data to create a Contract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contract we want to update
     *   }
     * })
     */
    upsert<T extends ContractUpsertArgs>(args: SelectSubset<T, ContractUpsertArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractCountArgs} args - Arguments to filter Contracts to count.
     * @example
     * // Count the number of Contracts
     * const count = await prisma.contract.count({
     *   where: {
     *     // ... the filter for the Contracts we want to count
     *   }
     * })
    **/
    count<T extends ContractCountArgs>(
      args?: Subset<T, ContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractAggregateArgs>(args: Subset<T, ContractAggregateArgs>): Prisma.PrismaPromise<GetContractAggregateType<T>>

    /**
     * Group by Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractGroupByArgs} args - Group by arguments.
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
      T extends ContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractGroupByArgs['orderBy'] }
        : { orderBy?: ContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contract model
   */
  readonly fields: ContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    versions<T extends Contract$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Contract$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    docuSignEnvelopes<T extends Contract$docuSignEnvelopesArgs<ExtArgs> = {}>(args?: Subset<T, Contract$docuSignEnvelopesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    category<T extends Contract$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Contract$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    directory<T extends DirectoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DirectoryDefaultArgs<ExtArgs>>): Prisma__DirectoryClient<$Result.GetResult<Prisma.$DirectoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Contract model
   */
  interface ContractFieldRefs {
    readonly id: FieldRef<"Contract", 'String'>
    readonly title: FieldRef<"Contract", 'String'>
    readonly content: FieldRef<"Contract", 'String'>
    readonly status: FieldRef<"Contract", 'ContractStatus'>
    readonly contractNumber: FieldRef<"Contract", 'String'>
    readonly startDate: FieldRef<"Contract", 'DateTime'>
    readonly endDate: FieldRef<"Contract", 'DateTime'>
    readonly createdAt: FieldRef<"Contract", 'DateTime'>
    readonly updatedAt: FieldRef<"Contract", 'DateTime'>
    readonly ownerId: FieldRef<"Contract", 'String'>
    readonly directoryId: FieldRef<"Contract", 'String'>
    readonly categoryId: FieldRef<"Contract", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contract findUnique
   */
  export type ContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findUniqueOrThrow
   */
  export type ContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findFirst
   */
  export type ContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findFirstOrThrow
   */
  export type ContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findMany
   */
  export type ContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contracts to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract create
   */
  export type ContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to create a Contract.
     */
    data: XOR<ContractCreateInput, ContractUncheckedCreateInput>
  }

  /**
   * Contract createMany
   */
  export type ContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contract createManyAndReturn
   */
  export type ContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contract update
   */
  export type ContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to update a Contract.
     */
    data: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
    /**
     * Choose, which Contract to update.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract updateMany
   */
  export type ContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
  }

  /**
   * Contract updateManyAndReturn
   */
  export type ContractUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contract upsert
   */
  export type ContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The filter to search for the Contract to update in case it exists.
     */
    where: ContractWhereUniqueInput
    /**
     * In case the Contract found by the `where` argument doesn't exist, create a new Contract with this data.
     */
    create: XOR<ContractCreateInput, ContractUncheckedCreateInput>
    /**
     * In case the Contract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
  }

  /**
   * Contract delete
   */
  export type ContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter which Contract to delete.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract deleteMany
   */
  export type ContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contracts to delete
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to delete.
     */
    limit?: number
  }

  /**
   * Contract.versions
   */
  export type Contract$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    where?: ContractVersionWhereInput
    orderBy?: ContractVersionOrderByWithRelationInput | ContractVersionOrderByWithRelationInput[]
    cursor?: ContractVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractVersionScalarFieldEnum | ContractVersionScalarFieldEnum[]
  }

  /**
   * Contract.docuSignEnvelopes
   */
  export type Contract$docuSignEnvelopesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    where?: DocuSignEnvelopeWhereInput
    orderBy?: DocuSignEnvelopeOrderByWithRelationInput | DocuSignEnvelopeOrderByWithRelationInput[]
    cursor?: DocuSignEnvelopeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocuSignEnvelopeScalarFieldEnum | DocuSignEnvelopeScalarFieldEnum[]
  }

  /**
   * Contract.category
   */
  export type Contract$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Contract without action
   */
  export type ContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    color: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    color: string | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contracts?: boolean | Category$contractsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contracts?: boolean | Category$contractsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      contracts: Prisma.$ContractPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contracts<T extends Category$contractsArgs<ExtArgs> = {}>(args?: Subset<T, Category$contractsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.contracts
   */
  export type Category$contractsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    cursor?: ContractWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model ContractVersion
   */

  export type AggregateContractVersion = {
    _count: ContractVersionCountAggregateOutputType | null
    _avg: ContractVersionAvgAggregateOutputType | null
    _sum: ContractVersionSumAggregateOutputType | null
    _min: ContractVersionMinAggregateOutputType | null
    _max: ContractVersionMaxAggregateOutputType | null
  }

  export type ContractVersionAvgAggregateOutputType = {
    version: number | null
  }

  export type ContractVersionSumAggregateOutputType = {
    version: number | null
  }

  export type ContractVersionMinAggregateOutputType = {
    id: string | null
    version: number | null
    title: string | null
    content: string | null
    changeNote: string | null
    createdAt: Date | null
    contractId: string | null
  }

  export type ContractVersionMaxAggregateOutputType = {
    id: string | null
    version: number | null
    title: string | null
    content: string | null
    changeNote: string | null
    createdAt: Date | null
    contractId: string | null
  }

  export type ContractVersionCountAggregateOutputType = {
    id: number
    version: number
    title: number
    content: number
    changeNote: number
    createdAt: number
    contractId: number
    _all: number
  }


  export type ContractVersionAvgAggregateInputType = {
    version?: true
  }

  export type ContractVersionSumAggregateInputType = {
    version?: true
  }

  export type ContractVersionMinAggregateInputType = {
    id?: true
    version?: true
    title?: true
    content?: true
    changeNote?: true
    createdAt?: true
    contractId?: true
  }

  export type ContractVersionMaxAggregateInputType = {
    id?: true
    version?: true
    title?: true
    content?: true
    changeNote?: true
    createdAt?: true
    contractId?: true
  }

  export type ContractVersionCountAggregateInputType = {
    id?: true
    version?: true
    title?: true
    content?: true
    changeNote?: true
    createdAt?: true
    contractId?: true
    _all?: true
  }

  export type ContractVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractVersion to aggregate.
     */
    where?: ContractVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractVersions to fetch.
     */
    orderBy?: ContractVersionOrderByWithRelationInput | ContractVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractVersions
    **/
    _count?: true | ContractVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractVersionMaxAggregateInputType
  }

  export type GetContractVersionAggregateType<T extends ContractVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateContractVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractVersion[P]>
      : GetScalarType<T[P], AggregateContractVersion[P]>
  }




  export type ContractVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractVersionWhereInput
    orderBy?: ContractVersionOrderByWithAggregationInput | ContractVersionOrderByWithAggregationInput[]
    by: ContractVersionScalarFieldEnum[] | ContractVersionScalarFieldEnum
    having?: ContractVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractVersionCountAggregateInputType | true
    _avg?: ContractVersionAvgAggregateInputType
    _sum?: ContractVersionSumAggregateInputType
    _min?: ContractVersionMinAggregateInputType
    _max?: ContractVersionMaxAggregateInputType
  }

  export type ContractVersionGroupByOutputType = {
    id: string
    version: number
    title: string
    content: string
    changeNote: string | null
    createdAt: Date
    contractId: string
    _count: ContractVersionCountAggregateOutputType | null
    _avg: ContractVersionAvgAggregateOutputType | null
    _sum: ContractVersionSumAggregateOutputType | null
    _min: ContractVersionMinAggregateOutputType | null
    _max: ContractVersionMaxAggregateOutputType | null
  }

  type GetContractVersionGroupByPayload<T extends ContractVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractVersionGroupByOutputType[P]>
            : GetScalarType<T[P], ContractVersionGroupByOutputType[P]>
        }
      >
    >


  export type ContractVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    changeNote?: boolean
    createdAt?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractVersion"]>

  export type ContractVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    changeNote?: boolean
    createdAt?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractVersion"]>

  export type ContractVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    changeNote?: boolean
    createdAt?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractVersion"]>

  export type ContractVersionSelectScalar = {
    id?: boolean
    version?: boolean
    title?: boolean
    content?: boolean
    changeNote?: boolean
    createdAt?: boolean
    contractId?: boolean
  }

  export type ContractVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "version" | "title" | "content" | "changeNote" | "createdAt" | "contractId", ExtArgs["result"]["contractVersion"]>
  export type ContractVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type ContractVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type ContractVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $ContractVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractVersion"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      version: number
      title: string
      content: string
      changeNote: string | null
      createdAt: Date
      contractId: string
    }, ExtArgs["result"]["contractVersion"]>
    composites: {}
  }

  type ContractVersionGetPayload<S extends boolean | null | undefined | ContractVersionDefaultArgs> = $Result.GetResult<Prisma.$ContractVersionPayload, S>

  type ContractVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractVersionCountAggregateInputType | true
    }

  export interface ContractVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractVersion'], meta: { name: 'ContractVersion' } }
    /**
     * Find zero or one ContractVersion that matches the filter.
     * @param {ContractVersionFindUniqueArgs} args - Arguments to find a ContractVersion
     * @example
     * // Get one ContractVersion
     * const contractVersion = await prisma.contractVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractVersionFindUniqueArgs>(args: SelectSubset<T, ContractVersionFindUniqueArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContractVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractVersionFindUniqueOrThrowArgs} args - Arguments to find a ContractVersion
     * @example
     * // Get one ContractVersion
     * const contractVersion = await prisma.contractVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionFindFirstArgs} args - Arguments to find a ContractVersion
     * @example
     * // Get one ContractVersion
     * const contractVersion = await prisma.contractVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractVersionFindFirstArgs>(args?: SelectSubset<T, ContractVersionFindFirstArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionFindFirstOrThrowArgs} args - Arguments to find a ContractVersion
     * @example
     * // Get one ContractVersion
     * const contractVersion = await prisma.contractVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContractVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractVersions
     * const contractVersions = await prisma.contractVersion.findMany()
     * 
     * // Get first 10 ContractVersions
     * const contractVersions = await prisma.contractVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractVersionWithIdOnly = await prisma.contractVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractVersionFindManyArgs>(args?: SelectSubset<T, ContractVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContractVersion.
     * @param {ContractVersionCreateArgs} args - Arguments to create a ContractVersion.
     * @example
     * // Create one ContractVersion
     * const ContractVersion = await prisma.contractVersion.create({
     *   data: {
     *     // ... data to create a ContractVersion
     *   }
     * })
     * 
     */
    create<T extends ContractVersionCreateArgs>(args: SelectSubset<T, ContractVersionCreateArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContractVersions.
     * @param {ContractVersionCreateManyArgs} args - Arguments to create many ContractVersions.
     * @example
     * // Create many ContractVersions
     * const contractVersion = await prisma.contractVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractVersionCreateManyArgs>(args?: SelectSubset<T, ContractVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractVersions and returns the data saved in the database.
     * @param {ContractVersionCreateManyAndReturnArgs} args - Arguments to create many ContractVersions.
     * @example
     * // Create many ContractVersions
     * const contractVersion = await prisma.contractVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractVersions and only return the `id`
     * const contractVersionWithIdOnly = await prisma.contractVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContractVersion.
     * @param {ContractVersionDeleteArgs} args - Arguments to delete one ContractVersion.
     * @example
     * // Delete one ContractVersion
     * const ContractVersion = await prisma.contractVersion.delete({
     *   where: {
     *     // ... filter to delete one ContractVersion
     *   }
     * })
     * 
     */
    delete<T extends ContractVersionDeleteArgs>(args: SelectSubset<T, ContractVersionDeleteArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContractVersion.
     * @param {ContractVersionUpdateArgs} args - Arguments to update one ContractVersion.
     * @example
     * // Update one ContractVersion
     * const contractVersion = await prisma.contractVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractVersionUpdateArgs>(args: SelectSubset<T, ContractVersionUpdateArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContractVersions.
     * @param {ContractVersionDeleteManyArgs} args - Arguments to filter ContractVersions to delete.
     * @example
     * // Delete a few ContractVersions
     * const { count } = await prisma.contractVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractVersionDeleteManyArgs>(args?: SelectSubset<T, ContractVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractVersions
     * const contractVersion = await prisma.contractVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractVersionUpdateManyArgs>(args: SelectSubset<T, ContractVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractVersions and returns the data updated in the database.
     * @param {ContractVersionUpdateManyAndReturnArgs} args - Arguments to update many ContractVersions.
     * @example
     * // Update many ContractVersions
     * const contractVersion = await prisma.contractVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContractVersions and only return the `id`
     * const contractVersionWithIdOnly = await prisma.contractVersion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContractVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContractVersion.
     * @param {ContractVersionUpsertArgs} args - Arguments to update or create a ContractVersion.
     * @example
     * // Update or create a ContractVersion
     * const contractVersion = await prisma.contractVersion.upsert({
     *   create: {
     *     // ... data to create a ContractVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractVersion we want to update
     *   }
     * })
     */
    upsert<T extends ContractVersionUpsertArgs>(args: SelectSubset<T, ContractVersionUpsertArgs<ExtArgs>>): Prisma__ContractVersionClient<$Result.GetResult<Prisma.$ContractVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContractVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionCountArgs} args - Arguments to filter ContractVersions to count.
     * @example
     * // Count the number of ContractVersions
     * const count = await prisma.contractVersion.count({
     *   where: {
     *     // ... the filter for the ContractVersions we want to count
     *   }
     * })
    **/
    count<T extends ContractVersionCountArgs>(
      args?: Subset<T, ContractVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractVersionAggregateArgs>(args: Subset<T, ContractVersionAggregateArgs>): Prisma.PrismaPromise<GetContractVersionAggregateType<T>>

    /**
     * Group by ContractVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractVersionGroupByArgs} args - Group by arguments.
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
      T extends ContractVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractVersionGroupByArgs['orderBy'] }
        : { orderBy?: ContractVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractVersion model
   */
  readonly fields: ContractVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ContractVersion model
   */
  interface ContractVersionFieldRefs {
    readonly id: FieldRef<"ContractVersion", 'String'>
    readonly version: FieldRef<"ContractVersion", 'Int'>
    readonly title: FieldRef<"ContractVersion", 'String'>
    readonly content: FieldRef<"ContractVersion", 'String'>
    readonly changeNote: FieldRef<"ContractVersion", 'String'>
    readonly createdAt: FieldRef<"ContractVersion", 'DateTime'>
    readonly contractId: FieldRef<"ContractVersion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ContractVersion findUnique
   */
  export type ContractVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter, which ContractVersion to fetch.
     */
    where: ContractVersionWhereUniqueInput
  }

  /**
   * ContractVersion findUniqueOrThrow
   */
  export type ContractVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter, which ContractVersion to fetch.
     */
    where: ContractVersionWhereUniqueInput
  }

  /**
   * ContractVersion findFirst
   */
  export type ContractVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter, which ContractVersion to fetch.
     */
    where?: ContractVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractVersions to fetch.
     */
    orderBy?: ContractVersionOrderByWithRelationInput | ContractVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractVersions.
     */
    cursor?: ContractVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractVersions.
     */
    distinct?: ContractVersionScalarFieldEnum | ContractVersionScalarFieldEnum[]
  }

  /**
   * ContractVersion findFirstOrThrow
   */
  export type ContractVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter, which ContractVersion to fetch.
     */
    where?: ContractVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractVersions to fetch.
     */
    orderBy?: ContractVersionOrderByWithRelationInput | ContractVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractVersions.
     */
    cursor?: ContractVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractVersions.
     */
    distinct?: ContractVersionScalarFieldEnum | ContractVersionScalarFieldEnum[]
  }

  /**
   * ContractVersion findMany
   */
  export type ContractVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter, which ContractVersions to fetch.
     */
    where?: ContractVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractVersions to fetch.
     */
    orderBy?: ContractVersionOrderByWithRelationInput | ContractVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractVersions.
     */
    cursor?: ContractVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractVersions.
     */
    skip?: number
    distinct?: ContractVersionScalarFieldEnum | ContractVersionScalarFieldEnum[]
  }

  /**
   * ContractVersion create
   */
  export type ContractVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a ContractVersion.
     */
    data: XOR<ContractVersionCreateInput, ContractVersionUncheckedCreateInput>
  }

  /**
   * ContractVersion createMany
   */
  export type ContractVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractVersions.
     */
    data: ContractVersionCreateManyInput | ContractVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractVersion createManyAndReturn
   */
  export type ContractVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * The data used to create many ContractVersions.
     */
    data: ContractVersionCreateManyInput | ContractVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractVersion update
   */
  export type ContractVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a ContractVersion.
     */
    data: XOR<ContractVersionUpdateInput, ContractVersionUncheckedUpdateInput>
    /**
     * Choose, which ContractVersion to update.
     */
    where: ContractVersionWhereUniqueInput
  }

  /**
   * ContractVersion updateMany
   */
  export type ContractVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractVersions.
     */
    data: XOR<ContractVersionUpdateManyMutationInput, ContractVersionUncheckedUpdateManyInput>
    /**
     * Filter which ContractVersions to update
     */
    where?: ContractVersionWhereInput
    /**
     * Limit how many ContractVersions to update.
     */
    limit?: number
  }

  /**
   * ContractVersion updateManyAndReturn
   */
  export type ContractVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * The data used to update ContractVersions.
     */
    data: XOR<ContractVersionUpdateManyMutationInput, ContractVersionUncheckedUpdateManyInput>
    /**
     * Filter which ContractVersions to update
     */
    where?: ContractVersionWhereInput
    /**
     * Limit how many ContractVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractVersion upsert
   */
  export type ContractVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the ContractVersion to update in case it exists.
     */
    where: ContractVersionWhereUniqueInput
    /**
     * In case the ContractVersion found by the `where` argument doesn't exist, create a new ContractVersion with this data.
     */
    create: XOR<ContractVersionCreateInput, ContractVersionUncheckedCreateInput>
    /**
     * In case the ContractVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractVersionUpdateInput, ContractVersionUncheckedUpdateInput>
  }

  /**
   * ContractVersion delete
   */
  export type ContractVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
    /**
     * Filter which ContractVersion to delete.
     */
    where: ContractVersionWhereUniqueInput
  }

  /**
   * ContractVersion deleteMany
   */
  export type ContractVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractVersions to delete
     */
    where?: ContractVersionWhereInput
    /**
     * Limit how many ContractVersions to delete.
     */
    limit?: number
  }

  /**
   * ContractVersion without action
   */
  export type ContractVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractVersion
     */
    select?: ContractVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractVersion
     */
    omit?: ContractVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractVersionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model DocuSignEnvelope
   */

  export type AggregateDocuSignEnvelope = {
    _count: DocuSignEnvelopeCountAggregateOutputType | null
    _min: DocuSignEnvelopeMinAggregateOutputType | null
    _max: DocuSignEnvelopeMaxAggregateOutputType | null
  }

  export type DocuSignEnvelopeMinAggregateOutputType = {
    id: string | null
    envelopeId: string | null
    contractId: string | null
    status: $Enums.DocuSignEnvelopeStatus | null
    templateId: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type DocuSignEnvelopeMaxAggregateOutputType = {
    id: string | null
    envelopeId: string | null
    contractId: string | null
    status: $Enums.DocuSignEnvelopeStatus | null
    templateId: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type DocuSignEnvelopeCountAggregateOutputType = {
    id: number
    envelopeId: number
    contractId: number
    status: number
    templateId: number
    subject: number
    message: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type DocuSignEnvelopeMinAggregateInputType = {
    id?: true
    envelopeId?: true
    contractId?: true
    status?: true
    templateId?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type DocuSignEnvelopeMaxAggregateInputType = {
    id?: true
    envelopeId?: true
    contractId?: true
    status?: true
    templateId?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type DocuSignEnvelopeCountAggregateInputType = {
    id?: true
    envelopeId?: true
    contractId?: true
    status?: true
    templateId?: true
    subject?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type DocuSignEnvelopeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocuSignEnvelope to aggregate.
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignEnvelopes to fetch.
     */
    orderBy?: DocuSignEnvelopeOrderByWithRelationInput | DocuSignEnvelopeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocuSignEnvelopeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignEnvelopes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignEnvelopes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocuSignEnvelopes
    **/
    _count?: true | DocuSignEnvelopeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocuSignEnvelopeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocuSignEnvelopeMaxAggregateInputType
  }

  export type GetDocuSignEnvelopeAggregateType<T extends DocuSignEnvelopeAggregateArgs> = {
        [P in keyof T & keyof AggregateDocuSignEnvelope]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocuSignEnvelope[P]>
      : GetScalarType<T[P], AggregateDocuSignEnvelope[P]>
  }




  export type DocuSignEnvelopeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocuSignEnvelopeWhereInput
    orderBy?: DocuSignEnvelopeOrderByWithAggregationInput | DocuSignEnvelopeOrderByWithAggregationInput[]
    by: DocuSignEnvelopeScalarFieldEnum[] | DocuSignEnvelopeScalarFieldEnum
    having?: DocuSignEnvelopeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocuSignEnvelopeCountAggregateInputType | true
    _min?: DocuSignEnvelopeMinAggregateInputType
    _max?: DocuSignEnvelopeMaxAggregateInputType
  }

  export type DocuSignEnvelopeGroupByOutputType = {
    id: string
    envelopeId: string
    contractId: string
    status: $Enums.DocuSignEnvelopeStatus
    templateId: string | null
    subject: string
    message: string | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: DocuSignEnvelopeCountAggregateOutputType | null
    _min: DocuSignEnvelopeMinAggregateOutputType | null
    _max: DocuSignEnvelopeMaxAggregateOutputType | null
  }

  type GetDocuSignEnvelopeGroupByPayload<T extends DocuSignEnvelopeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocuSignEnvelopeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocuSignEnvelopeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocuSignEnvelopeGroupByOutputType[P]>
            : GetScalarType<T[P], DocuSignEnvelopeGroupByOutputType[P]>
        }
      >
    >


  export type DocuSignEnvelopeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    contractId?: boolean
    status?: boolean
    templateId?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
    signers?: boolean | DocuSignEnvelope$signersArgs<ExtArgs>
    _count?: boolean | DocuSignEnvelopeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignEnvelope"]>

  export type DocuSignEnvelopeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    contractId?: boolean
    status?: boolean
    templateId?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignEnvelope"]>

  export type DocuSignEnvelopeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    contractId?: boolean
    status?: boolean
    templateId?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignEnvelope"]>

  export type DocuSignEnvelopeSelectScalar = {
    id?: boolean
    envelopeId?: boolean
    contractId?: boolean
    status?: boolean
    templateId?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type DocuSignEnvelopeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "envelopeId" | "contractId" | "status" | "templateId" | "subject" | "message" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["docuSignEnvelope"]>
  export type DocuSignEnvelopeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
    signers?: boolean | DocuSignEnvelope$signersArgs<ExtArgs>
    _count?: boolean | DocuSignEnvelopeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocuSignEnvelopeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type DocuSignEnvelopeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $DocuSignEnvelopePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocuSignEnvelope"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
      signers: Prisma.$DocuSignSignerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      envelopeId: string
      contractId: string
      status: $Enums.DocuSignEnvelopeStatus
      templateId: string | null
      subject: string
      message: string | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["docuSignEnvelope"]>
    composites: {}
  }

  type DocuSignEnvelopeGetPayload<S extends boolean | null | undefined | DocuSignEnvelopeDefaultArgs> = $Result.GetResult<Prisma.$DocuSignEnvelopePayload, S>

  type DocuSignEnvelopeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocuSignEnvelopeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocuSignEnvelopeCountAggregateInputType | true
    }

  export interface DocuSignEnvelopeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocuSignEnvelope'], meta: { name: 'DocuSignEnvelope' } }
    /**
     * Find zero or one DocuSignEnvelope that matches the filter.
     * @param {DocuSignEnvelopeFindUniqueArgs} args - Arguments to find a DocuSignEnvelope
     * @example
     * // Get one DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocuSignEnvelopeFindUniqueArgs>(args: SelectSubset<T, DocuSignEnvelopeFindUniqueArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocuSignEnvelope that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocuSignEnvelopeFindUniqueOrThrowArgs} args - Arguments to find a DocuSignEnvelope
     * @example
     * // Get one DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocuSignEnvelopeFindUniqueOrThrowArgs>(args: SelectSubset<T, DocuSignEnvelopeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocuSignEnvelope that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeFindFirstArgs} args - Arguments to find a DocuSignEnvelope
     * @example
     * // Get one DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocuSignEnvelopeFindFirstArgs>(args?: SelectSubset<T, DocuSignEnvelopeFindFirstArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocuSignEnvelope that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeFindFirstOrThrowArgs} args - Arguments to find a DocuSignEnvelope
     * @example
     * // Get one DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocuSignEnvelopeFindFirstOrThrowArgs>(args?: SelectSubset<T, DocuSignEnvelopeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocuSignEnvelopes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocuSignEnvelopes
     * const docuSignEnvelopes = await prisma.docuSignEnvelope.findMany()
     * 
     * // Get first 10 DocuSignEnvelopes
     * const docuSignEnvelopes = await prisma.docuSignEnvelope.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const docuSignEnvelopeWithIdOnly = await prisma.docuSignEnvelope.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocuSignEnvelopeFindManyArgs>(args?: SelectSubset<T, DocuSignEnvelopeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocuSignEnvelope.
     * @param {DocuSignEnvelopeCreateArgs} args - Arguments to create a DocuSignEnvelope.
     * @example
     * // Create one DocuSignEnvelope
     * const DocuSignEnvelope = await prisma.docuSignEnvelope.create({
     *   data: {
     *     // ... data to create a DocuSignEnvelope
     *   }
     * })
     * 
     */
    create<T extends DocuSignEnvelopeCreateArgs>(args: SelectSubset<T, DocuSignEnvelopeCreateArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocuSignEnvelopes.
     * @param {DocuSignEnvelopeCreateManyArgs} args - Arguments to create many DocuSignEnvelopes.
     * @example
     * // Create many DocuSignEnvelopes
     * const docuSignEnvelope = await prisma.docuSignEnvelope.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocuSignEnvelopeCreateManyArgs>(args?: SelectSubset<T, DocuSignEnvelopeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocuSignEnvelopes and returns the data saved in the database.
     * @param {DocuSignEnvelopeCreateManyAndReturnArgs} args - Arguments to create many DocuSignEnvelopes.
     * @example
     * // Create many DocuSignEnvelopes
     * const docuSignEnvelope = await prisma.docuSignEnvelope.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocuSignEnvelopes and only return the `id`
     * const docuSignEnvelopeWithIdOnly = await prisma.docuSignEnvelope.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocuSignEnvelopeCreateManyAndReturnArgs>(args?: SelectSubset<T, DocuSignEnvelopeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocuSignEnvelope.
     * @param {DocuSignEnvelopeDeleteArgs} args - Arguments to delete one DocuSignEnvelope.
     * @example
     * // Delete one DocuSignEnvelope
     * const DocuSignEnvelope = await prisma.docuSignEnvelope.delete({
     *   where: {
     *     // ... filter to delete one DocuSignEnvelope
     *   }
     * })
     * 
     */
    delete<T extends DocuSignEnvelopeDeleteArgs>(args: SelectSubset<T, DocuSignEnvelopeDeleteArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocuSignEnvelope.
     * @param {DocuSignEnvelopeUpdateArgs} args - Arguments to update one DocuSignEnvelope.
     * @example
     * // Update one DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocuSignEnvelopeUpdateArgs>(args: SelectSubset<T, DocuSignEnvelopeUpdateArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocuSignEnvelopes.
     * @param {DocuSignEnvelopeDeleteManyArgs} args - Arguments to filter DocuSignEnvelopes to delete.
     * @example
     * // Delete a few DocuSignEnvelopes
     * const { count } = await prisma.docuSignEnvelope.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocuSignEnvelopeDeleteManyArgs>(args?: SelectSubset<T, DocuSignEnvelopeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocuSignEnvelopes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocuSignEnvelopes
     * const docuSignEnvelope = await prisma.docuSignEnvelope.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocuSignEnvelopeUpdateManyArgs>(args: SelectSubset<T, DocuSignEnvelopeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocuSignEnvelopes and returns the data updated in the database.
     * @param {DocuSignEnvelopeUpdateManyAndReturnArgs} args - Arguments to update many DocuSignEnvelopes.
     * @example
     * // Update many DocuSignEnvelopes
     * const docuSignEnvelope = await prisma.docuSignEnvelope.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocuSignEnvelopes and only return the `id`
     * const docuSignEnvelopeWithIdOnly = await prisma.docuSignEnvelope.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocuSignEnvelopeUpdateManyAndReturnArgs>(args: SelectSubset<T, DocuSignEnvelopeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocuSignEnvelope.
     * @param {DocuSignEnvelopeUpsertArgs} args - Arguments to update or create a DocuSignEnvelope.
     * @example
     * // Update or create a DocuSignEnvelope
     * const docuSignEnvelope = await prisma.docuSignEnvelope.upsert({
     *   create: {
     *     // ... data to create a DocuSignEnvelope
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocuSignEnvelope we want to update
     *   }
     * })
     */
    upsert<T extends DocuSignEnvelopeUpsertArgs>(args: SelectSubset<T, DocuSignEnvelopeUpsertArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocuSignEnvelopes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeCountArgs} args - Arguments to filter DocuSignEnvelopes to count.
     * @example
     * // Count the number of DocuSignEnvelopes
     * const count = await prisma.docuSignEnvelope.count({
     *   where: {
     *     // ... the filter for the DocuSignEnvelopes we want to count
     *   }
     * })
    **/
    count<T extends DocuSignEnvelopeCountArgs>(
      args?: Subset<T, DocuSignEnvelopeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocuSignEnvelopeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocuSignEnvelope.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocuSignEnvelopeAggregateArgs>(args: Subset<T, DocuSignEnvelopeAggregateArgs>): Prisma.PrismaPromise<GetDocuSignEnvelopeAggregateType<T>>

    /**
     * Group by DocuSignEnvelope.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignEnvelopeGroupByArgs} args - Group by arguments.
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
      T extends DocuSignEnvelopeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocuSignEnvelopeGroupByArgs['orderBy'] }
        : { orderBy?: DocuSignEnvelopeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocuSignEnvelopeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocuSignEnvelopeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocuSignEnvelope model
   */
  readonly fields: DocuSignEnvelopeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocuSignEnvelope.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocuSignEnvelopeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    signers<T extends DocuSignEnvelope$signersArgs<ExtArgs> = {}>(args?: Subset<T, DocuSignEnvelope$signersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DocuSignEnvelope model
   */
  interface DocuSignEnvelopeFieldRefs {
    readonly id: FieldRef<"DocuSignEnvelope", 'String'>
    readonly envelopeId: FieldRef<"DocuSignEnvelope", 'String'>
    readonly contractId: FieldRef<"DocuSignEnvelope", 'String'>
    readonly status: FieldRef<"DocuSignEnvelope", 'DocuSignEnvelopeStatus'>
    readonly templateId: FieldRef<"DocuSignEnvelope", 'String'>
    readonly subject: FieldRef<"DocuSignEnvelope", 'String'>
    readonly message: FieldRef<"DocuSignEnvelope", 'String'>
    readonly createdAt: FieldRef<"DocuSignEnvelope", 'DateTime'>
    readonly updatedAt: FieldRef<"DocuSignEnvelope", 'DateTime'>
    readonly completedAt: FieldRef<"DocuSignEnvelope", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocuSignEnvelope findUnique
   */
  export type DocuSignEnvelopeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignEnvelope to fetch.
     */
    where: DocuSignEnvelopeWhereUniqueInput
  }

  /**
   * DocuSignEnvelope findUniqueOrThrow
   */
  export type DocuSignEnvelopeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignEnvelope to fetch.
     */
    where: DocuSignEnvelopeWhereUniqueInput
  }

  /**
   * DocuSignEnvelope findFirst
   */
  export type DocuSignEnvelopeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignEnvelope to fetch.
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignEnvelopes to fetch.
     */
    orderBy?: DocuSignEnvelopeOrderByWithRelationInput | DocuSignEnvelopeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocuSignEnvelopes.
     */
    cursor?: DocuSignEnvelopeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignEnvelopes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignEnvelopes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocuSignEnvelopes.
     */
    distinct?: DocuSignEnvelopeScalarFieldEnum | DocuSignEnvelopeScalarFieldEnum[]
  }

  /**
   * DocuSignEnvelope findFirstOrThrow
   */
  export type DocuSignEnvelopeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignEnvelope to fetch.
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignEnvelopes to fetch.
     */
    orderBy?: DocuSignEnvelopeOrderByWithRelationInput | DocuSignEnvelopeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocuSignEnvelopes.
     */
    cursor?: DocuSignEnvelopeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignEnvelopes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignEnvelopes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocuSignEnvelopes.
     */
    distinct?: DocuSignEnvelopeScalarFieldEnum | DocuSignEnvelopeScalarFieldEnum[]
  }

  /**
   * DocuSignEnvelope findMany
   */
  export type DocuSignEnvelopeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignEnvelopes to fetch.
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignEnvelopes to fetch.
     */
    orderBy?: DocuSignEnvelopeOrderByWithRelationInput | DocuSignEnvelopeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocuSignEnvelopes.
     */
    cursor?: DocuSignEnvelopeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignEnvelopes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignEnvelopes.
     */
    skip?: number
    distinct?: DocuSignEnvelopeScalarFieldEnum | DocuSignEnvelopeScalarFieldEnum[]
  }

  /**
   * DocuSignEnvelope create
   */
  export type DocuSignEnvelopeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * The data needed to create a DocuSignEnvelope.
     */
    data: XOR<DocuSignEnvelopeCreateInput, DocuSignEnvelopeUncheckedCreateInput>
  }

  /**
   * DocuSignEnvelope createMany
   */
  export type DocuSignEnvelopeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocuSignEnvelopes.
     */
    data: DocuSignEnvelopeCreateManyInput | DocuSignEnvelopeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocuSignEnvelope createManyAndReturn
   */
  export type DocuSignEnvelopeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * The data used to create many DocuSignEnvelopes.
     */
    data: DocuSignEnvelopeCreateManyInput | DocuSignEnvelopeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocuSignEnvelope update
   */
  export type DocuSignEnvelopeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * The data needed to update a DocuSignEnvelope.
     */
    data: XOR<DocuSignEnvelopeUpdateInput, DocuSignEnvelopeUncheckedUpdateInput>
    /**
     * Choose, which DocuSignEnvelope to update.
     */
    where: DocuSignEnvelopeWhereUniqueInput
  }

  /**
   * DocuSignEnvelope updateMany
   */
  export type DocuSignEnvelopeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocuSignEnvelopes.
     */
    data: XOR<DocuSignEnvelopeUpdateManyMutationInput, DocuSignEnvelopeUncheckedUpdateManyInput>
    /**
     * Filter which DocuSignEnvelopes to update
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * Limit how many DocuSignEnvelopes to update.
     */
    limit?: number
  }

  /**
   * DocuSignEnvelope updateManyAndReturn
   */
  export type DocuSignEnvelopeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * The data used to update DocuSignEnvelopes.
     */
    data: XOR<DocuSignEnvelopeUpdateManyMutationInput, DocuSignEnvelopeUncheckedUpdateManyInput>
    /**
     * Filter which DocuSignEnvelopes to update
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * Limit how many DocuSignEnvelopes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocuSignEnvelope upsert
   */
  export type DocuSignEnvelopeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * The filter to search for the DocuSignEnvelope to update in case it exists.
     */
    where: DocuSignEnvelopeWhereUniqueInput
    /**
     * In case the DocuSignEnvelope found by the `where` argument doesn't exist, create a new DocuSignEnvelope with this data.
     */
    create: XOR<DocuSignEnvelopeCreateInput, DocuSignEnvelopeUncheckedCreateInput>
    /**
     * In case the DocuSignEnvelope was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocuSignEnvelopeUpdateInput, DocuSignEnvelopeUncheckedUpdateInput>
  }

  /**
   * DocuSignEnvelope delete
   */
  export type DocuSignEnvelopeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
    /**
     * Filter which DocuSignEnvelope to delete.
     */
    where: DocuSignEnvelopeWhereUniqueInput
  }

  /**
   * DocuSignEnvelope deleteMany
   */
  export type DocuSignEnvelopeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocuSignEnvelopes to delete
     */
    where?: DocuSignEnvelopeWhereInput
    /**
     * Limit how many DocuSignEnvelopes to delete.
     */
    limit?: number
  }

  /**
   * DocuSignEnvelope.signers
   */
  export type DocuSignEnvelope$signersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    where?: DocuSignSignerWhereInput
    orderBy?: DocuSignSignerOrderByWithRelationInput | DocuSignSignerOrderByWithRelationInput[]
    cursor?: DocuSignSignerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocuSignSignerScalarFieldEnum | DocuSignSignerScalarFieldEnum[]
  }

  /**
   * DocuSignEnvelope without action
   */
  export type DocuSignEnvelopeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignEnvelope
     */
    select?: DocuSignEnvelopeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignEnvelope
     */
    omit?: DocuSignEnvelopeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignEnvelopeInclude<ExtArgs> | null
  }


  /**
   * Model DocuSignSigner
   */

  export type AggregateDocuSignSigner = {
    _count: DocuSignSignerCountAggregateOutputType | null
    _avg: DocuSignSignerAvgAggregateOutputType | null
    _sum: DocuSignSignerSumAggregateOutputType | null
    _min: DocuSignSignerMinAggregateOutputType | null
    _max: DocuSignSignerMaxAggregateOutputType | null
  }

  export type DocuSignSignerAvgAggregateOutputType = {
    routingOrder: number | null
  }

  export type DocuSignSignerSumAggregateOutputType = {
    routingOrder: number | null
  }

  export type DocuSignSignerMinAggregateOutputType = {
    id: string | null
    envelopeId: string | null
    routingOrder: number | null
    email: string | null
    name: string | null
    status: $Enums.DocuSignSignerStatus | null
    signedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocuSignSignerMaxAggregateOutputType = {
    id: string | null
    envelopeId: string | null
    routingOrder: number | null
    email: string | null
    name: string | null
    status: $Enums.DocuSignSignerStatus | null
    signedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocuSignSignerCountAggregateOutputType = {
    id: number
    envelopeId: number
    routingOrder: number
    email: number
    name: number
    status: number
    signedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocuSignSignerAvgAggregateInputType = {
    routingOrder?: true
  }

  export type DocuSignSignerSumAggregateInputType = {
    routingOrder?: true
  }

  export type DocuSignSignerMinAggregateInputType = {
    id?: true
    envelopeId?: true
    routingOrder?: true
    email?: true
    name?: true
    status?: true
    signedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocuSignSignerMaxAggregateInputType = {
    id?: true
    envelopeId?: true
    routingOrder?: true
    email?: true
    name?: true
    status?: true
    signedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocuSignSignerCountAggregateInputType = {
    id?: true
    envelopeId?: true
    routingOrder?: true
    email?: true
    name?: true
    status?: true
    signedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocuSignSignerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocuSignSigner to aggregate.
     */
    where?: DocuSignSignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignSigners to fetch.
     */
    orderBy?: DocuSignSignerOrderByWithRelationInput | DocuSignSignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocuSignSignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignSigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignSigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocuSignSigners
    **/
    _count?: true | DocuSignSignerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocuSignSignerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocuSignSignerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocuSignSignerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocuSignSignerMaxAggregateInputType
  }

  export type GetDocuSignSignerAggregateType<T extends DocuSignSignerAggregateArgs> = {
        [P in keyof T & keyof AggregateDocuSignSigner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocuSignSigner[P]>
      : GetScalarType<T[P], AggregateDocuSignSigner[P]>
  }




  export type DocuSignSignerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocuSignSignerWhereInput
    orderBy?: DocuSignSignerOrderByWithAggregationInput | DocuSignSignerOrderByWithAggregationInput[]
    by: DocuSignSignerScalarFieldEnum[] | DocuSignSignerScalarFieldEnum
    having?: DocuSignSignerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocuSignSignerCountAggregateInputType | true
    _avg?: DocuSignSignerAvgAggregateInputType
    _sum?: DocuSignSignerSumAggregateInputType
    _min?: DocuSignSignerMinAggregateInputType
    _max?: DocuSignSignerMaxAggregateInputType
  }

  export type DocuSignSignerGroupByOutputType = {
    id: string
    envelopeId: string
    routingOrder: number
    email: string
    name: string
    status: $Enums.DocuSignSignerStatus
    signedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DocuSignSignerCountAggregateOutputType | null
    _avg: DocuSignSignerAvgAggregateOutputType | null
    _sum: DocuSignSignerSumAggregateOutputType | null
    _min: DocuSignSignerMinAggregateOutputType | null
    _max: DocuSignSignerMaxAggregateOutputType | null
  }

  type GetDocuSignSignerGroupByPayload<T extends DocuSignSignerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocuSignSignerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocuSignSignerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocuSignSignerGroupByOutputType[P]>
            : GetScalarType<T[P], DocuSignSignerGroupByOutputType[P]>
        }
      >
    >


  export type DocuSignSignerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    routingOrder?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    signedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignSigner"]>

  export type DocuSignSignerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    routingOrder?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    signedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignSigner"]>

  export type DocuSignSignerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    envelopeId?: boolean
    routingOrder?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    signedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docuSignSigner"]>

  export type DocuSignSignerSelectScalar = {
    id?: boolean
    envelopeId?: boolean
    routingOrder?: boolean
    email?: boolean
    name?: boolean
    status?: boolean
    signedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocuSignSignerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "envelopeId" | "routingOrder" | "email" | "name" | "status" | "signedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["docuSignSigner"]>
  export type DocuSignSignerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }
  export type DocuSignSignerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }
  export type DocuSignSignerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    envelope?: boolean | DocuSignEnvelopeDefaultArgs<ExtArgs>
  }

  export type $DocuSignSignerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocuSignSigner"
    objects: {
      envelope: Prisma.$DocuSignEnvelopePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      envelopeId: string
      routingOrder: number
      email: string
      name: string
      status: $Enums.DocuSignSignerStatus
      signedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["docuSignSigner"]>
    composites: {}
  }

  type DocuSignSignerGetPayload<S extends boolean | null | undefined | DocuSignSignerDefaultArgs> = $Result.GetResult<Prisma.$DocuSignSignerPayload, S>

  type DocuSignSignerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocuSignSignerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocuSignSignerCountAggregateInputType | true
    }

  export interface DocuSignSignerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocuSignSigner'], meta: { name: 'DocuSignSigner' } }
    /**
     * Find zero or one DocuSignSigner that matches the filter.
     * @param {DocuSignSignerFindUniqueArgs} args - Arguments to find a DocuSignSigner
     * @example
     * // Get one DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocuSignSignerFindUniqueArgs>(args: SelectSubset<T, DocuSignSignerFindUniqueArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocuSignSigner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocuSignSignerFindUniqueOrThrowArgs} args - Arguments to find a DocuSignSigner
     * @example
     * // Get one DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocuSignSignerFindUniqueOrThrowArgs>(args: SelectSubset<T, DocuSignSignerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocuSignSigner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerFindFirstArgs} args - Arguments to find a DocuSignSigner
     * @example
     * // Get one DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocuSignSignerFindFirstArgs>(args?: SelectSubset<T, DocuSignSignerFindFirstArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocuSignSigner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerFindFirstOrThrowArgs} args - Arguments to find a DocuSignSigner
     * @example
     * // Get one DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocuSignSignerFindFirstOrThrowArgs>(args?: SelectSubset<T, DocuSignSignerFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocuSignSigners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocuSignSigners
     * const docuSignSigners = await prisma.docuSignSigner.findMany()
     * 
     * // Get first 10 DocuSignSigners
     * const docuSignSigners = await prisma.docuSignSigner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const docuSignSignerWithIdOnly = await prisma.docuSignSigner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocuSignSignerFindManyArgs>(args?: SelectSubset<T, DocuSignSignerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocuSignSigner.
     * @param {DocuSignSignerCreateArgs} args - Arguments to create a DocuSignSigner.
     * @example
     * // Create one DocuSignSigner
     * const DocuSignSigner = await prisma.docuSignSigner.create({
     *   data: {
     *     // ... data to create a DocuSignSigner
     *   }
     * })
     * 
     */
    create<T extends DocuSignSignerCreateArgs>(args: SelectSubset<T, DocuSignSignerCreateArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocuSignSigners.
     * @param {DocuSignSignerCreateManyArgs} args - Arguments to create many DocuSignSigners.
     * @example
     * // Create many DocuSignSigners
     * const docuSignSigner = await prisma.docuSignSigner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocuSignSignerCreateManyArgs>(args?: SelectSubset<T, DocuSignSignerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocuSignSigners and returns the data saved in the database.
     * @param {DocuSignSignerCreateManyAndReturnArgs} args - Arguments to create many DocuSignSigners.
     * @example
     * // Create many DocuSignSigners
     * const docuSignSigner = await prisma.docuSignSigner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocuSignSigners and only return the `id`
     * const docuSignSignerWithIdOnly = await prisma.docuSignSigner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocuSignSignerCreateManyAndReturnArgs>(args?: SelectSubset<T, DocuSignSignerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocuSignSigner.
     * @param {DocuSignSignerDeleteArgs} args - Arguments to delete one DocuSignSigner.
     * @example
     * // Delete one DocuSignSigner
     * const DocuSignSigner = await prisma.docuSignSigner.delete({
     *   where: {
     *     // ... filter to delete one DocuSignSigner
     *   }
     * })
     * 
     */
    delete<T extends DocuSignSignerDeleteArgs>(args: SelectSubset<T, DocuSignSignerDeleteArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocuSignSigner.
     * @param {DocuSignSignerUpdateArgs} args - Arguments to update one DocuSignSigner.
     * @example
     * // Update one DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocuSignSignerUpdateArgs>(args: SelectSubset<T, DocuSignSignerUpdateArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocuSignSigners.
     * @param {DocuSignSignerDeleteManyArgs} args - Arguments to filter DocuSignSigners to delete.
     * @example
     * // Delete a few DocuSignSigners
     * const { count } = await prisma.docuSignSigner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocuSignSignerDeleteManyArgs>(args?: SelectSubset<T, DocuSignSignerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocuSignSigners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocuSignSigners
     * const docuSignSigner = await prisma.docuSignSigner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocuSignSignerUpdateManyArgs>(args: SelectSubset<T, DocuSignSignerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocuSignSigners and returns the data updated in the database.
     * @param {DocuSignSignerUpdateManyAndReturnArgs} args - Arguments to update many DocuSignSigners.
     * @example
     * // Update many DocuSignSigners
     * const docuSignSigner = await prisma.docuSignSigner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocuSignSigners and only return the `id`
     * const docuSignSignerWithIdOnly = await prisma.docuSignSigner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocuSignSignerUpdateManyAndReturnArgs>(args: SelectSubset<T, DocuSignSignerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocuSignSigner.
     * @param {DocuSignSignerUpsertArgs} args - Arguments to update or create a DocuSignSigner.
     * @example
     * // Update or create a DocuSignSigner
     * const docuSignSigner = await prisma.docuSignSigner.upsert({
     *   create: {
     *     // ... data to create a DocuSignSigner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocuSignSigner we want to update
     *   }
     * })
     */
    upsert<T extends DocuSignSignerUpsertArgs>(args: SelectSubset<T, DocuSignSignerUpsertArgs<ExtArgs>>): Prisma__DocuSignSignerClient<$Result.GetResult<Prisma.$DocuSignSignerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocuSignSigners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerCountArgs} args - Arguments to filter DocuSignSigners to count.
     * @example
     * // Count the number of DocuSignSigners
     * const count = await prisma.docuSignSigner.count({
     *   where: {
     *     // ... the filter for the DocuSignSigners we want to count
     *   }
     * })
    **/
    count<T extends DocuSignSignerCountArgs>(
      args?: Subset<T, DocuSignSignerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocuSignSignerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocuSignSigner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocuSignSignerAggregateArgs>(args: Subset<T, DocuSignSignerAggregateArgs>): Prisma.PrismaPromise<GetDocuSignSignerAggregateType<T>>

    /**
     * Group by DocuSignSigner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocuSignSignerGroupByArgs} args - Group by arguments.
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
      T extends DocuSignSignerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocuSignSignerGroupByArgs['orderBy'] }
        : { orderBy?: DocuSignSignerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocuSignSignerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocuSignSignerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocuSignSigner model
   */
  readonly fields: DocuSignSignerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocuSignSigner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocuSignSignerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    envelope<T extends DocuSignEnvelopeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocuSignEnvelopeDefaultArgs<ExtArgs>>): Prisma__DocuSignEnvelopeClient<$Result.GetResult<Prisma.$DocuSignEnvelopePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DocuSignSigner model
   */
  interface DocuSignSignerFieldRefs {
    readonly id: FieldRef<"DocuSignSigner", 'String'>
    readonly envelopeId: FieldRef<"DocuSignSigner", 'String'>
    readonly routingOrder: FieldRef<"DocuSignSigner", 'Int'>
    readonly email: FieldRef<"DocuSignSigner", 'String'>
    readonly name: FieldRef<"DocuSignSigner", 'String'>
    readonly status: FieldRef<"DocuSignSigner", 'DocuSignSignerStatus'>
    readonly signedAt: FieldRef<"DocuSignSigner", 'DateTime'>
    readonly createdAt: FieldRef<"DocuSignSigner", 'DateTime'>
    readonly updatedAt: FieldRef<"DocuSignSigner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocuSignSigner findUnique
   */
  export type DocuSignSignerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignSigner to fetch.
     */
    where: DocuSignSignerWhereUniqueInput
  }

  /**
   * DocuSignSigner findUniqueOrThrow
   */
  export type DocuSignSignerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignSigner to fetch.
     */
    where: DocuSignSignerWhereUniqueInput
  }

  /**
   * DocuSignSigner findFirst
   */
  export type DocuSignSignerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignSigner to fetch.
     */
    where?: DocuSignSignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignSigners to fetch.
     */
    orderBy?: DocuSignSignerOrderByWithRelationInput | DocuSignSignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocuSignSigners.
     */
    cursor?: DocuSignSignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignSigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignSigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocuSignSigners.
     */
    distinct?: DocuSignSignerScalarFieldEnum | DocuSignSignerScalarFieldEnum[]
  }

  /**
   * DocuSignSigner findFirstOrThrow
   */
  export type DocuSignSignerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignSigner to fetch.
     */
    where?: DocuSignSignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignSigners to fetch.
     */
    orderBy?: DocuSignSignerOrderByWithRelationInput | DocuSignSignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocuSignSigners.
     */
    cursor?: DocuSignSignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignSigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignSigners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocuSignSigners.
     */
    distinct?: DocuSignSignerScalarFieldEnum | DocuSignSignerScalarFieldEnum[]
  }

  /**
   * DocuSignSigner findMany
   */
  export type DocuSignSignerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter, which DocuSignSigners to fetch.
     */
    where?: DocuSignSignerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocuSignSigners to fetch.
     */
    orderBy?: DocuSignSignerOrderByWithRelationInput | DocuSignSignerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocuSignSigners.
     */
    cursor?: DocuSignSignerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocuSignSigners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocuSignSigners.
     */
    skip?: number
    distinct?: DocuSignSignerScalarFieldEnum | DocuSignSignerScalarFieldEnum[]
  }

  /**
   * DocuSignSigner create
   */
  export type DocuSignSignerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * The data needed to create a DocuSignSigner.
     */
    data: XOR<DocuSignSignerCreateInput, DocuSignSignerUncheckedCreateInput>
  }

  /**
   * DocuSignSigner createMany
   */
  export type DocuSignSignerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocuSignSigners.
     */
    data: DocuSignSignerCreateManyInput | DocuSignSignerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocuSignSigner createManyAndReturn
   */
  export type DocuSignSignerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * The data used to create many DocuSignSigners.
     */
    data: DocuSignSignerCreateManyInput | DocuSignSignerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocuSignSigner update
   */
  export type DocuSignSignerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * The data needed to update a DocuSignSigner.
     */
    data: XOR<DocuSignSignerUpdateInput, DocuSignSignerUncheckedUpdateInput>
    /**
     * Choose, which DocuSignSigner to update.
     */
    where: DocuSignSignerWhereUniqueInput
  }

  /**
   * DocuSignSigner updateMany
   */
  export type DocuSignSignerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocuSignSigners.
     */
    data: XOR<DocuSignSignerUpdateManyMutationInput, DocuSignSignerUncheckedUpdateManyInput>
    /**
     * Filter which DocuSignSigners to update
     */
    where?: DocuSignSignerWhereInput
    /**
     * Limit how many DocuSignSigners to update.
     */
    limit?: number
  }

  /**
   * DocuSignSigner updateManyAndReturn
   */
  export type DocuSignSignerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * The data used to update DocuSignSigners.
     */
    data: XOR<DocuSignSignerUpdateManyMutationInput, DocuSignSignerUncheckedUpdateManyInput>
    /**
     * Filter which DocuSignSigners to update
     */
    where?: DocuSignSignerWhereInput
    /**
     * Limit how many DocuSignSigners to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocuSignSigner upsert
   */
  export type DocuSignSignerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * The filter to search for the DocuSignSigner to update in case it exists.
     */
    where: DocuSignSignerWhereUniqueInput
    /**
     * In case the DocuSignSigner found by the `where` argument doesn't exist, create a new DocuSignSigner with this data.
     */
    create: XOR<DocuSignSignerCreateInput, DocuSignSignerUncheckedCreateInput>
    /**
     * In case the DocuSignSigner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocuSignSignerUpdateInput, DocuSignSignerUncheckedUpdateInput>
  }

  /**
   * DocuSignSigner delete
   */
  export type DocuSignSignerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
    /**
     * Filter which DocuSignSigner to delete.
     */
    where: DocuSignSignerWhereUniqueInput
  }

  /**
   * DocuSignSigner deleteMany
   */
  export type DocuSignSignerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocuSignSigners to delete
     */
    where?: DocuSignSignerWhereInput
    /**
     * Limit how many DocuSignSigners to delete.
     */
    limit?: number
  }

  /**
   * DocuSignSigner without action
   */
  export type DocuSignSignerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocuSignSigner
     */
    select?: DocuSignSignerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocuSignSigner
     */
    omit?: DocuSignSignerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocuSignSignerInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    emailVerified: 'emailVerified',
    image: 'image',
    isActive: 'isActive',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const UserGroupScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    groupId: 'groupId',
    joinedAt: 'joinedAt'
  };

  export type UserGroupScalarFieldEnum = (typeof UserGroupScalarFieldEnum)[keyof typeof UserGroupScalarFieldEnum]


  export const DirectoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    parentId: 'parentId',
    path: 'path',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DirectoryScalarFieldEnum = (typeof DirectoryScalarFieldEnum)[keyof typeof DirectoryScalarFieldEnum]


  export const DirectoryAccessScalarFieldEnum: {
    id: 'id',
    directoryId: 'directoryId',
    groupId: 'groupId',
    permission: 'permission',
    createdAt: 'createdAt'
  };

  export type DirectoryAccessScalarFieldEnum = (typeof DirectoryAccessScalarFieldEnum)[keyof typeof DirectoryAccessScalarFieldEnum]


  export const ContractScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    status: 'status',
    contractNumber: 'contractNumber',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    directoryId: 'directoryId',
    categoryId: 'categoryId'
  };

  export type ContractScalarFieldEnum = (typeof ContractScalarFieldEnum)[keyof typeof ContractScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ContractVersionScalarFieldEnum: {
    id: 'id',
    version: 'version',
    title: 'title',
    content: 'content',
    changeNote: 'changeNote',
    createdAt: 'createdAt',
    contractId: 'contractId'
  };

  export type ContractVersionScalarFieldEnum = (typeof ContractVersionScalarFieldEnum)[keyof typeof ContractVersionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const DocuSignEnvelopeScalarFieldEnum: {
    id: 'id',
    envelopeId: 'envelopeId',
    contractId: 'contractId',
    status: 'status',
    templateId: 'templateId',
    subject: 'subject',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type DocuSignEnvelopeScalarFieldEnum = (typeof DocuSignEnvelopeScalarFieldEnum)[keyof typeof DocuSignEnvelopeScalarFieldEnum]


  export const DocuSignSignerScalarFieldEnum: {
    id: 'id',
    envelopeId: 'envelopeId',
    routingOrder: 'routingOrder',
    email: 'email',
    name: 'name',
    status: 'status',
    signedAt: 'signedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocuSignSignerScalarFieldEnum = (typeof DocuSignSignerScalarFieldEnum)[keyof typeof DocuSignSignerScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Permission'
   */
  export type EnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission'>
    


  /**
   * Reference to a field of type 'Permission[]'
   */
  export type ListEnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission[]'>
    


  /**
   * Reference to a field of type 'ContractStatus'
   */
  export type EnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus'>
    


  /**
   * Reference to a field of type 'ContractStatus[]'
   */
  export type ListEnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DocuSignEnvelopeStatus'
   */
  export type EnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocuSignEnvelopeStatus'>
    


  /**
   * Reference to a field of type 'DocuSignEnvelopeStatus[]'
   */
  export type ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocuSignEnvelopeStatus[]'>
    


  /**
   * Reference to a field of type 'DocuSignSignerStatus'
   */
  export type EnumDocuSignSignerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocuSignSignerStatus'>
    


  /**
   * Reference to a field of type 'DocuSignSignerStatus[]'
   */
  export type ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocuSignSignerStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedContracts?: ContractListRelationFilter
    userGroups?: UserGroupListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownedContracts?: ContractOrderByRelationAggregateInput
    userGroups?: UserGroupOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedContracts?: ContractListRelationFilter
    userGroups?: UserGroupListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    isActive?: BoolFilter<"Group"> | boolean
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    directoryAccess?: DirectoryAccessListRelationFilter
    userGroups?: UserGroupListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    directoryAccess?: DirectoryAccessOrderByRelationAggregateInput
    userGroups?: UserGroupOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    description?: StringNullableFilter<"Group"> | string | null
    isActive?: BoolFilter<"Group"> | boolean
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    directoryAccess?: DirectoryAccessListRelationFilter
    userGroups?: UserGroupListRelationFilter
  }, "id" | "name">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    description?: StringNullableWithAggregatesFilter<"Group"> | string | null
    isActive?: BoolWithAggregatesFilter<"Group"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type UserGroupWhereInput = {
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    id?: StringFilter<"UserGroup"> | string
    userId?: StringFilter<"UserGroup"> | string
    groupId?: StringFilter<"UserGroup"> | string
    joinedAt?: DateTimeFilter<"UserGroup"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserGroupOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    joinedAt?: SortOrder
    group?: GroupOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_groupId?: UserGroupUserIdGroupIdCompoundUniqueInput
    AND?: UserGroupWhereInput | UserGroupWhereInput[]
    OR?: UserGroupWhereInput[]
    NOT?: UserGroupWhereInput | UserGroupWhereInput[]
    userId?: StringFilter<"UserGroup"> | string
    groupId?: StringFilter<"UserGroup"> | string
    joinedAt?: DateTimeFilter<"UserGroup"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_groupId">

  export type UserGroupOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    joinedAt?: SortOrder
    _count?: UserGroupCountOrderByAggregateInput
    _max?: UserGroupMaxOrderByAggregateInput
    _min?: UserGroupMinOrderByAggregateInput
  }

  export type UserGroupScalarWhereWithAggregatesInput = {
    AND?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    OR?: UserGroupScalarWhereWithAggregatesInput[]
    NOT?: UserGroupScalarWhereWithAggregatesInput | UserGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserGroup"> | string
    userId?: StringWithAggregatesFilter<"UserGroup"> | string
    groupId?: StringWithAggregatesFilter<"UserGroup"> | string
    joinedAt?: DateTimeWithAggregatesFilter<"UserGroup"> | Date | string
  }

  export type DirectoryWhereInput = {
    AND?: DirectoryWhereInput | DirectoryWhereInput[]
    OR?: DirectoryWhereInput[]
    NOT?: DirectoryWhereInput | DirectoryWhereInput[]
    id?: StringFilter<"Directory"> | string
    name?: StringFilter<"Directory"> | string
    description?: StringNullableFilter<"Directory"> | string | null
    parentId?: StringNullableFilter<"Directory"> | string | null
    path?: StringFilter<"Directory"> | string
    isActive?: BoolFilter<"Directory"> | boolean
    createdAt?: DateTimeFilter<"Directory"> | Date | string
    updatedAt?: DateTimeFilter<"Directory"> | Date | string
    contracts?: ContractListRelationFilter
    parent?: XOR<DirectoryNullableScalarRelationFilter, DirectoryWhereInput> | null
    children?: DirectoryListRelationFilter
    directoryAccess?: DirectoryAccessListRelationFilter
  }

  export type DirectoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    path?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contracts?: ContractOrderByRelationAggregateInput
    parent?: DirectoryOrderByWithRelationInput
    children?: DirectoryOrderByRelationAggregateInput
    directoryAccess?: DirectoryAccessOrderByRelationAggregateInput
  }

  export type DirectoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    path?: string
    parentId_name?: DirectoryParentIdNameCompoundUniqueInput
    AND?: DirectoryWhereInput | DirectoryWhereInput[]
    OR?: DirectoryWhereInput[]
    NOT?: DirectoryWhereInput | DirectoryWhereInput[]
    name?: StringFilter<"Directory"> | string
    description?: StringNullableFilter<"Directory"> | string | null
    parentId?: StringNullableFilter<"Directory"> | string | null
    isActive?: BoolFilter<"Directory"> | boolean
    createdAt?: DateTimeFilter<"Directory"> | Date | string
    updatedAt?: DateTimeFilter<"Directory"> | Date | string
    contracts?: ContractListRelationFilter
    parent?: XOR<DirectoryNullableScalarRelationFilter, DirectoryWhereInput> | null
    children?: DirectoryListRelationFilter
    directoryAccess?: DirectoryAccessListRelationFilter
  }, "id" | "path" | "parentId_name">

  export type DirectoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    path?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DirectoryCountOrderByAggregateInput
    _max?: DirectoryMaxOrderByAggregateInput
    _min?: DirectoryMinOrderByAggregateInput
  }

  export type DirectoryScalarWhereWithAggregatesInput = {
    AND?: DirectoryScalarWhereWithAggregatesInput | DirectoryScalarWhereWithAggregatesInput[]
    OR?: DirectoryScalarWhereWithAggregatesInput[]
    NOT?: DirectoryScalarWhereWithAggregatesInput | DirectoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Directory"> | string
    name?: StringWithAggregatesFilter<"Directory"> | string
    description?: StringNullableWithAggregatesFilter<"Directory"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Directory"> | string | null
    path?: StringWithAggregatesFilter<"Directory"> | string
    isActive?: BoolWithAggregatesFilter<"Directory"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Directory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Directory"> | Date | string
  }

  export type DirectoryAccessWhereInput = {
    AND?: DirectoryAccessWhereInput | DirectoryAccessWhereInput[]
    OR?: DirectoryAccessWhereInput[]
    NOT?: DirectoryAccessWhereInput | DirectoryAccessWhereInput[]
    id?: StringFilter<"DirectoryAccess"> | string
    directoryId?: StringFilter<"DirectoryAccess"> | string
    groupId?: StringFilter<"DirectoryAccess"> | string
    permission?: EnumPermissionFilter<"DirectoryAccess"> | $Enums.Permission
    createdAt?: DateTimeFilter<"DirectoryAccess"> | Date | string
    directory?: XOR<DirectoryScalarRelationFilter, DirectoryWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type DirectoryAccessOrderByWithRelationInput = {
    id?: SortOrder
    directoryId?: SortOrder
    groupId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
    directory?: DirectoryOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type DirectoryAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    directoryId_groupId?: DirectoryAccessDirectoryIdGroupIdCompoundUniqueInput
    AND?: DirectoryAccessWhereInput | DirectoryAccessWhereInput[]
    OR?: DirectoryAccessWhereInput[]
    NOT?: DirectoryAccessWhereInput | DirectoryAccessWhereInput[]
    directoryId?: StringFilter<"DirectoryAccess"> | string
    groupId?: StringFilter<"DirectoryAccess"> | string
    permission?: EnumPermissionFilter<"DirectoryAccess"> | $Enums.Permission
    createdAt?: DateTimeFilter<"DirectoryAccess"> | Date | string
    directory?: XOR<DirectoryScalarRelationFilter, DirectoryWhereInput>
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "directoryId_groupId">

  export type DirectoryAccessOrderByWithAggregationInput = {
    id?: SortOrder
    directoryId?: SortOrder
    groupId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
    _count?: DirectoryAccessCountOrderByAggregateInput
    _max?: DirectoryAccessMaxOrderByAggregateInput
    _min?: DirectoryAccessMinOrderByAggregateInput
  }

  export type DirectoryAccessScalarWhereWithAggregatesInput = {
    AND?: DirectoryAccessScalarWhereWithAggregatesInput | DirectoryAccessScalarWhereWithAggregatesInput[]
    OR?: DirectoryAccessScalarWhereWithAggregatesInput[]
    NOT?: DirectoryAccessScalarWhereWithAggregatesInput | DirectoryAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DirectoryAccess"> | string
    directoryId?: StringWithAggregatesFilter<"DirectoryAccess"> | string
    groupId?: StringWithAggregatesFilter<"DirectoryAccess"> | string
    permission?: EnumPermissionWithAggregatesFilter<"DirectoryAccess"> | $Enums.Permission
    createdAt?: DateTimeWithAggregatesFilter<"DirectoryAccess"> | Date | string
  }

  export type ContractWhereInput = {
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    id?: StringFilter<"Contract"> | string
    title?: StringFilter<"Contract"> | string
    content?: StringFilter<"Contract"> | string
    status?: EnumContractStatusFilter<"Contract"> | $Enums.ContractStatus
    contractNumber?: StringNullableFilter<"Contract"> | string | null
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    ownerId?: StringFilter<"Contract"> | string
    directoryId?: StringFilter<"Contract"> | string
    categoryId?: StringNullableFilter<"Contract"> | string | null
    versions?: ContractVersionListRelationFilter
    docuSignEnvelopes?: DocuSignEnvelopeListRelationFilter
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    directory?: XOR<DirectoryScalarRelationFilter, DirectoryWhereInput>
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContractOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    contractNumber?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    directoryId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    versions?: ContractVersionOrderByRelationAggregateInput
    docuSignEnvelopes?: DocuSignEnvelopeOrderByRelationAggregateInput
    category?: CategoryOrderByWithRelationInput
    directory?: DirectoryOrderByWithRelationInput
    owner?: UserOrderByWithRelationInput
  }

  export type ContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractNumber?: string
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    title?: StringFilter<"Contract"> | string
    content?: StringFilter<"Contract"> | string
    status?: EnumContractStatusFilter<"Contract"> | $Enums.ContractStatus
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    ownerId?: StringFilter<"Contract"> | string
    directoryId?: StringFilter<"Contract"> | string
    categoryId?: StringNullableFilter<"Contract"> | string | null
    versions?: ContractVersionListRelationFilter
    docuSignEnvelopes?: DocuSignEnvelopeListRelationFilter
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    directory?: XOR<DirectoryScalarRelationFilter, DirectoryWhereInput>
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "contractNumber">

  export type ContractOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    contractNumber?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    directoryId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    _count?: ContractCountOrderByAggregateInput
    _max?: ContractMaxOrderByAggregateInput
    _min?: ContractMinOrderByAggregateInput
  }

  export type ContractScalarWhereWithAggregatesInput = {
    AND?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    OR?: ContractScalarWhereWithAggregatesInput[]
    NOT?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contract"> | string
    title?: StringWithAggregatesFilter<"Contract"> | string
    content?: StringWithAggregatesFilter<"Contract"> | string
    status?: EnumContractStatusWithAggregatesFilter<"Contract"> | $Enums.ContractStatus
    contractNumber?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    ownerId?: StringWithAggregatesFilter<"Contract"> | string
    directoryId?: StringWithAggregatesFilter<"Contract"> | string
    categoryId?: StringNullableWithAggregatesFilter<"Contract"> | string | null
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    contracts?: ContractListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contracts?: ContractOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    color?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    contracts?: ContractListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    color?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ContractVersionWhereInput = {
    AND?: ContractVersionWhereInput | ContractVersionWhereInput[]
    OR?: ContractVersionWhereInput[]
    NOT?: ContractVersionWhereInput | ContractVersionWhereInput[]
    id?: StringFilter<"ContractVersion"> | string
    version?: IntFilter<"ContractVersion"> | number
    title?: StringFilter<"ContractVersion"> | string
    content?: StringFilter<"ContractVersion"> | string
    changeNote?: StringNullableFilter<"ContractVersion"> | string | null
    createdAt?: DateTimeFilter<"ContractVersion"> | Date | string
    contractId?: StringFilter<"ContractVersion"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type ContractVersionOrderByWithRelationInput = {
    id?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    changeNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    contractId?: SortOrder
    contract?: ContractOrderByWithRelationInput
  }

  export type ContractVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractId_version?: ContractVersionContractIdVersionCompoundUniqueInput
    AND?: ContractVersionWhereInput | ContractVersionWhereInput[]
    OR?: ContractVersionWhereInput[]
    NOT?: ContractVersionWhereInput | ContractVersionWhereInput[]
    version?: IntFilter<"ContractVersion"> | number
    title?: StringFilter<"ContractVersion"> | string
    content?: StringFilter<"ContractVersion"> | string
    changeNote?: StringNullableFilter<"ContractVersion"> | string | null
    createdAt?: DateTimeFilter<"ContractVersion"> | Date | string
    contractId?: StringFilter<"ContractVersion"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id" | "contractId_version">

  export type ContractVersionOrderByWithAggregationInput = {
    id?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    changeNote?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    contractId?: SortOrder
    _count?: ContractVersionCountOrderByAggregateInput
    _avg?: ContractVersionAvgOrderByAggregateInput
    _max?: ContractVersionMaxOrderByAggregateInput
    _min?: ContractVersionMinOrderByAggregateInput
    _sum?: ContractVersionSumOrderByAggregateInput
  }

  export type ContractVersionScalarWhereWithAggregatesInput = {
    AND?: ContractVersionScalarWhereWithAggregatesInput | ContractVersionScalarWhereWithAggregatesInput[]
    OR?: ContractVersionScalarWhereWithAggregatesInput[]
    NOT?: ContractVersionScalarWhereWithAggregatesInput | ContractVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractVersion"> | string
    version?: IntWithAggregatesFilter<"ContractVersion"> | number
    title?: StringWithAggregatesFilter<"ContractVersion"> | string
    content?: StringWithAggregatesFilter<"ContractVersion"> | string
    changeNote?: StringNullableWithAggregatesFilter<"ContractVersion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ContractVersion"> | Date | string
    contractId?: StringWithAggregatesFilter<"ContractVersion"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type DocuSignEnvelopeWhereInput = {
    AND?: DocuSignEnvelopeWhereInput | DocuSignEnvelopeWhereInput[]
    OR?: DocuSignEnvelopeWhereInput[]
    NOT?: DocuSignEnvelopeWhereInput | DocuSignEnvelopeWhereInput[]
    id?: StringFilter<"DocuSignEnvelope"> | string
    envelopeId?: StringFilter<"DocuSignEnvelope"> | string
    contractId?: StringFilter<"DocuSignEnvelope"> | string
    status?: EnumDocuSignEnvelopeStatusFilter<"DocuSignEnvelope"> | $Enums.DocuSignEnvelopeStatus
    templateId?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    subject?: StringFilter<"DocuSignEnvelope"> | string
    message?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    createdAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    completedAt?: DateTimeNullableFilter<"DocuSignEnvelope"> | Date | string | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
    signers?: DocuSignSignerListRelationFilter
  }

  export type DocuSignEnvelopeOrderByWithRelationInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    contractId?: SortOrder
    status?: SortOrder
    templateId?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    contract?: ContractOrderByWithRelationInput
    signers?: DocuSignSignerOrderByRelationAggregateInput
  }

  export type DocuSignEnvelopeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    envelopeId?: string
    AND?: DocuSignEnvelopeWhereInput | DocuSignEnvelopeWhereInput[]
    OR?: DocuSignEnvelopeWhereInput[]
    NOT?: DocuSignEnvelopeWhereInput | DocuSignEnvelopeWhereInput[]
    contractId?: StringFilter<"DocuSignEnvelope"> | string
    status?: EnumDocuSignEnvelopeStatusFilter<"DocuSignEnvelope"> | $Enums.DocuSignEnvelopeStatus
    templateId?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    subject?: StringFilter<"DocuSignEnvelope"> | string
    message?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    createdAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    completedAt?: DateTimeNullableFilter<"DocuSignEnvelope"> | Date | string | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
    signers?: DocuSignSignerListRelationFilter
  }, "id" | "envelopeId">

  export type DocuSignEnvelopeOrderByWithAggregationInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    contractId?: SortOrder
    status?: SortOrder
    templateId?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: DocuSignEnvelopeCountOrderByAggregateInput
    _max?: DocuSignEnvelopeMaxOrderByAggregateInput
    _min?: DocuSignEnvelopeMinOrderByAggregateInput
  }

  export type DocuSignEnvelopeScalarWhereWithAggregatesInput = {
    AND?: DocuSignEnvelopeScalarWhereWithAggregatesInput | DocuSignEnvelopeScalarWhereWithAggregatesInput[]
    OR?: DocuSignEnvelopeScalarWhereWithAggregatesInput[]
    NOT?: DocuSignEnvelopeScalarWhereWithAggregatesInput | DocuSignEnvelopeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocuSignEnvelope"> | string
    envelopeId?: StringWithAggregatesFilter<"DocuSignEnvelope"> | string
    contractId?: StringWithAggregatesFilter<"DocuSignEnvelope"> | string
    status?: EnumDocuSignEnvelopeStatusWithAggregatesFilter<"DocuSignEnvelope"> | $Enums.DocuSignEnvelopeStatus
    templateId?: StringNullableWithAggregatesFilter<"DocuSignEnvelope"> | string | null
    subject?: StringWithAggregatesFilter<"DocuSignEnvelope"> | string
    message?: StringNullableWithAggregatesFilter<"DocuSignEnvelope"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocuSignEnvelope"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocuSignEnvelope"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"DocuSignEnvelope"> | Date | string | null
  }

  export type DocuSignSignerWhereInput = {
    AND?: DocuSignSignerWhereInput | DocuSignSignerWhereInput[]
    OR?: DocuSignSignerWhereInput[]
    NOT?: DocuSignSignerWhereInput | DocuSignSignerWhereInput[]
    id?: StringFilter<"DocuSignSigner"> | string
    envelopeId?: StringFilter<"DocuSignSigner"> | string
    routingOrder?: IntFilter<"DocuSignSigner"> | number
    email?: StringFilter<"DocuSignSigner"> | string
    name?: StringFilter<"DocuSignSigner"> | string
    status?: EnumDocuSignSignerStatusFilter<"DocuSignSigner"> | $Enums.DocuSignSignerStatus
    signedAt?: DateTimeNullableFilter<"DocuSignSigner"> | Date | string | null
    createdAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
    envelope?: XOR<DocuSignEnvelopeScalarRelationFilter, DocuSignEnvelopeWhereInput>
  }

  export type DocuSignSignerOrderByWithRelationInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    routingOrder?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    signedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    envelope?: DocuSignEnvelopeOrderByWithRelationInput
  }

  export type DocuSignSignerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    envelopeId_routingOrder?: DocuSignSignerEnvelopeIdRoutingOrderCompoundUniqueInput
    AND?: DocuSignSignerWhereInput | DocuSignSignerWhereInput[]
    OR?: DocuSignSignerWhereInput[]
    NOT?: DocuSignSignerWhereInput | DocuSignSignerWhereInput[]
    envelopeId?: StringFilter<"DocuSignSigner"> | string
    routingOrder?: IntFilter<"DocuSignSigner"> | number
    email?: StringFilter<"DocuSignSigner"> | string
    name?: StringFilter<"DocuSignSigner"> | string
    status?: EnumDocuSignSignerStatusFilter<"DocuSignSigner"> | $Enums.DocuSignSignerStatus
    signedAt?: DateTimeNullableFilter<"DocuSignSigner"> | Date | string | null
    createdAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
    envelope?: XOR<DocuSignEnvelopeScalarRelationFilter, DocuSignEnvelopeWhereInput>
  }, "id" | "envelopeId_routingOrder">

  export type DocuSignSignerOrderByWithAggregationInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    routingOrder?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    signedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocuSignSignerCountOrderByAggregateInput
    _avg?: DocuSignSignerAvgOrderByAggregateInput
    _max?: DocuSignSignerMaxOrderByAggregateInput
    _min?: DocuSignSignerMinOrderByAggregateInput
    _sum?: DocuSignSignerSumOrderByAggregateInput
  }

  export type DocuSignSignerScalarWhereWithAggregatesInput = {
    AND?: DocuSignSignerScalarWhereWithAggregatesInput | DocuSignSignerScalarWhereWithAggregatesInput[]
    OR?: DocuSignSignerScalarWhereWithAggregatesInput[]
    NOT?: DocuSignSignerScalarWhereWithAggregatesInput | DocuSignSignerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocuSignSigner"> | string
    envelopeId?: StringWithAggregatesFilter<"DocuSignSigner"> | string
    routingOrder?: IntWithAggregatesFilter<"DocuSignSigner"> | number
    email?: StringWithAggregatesFilter<"DocuSignSigner"> | string
    name?: StringWithAggregatesFilter<"DocuSignSigner"> | string
    status?: EnumDocuSignSignerStatusWithAggregatesFilter<"DocuSignSigner"> | $Enums.DocuSignSignerStatus
    signedAt?: DateTimeNullableWithAggregatesFilter<"DocuSignSigner"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocuSignSigner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocuSignSigner"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractUncheckedCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUncheckedUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutGroupInput
    userGroups?: UserGroupCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutGroupInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryAccess?: DirectoryAccessUpdateManyWithoutGroupNestedInput
    userGroups?: UserGroupUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutGroupNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupCreateInput = {
    id?: string
    joinedAt?: Date | string
    group: GroupCreateNestedOneWithoutUserGroupsInput
    user: UserCreateNestedOneWithoutUserGroupsInput
  }

  export type UserGroupUncheckedCreateInput = {
    id?: string
    userId: string
    groupId: string
    joinedAt?: Date | string
  }

  export type UserGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUserGroupsNestedInput
    user?: UserUpdateOneRequiredWithoutUserGroupsNestedInput
  }

  export type UserGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupCreateManyInput = {
    id?: string
    userId: string
    groupId: string
    joinedAt?: Date | string
  }

  export type UserGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryCreateInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractCreateNestedManyWithoutDirectoryInput
    parent?: DirectoryCreateNestedOneWithoutChildrenInput
    children?: DirectoryCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractUncheckedCreateNestedManyWithoutDirectoryInput
    children?: DirectoryUncheckedCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUpdateManyWithoutDirectoryNestedInput
    parent?: DirectoryUpdateOneWithoutChildrenNestedInput
    children?: DirectoryUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUncheckedUpdateManyWithoutDirectoryNestedInput
    children?: DirectoryUncheckedUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DirectoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessCreateInput = {
    id?: string
    permission?: $Enums.Permission
    createdAt?: Date | string
    directory: DirectoryCreateNestedOneWithoutDirectoryAccessInput
    group: GroupCreateNestedOneWithoutDirectoryAccessInput
  }

  export type DirectoryAccessUncheckedCreateInput = {
    id?: string
    directoryId: string
    groupId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type DirectoryAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directory?: DirectoryUpdateOneRequiredWithoutDirectoryAccessNestedInput
    group?: GroupUpdateOneRequiredWithoutDirectoryAccessNestedInput
  }

  export type DirectoryAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessCreateManyInput = {
    id?: string
    directoryId: string
    groupId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type DirectoryAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractCreateInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: ContractVersionCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeCreateNestedManyWithoutContractInput
    category?: CategoryCreateNestedOneWithoutContractsInput
    directory: DirectoryCreateNestedOneWithoutContractsInput
    owner: UserCreateNestedOneWithoutOwnedContractsInput
  }

  export type ContractUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
    categoryId?: string | null
    versions?: ContractVersionUncheckedCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ContractVersionUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUpdateManyWithoutContractNestedInput
    category?: CategoryUpdateOneWithoutContractsNestedInput
    directory?: DirectoryUpdateOneRequiredWithoutContractsNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedContractsNestedInput
  }

  export type ContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: ContractVersionUncheckedUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractCreateManyInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
    categoryId?: string | null
  }

  export type ContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractVersionCreateInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
    contract: ContractCreateNestedOneWithoutVersionsInput
  }

  export type ContractVersionUncheckedCreateInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
    contractId: string
  }

  export type ContractVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contract?: ContractUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type ContractVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type ContractVersionCreateManyInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
    contractId: string
  }

  export type ContractVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignEnvelopeCreateInput = {
    id?: string
    envelopeId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    contract: ContractCreateNestedOneWithoutDocuSignEnvelopesInput
    signers?: DocuSignSignerCreateNestedManyWithoutEnvelopeInput
  }

  export type DocuSignEnvelopeUncheckedCreateInput = {
    id?: string
    envelopeId: string
    contractId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    signers?: DocuSignSignerUncheckedCreateNestedManyWithoutEnvelopeInput
  }

  export type DocuSignEnvelopeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contract?: ContractUpdateOneRequiredWithoutDocuSignEnvelopesNestedInput
    signers?: DocuSignSignerUpdateManyWithoutEnvelopeNestedInput
  }

  export type DocuSignEnvelopeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signers?: DocuSignSignerUncheckedUpdateManyWithoutEnvelopeNestedInput
  }

  export type DocuSignEnvelopeCreateManyInput = {
    id?: string
    envelopeId: string
    contractId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DocuSignEnvelopeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocuSignEnvelopeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocuSignSignerCreateInput = {
    id?: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    envelope: DocuSignEnvelopeCreateNestedOneWithoutSignersInput
  }

  export type DocuSignSignerUncheckedCreateInput = {
    id?: string
    envelopeId: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocuSignSignerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    envelope?: DocuSignEnvelopeUpdateOneRequiredWithoutSignersNestedInput
  }

  export type DocuSignSignerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignSignerCreateManyInput = {
    id?: string
    envelopeId: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocuSignSignerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignSignerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type ContractListRelationFilter = {
    every?: ContractWhereInput
    some?: ContractWhereInput
    none?: ContractWhereInput
  }

  export type UserGroupListRelationFilter = {
    every?: UserGroupWhereInput
    some?: UserGroupWhereInput
    none?: UserGroupWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContractOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    isActive?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    isActive?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    isActive?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type DirectoryAccessListRelationFilter = {
    every?: DirectoryAccessWhereInput
    some?: DirectoryAccessWhereInput
    none?: DirectoryAccessWhereInput
  }

  export type DirectoryAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserGroupUserIdGroupIdCompoundUniqueInput = {
    userId: string
    groupId: string
  }

  export type UserGroupCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    joinedAt?: SortOrder
  }

  export type UserGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    joinedAt?: SortOrder
  }

  export type UserGroupMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    groupId?: SortOrder
    joinedAt?: SortOrder
  }

  export type DirectoryNullableScalarRelationFilter = {
    is?: DirectoryWhereInput | null
    isNot?: DirectoryWhereInput | null
  }

  export type DirectoryListRelationFilter = {
    every?: DirectoryWhereInput
    some?: DirectoryWhereInput
    none?: DirectoryWhereInput
  }

  export type DirectoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DirectoryParentIdNameCompoundUniqueInput = {
    parentId: string
    name: string
  }

  export type DirectoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DirectoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DirectoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    path?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type DirectoryScalarRelationFilter = {
    is?: DirectoryWhereInput
    isNot?: DirectoryWhereInput
  }

  export type DirectoryAccessDirectoryIdGroupIdCompoundUniqueInput = {
    directoryId: string
    groupId: string
  }

  export type DirectoryAccessCountOrderByAggregateInput = {
    id?: SortOrder
    directoryId?: SortOrder
    groupId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type DirectoryAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    directoryId?: SortOrder
    groupId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type DirectoryAccessMinOrderByAggregateInput = {
    id?: SortOrder
    directoryId?: SortOrder
    groupId?: SortOrder
    permission?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type EnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
  }

  export type ContractVersionListRelationFilter = {
    every?: ContractVersionWhereInput
    some?: ContractVersionWhereInput
    none?: ContractVersionWhereInput
  }

  export type DocuSignEnvelopeListRelationFilter = {
    every?: DocuSignEnvelopeWhereInput
    some?: DocuSignEnvelopeWhereInput
    none?: DocuSignEnvelopeWhereInput
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type ContractVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocuSignEnvelopeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    contractNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    directoryId?: SortOrder
    categoryId?: SortOrder
  }

  export type ContractMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    contractNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    directoryId?: SortOrder
    categoryId?: SortOrder
  }

  export type ContractMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    contractNumber?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    directoryId?: SortOrder
    categoryId?: SortOrder
  }

  export type EnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ContractScalarRelationFilter = {
    is?: ContractWhereInput
    isNot?: ContractWhereInput
  }

  export type ContractVersionContractIdVersionCompoundUniqueInput = {
    contractId: string
    version: number
  }

  export type ContractVersionCountOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    changeNote?: SortOrder
    createdAt?: SortOrder
    contractId?: SortOrder
  }

  export type ContractVersionAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ContractVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    changeNote?: SortOrder
    createdAt?: SortOrder
    contractId?: SortOrder
  }

  export type ContractVersionMinOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    title?: SortOrder
    content?: SortOrder
    changeNote?: SortOrder
    createdAt?: SortOrder
    contractId?: SortOrder
  }

  export type ContractVersionSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type EnumDocuSignEnvelopeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignEnvelopeStatus | EnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel> | $Enums.DocuSignEnvelopeStatus
  }

  export type DocuSignSignerListRelationFilter = {
    every?: DocuSignSignerWhereInput
    some?: DocuSignSignerWhereInput
    none?: DocuSignSignerWhereInput
  }

  export type DocuSignSignerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocuSignEnvelopeCountOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    contractId?: SortOrder
    status?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DocuSignEnvelopeMaxOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    contractId?: SortOrder
    status?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type DocuSignEnvelopeMinOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    contractId?: SortOrder
    status?: SortOrder
    templateId?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type EnumDocuSignEnvelopeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignEnvelopeStatus | EnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignEnvelopeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocuSignEnvelopeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel>
    _max?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel>
  }

  export type EnumDocuSignSignerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignSignerStatus | EnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel> | $Enums.DocuSignSignerStatus
  }

  export type DocuSignEnvelopeScalarRelationFilter = {
    is?: DocuSignEnvelopeWhereInput
    isNot?: DocuSignEnvelopeWhereInput
  }

  export type DocuSignSignerEnvelopeIdRoutingOrderCompoundUniqueInput = {
    envelopeId: string
    routingOrder: number
  }

  export type DocuSignSignerCountOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    routingOrder?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    signedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocuSignSignerAvgOrderByAggregateInput = {
    routingOrder?: SortOrder
  }

  export type DocuSignSignerMaxOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    routingOrder?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    signedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocuSignSignerMinOrderByAggregateInput = {
    id?: SortOrder
    envelopeId?: SortOrder
    routingOrder?: SortOrder
    email?: SortOrder
    name?: SortOrder
    status?: SortOrder
    signedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocuSignSignerSumOrderByAggregateInput = {
    routingOrder?: SortOrder
  }

  export type EnumDocuSignSignerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignSignerStatus | EnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignSignerStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocuSignSignerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel>
    _max?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel>
  }

  export type ContractCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput> | ContractCreateWithoutOwnerInput[] | ContractUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutOwnerInput | ContractCreateOrConnectWithoutOwnerInput[]
    createMany?: ContractCreateManyOwnerInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type UserGroupCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput> | UserGroupCreateWithoutUserInput[] | UserGroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutUserInput | UserGroupCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupCreateManyUserInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ContractUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput> | ContractCreateWithoutOwnerInput[] | ContractUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutOwnerInput | ContractCreateOrConnectWithoutOwnerInput[]
    createMany?: ContractCreateManyOwnerInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type UserGroupUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput> | UserGroupCreateWithoutUserInput[] | UserGroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutUserInput | UserGroupCreateOrConnectWithoutUserInput[]
    createMany?: UserGroupCreateManyUserInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ContractUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput> | ContractCreateWithoutOwnerInput[] | ContractUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutOwnerInput | ContractCreateOrConnectWithoutOwnerInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutOwnerInput | ContractUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ContractCreateManyOwnerInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutOwnerInput | ContractUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutOwnerInput | ContractUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type UserGroupUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput> | UserGroupCreateWithoutUserInput[] | UserGroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutUserInput | UserGroupCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutUserInput | UserGroupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupCreateManyUserInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutUserInput | UserGroupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutUserInput | UserGroupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ContractUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput> | ContractCreateWithoutOwnerInput[] | ContractUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutOwnerInput | ContractCreateOrConnectWithoutOwnerInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutOwnerInput | ContractUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ContractCreateManyOwnerInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutOwnerInput | ContractUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutOwnerInput | ContractUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type UserGroupUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput> | UserGroupCreateWithoutUserInput[] | UserGroupUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutUserInput | UserGroupCreateOrConnectWithoutUserInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutUserInput | UserGroupUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGroupCreateManyUserInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutUserInput | UserGroupUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutUserInput | UserGroupUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type DirectoryAccessCreateNestedManyWithoutGroupInput = {
    create?: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput> | DirectoryAccessCreateWithoutGroupInput[] | DirectoryAccessUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutGroupInput | DirectoryAccessCreateOrConnectWithoutGroupInput[]
    createMany?: DirectoryAccessCreateManyGroupInputEnvelope
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
  }

  export type UserGroupCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type DirectoryAccessUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput> | DirectoryAccessCreateWithoutGroupInput[] | DirectoryAccessUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutGroupInput | DirectoryAccessCreateOrConnectWithoutGroupInput[]
    createMany?: DirectoryAccessCreateManyGroupInputEnvelope
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
  }

  export type UserGroupUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
  }

  export type DirectoryAccessUpdateManyWithoutGroupNestedInput = {
    create?: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput> | DirectoryAccessCreateWithoutGroupInput[] | DirectoryAccessUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutGroupInput | DirectoryAccessCreateOrConnectWithoutGroupInput[]
    upsert?: DirectoryAccessUpsertWithWhereUniqueWithoutGroupInput | DirectoryAccessUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: DirectoryAccessCreateManyGroupInputEnvelope
    set?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    disconnect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    delete?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    update?: DirectoryAccessUpdateWithWhereUniqueWithoutGroupInput | DirectoryAccessUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: DirectoryAccessUpdateManyWithWhereWithoutGroupInput | DirectoryAccessUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
  }

  export type UserGroupUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutGroupInput | UserGroupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutGroupInput | UserGroupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutGroupInput | UserGroupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type DirectoryAccessUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput> | DirectoryAccessCreateWithoutGroupInput[] | DirectoryAccessUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutGroupInput | DirectoryAccessCreateOrConnectWithoutGroupInput[]
    upsert?: DirectoryAccessUpsertWithWhereUniqueWithoutGroupInput | DirectoryAccessUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: DirectoryAccessCreateManyGroupInputEnvelope
    set?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    disconnect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    delete?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    update?: DirectoryAccessUpdateWithWhereUniqueWithoutGroupInput | DirectoryAccessUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: DirectoryAccessUpdateManyWithWhereWithoutGroupInput | DirectoryAccessUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
  }

  export type UserGroupUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput> | UserGroupCreateWithoutGroupInput[] | UserGroupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserGroupCreateOrConnectWithoutGroupInput | UserGroupCreateOrConnectWithoutGroupInput[]
    upsert?: UserGroupUpsertWithWhereUniqueWithoutGroupInput | UserGroupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserGroupCreateManyGroupInputEnvelope
    set?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    disconnect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    delete?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    connect?: UserGroupWhereUniqueInput | UserGroupWhereUniqueInput[]
    update?: UserGroupUpdateWithWhereUniqueWithoutGroupInput | UserGroupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserGroupUpdateManyWithWhereWithoutGroupInput | UserGroupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutUserGroupsInput = {
    create?: XOR<GroupCreateWithoutUserGroupsInput, GroupUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUserGroupsInput
    connect?: GroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserGroupsInput = {
    create?: XOR<UserCreateWithoutUserGroupsInput, UserUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutUserGroupsNestedInput = {
    create?: XOR<GroupCreateWithoutUserGroupsInput, GroupUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUserGroupsInput
    upsert?: GroupUpsertWithoutUserGroupsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutUserGroupsInput, GroupUpdateWithoutUserGroupsInput>, GroupUncheckedUpdateWithoutUserGroupsInput>
  }

  export type UserUpdateOneRequiredWithoutUserGroupsNestedInput = {
    create?: XOR<UserCreateWithoutUserGroupsInput, UserUncheckedCreateWithoutUserGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserGroupsInput
    upsert?: UserUpsertWithoutUserGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserGroupsInput, UserUpdateWithoutUserGroupsInput>, UserUncheckedUpdateWithoutUserGroupsInput>
  }

  export type ContractCreateNestedManyWithoutDirectoryInput = {
    create?: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput> | ContractCreateWithoutDirectoryInput[] | ContractUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutDirectoryInput | ContractCreateOrConnectWithoutDirectoryInput[]
    createMany?: ContractCreateManyDirectoryInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type DirectoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<DirectoryCreateWithoutChildrenInput, DirectoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutChildrenInput
    connect?: DirectoryWhereUniqueInput
  }

  export type DirectoryCreateNestedManyWithoutParentInput = {
    create?: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput> | DirectoryCreateWithoutParentInput[] | DirectoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DirectoryCreateOrConnectWithoutParentInput | DirectoryCreateOrConnectWithoutParentInput[]
    createMany?: DirectoryCreateManyParentInputEnvelope
    connect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
  }

  export type DirectoryAccessCreateNestedManyWithoutDirectoryInput = {
    create?: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput> | DirectoryAccessCreateWithoutDirectoryInput[] | DirectoryAccessUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutDirectoryInput | DirectoryAccessCreateOrConnectWithoutDirectoryInput[]
    createMany?: DirectoryAccessCreateManyDirectoryInputEnvelope
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
  }

  export type ContractUncheckedCreateNestedManyWithoutDirectoryInput = {
    create?: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput> | ContractCreateWithoutDirectoryInput[] | ContractUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutDirectoryInput | ContractCreateOrConnectWithoutDirectoryInput[]
    createMany?: ContractCreateManyDirectoryInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type DirectoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput> | DirectoryCreateWithoutParentInput[] | DirectoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DirectoryCreateOrConnectWithoutParentInput | DirectoryCreateOrConnectWithoutParentInput[]
    createMany?: DirectoryCreateManyParentInputEnvelope
    connect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
  }

  export type DirectoryAccessUncheckedCreateNestedManyWithoutDirectoryInput = {
    create?: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput> | DirectoryAccessCreateWithoutDirectoryInput[] | DirectoryAccessUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutDirectoryInput | DirectoryAccessCreateOrConnectWithoutDirectoryInput[]
    createMany?: DirectoryAccessCreateManyDirectoryInputEnvelope
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
  }

  export type ContractUpdateManyWithoutDirectoryNestedInput = {
    create?: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput> | ContractCreateWithoutDirectoryInput[] | ContractUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutDirectoryInput | ContractCreateOrConnectWithoutDirectoryInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutDirectoryInput | ContractUpsertWithWhereUniqueWithoutDirectoryInput[]
    createMany?: ContractCreateManyDirectoryInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutDirectoryInput | ContractUpdateWithWhereUniqueWithoutDirectoryInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutDirectoryInput | ContractUpdateManyWithWhereWithoutDirectoryInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type DirectoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<DirectoryCreateWithoutChildrenInput, DirectoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutChildrenInput
    upsert?: DirectoryUpsertWithoutChildrenInput
    disconnect?: DirectoryWhereInput | boolean
    delete?: DirectoryWhereInput | boolean
    connect?: DirectoryWhereUniqueInput
    update?: XOR<XOR<DirectoryUpdateToOneWithWhereWithoutChildrenInput, DirectoryUpdateWithoutChildrenInput>, DirectoryUncheckedUpdateWithoutChildrenInput>
  }

  export type DirectoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput> | DirectoryCreateWithoutParentInput[] | DirectoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DirectoryCreateOrConnectWithoutParentInput | DirectoryCreateOrConnectWithoutParentInput[]
    upsert?: DirectoryUpsertWithWhereUniqueWithoutParentInput | DirectoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DirectoryCreateManyParentInputEnvelope
    set?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    disconnect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    delete?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    connect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    update?: DirectoryUpdateWithWhereUniqueWithoutParentInput | DirectoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DirectoryUpdateManyWithWhereWithoutParentInput | DirectoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DirectoryScalarWhereInput | DirectoryScalarWhereInput[]
  }

  export type DirectoryAccessUpdateManyWithoutDirectoryNestedInput = {
    create?: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput> | DirectoryAccessCreateWithoutDirectoryInput[] | DirectoryAccessUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutDirectoryInput | DirectoryAccessCreateOrConnectWithoutDirectoryInput[]
    upsert?: DirectoryAccessUpsertWithWhereUniqueWithoutDirectoryInput | DirectoryAccessUpsertWithWhereUniqueWithoutDirectoryInput[]
    createMany?: DirectoryAccessCreateManyDirectoryInputEnvelope
    set?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    disconnect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    delete?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    update?: DirectoryAccessUpdateWithWhereUniqueWithoutDirectoryInput | DirectoryAccessUpdateWithWhereUniqueWithoutDirectoryInput[]
    updateMany?: DirectoryAccessUpdateManyWithWhereWithoutDirectoryInput | DirectoryAccessUpdateManyWithWhereWithoutDirectoryInput[]
    deleteMany?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
  }

  export type ContractUncheckedUpdateManyWithoutDirectoryNestedInput = {
    create?: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput> | ContractCreateWithoutDirectoryInput[] | ContractUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutDirectoryInput | ContractCreateOrConnectWithoutDirectoryInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutDirectoryInput | ContractUpsertWithWhereUniqueWithoutDirectoryInput[]
    createMany?: ContractCreateManyDirectoryInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutDirectoryInput | ContractUpdateWithWhereUniqueWithoutDirectoryInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutDirectoryInput | ContractUpdateManyWithWhereWithoutDirectoryInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type DirectoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput> | DirectoryCreateWithoutParentInput[] | DirectoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DirectoryCreateOrConnectWithoutParentInput | DirectoryCreateOrConnectWithoutParentInput[]
    upsert?: DirectoryUpsertWithWhereUniqueWithoutParentInput | DirectoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DirectoryCreateManyParentInputEnvelope
    set?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    disconnect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    delete?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    connect?: DirectoryWhereUniqueInput | DirectoryWhereUniqueInput[]
    update?: DirectoryUpdateWithWhereUniqueWithoutParentInput | DirectoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DirectoryUpdateManyWithWhereWithoutParentInput | DirectoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DirectoryScalarWhereInput | DirectoryScalarWhereInput[]
  }

  export type DirectoryAccessUncheckedUpdateManyWithoutDirectoryNestedInput = {
    create?: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput> | DirectoryAccessCreateWithoutDirectoryInput[] | DirectoryAccessUncheckedCreateWithoutDirectoryInput[]
    connectOrCreate?: DirectoryAccessCreateOrConnectWithoutDirectoryInput | DirectoryAccessCreateOrConnectWithoutDirectoryInput[]
    upsert?: DirectoryAccessUpsertWithWhereUniqueWithoutDirectoryInput | DirectoryAccessUpsertWithWhereUniqueWithoutDirectoryInput[]
    createMany?: DirectoryAccessCreateManyDirectoryInputEnvelope
    set?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    disconnect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    delete?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    connect?: DirectoryAccessWhereUniqueInput | DirectoryAccessWhereUniqueInput[]
    update?: DirectoryAccessUpdateWithWhereUniqueWithoutDirectoryInput | DirectoryAccessUpdateWithWhereUniqueWithoutDirectoryInput[]
    updateMany?: DirectoryAccessUpdateManyWithWhereWithoutDirectoryInput | DirectoryAccessUpdateManyWithWhereWithoutDirectoryInput[]
    deleteMany?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
  }

  export type DirectoryCreateNestedOneWithoutDirectoryAccessInput = {
    create?: XOR<DirectoryCreateWithoutDirectoryAccessInput, DirectoryUncheckedCreateWithoutDirectoryAccessInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutDirectoryAccessInput
    connect?: DirectoryWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutDirectoryAccessInput = {
    create?: XOR<GroupCreateWithoutDirectoryAccessInput, GroupUncheckedCreateWithoutDirectoryAccessInput>
    connectOrCreate?: GroupCreateOrConnectWithoutDirectoryAccessInput
    connect?: GroupWhereUniqueInput
  }

  export type EnumPermissionFieldUpdateOperationsInput = {
    set?: $Enums.Permission
  }

  export type DirectoryUpdateOneRequiredWithoutDirectoryAccessNestedInput = {
    create?: XOR<DirectoryCreateWithoutDirectoryAccessInput, DirectoryUncheckedCreateWithoutDirectoryAccessInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutDirectoryAccessInput
    upsert?: DirectoryUpsertWithoutDirectoryAccessInput
    connect?: DirectoryWhereUniqueInput
    update?: XOR<XOR<DirectoryUpdateToOneWithWhereWithoutDirectoryAccessInput, DirectoryUpdateWithoutDirectoryAccessInput>, DirectoryUncheckedUpdateWithoutDirectoryAccessInput>
  }

  export type GroupUpdateOneRequiredWithoutDirectoryAccessNestedInput = {
    create?: XOR<GroupCreateWithoutDirectoryAccessInput, GroupUncheckedCreateWithoutDirectoryAccessInput>
    connectOrCreate?: GroupCreateOrConnectWithoutDirectoryAccessInput
    upsert?: GroupUpsertWithoutDirectoryAccessInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutDirectoryAccessInput, GroupUpdateWithoutDirectoryAccessInput>, GroupUncheckedUpdateWithoutDirectoryAccessInput>
  }

  export type ContractVersionCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput> | ContractVersionCreateWithoutContractInput[] | ContractVersionUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractVersionCreateOrConnectWithoutContractInput | ContractVersionCreateOrConnectWithoutContractInput[]
    createMany?: ContractVersionCreateManyContractInputEnvelope
    connect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
  }

  export type DocuSignEnvelopeCreateNestedManyWithoutContractInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput> | DocuSignEnvelopeCreateWithoutContractInput[] | DocuSignEnvelopeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutContractInput | DocuSignEnvelopeCreateOrConnectWithoutContractInput[]
    createMany?: DocuSignEnvelopeCreateManyContractInputEnvelope
    connect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
  }

  export type CategoryCreateNestedOneWithoutContractsInput = {
    create?: XOR<CategoryCreateWithoutContractsInput, CategoryUncheckedCreateWithoutContractsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutContractsInput
    connect?: CategoryWhereUniqueInput
  }

  export type DirectoryCreateNestedOneWithoutContractsInput = {
    create?: XOR<DirectoryCreateWithoutContractsInput, DirectoryUncheckedCreateWithoutContractsInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutContractsInput
    connect?: DirectoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOwnedContractsInput = {
    create?: XOR<UserCreateWithoutOwnedContractsInput, UserUncheckedCreateWithoutOwnedContractsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedContractsInput
    connect?: UserWhereUniqueInput
  }

  export type ContractVersionUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput> | ContractVersionCreateWithoutContractInput[] | ContractVersionUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractVersionCreateOrConnectWithoutContractInput | ContractVersionCreateOrConnectWithoutContractInput[]
    createMany?: ContractVersionCreateManyContractInputEnvelope
    connect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
  }

  export type DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput> | DocuSignEnvelopeCreateWithoutContractInput[] | DocuSignEnvelopeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutContractInput | DocuSignEnvelopeCreateOrConnectWithoutContractInput[]
    createMany?: DocuSignEnvelopeCreateManyContractInputEnvelope
    connect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
  }

  export type EnumContractStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContractStatus
  }

  export type ContractVersionUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput> | ContractVersionCreateWithoutContractInput[] | ContractVersionUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractVersionCreateOrConnectWithoutContractInput | ContractVersionCreateOrConnectWithoutContractInput[]
    upsert?: ContractVersionUpsertWithWhereUniqueWithoutContractInput | ContractVersionUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractVersionCreateManyContractInputEnvelope
    set?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    disconnect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    delete?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    connect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    update?: ContractVersionUpdateWithWhereUniqueWithoutContractInput | ContractVersionUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractVersionUpdateManyWithWhereWithoutContractInput | ContractVersionUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractVersionScalarWhereInput | ContractVersionScalarWhereInput[]
  }

  export type DocuSignEnvelopeUpdateManyWithoutContractNestedInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput> | DocuSignEnvelopeCreateWithoutContractInput[] | DocuSignEnvelopeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutContractInput | DocuSignEnvelopeCreateOrConnectWithoutContractInput[]
    upsert?: DocuSignEnvelopeUpsertWithWhereUniqueWithoutContractInput | DocuSignEnvelopeUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: DocuSignEnvelopeCreateManyContractInputEnvelope
    set?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    disconnect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    delete?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    connect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    update?: DocuSignEnvelopeUpdateWithWhereUniqueWithoutContractInput | DocuSignEnvelopeUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: DocuSignEnvelopeUpdateManyWithWhereWithoutContractInput | DocuSignEnvelopeUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: DocuSignEnvelopeScalarWhereInput | DocuSignEnvelopeScalarWhereInput[]
  }

  export type CategoryUpdateOneWithoutContractsNestedInput = {
    create?: XOR<CategoryCreateWithoutContractsInput, CategoryUncheckedCreateWithoutContractsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutContractsInput
    upsert?: CategoryUpsertWithoutContractsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutContractsInput, CategoryUpdateWithoutContractsInput>, CategoryUncheckedUpdateWithoutContractsInput>
  }

  export type DirectoryUpdateOneRequiredWithoutContractsNestedInput = {
    create?: XOR<DirectoryCreateWithoutContractsInput, DirectoryUncheckedCreateWithoutContractsInput>
    connectOrCreate?: DirectoryCreateOrConnectWithoutContractsInput
    upsert?: DirectoryUpsertWithoutContractsInput
    connect?: DirectoryWhereUniqueInput
    update?: XOR<XOR<DirectoryUpdateToOneWithWhereWithoutContractsInput, DirectoryUpdateWithoutContractsInput>, DirectoryUncheckedUpdateWithoutContractsInput>
  }

  export type UserUpdateOneRequiredWithoutOwnedContractsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedContractsInput, UserUncheckedCreateWithoutOwnedContractsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedContractsInput
    upsert?: UserUpsertWithoutOwnedContractsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedContractsInput, UserUpdateWithoutOwnedContractsInput>, UserUncheckedUpdateWithoutOwnedContractsInput>
  }

  export type ContractVersionUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput> | ContractVersionCreateWithoutContractInput[] | ContractVersionUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractVersionCreateOrConnectWithoutContractInput | ContractVersionCreateOrConnectWithoutContractInput[]
    upsert?: ContractVersionUpsertWithWhereUniqueWithoutContractInput | ContractVersionUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractVersionCreateManyContractInputEnvelope
    set?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    disconnect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    delete?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    connect?: ContractVersionWhereUniqueInput | ContractVersionWhereUniqueInput[]
    update?: ContractVersionUpdateWithWhereUniqueWithoutContractInput | ContractVersionUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractVersionUpdateManyWithWhereWithoutContractInput | ContractVersionUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractVersionScalarWhereInput | ContractVersionScalarWhereInput[]
  }

  export type DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput> | DocuSignEnvelopeCreateWithoutContractInput[] | DocuSignEnvelopeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutContractInput | DocuSignEnvelopeCreateOrConnectWithoutContractInput[]
    upsert?: DocuSignEnvelopeUpsertWithWhereUniqueWithoutContractInput | DocuSignEnvelopeUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: DocuSignEnvelopeCreateManyContractInputEnvelope
    set?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    disconnect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    delete?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    connect?: DocuSignEnvelopeWhereUniqueInput | DocuSignEnvelopeWhereUniqueInput[]
    update?: DocuSignEnvelopeUpdateWithWhereUniqueWithoutContractInput | DocuSignEnvelopeUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: DocuSignEnvelopeUpdateManyWithWhereWithoutContractInput | DocuSignEnvelopeUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: DocuSignEnvelopeScalarWhereInput | DocuSignEnvelopeScalarWhereInput[]
  }

  export type ContractCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput> | ContractCreateWithoutCategoryInput[] | ContractUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCategoryInput | ContractCreateOrConnectWithoutCategoryInput[]
    createMany?: ContractCreateManyCategoryInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type ContractUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput> | ContractCreateWithoutCategoryInput[] | ContractUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCategoryInput | ContractCreateOrConnectWithoutCategoryInput[]
    createMany?: ContractCreateManyCategoryInputEnvelope
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
  }

  export type ContractUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput> | ContractCreateWithoutCategoryInput[] | ContractUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCategoryInput | ContractCreateOrConnectWithoutCategoryInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutCategoryInput | ContractUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ContractCreateManyCategoryInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutCategoryInput | ContractUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutCategoryInput | ContractUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type ContractUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput> | ContractCreateWithoutCategoryInput[] | ContractUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ContractCreateOrConnectWithoutCategoryInput | ContractCreateOrConnectWithoutCategoryInput[]
    upsert?: ContractUpsertWithWhereUniqueWithoutCategoryInput | ContractUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ContractCreateManyCategoryInputEnvelope
    set?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    disconnect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    delete?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    connect?: ContractWhereUniqueInput | ContractWhereUniqueInput[]
    update?: ContractUpdateWithWhereUniqueWithoutCategoryInput | ContractUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ContractUpdateManyWithWhereWithoutCategoryInput | ContractUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ContractScalarWhereInput | ContractScalarWhereInput[]
  }

  export type ContractCreateNestedOneWithoutVersionsInput = {
    create?: XOR<ContractCreateWithoutVersionsInput, ContractUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ContractCreateOrConnectWithoutVersionsInput
    connect?: ContractWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContractUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<ContractCreateWithoutVersionsInput, ContractUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: ContractCreateOrConnectWithoutVersionsInput
    upsert?: ContractUpsertWithoutVersionsInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutVersionsInput, ContractUpdateWithoutVersionsInput>, ContractUncheckedUpdateWithoutVersionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type ContractCreateNestedOneWithoutDocuSignEnvelopesInput = {
    create?: XOR<ContractCreateWithoutDocuSignEnvelopesInput, ContractUncheckedCreateWithoutDocuSignEnvelopesInput>
    connectOrCreate?: ContractCreateOrConnectWithoutDocuSignEnvelopesInput
    connect?: ContractWhereUniqueInput
  }

  export type DocuSignSignerCreateNestedManyWithoutEnvelopeInput = {
    create?: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput> | DocuSignSignerCreateWithoutEnvelopeInput[] | DocuSignSignerUncheckedCreateWithoutEnvelopeInput[]
    connectOrCreate?: DocuSignSignerCreateOrConnectWithoutEnvelopeInput | DocuSignSignerCreateOrConnectWithoutEnvelopeInput[]
    createMany?: DocuSignSignerCreateManyEnvelopeInputEnvelope
    connect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
  }

  export type DocuSignSignerUncheckedCreateNestedManyWithoutEnvelopeInput = {
    create?: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput> | DocuSignSignerCreateWithoutEnvelopeInput[] | DocuSignSignerUncheckedCreateWithoutEnvelopeInput[]
    connectOrCreate?: DocuSignSignerCreateOrConnectWithoutEnvelopeInput | DocuSignSignerCreateOrConnectWithoutEnvelopeInput[]
    createMany?: DocuSignSignerCreateManyEnvelopeInputEnvelope
    connect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
  }

  export type EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocuSignEnvelopeStatus
  }

  export type ContractUpdateOneRequiredWithoutDocuSignEnvelopesNestedInput = {
    create?: XOR<ContractCreateWithoutDocuSignEnvelopesInput, ContractUncheckedCreateWithoutDocuSignEnvelopesInput>
    connectOrCreate?: ContractCreateOrConnectWithoutDocuSignEnvelopesInput
    upsert?: ContractUpsertWithoutDocuSignEnvelopesInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutDocuSignEnvelopesInput, ContractUpdateWithoutDocuSignEnvelopesInput>, ContractUncheckedUpdateWithoutDocuSignEnvelopesInput>
  }

  export type DocuSignSignerUpdateManyWithoutEnvelopeNestedInput = {
    create?: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput> | DocuSignSignerCreateWithoutEnvelopeInput[] | DocuSignSignerUncheckedCreateWithoutEnvelopeInput[]
    connectOrCreate?: DocuSignSignerCreateOrConnectWithoutEnvelopeInput | DocuSignSignerCreateOrConnectWithoutEnvelopeInput[]
    upsert?: DocuSignSignerUpsertWithWhereUniqueWithoutEnvelopeInput | DocuSignSignerUpsertWithWhereUniqueWithoutEnvelopeInput[]
    createMany?: DocuSignSignerCreateManyEnvelopeInputEnvelope
    set?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    disconnect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    delete?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    connect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    update?: DocuSignSignerUpdateWithWhereUniqueWithoutEnvelopeInput | DocuSignSignerUpdateWithWhereUniqueWithoutEnvelopeInput[]
    updateMany?: DocuSignSignerUpdateManyWithWhereWithoutEnvelopeInput | DocuSignSignerUpdateManyWithWhereWithoutEnvelopeInput[]
    deleteMany?: DocuSignSignerScalarWhereInput | DocuSignSignerScalarWhereInput[]
  }

  export type DocuSignSignerUncheckedUpdateManyWithoutEnvelopeNestedInput = {
    create?: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput> | DocuSignSignerCreateWithoutEnvelopeInput[] | DocuSignSignerUncheckedCreateWithoutEnvelopeInput[]
    connectOrCreate?: DocuSignSignerCreateOrConnectWithoutEnvelopeInput | DocuSignSignerCreateOrConnectWithoutEnvelopeInput[]
    upsert?: DocuSignSignerUpsertWithWhereUniqueWithoutEnvelopeInput | DocuSignSignerUpsertWithWhereUniqueWithoutEnvelopeInput[]
    createMany?: DocuSignSignerCreateManyEnvelopeInputEnvelope
    set?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    disconnect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    delete?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    connect?: DocuSignSignerWhereUniqueInput | DocuSignSignerWhereUniqueInput[]
    update?: DocuSignSignerUpdateWithWhereUniqueWithoutEnvelopeInput | DocuSignSignerUpdateWithWhereUniqueWithoutEnvelopeInput[]
    updateMany?: DocuSignSignerUpdateManyWithWhereWithoutEnvelopeInput | DocuSignSignerUpdateManyWithWhereWithoutEnvelopeInput[]
    deleteMany?: DocuSignSignerScalarWhereInput | DocuSignSignerScalarWhereInput[]
  }

  export type DocuSignEnvelopeCreateNestedOneWithoutSignersInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutSignersInput, DocuSignEnvelopeUncheckedCreateWithoutSignersInput>
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutSignersInput
    connect?: DocuSignEnvelopeWhereUniqueInput
  }

  export type EnumDocuSignSignerStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocuSignSignerStatus
  }

  export type DocuSignEnvelopeUpdateOneRequiredWithoutSignersNestedInput = {
    create?: XOR<DocuSignEnvelopeCreateWithoutSignersInput, DocuSignEnvelopeUncheckedCreateWithoutSignersInput>
    connectOrCreate?: DocuSignEnvelopeCreateOrConnectWithoutSignersInput
    upsert?: DocuSignEnvelopeUpsertWithoutSignersInput
    connect?: DocuSignEnvelopeWhereUniqueInput
    update?: XOR<XOR<DocuSignEnvelopeUpdateToOneWithWhereWithoutSignersInput, DocuSignEnvelopeUpdateWithoutSignersInput>, DocuSignEnvelopeUncheckedUpdateWithoutSignersInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type NestedEnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type NestedEnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
  }

  export type NestedEnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignEnvelopeStatus | EnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel> | $Enums.DocuSignEnvelopeStatus
  }

  export type NestedEnumDocuSignEnvelopeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignEnvelopeStatus | EnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignEnvelopeStatus[] | ListEnumDocuSignEnvelopeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignEnvelopeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocuSignEnvelopeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel>
    _max?: NestedEnumDocuSignEnvelopeStatusFilter<$PrismaModel>
  }

  export type NestedEnumDocuSignSignerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignSignerStatus | EnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel> | $Enums.DocuSignSignerStatus
  }

  export type NestedEnumDocuSignSignerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocuSignSignerStatus | EnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocuSignSignerStatus[] | ListEnumDocuSignSignerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocuSignSignerStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocuSignSignerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel>
    _max?: NestedEnumDocuSignSignerStatusFilter<$PrismaModel>
  }

  export type ContractCreateWithoutOwnerInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: ContractVersionCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeCreateNestedManyWithoutContractInput
    category?: CategoryCreateNestedOneWithoutContractsInput
    directory: DirectoryCreateNestedOneWithoutContractsInput
  }

  export type ContractUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryId: string
    categoryId?: string | null
    versions?: ContractVersionUncheckedCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutOwnerInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput>
  }

  export type ContractCreateManyOwnerInputEnvelope = {
    data: ContractCreateManyOwnerInput | ContractCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type UserGroupCreateWithoutUserInput = {
    id?: string
    joinedAt?: Date | string
    group: GroupCreateNestedOneWithoutUserGroupsInput
  }

  export type UserGroupUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    joinedAt?: Date | string
  }

  export type UserGroupCreateOrConnectWithoutUserInput = {
    where: UserGroupWhereUniqueInput
    create: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput>
  }

  export type UserGroupCreateManyUserInputEnvelope = {
    data: UserGroupCreateManyUserInput | UserGroupCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ContractUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ContractWhereUniqueInput
    update: XOR<ContractUpdateWithoutOwnerInput, ContractUncheckedUpdateWithoutOwnerInput>
    create: XOR<ContractCreateWithoutOwnerInput, ContractUncheckedCreateWithoutOwnerInput>
  }

  export type ContractUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ContractWhereUniqueInput
    data: XOR<ContractUpdateWithoutOwnerInput, ContractUncheckedUpdateWithoutOwnerInput>
  }

  export type ContractUpdateManyWithWhereWithoutOwnerInput = {
    where: ContractScalarWhereInput
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ContractScalarWhereInput = {
    AND?: ContractScalarWhereInput | ContractScalarWhereInput[]
    OR?: ContractScalarWhereInput[]
    NOT?: ContractScalarWhereInput | ContractScalarWhereInput[]
    id?: StringFilter<"Contract"> | string
    title?: StringFilter<"Contract"> | string
    content?: StringFilter<"Contract"> | string
    status?: EnumContractStatusFilter<"Contract"> | $Enums.ContractStatus
    contractNumber?: StringNullableFilter<"Contract"> | string | null
    startDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    endDate?: DateTimeNullableFilter<"Contract"> | Date | string | null
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    ownerId?: StringFilter<"Contract"> | string
    directoryId?: StringFilter<"Contract"> | string
    categoryId?: StringNullableFilter<"Contract"> | string | null
  }

  export type UserGroupUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGroupWhereUniqueInput
    update: XOR<UserGroupUpdateWithoutUserInput, UserGroupUncheckedUpdateWithoutUserInput>
    create: XOR<UserGroupCreateWithoutUserInput, UserGroupUncheckedCreateWithoutUserInput>
  }

  export type UserGroupUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGroupWhereUniqueInput
    data: XOR<UserGroupUpdateWithoutUserInput, UserGroupUncheckedUpdateWithoutUserInput>
  }

  export type UserGroupUpdateManyWithWhereWithoutUserInput = {
    where: UserGroupScalarWhereInput
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGroupScalarWhereInput = {
    AND?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    OR?: UserGroupScalarWhereInput[]
    NOT?: UserGroupScalarWhereInput | UserGroupScalarWhereInput[]
    id?: StringFilter<"UserGroup"> | string
    userId?: StringFilter<"UserGroup"> | string
    groupId?: StringFilter<"UserGroup"> | string
    joinedAt?: DateTimeFilter<"UserGroup"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type DirectoryAccessCreateWithoutGroupInput = {
    id?: string
    permission?: $Enums.Permission
    createdAt?: Date | string
    directory: DirectoryCreateNestedOneWithoutDirectoryAccessInput
  }

  export type DirectoryAccessUncheckedCreateWithoutGroupInput = {
    id?: string
    directoryId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type DirectoryAccessCreateOrConnectWithoutGroupInput = {
    where: DirectoryAccessWhereUniqueInput
    create: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput>
  }

  export type DirectoryAccessCreateManyGroupInputEnvelope = {
    data: DirectoryAccessCreateManyGroupInput | DirectoryAccessCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserGroupCreateWithoutGroupInput = {
    id?: string
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutUserGroupsInput
  }

  export type UserGroupUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type UserGroupCreateOrConnectWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    create: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupCreateManyGroupInputEnvelope = {
    data: UserGroupCreateManyGroupInput | UserGroupCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type DirectoryAccessUpsertWithWhereUniqueWithoutGroupInput = {
    where: DirectoryAccessWhereUniqueInput
    update: XOR<DirectoryAccessUpdateWithoutGroupInput, DirectoryAccessUncheckedUpdateWithoutGroupInput>
    create: XOR<DirectoryAccessCreateWithoutGroupInput, DirectoryAccessUncheckedCreateWithoutGroupInput>
  }

  export type DirectoryAccessUpdateWithWhereUniqueWithoutGroupInput = {
    where: DirectoryAccessWhereUniqueInput
    data: XOR<DirectoryAccessUpdateWithoutGroupInput, DirectoryAccessUncheckedUpdateWithoutGroupInput>
  }

  export type DirectoryAccessUpdateManyWithWhereWithoutGroupInput = {
    where: DirectoryAccessScalarWhereInput
    data: XOR<DirectoryAccessUpdateManyMutationInput, DirectoryAccessUncheckedUpdateManyWithoutGroupInput>
  }

  export type DirectoryAccessScalarWhereInput = {
    AND?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
    OR?: DirectoryAccessScalarWhereInput[]
    NOT?: DirectoryAccessScalarWhereInput | DirectoryAccessScalarWhereInput[]
    id?: StringFilter<"DirectoryAccess"> | string
    directoryId?: StringFilter<"DirectoryAccess"> | string
    groupId?: StringFilter<"DirectoryAccess"> | string
    permission?: EnumPermissionFilter<"DirectoryAccess"> | $Enums.Permission
    createdAt?: DateTimeFilter<"DirectoryAccess"> | Date | string
  }

  export type UserGroupUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    update: XOR<UserGroupUpdateWithoutGroupInput, UserGroupUncheckedUpdateWithoutGroupInput>
    create: XOR<UserGroupCreateWithoutGroupInput, UserGroupUncheckedCreateWithoutGroupInput>
  }

  export type UserGroupUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserGroupWhereUniqueInput
    data: XOR<UserGroupUpdateWithoutGroupInput, UserGroupUncheckedUpdateWithoutGroupInput>
  }

  export type UserGroupUpdateManyWithWhereWithoutGroupInput = {
    where: UserGroupScalarWhereInput
    data: XOR<UserGroupUpdateManyMutationInput, UserGroupUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupCreateWithoutUserGroupsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutUserGroupsInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutUserGroupsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUserGroupsInput, GroupUncheckedCreateWithoutUserGroupsInput>
  }

  export type UserCreateWithoutUserGroupsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractCreateNestedManyWithoutOwnerInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserGroupsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractUncheckedCreateNestedManyWithoutOwnerInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserGroupsInput, UserUncheckedCreateWithoutUserGroupsInput>
  }

  export type GroupUpsertWithoutUserGroupsInput = {
    update: XOR<GroupUpdateWithoutUserGroupsInput, GroupUncheckedUpdateWithoutUserGroupsInput>
    create: XOR<GroupCreateWithoutUserGroupsInput, GroupUncheckedCreateWithoutUserGroupsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutUserGroupsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutUserGroupsInput, GroupUncheckedUpdateWithoutUserGroupsInput>
  }

  export type GroupUpdateWithoutUserGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryAccess?: DirectoryAccessUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutUserGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserUpsertWithoutUserGroupsInput = {
    update: XOR<UserUpdateWithoutUserGroupsInput, UserUncheckedUpdateWithoutUserGroupsInput>
    create: XOR<UserCreateWithoutUserGroupsInput, UserUncheckedCreateWithoutUserGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserGroupsInput, UserUncheckedUpdateWithoutUserGroupsInput>
  }

  export type UserUpdateWithoutUserGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUpdateManyWithoutOwnerNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUncheckedUpdateManyWithoutOwnerNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ContractCreateWithoutDirectoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: ContractVersionCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeCreateNestedManyWithoutContractInput
    category?: CategoryCreateNestedOneWithoutContractsInput
    owner: UserCreateNestedOneWithoutOwnedContractsInput
  }

  export type ContractUncheckedCreateWithoutDirectoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    categoryId?: string | null
    versions?: ContractVersionUncheckedCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutDirectoryInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput>
  }

  export type ContractCreateManyDirectoryInputEnvelope = {
    data: ContractCreateManyDirectoryInput | ContractCreateManyDirectoryInput[]
    skipDuplicates?: boolean
  }

  export type DirectoryCreateWithoutChildrenInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractCreateNestedManyWithoutDirectoryInput
    parent?: DirectoryCreateNestedOneWithoutChildrenInput
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractUncheckedCreateNestedManyWithoutDirectoryInput
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryCreateOrConnectWithoutChildrenInput = {
    where: DirectoryWhereUniqueInput
    create: XOR<DirectoryCreateWithoutChildrenInput, DirectoryUncheckedCreateWithoutChildrenInput>
  }

  export type DirectoryCreateWithoutParentInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractCreateNestedManyWithoutDirectoryInput
    children?: DirectoryCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractUncheckedCreateNestedManyWithoutDirectoryInput
    children?: DirectoryUncheckedCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryCreateOrConnectWithoutParentInput = {
    where: DirectoryWhereUniqueInput
    create: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput>
  }

  export type DirectoryCreateManyParentInputEnvelope = {
    data: DirectoryCreateManyParentInput | DirectoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type DirectoryAccessCreateWithoutDirectoryInput = {
    id?: string
    permission?: $Enums.Permission
    createdAt?: Date | string
    group: GroupCreateNestedOneWithoutDirectoryAccessInput
  }

  export type DirectoryAccessUncheckedCreateWithoutDirectoryInput = {
    id?: string
    groupId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type DirectoryAccessCreateOrConnectWithoutDirectoryInput = {
    where: DirectoryAccessWhereUniqueInput
    create: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput>
  }

  export type DirectoryAccessCreateManyDirectoryInputEnvelope = {
    data: DirectoryAccessCreateManyDirectoryInput | DirectoryAccessCreateManyDirectoryInput[]
    skipDuplicates?: boolean
  }

  export type ContractUpsertWithWhereUniqueWithoutDirectoryInput = {
    where: ContractWhereUniqueInput
    update: XOR<ContractUpdateWithoutDirectoryInput, ContractUncheckedUpdateWithoutDirectoryInput>
    create: XOR<ContractCreateWithoutDirectoryInput, ContractUncheckedCreateWithoutDirectoryInput>
  }

  export type ContractUpdateWithWhereUniqueWithoutDirectoryInput = {
    where: ContractWhereUniqueInput
    data: XOR<ContractUpdateWithoutDirectoryInput, ContractUncheckedUpdateWithoutDirectoryInput>
  }

  export type ContractUpdateManyWithWhereWithoutDirectoryInput = {
    where: ContractScalarWhereInput
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyWithoutDirectoryInput>
  }

  export type DirectoryUpsertWithoutChildrenInput = {
    update: XOR<DirectoryUpdateWithoutChildrenInput, DirectoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<DirectoryCreateWithoutChildrenInput, DirectoryUncheckedCreateWithoutChildrenInput>
    where?: DirectoryWhereInput
  }

  export type DirectoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: DirectoryWhereInput
    data: XOR<DirectoryUpdateWithoutChildrenInput, DirectoryUncheckedUpdateWithoutChildrenInput>
  }

  export type DirectoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUpdateManyWithoutDirectoryNestedInput
    parent?: DirectoryUpdateOneWithoutChildrenNestedInput
    directoryAccess?: DirectoryAccessUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUncheckedUpdateManyWithoutDirectoryNestedInput
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUpsertWithWhereUniqueWithoutParentInput = {
    where: DirectoryWhereUniqueInput
    update: XOR<DirectoryUpdateWithoutParentInput, DirectoryUncheckedUpdateWithoutParentInput>
    create: XOR<DirectoryCreateWithoutParentInput, DirectoryUncheckedCreateWithoutParentInput>
  }

  export type DirectoryUpdateWithWhereUniqueWithoutParentInput = {
    where: DirectoryWhereUniqueInput
    data: XOR<DirectoryUpdateWithoutParentInput, DirectoryUncheckedUpdateWithoutParentInput>
  }

  export type DirectoryUpdateManyWithWhereWithoutParentInput = {
    where: DirectoryScalarWhereInput
    data: XOR<DirectoryUpdateManyMutationInput, DirectoryUncheckedUpdateManyWithoutParentInput>
  }

  export type DirectoryScalarWhereInput = {
    AND?: DirectoryScalarWhereInput | DirectoryScalarWhereInput[]
    OR?: DirectoryScalarWhereInput[]
    NOT?: DirectoryScalarWhereInput | DirectoryScalarWhereInput[]
    id?: StringFilter<"Directory"> | string
    name?: StringFilter<"Directory"> | string
    description?: StringNullableFilter<"Directory"> | string | null
    parentId?: StringNullableFilter<"Directory"> | string | null
    path?: StringFilter<"Directory"> | string
    isActive?: BoolFilter<"Directory"> | boolean
    createdAt?: DateTimeFilter<"Directory"> | Date | string
    updatedAt?: DateTimeFilter<"Directory"> | Date | string
  }

  export type DirectoryAccessUpsertWithWhereUniqueWithoutDirectoryInput = {
    where: DirectoryAccessWhereUniqueInput
    update: XOR<DirectoryAccessUpdateWithoutDirectoryInput, DirectoryAccessUncheckedUpdateWithoutDirectoryInput>
    create: XOR<DirectoryAccessCreateWithoutDirectoryInput, DirectoryAccessUncheckedCreateWithoutDirectoryInput>
  }

  export type DirectoryAccessUpdateWithWhereUniqueWithoutDirectoryInput = {
    where: DirectoryAccessWhereUniqueInput
    data: XOR<DirectoryAccessUpdateWithoutDirectoryInput, DirectoryAccessUncheckedUpdateWithoutDirectoryInput>
  }

  export type DirectoryAccessUpdateManyWithWhereWithoutDirectoryInput = {
    where: DirectoryAccessScalarWhereInput
    data: XOR<DirectoryAccessUpdateManyMutationInput, DirectoryAccessUncheckedUpdateManyWithoutDirectoryInput>
  }

  export type DirectoryCreateWithoutDirectoryAccessInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractCreateNestedManyWithoutDirectoryInput
    parent?: DirectoryCreateNestedOneWithoutChildrenInput
    children?: DirectoryCreateNestedManyWithoutParentInput
  }

  export type DirectoryUncheckedCreateWithoutDirectoryAccessInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contracts?: ContractUncheckedCreateNestedManyWithoutDirectoryInput
    children?: DirectoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type DirectoryCreateOrConnectWithoutDirectoryAccessInput = {
    where: DirectoryWhereUniqueInput
    create: XOR<DirectoryCreateWithoutDirectoryAccessInput, DirectoryUncheckedCreateWithoutDirectoryAccessInput>
  }

  export type GroupCreateWithoutDirectoryAccessInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userGroups?: UserGroupCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutDirectoryAccessInput = {
    id?: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutDirectoryAccessInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutDirectoryAccessInput, GroupUncheckedCreateWithoutDirectoryAccessInput>
  }

  export type DirectoryUpsertWithoutDirectoryAccessInput = {
    update: XOR<DirectoryUpdateWithoutDirectoryAccessInput, DirectoryUncheckedUpdateWithoutDirectoryAccessInput>
    create: XOR<DirectoryCreateWithoutDirectoryAccessInput, DirectoryUncheckedCreateWithoutDirectoryAccessInput>
    where?: DirectoryWhereInput
  }

  export type DirectoryUpdateToOneWithWhereWithoutDirectoryAccessInput = {
    where?: DirectoryWhereInput
    data: XOR<DirectoryUpdateWithoutDirectoryAccessInput, DirectoryUncheckedUpdateWithoutDirectoryAccessInput>
  }

  export type DirectoryUpdateWithoutDirectoryAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUpdateManyWithoutDirectoryNestedInput
    parent?: DirectoryUpdateOneWithoutChildrenNestedInput
    children?: DirectoryUpdateManyWithoutParentNestedInput
  }

  export type DirectoryUncheckedUpdateWithoutDirectoryAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUncheckedUpdateManyWithoutDirectoryNestedInput
    children?: DirectoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type GroupUpsertWithoutDirectoryAccessInput = {
    update: XOR<GroupUpdateWithoutDirectoryAccessInput, GroupUncheckedUpdateWithoutDirectoryAccessInput>
    create: XOR<GroupCreateWithoutDirectoryAccessInput, GroupUncheckedCreateWithoutDirectoryAccessInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutDirectoryAccessInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutDirectoryAccessInput, GroupUncheckedUpdateWithoutDirectoryAccessInput>
  }

  export type GroupUpdateWithoutDirectoryAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutDirectoryAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type ContractVersionCreateWithoutContractInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
  }

  export type ContractVersionUncheckedCreateWithoutContractInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
  }

  export type ContractVersionCreateOrConnectWithoutContractInput = {
    where: ContractVersionWhereUniqueInput
    create: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput>
  }

  export type ContractVersionCreateManyContractInputEnvelope = {
    data: ContractVersionCreateManyContractInput | ContractVersionCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type DocuSignEnvelopeCreateWithoutContractInput = {
    id?: string
    envelopeId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    signers?: DocuSignSignerCreateNestedManyWithoutEnvelopeInput
  }

  export type DocuSignEnvelopeUncheckedCreateWithoutContractInput = {
    id?: string
    envelopeId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    signers?: DocuSignSignerUncheckedCreateNestedManyWithoutEnvelopeInput
  }

  export type DocuSignEnvelopeCreateOrConnectWithoutContractInput = {
    where: DocuSignEnvelopeWhereUniqueInput
    create: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput>
  }

  export type DocuSignEnvelopeCreateManyContractInputEnvelope = {
    data: DocuSignEnvelopeCreateManyContractInput | DocuSignEnvelopeCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutContractsInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutContractsInput = {
    id?: string
    name: string
    color?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutContractsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutContractsInput, CategoryUncheckedCreateWithoutContractsInput>
  }

  export type DirectoryCreateWithoutContractsInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: DirectoryCreateNestedOneWithoutChildrenInput
    children?: DirectoryCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryUncheckedCreateWithoutContractsInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: DirectoryUncheckedCreateNestedManyWithoutParentInput
    directoryAccess?: DirectoryAccessUncheckedCreateNestedManyWithoutDirectoryInput
  }

  export type DirectoryCreateOrConnectWithoutContractsInput = {
    where: DirectoryWhereUniqueInput
    create: XOR<DirectoryCreateWithoutContractsInput, DirectoryUncheckedCreateWithoutContractsInput>
  }

  export type UserCreateWithoutOwnedContractsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userGroups?: UserGroupCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedContractsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedContractsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedContractsInput, UserUncheckedCreateWithoutOwnedContractsInput>
  }

  export type ContractVersionUpsertWithWhereUniqueWithoutContractInput = {
    where: ContractVersionWhereUniqueInput
    update: XOR<ContractVersionUpdateWithoutContractInput, ContractVersionUncheckedUpdateWithoutContractInput>
    create: XOR<ContractVersionCreateWithoutContractInput, ContractVersionUncheckedCreateWithoutContractInput>
  }

  export type ContractVersionUpdateWithWhereUniqueWithoutContractInput = {
    where: ContractVersionWhereUniqueInput
    data: XOR<ContractVersionUpdateWithoutContractInput, ContractVersionUncheckedUpdateWithoutContractInput>
  }

  export type ContractVersionUpdateManyWithWhereWithoutContractInput = {
    where: ContractVersionScalarWhereInput
    data: XOR<ContractVersionUpdateManyMutationInput, ContractVersionUncheckedUpdateManyWithoutContractInput>
  }

  export type ContractVersionScalarWhereInput = {
    AND?: ContractVersionScalarWhereInput | ContractVersionScalarWhereInput[]
    OR?: ContractVersionScalarWhereInput[]
    NOT?: ContractVersionScalarWhereInput | ContractVersionScalarWhereInput[]
    id?: StringFilter<"ContractVersion"> | string
    version?: IntFilter<"ContractVersion"> | number
    title?: StringFilter<"ContractVersion"> | string
    content?: StringFilter<"ContractVersion"> | string
    changeNote?: StringNullableFilter<"ContractVersion"> | string | null
    createdAt?: DateTimeFilter<"ContractVersion"> | Date | string
    contractId?: StringFilter<"ContractVersion"> | string
  }

  export type DocuSignEnvelopeUpsertWithWhereUniqueWithoutContractInput = {
    where: DocuSignEnvelopeWhereUniqueInput
    update: XOR<DocuSignEnvelopeUpdateWithoutContractInput, DocuSignEnvelopeUncheckedUpdateWithoutContractInput>
    create: XOR<DocuSignEnvelopeCreateWithoutContractInput, DocuSignEnvelopeUncheckedCreateWithoutContractInput>
  }

  export type DocuSignEnvelopeUpdateWithWhereUniqueWithoutContractInput = {
    where: DocuSignEnvelopeWhereUniqueInput
    data: XOR<DocuSignEnvelopeUpdateWithoutContractInput, DocuSignEnvelopeUncheckedUpdateWithoutContractInput>
  }

  export type DocuSignEnvelopeUpdateManyWithWhereWithoutContractInput = {
    where: DocuSignEnvelopeScalarWhereInput
    data: XOR<DocuSignEnvelopeUpdateManyMutationInput, DocuSignEnvelopeUncheckedUpdateManyWithoutContractInput>
  }

  export type DocuSignEnvelopeScalarWhereInput = {
    AND?: DocuSignEnvelopeScalarWhereInput | DocuSignEnvelopeScalarWhereInput[]
    OR?: DocuSignEnvelopeScalarWhereInput[]
    NOT?: DocuSignEnvelopeScalarWhereInput | DocuSignEnvelopeScalarWhereInput[]
    id?: StringFilter<"DocuSignEnvelope"> | string
    envelopeId?: StringFilter<"DocuSignEnvelope"> | string
    contractId?: StringFilter<"DocuSignEnvelope"> | string
    status?: EnumDocuSignEnvelopeStatusFilter<"DocuSignEnvelope"> | $Enums.DocuSignEnvelopeStatus
    templateId?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    subject?: StringFilter<"DocuSignEnvelope"> | string
    message?: StringNullableFilter<"DocuSignEnvelope"> | string | null
    createdAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignEnvelope"> | Date | string
    completedAt?: DateTimeNullableFilter<"DocuSignEnvelope"> | Date | string | null
  }

  export type CategoryUpsertWithoutContractsInput = {
    update: XOR<CategoryUpdateWithoutContractsInput, CategoryUncheckedUpdateWithoutContractsInput>
    create: XOR<CategoryCreateWithoutContractsInput, CategoryUncheckedCreateWithoutContractsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutContractsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutContractsInput, CategoryUncheckedUpdateWithoutContractsInput>
  }

  export type CategoryUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryUpsertWithoutContractsInput = {
    update: XOR<DirectoryUpdateWithoutContractsInput, DirectoryUncheckedUpdateWithoutContractsInput>
    create: XOR<DirectoryCreateWithoutContractsInput, DirectoryUncheckedCreateWithoutContractsInput>
    where?: DirectoryWhereInput
  }

  export type DirectoryUpdateToOneWithWhereWithoutContractsInput = {
    where?: DirectoryWhereInput
    data: XOR<DirectoryUpdateWithoutContractsInput, DirectoryUncheckedUpdateWithoutContractsInput>
  }

  export type DirectoryUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: DirectoryUpdateOneWithoutChildrenNestedInput
    children?: DirectoryUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUncheckedUpdateWithoutContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: DirectoryUncheckedUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutDirectoryNestedInput
  }

  export type UserUpsertWithoutOwnedContractsInput = {
    update: XOR<UserUpdateWithoutOwnedContractsInput, UserUncheckedUpdateWithoutOwnedContractsInput>
    create: XOR<UserCreateWithoutOwnedContractsInput, UserUncheckedCreateWithoutOwnedContractsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedContractsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedContractsInput, UserUncheckedUpdateWithoutOwnedContractsInput>
  }

  export type UserUpdateWithoutOwnedContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedContractsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userGroups?: UserGroupUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ContractCreateWithoutCategoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: ContractVersionCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeCreateNestedManyWithoutContractInput
    directory: DirectoryCreateNestedOneWithoutContractsInput
    owner: UserCreateNestedOneWithoutOwnedContractsInput
  }

  export type ContractUncheckedCreateWithoutCategoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
    versions?: ContractVersionUncheckedCreateNestedManyWithoutContractInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutCategoryInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput>
  }

  export type ContractCreateManyCategoryInputEnvelope = {
    data: ContractCreateManyCategoryInput | ContractCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ContractUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ContractWhereUniqueInput
    update: XOR<ContractUpdateWithoutCategoryInput, ContractUncheckedUpdateWithoutCategoryInput>
    create: XOR<ContractCreateWithoutCategoryInput, ContractUncheckedCreateWithoutCategoryInput>
  }

  export type ContractUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ContractWhereUniqueInput
    data: XOR<ContractUpdateWithoutCategoryInput, ContractUncheckedUpdateWithoutCategoryInput>
  }

  export type ContractUpdateManyWithWhereWithoutCategoryInput = {
    where: ContractScalarWhereInput
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ContractCreateWithoutVersionsInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    docuSignEnvelopes?: DocuSignEnvelopeCreateNestedManyWithoutContractInput
    category?: CategoryCreateNestedOneWithoutContractsInput
    directory: DirectoryCreateNestedOneWithoutContractsInput
    owner: UserCreateNestedOneWithoutOwnedContractsInput
  }

  export type ContractUncheckedCreateWithoutVersionsInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
    categoryId?: string | null
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutVersionsInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutVersionsInput, ContractUncheckedCreateWithoutVersionsInput>
  }

  export type ContractUpsertWithoutVersionsInput = {
    update: XOR<ContractUpdateWithoutVersionsInput, ContractUncheckedUpdateWithoutVersionsInput>
    create: XOR<ContractCreateWithoutVersionsInput, ContractUncheckedCreateWithoutVersionsInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutVersionsInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutVersionsInput, ContractUncheckedUpdateWithoutVersionsInput>
  }

  export type ContractUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    docuSignEnvelopes?: DocuSignEnvelopeUpdateManyWithoutContractNestedInput
    category?: CategoryUpdateOneWithoutContractsNestedInput
    directory?: DirectoryUpdateOneRequiredWithoutContractsNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedContractsNestedInput
  }

  export type ContractUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractUncheckedCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUncheckedUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    isActive?: boolean
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedContracts?: ContractUncheckedCreateNestedManyWithoutOwnerInput
    userGroups?: UserGroupUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedContracts?: ContractUncheckedUpdateManyWithoutOwnerNestedInput
    userGroups?: UserGroupUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ContractCreateWithoutDocuSignEnvelopesInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: ContractVersionCreateNestedManyWithoutContractInput
    category?: CategoryCreateNestedOneWithoutContractsInput
    directory: DirectoryCreateNestedOneWithoutContractsInput
    owner: UserCreateNestedOneWithoutOwnedContractsInput
  }

  export type ContractUncheckedCreateWithoutDocuSignEnvelopesInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
    categoryId?: string | null
    versions?: ContractVersionUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutDocuSignEnvelopesInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutDocuSignEnvelopesInput, ContractUncheckedCreateWithoutDocuSignEnvelopesInput>
  }

  export type DocuSignSignerCreateWithoutEnvelopeInput = {
    id?: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocuSignSignerUncheckedCreateWithoutEnvelopeInput = {
    id?: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocuSignSignerCreateOrConnectWithoutEnvelopeInput = {
    where: DocuSignSignerWhereUniqueInput
    create: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput>
  }

  export type DocuSignSignerCreateManyEnvelopeInputEnvelope = {
    data: DocuSignSignerCreateManyEnvelopeInput | DocuSignSignerCreateManyEnvelopeInput[]
    skipDuplicates?: boolean
  }

  export type ContractUpsertWithoutDocuSignEnvelopesInput = {
    update: XOR<ContractUpdateWithoutDocuSignEnvelopesInput, ContractUncheckedUpdateWithoutDocuSignEnvelopesInput>
    create: XOR<ContractCreateWithoutDocuSignEnvelopesInput, ContractUncheckedCreateWithoutDocuSignEnvelopesInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutDocuSignEnvelopesInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutDocuSignEnvelopesInput, ContractUncheckedUpdateWithoutDocuSignEnvelopesInput>
  }

  export type ContractUpdateWithoutDocuSignEnvelopesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ContractVersionUpdateManyWithoutContractNestedInput
    category?: CategoryUpdateOneWithoutContractsNestedInput
    directory?: DirectoryUpdateOneRequiredWithoutContractsNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedContractsNestedInput
  }

  export type ContractUncheckedUpdateWithoutDocuSignEnvelopesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: ContractVersionUncheckedUpdateManyWithoutContractNestedInput
  }

  export type DocuSignSignerUpsertWithWhereUniqueWithoutEnvelopeInput = {
    where: DocuSignSignerWhereUniqueInput
    update: XOR<DocuSignSignerUpdateWithoutEnvelopeInput, DocuSignSignerUncheckedUpdateWithoutEnvelopeInput>
    create: XOR<DocuSignSignerCreateWithoutEnvelopeInput, DocuSignSignerUncheckedCreateWithoutEnvelopeInput>
  }

  export type DocuSignSignerUpdateWithWhereUniqueWithoutEnvelopeInput = {
    where: DocuSignSignerWhereUniqueInput
    data: XOR<DocuSignSignerUpdateWithoutEnvelopeInput, DocuSignSignerUncheckedUpdateWithoutEnvelopeInput>
  }

  export type DocuSignSignerUpdateManyWithWhereWithoutEnvelopeInput = {
    where: DocuSignSignerScalarWhereInput
    data: XOR<DocuSignSignerUpdateManyMutationInput, DocuSignSignerUncheckedUpdateManyWithoutEnvelopeInput>
  }

  export type DocuSignSignerScalarWhereInput = {
    AND?: DocuSignSignerScalarWhereInput | DocuSignSignerScalarWhereInput[]
    OR?: DocuSignSignerScalarWhereInput[]
    NOT?: DocuSignSignerScalarWhereInput | DocuSignSignerScalarWhereInput[]
    id?: StringFilter<"DocuSignSigner"> | string
    envelopeId?: StringFilter<"DocuSignSigner"> | string
    routingOrder?: IntFilter<"DocuSignSigner"> | number
    email?: StringFilter<"DocuSignSigner"> | string
    name?: StringFilter<"DocuSignSigner"> | string
    status?: EnumDocuSignSignerStatusFilter<"DocuSignSigner"> | $Enums.DocuSignSignerStatus
    signedAt?: DateTimeNullableFilter<"DocuSignSigner"> | Date | string | null
    createdAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
    updatedAt?: DateTimeFilter<"DocuSignSigner"> | Date | string
  }

  export type DocuSignEnvelopeCreateWithoutSignersInput = {
    id?: string
    envelopeId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    contract: ContractCreateNestedOneWithoutDocuSignEnvelopesInput
  }

  export type DocuSignEnvelopeUncheckedCreateWithoutSignersInput = {
    id?: string
    envelopeId: string
    contractId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DocuSignEnvelopeCreateOrConnectWithoutSignersInput = {
    where: DocuSignEnvelopeWhereUniqueInput
    create: XOR<DocuSignEnvelopeCreateWithoutSignersInput, DocuSignEnvelopeUncheckedCreateWithoutSignersInput>
  }

  export type DocuSignEnvelopeUpsertWithoutSignersInput = {
    update: XOR<DocuSignEnvelopeUpdateWithoutSignersInput, DocuSignEnvelopeUncheckedUpdateWithoutSignersInput>
    create: XOR<DocuSignEnvelopeCreateWithoutSignersInput, DocuSignEnvelopeUncheckedCreateWithoutSignersInput>
    where?: DocuSignEnvelopeWhereInput
  }

  export type DocuSignEnvelopeUpdateToOneWithWhereWithoutSignersInput = {
    where?: DocuSignEnvelopeWhereInput
    data: XOR<DocuSignEnvelopeUpdateWithoutSignersInput, DocuSignEnvelopeUncheckedUpdateWithoutSignersInput>
  }

  export type DocuSignEnvelopeUpdateWithoutSignersInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contract?: ContractUpdateOneRequiredWithoutDocuSignEnvelopesNestedInput
  }

  export type DocuSignEnvelopeUncheckedUpdateWithoutSignersInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ContractCreateManyOwnerInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    directoryId: string
    categoryId?: string | null
  }

  export type UserGroupCreateManyUserInput = {
    id?: string
    groupId: string
    joinedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type ContractUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ContractVersionUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUpdateManyWithoutContractNestedInput
    category?: CategoryUpdateOneWithoutContractsNestedInput
    directory?: DirectoryUpdateOneRequiredWithoutContractsNestedInput
  }

  export type ContractUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: ContractVersionUncheckedUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directoryId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserGroupUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUserGroupsNestedInput
  }

  export type UserGroupUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessCreateManyGroupInput = {
    id?: string
    directoryId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type UserGroupCreateManyGroupInput = {
    id?: string
    userId: string
    joinedAt?: Date | string
  }

  export type DirectoryAccessUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    directory?: DirectoryUpdateOneRequiredWithoutDirectoryAccessNestedInput
  }

  export type DirectoryAccessUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserGroupsNestedInput
  }

  export type UserGroupUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGroupUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractCreateManyDirectoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    categoryId?: string | null
  }

  export type DirectoryCreateManyParentInput = {
    id?: string
    name: string
    description?: string | null
    path: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DirectoryAccessCreateManyDirectoryInput = {
    id?: string
    groupId: string
    permission?: $Enums.Permission
    createdAt?: Date | string
  }

  export type ContractUpdateWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ContractVersionUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUpdateManyWithoutContractNestedInput
    category?: CategoryUpdateOneWithoutContractsNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedContractsNestedInput
  }

  export type ContractUncheckedUpdateWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    versions?: ContractVersionUncheckedUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateManyWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DirectoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUpdateManyWithoutDirectoryNestedInput
    children?: DirectoryUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contracts?: ContractUncheckedUpdateManyWithoutDirectoryNestedInput
    children?: DirectoryUncheckedUpdateManyWithoutParentNestedInput
    directoryAccess?: DirectoryAccessUncheckedUpdateManyWithoutDirectoryNestedInput
  }

  export type DirectoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    path?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessUpdateWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutDirectoryAccessNestedInput
  }

  export type DirectoryAccessUncheckedUpdateWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DirectoryAccessUncheckedUpdateManyWithoutDirectoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    permission?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractVersionCreateManyContractInput = {
    id?: string
    version: number
    title: string
    content: string
    changeNote?: string | null
    createdAt?: Date | string
  }

  export type DocuSignEnvelopeCreateManyContractInput = {
    id?: string
    envelopeId: string
    status?: $Enums.DocuSignEnvelopeStatus
    templateId?: string | null
    subject: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ContractVersionUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractVersionUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractVersionUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    changeNote?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignEnvelopeUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signers?: DocuSignSignerUpdateManyWithoutEnvelopeNestedInput
  }

  export type DocuSignEnvelopeUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signers?: DocuSignSignerUncheckedUpdateManyWithoutEnvelopeNestedInput
  }

  export type DocuSignEnvelopeUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    envelopeId?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignEnvelopeStatusFieldUpdateOperationsInput | $Enums.DocuSignEnvelopeStatus
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ContractCreateManyCategoryInput = {
    id?: string
    title: string
    content: string
    status?: $Enums.ContractStatus
    contractNumber?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: string
    directoryId: string
  }

  export type ContractUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: ContractVersionUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUpdateManyWithoutContractNestedInput
    directory?: DirectoryUpdateOneRequiredWithoutContractsNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedContractsNestedInput
  }

  export type ContractUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
    versions?: ContractVersionUncheckedUpdateManyWithoutContractNestedInput
    docuSignEnvelopes?: DocuSignEnvelopeUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    contractNumber?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    directoryId?: StringFieldUpdateOperationsInput | string
  }

  export type DocuSignSignerCreateManyEnvelopeInput = {
    id?: string
    routingOrder: number
    email: string
    name: string
    status?: $Enums.DocuSignSignerStatus
    signedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocuSignSignerUpdateWithoutEnvelopeInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignSignerUncheckedUpdateWithoutEnvelopeInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocuSignSignerUncheckedUpdateManyWithoutEnvelopeInput = {
    id?: StringFieldUpdateOperationsInput | string
    routingOrder?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumDocuSignSignerStatusFieldUpdateOperationsInput | $Enums.DocuSignSignerStatus
    signedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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