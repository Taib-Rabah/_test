import { isArray, isEmptyArray } from "./array";
import { isFalse, isTrue } from "./boolean";
import { isEmptyObject, isObject } from "./object";
import { isEmptyString, isString } from "./string";

// @ts-ignore
export const isEmpty: {
  (value: string): value is "";
  (value: unknown[]): value is [];
  (value: object): value is {};
} = (value) => {
  if (isString(value)) return isEmptyString(value);
  if (isArray(value)) return isEmptyArray(value);
  if (isObject(value)) return isEmptyObject(value);
  throw new Error(`Invalid value type. Expected string, array, or object. Received: ${typeof value}`);
};

export const isTruthy = (value: unknown): boolean => isTrue(Boolean(value));

export const isFalsy = (value: unknown): boolean => isFalse(Boolean(value));
