export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isTrue = (value: unknown): value is true => isBoolean(value) && value === true;

export const isFalse = (value: unknown): value is false => isBoolean(value) && value === false;
