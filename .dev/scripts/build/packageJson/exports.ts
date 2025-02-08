import fs from "fs-extra";
import path from "path";

import { parse } from "jsonc-parser";

import { joinPwd } from "~dev/scripts/utils";

const srcDir = joinPwd("src");

type File = {
  type: "file";
  name: string;
  path: string;
};

type Folder = {
  type: "folder";
  name: string;
  path: string;
  children: (File | Folder)[];
};

const getTree = () => {
  const tree: Folder = {
    type: "folder",
    name: "src",
    path: srcDir,
    children: [],
  };

  const setTreeChildren = (tree: Folder) => {
    const [files, folders] = fs.readdirSync(tree.path).reduce(
      ([files, folders], item) => {
        const itemPath = path.join(tree.path, item);
        if (fs.statSync(itemPath).isFile()) {
          files.push(itemPath);
        } else {
          folders.push(itemPath);
        }
        return [files, folders];
      },
      [[] as string[], [] as string[]],
    );

    tree.children.push(
      ...files.map<File>((file) => ({
        type: "file",
        name: path.basename(file, path.extname(file)),
        path: file,
      })),
    );

    for (const folder of folders) {
      const folderTree: Folder = {
        type: "folder",
        name: path.basename(folder),
        path: folder,
        children: [],
      };
      tree.children.push(folderTree);
      setTreeChildren(folderTree);
    }
  };

  setTreeChildren(tree);

  return tree;
};

const tree = getTree();

type Exports = {
  [key: string]: {
    import: {
      types: string;
      default: string;
    };
    require: {
      types: string;
      default: string;
    };
  } | null;
};

const generateExports = (tree: Folder) => {
  const exports: Exports = {
    ".": null,
  };

  const _generate = (_tree: Folder = tree, nested: string[] = []) => {
    for (const child of _tree.children) {
      if (child.type === "folder") {
        const nestedPath = nested.concat(child.name).join("/");
        exports[`./${nestedPath}`] = {
          require: {
            types: `./dist/${nestedPath}/index.d.ts`,
            default: `./dist/${nestedPath}/index.js`,
          },
          import: {
            types: `./dist/${nestedPath}/index.d.mts`,
            default: `./dist/${nestedPath}/index.mjs`,
          },
        };
        _generate(child, [...nested, child.name]);
        continue;
      }

      if (child.name === "index.ts") continue;

      const nestedPath = nested.concat(child.name).join("/");

      exports[`./${nestedPath}`] = {
        require: {
          types: `./dist/${nestedPath}.d.ts`,
          default: `./dist/${nestedPath}.js`,
        },
        import: {
          types: `./dist/${nestedPath}.d.mts`,
          default: `./dist/${nestedPath}.mjs`,
        },
      };
    }
  };

  _generate();

  return exports;
};

const exports = generateExports(tree);

const packageJsonPath = joinPwd("package.json");
const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
const packageJson = parse(packageJsonContent);

packageJson.exports = exports;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
