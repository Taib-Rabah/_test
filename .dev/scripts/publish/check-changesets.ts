import fs from "fs-extra";
import path from "path";
import { joinPwd } from "../utils";

const changesetsFolder = joinPwd(".changeset");

const changesets = fs
  .readdirSync(changesetsFolder)
  .map((fileName) => path.join(changesetsFolder, fileName))
  .filter(
    (file) =>
      fs.statSync(file).isFile() &&
      path.basename(file) !== "README.md" &&
      path.extname(file) === ".md",
  );

if (changesets.length !== 0) throw new Error("Run `pnpm changeset version` first");
