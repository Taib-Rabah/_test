import type { Choices } from "./common";

export type Join<Text extends string[], Joiner extends Choices<"." | " " | "_" | "|" | ",">> = Text extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? Rest["length"] extends 0
    ? First
    : `${First}${Joiner}${Join<Rest, Joiner>}`
  : "";
