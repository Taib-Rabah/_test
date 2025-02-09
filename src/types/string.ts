import type { Choices, LowerFirst } from "./common";

type _Split<
  Text extends string,
  Splitter extends Choices<"." | " " | "_" | "|" | ",">,
> = Text extends `${infer Left}${Splitter}${infer Right}`
  ? [Left, ..._Split<Right, Splitter>]
  : [Text];

export type Split<Text extends string, Splitter extends Choices<"." | " " | "_" | "|" | ",">> =
  _Split<Text, Splitter> extends infer Splitted
    ? Splitter extends ""
      ? Splitted extends [...infer First, infer Last]
        ? First
        : never
      : Splitted
    : never;

export type Prefix<Text extends string, Prefix extends string> = `${Prefix}${Text}`;

export type Suffix<Text extends string, Suffix extends string> = `${Text}${Suffix}`;

export type UnPrefix<
  Text extends string,
  Prefix extends string,
> = Text extends `${Prefix}${infer Rest extends string}` ? Rest : Text;

export type UnSuffix<
  Text extends string,
  Suffix extends string,
> = Text extends `${infer Rest extends string}${Suffix}` ? Rest : Text;

export type ExtractIfStartsWith<
  Text extends string,
  Prefix extends string,
  UnPrefix extends boolean = false,
> = Text extends `${Prefix}${infer Rest extends string}`
  ? UnPrefix extends true
    ? Rest
    : Text
  : never;

export type ExtractIfEndsWith<
  Text extends string,
  Suffix extends string,
  UnSuffix extends boolean = false,
> = Text extends `${infer Rest extends string}${Suffix}`
  ? UnSuffix extends true
    ? Rest
    : Text
  : never;

export type ExtractIfContains<
  Text extends string,
  Substring extends string,
  Return extends "left" | "right" | "both" | "full" = "full",
> = Text extends `${infer Left extends string}${Substring}${infer Right extends string}`
  ? Return extends "left"
    ? Left
    : Return extends "right"
      ? Right
      : Return extends "both"
        ? `${Left}${Right}`
        : Text
  : never;

export type ExcludeEmpty<Text extends string> = Text extends "" ? never : Text;

export type ExcludeIfStartsWith<
  Text extends string,
  Prefix extends string,
> = Text extends `${Prefix}${string}` ? never : Text;

export type ExcludeIfEndsWith<
  Text extends string,
  Suffix extends string,
> = Text extends `${string}${Suffix}` ? never : Text;

export type ExcludeIfContains<
  Text extends string,
  Substring extends string,
> = Text extends `${string}${Substring}${string}` ? never : Text;

type _Replace<
  Text extends string,
  Search extends string,
  Replacement extends string,
  Global extends boolean = true,
> = Text extends `${infer Left}${Search}${infer Right}`
  ? Global extends true
    ? _Replace<`${Left}${Replacement}${Right}`, Search, Replacement, Global>
    : `${Left}${Replacement}${Right}`
  : Text;

export type Replace<
  Text extends string,
  SearchArr extends string[],
  Replacement extends string,
  Global extends boolean = true,
> = SearchArr extends [infer Search extends string, ...infer Rest extends string[]]
  ? Search extends ""
    ? Replace<Text, Rest, Replacement, Global>
    : Replace<_Replace<Text, Search, Replacement, Global>, Rest, Replacement, Global>
  : Text;

type _ToCamelCase<Text extends string> = Text extends `${infer Left} ${infer Char}${infer Right}`
  ? `${Left}${Uppercase<Char>}${_ToCamelCase<Right>}`
  : Text;

export type ToCamelCase<Text extends string, ShouldLowerFirst extends boolean = true> =
  _ToCamelCase<Text> extends infer Result
    ? ShouldLowerFirst extends true
      ? Result extends string
        ? LowerFirst<Result>
        : never
      : Result
    : never;
