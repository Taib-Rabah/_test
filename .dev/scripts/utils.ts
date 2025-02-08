import path from "path";

/**
 * Project Working Directory
 */
export const pwd = path.join(__dirname, "../../");

/**
 * join path with Project Working Directory
 */
export const joinPwd = (...paths: string[]) => path.join(pwd, ...paths);
