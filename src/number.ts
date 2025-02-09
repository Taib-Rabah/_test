import { not } from "./other";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && not(isNaN(value));

export const isInteger = (value: unknown): value is number =>
  isNumber(value) && Number.isInteger(value);

export const isFloat = (value: unknown): value is number =>
  isNumber(value) && not(isInteger(value));

export const isPositive = (value: unknown): value is number => isNumber(value) && value >= 0;

export const isNegative = (value: unknown): value is number =>
  isNumber(value) && not(isPositive(value));

export const isZero = (value: unknown): value is 0 => isNumber(value) && value === 0;

export const isInRange = (min: number, value: number, max: number): boolean =>
  value >= min && value <= max;

export const isOutsideRange = (min: number, value: number, max: number): boolean =>
  not(isInRange(min, value, max));

export const isInClosedRange = (min: number, value: number, max: number): boolean =>
  value >= min && value <= max;

export const isGreaterThan = (value: number, min: number): boolean => value > min;

export const isLessThan = (value: number, max: number): boolean => value < max;

export const isGreaterThanOrEqualTo = (value: number, min: number): boolean => value >= min;

export const isLessThanOrEqualTo = (value: number, max: number): boolean => value <= max;

// ?- MATH

export const isDivisibleBy = (value: number, divisor: number): boolean => value % divisor === 0;

export const isMultipleOf = (value: number, multiple: number): boolean =>
  isDivisibleBy(value, multiple);

export const isEven = (value: number): boolean => isDivisibleBy(value, 2);

export const isOdd = (value: number): boolean => not(isEven(value));

export const isPrime = (value: number): boolean => {
  if (value <= 1) return false;
  if (value <= 3) return true;
  if (isDivisibleBy(value, 2) || isDivisibleBy(value, 3)) return false;
  for (let i = 5; i * i <= value; i += 6) {
    if (isDivisibleBy(value, i) || isDivisibleBy(value, i + 2)) return false;
  }
  return true;
};

export const minmax = (min: number, value: number, max: number): number =>
  Math.min(Math.max(min, value), max);
