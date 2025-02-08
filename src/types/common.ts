export type Obj<T = unknown> = Record<string, T>;

export type Arr<T = unknown> = T[];

// ?- String

export type Enum<T extends string> = Readonly<[T, ...T[]]>;

export type UpperFirst<T extends string> = Capitalize<T>;

export type LowerFirst<T extends string> = Uncapitalize<T>;

export type StrChoices<T extends string> = T | (string & {});

export type NumChoices<T extends number> = T | (number & {});

export type Choices<T extends string | number> = T extends string
  ? StrChoices<T>
  : T extends number
    ? NumChoices<T>
    : never;

// ?- Other

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type PrettifyDeep<T> = {
  [K in keyof T]: T[K] extends Obj ? Prettify<T[K]> : T[K];
};

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

export type Stringable = string | number | boolean | bigint | null | undefined;
