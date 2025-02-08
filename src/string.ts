import { isZero } from "./number";

export const isString = (value: unknown): value is string => typeof value === "string";

export const isEmptyString = (value: unknown): value is "" => isString(value) && isZero(value.length);

export const isEmptyOrWhitespaces = (value: unknown): value is string =>
  isString(value) && value.trim().length === 0;

export const isWhitespaces = (value: unknown): value is string =>
  isString(value) && value.length > 0 && value.trim() === "";

export const isEnum = <T extends string>(value: unknown, enumValues: Readonly<[T, ...T[]]>): value is T =>
  isString(value) && enumValues.includes(value as T);
