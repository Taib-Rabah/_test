import fs from "fs-extra";
import { joinPwd } from "../../utils";

const packageJsonPath = joinPwd("package.json");
const packageJson = fs.readJsonSync(packageJsonPath);

// delete the exports property cuz it's very long
// and makes moving in the package.json file harder

delete packageJson.exports;

fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
