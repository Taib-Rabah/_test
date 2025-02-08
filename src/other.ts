export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isNull = (value: unknown): value is null => value === null;

export const isNil = (value: unknown): value is null | undefined => isUndefined(value) || isNull(value);

export const not = (value: boolean): boolean => !value;
