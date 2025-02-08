import { execSync } from "child_process";
import { exit } from "process";
import { joinPwd } from "../utils";

let oldVersion: string | null; // null if not published yet

try {
  oldVersion = execSync("npm view abc-test-ok-nice version", { stdio: "pipe" }).toString().trim();
} catch {
  oldVersion = null;
}

if (!oldVersion) exit(0);

const pkgJsonPath = joinPwd("package.json");
const newVersion = require(pkgJsonPath).version as string;

if (oldVersion === newVersion) {
  throw new Error("Can't publish same version");
}

const [oldMajor, oldMinor, oldPatch] = oldVersion.split(".").map(Number) as [number, number, number];
const [newMajor, newMinor, newPatch] = newVersion.split(".").map(Number) as [number, number, number];

if (newMajor < oldMajor) {
  throw new Error("Can't publish major version down");
}

if (newMajor === oldMajor && newMinor < oldMinor) {
  throw new Error("Can't publish minor version down");
}

if (newMajor === oldMajor && newMinor === oldMinor && newPatch < oldPatch) {
  throw new Error("Can't publish patch version down");
}
