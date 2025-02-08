import { isZero } from "./number";
import { isUndefined } from "./other";
import type { Choices, Obj } from "./types/common";
import type { DeepKeyOf, Entries, GetDeep, Keys, Values } from "./types/object";

export const isObject = (value: unknown): value is Obj => value != null && value.constructor.name === "Object";

export const isEmptyObject = (value: object): boolean => isObject(value) && isZero(Object.keys(value).length);

export const keys = <Object extends Obj>(object: Object): Keys<Object> => Object.keys(object);

export const values = <Object extends Obj>(object: Object): Values<Object> =>
  Object.values(object) as Values<Object>;

export const entries = <Object extends Obj>(object: Object): Entries<Object> =>
  Object.entries(object) as Entries<Object>;

export const ensureParentObj = (object: Obj, path: string[], overrideNonObjectKeys: boolean = false) => {
  for (let i = 0; i < path.length; i++) {
    const key = path[i]!;
    if (isUndefined(object[key])) {
      object[key] = {};
    }
    if (!isObject(object[key])) {
      if (overrideNonObjectKeys) {
        object[key] = {};
      } else {
        return {
          success: false,
          reason: `one of the keys is not an object`,
          key: path.slice(0, i + 1).join("."),
        } as const;
      }
    }
    object = object[key] as Obj;
  }
  return {
    success: true,
  } as const;
};

export const getDeep = <Object extends Obj, DeepKey extends DeepKeyOf<Object>>(
  obj: Object,
  deepKey: DeepKey,
): GetDeep<Object, DeepKey> => {
  const path = deepKey.split(".");
  return path.reduce((_obj, currKey) => (isObject(_obj) ? _obj[currKey] : null), obj as unknown) as any;
};

export const setDeep = <
  Object extends Obj | unknown,
  DeepKey extends Object extends Obj ? Choices<DeepKeyOf<Object>> : string,
  Value extends unknown,
>(
  object: Object,
  deepKey: DeepKey,
  value: Value,
  overrideNonObjectKeys: boolean = false,
) => {
  if (deepKey.endsWith(".")) {
    return {
      success: false,
      reason: "deepKey must not end with a dot",
    } as const;
  }

  const path = deepKey.split(".");

  if (!isObject(object)) {
    return {
      success: false,
      reason: "not an object",
      received: object,
      receivedType: typeof object,
    } as const;
  }

  const parentPath = path.slice(0, -1);
  const lastKey = path.at(-1)!;

  const { success, reason, key } = ensureParentObj(object, parentPath, overrideNonObjectKeys);
  if (!success) {
    return {
      success: false,
      reason,
      key,
    } as const;
  }

  const lastObj = parentPath.reduce((obj, key) => obj[key], object as any);
  lastObj[lastKey] = value;

  return {
    success: true,
  } as const;
};

export const updateDeep = <
  Object extends Obj,
  DeepKey extends DeepKeyOf<Object>,
  Value extends GetDeep<Object, DeepKey>,
>(
  object: Object,
  deepKey: DeepKey,
  value: Value,
) => {
  const path = deepKey.split(".");
  const parentPath = path.slice(0, -1);
  const lastKey = path.at(-1)!;

  const lastObj = parentPath.reduce((obj, key) => obj[key], object as any);
  lastObj[lastKey] = value;
};
