import type { Arr, Obj, Prettify, StrChoices, Stringable } from "./common";
import type { Split } from "./string";

export type PartialDeep<T> = {
  [K in keyof T]?: T[K] extends Obj ? PartialDeep<T[K]> : T[K];
};

export type Keys<Object extends Obj> = Prettify<(keyof Object)[]>;

export type Values<Object extends Obj> = Prettify<Object[keyof Object][]>;

export type Entries<Object extends Obj> = Prettify<[Keys<Object>[number], Values<Object>[number]][]>;

export type DeepKeyOf<Object extends Obj, _DeepKey extends string = ""> = {
  [Key in keyof Object]: Object[Key] extends infer InferredKey
    ? Key extends Stringable
      ? `${_DeepKey}${Key}` extends infer NewDeepKey
        ? NewDeepKey extends string
          ? InferredKey extends Obj
            ? NewDeepKey | DeepKeyOf<InferredKey, `${NewDeepKey}.`>
            : NewDeepKey
          : never
        : never
      : never
    : never;
}[keyof Object] extends infer DeepKey
  ? Extract<DeepKey, string>
  : string;

export type DeepParentKeyOf<Object extends Obj, _DeepKey extends string = ""> = {
  [Key in keyof Object]: Object[Key] extends infer InferredKey
    ? InferredKey extends Obj
      ? Key extends Stringable
        ? `${_DeepKey}${Key}` extends infer NewDeepKey
          ? NewDeepKey extends string
            ? NewDeepKey | DeepParentKeyOf<InferredKey, `${NewDeepKey}.`>
            : never
          : never
        : never
      : never
    : never;
}[keyof Object];

export type GetDeep<Object extends Obj, DeepKey extends StrChoices<DeepKeyOf<Object>>> =
  Split<DeepKey, "."> extends infer Path ? (Path extends Arr ? GetDeepByPath<Object, Path> : never) : never;

export type GetDeepByPath<Object extends Obj, Path extends Arr> = Path extends [infer First, ...infer Rest]
  ? First extends keyof Object
    ? Object[First] extends infer InferredKey
      ? InferredKey extends Obj
        ? GetDeepByPath<InferredKey, Rest>
        : InferredKey
      : never
    : unknown
  : Object;
