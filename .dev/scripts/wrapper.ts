import { joinPwd } from "./utils";

const relativePath = process.argv.slice(2);

const scriptPath = joinPwd(".dev/scripts", ...relativePath);

require(scriptPath);
