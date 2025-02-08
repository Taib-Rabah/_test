import { isString } from "./string";

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isEmptyArray = (value: unknown): value is [] => isArray(value) && value.length === 0;

export const has = (array: unknown[], value: unknown): boolean => array.includes(value);

export const hasOneOf = (array: unknown[], values: unknown[]): boolean =>
  values.some((value) => array.includes(value));

export const hasAllOf = (array: unknown[], values: unknown[]): boolean =>
  values.every((value) => array.includes(value));

export const isStringArray = (value: unknown): value is string[] => isArray(value) && value.every(isString);

export const isEnumArray = <T extends string>(value: unknown, enumValues: Readonly<[T, ...T[]]>): value is T[] =>
  isArray(value) && value.every((item) => enumValues.includes(item as T));
