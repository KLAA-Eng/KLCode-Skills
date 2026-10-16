#!/usr/bin/env node
"use strict";
const path = require("node:path");
const {
  validatePackage,
  buildPackage,
  setupProject,
  doctor,
} = require("./package.cjs");

function main(argv = process.argv.slice(2)) {
  const [command, ...options] = argv;
  let project = process.cwd(),
    write = false,
    explicitProject = false;
  for (let i = 0; i < options.length; i++) {
    if (
      options[i] === "--project" &&
      options[i + 1] &&
      !options[i + 1].startsWith("--")
    ) {
      project = path.resolve(options[++i]);
      explicitProject = true;
    } else if (options[i] === "--write") write = true;
    else throw Error("Unknown or incomplete option: " + options[i]);
  }
  if (write && command !== "setup")
    throw Error("--write is only supported for disabled setup configuration.");
  if (explicitProject && !["setup", "doctor"].includes(command))
    throw Error("--project is only supported for setup and doctor.");
  if (write && !explicitProject)
    throw Error("A setup write requires an explicit --project path.");
  const root = path.resolve(__dirname, "..");
  let result;
  switch (command) {
    case "validate":
      result = validatePackage(root);
      break;
    case "build":
      result = buildPackage(root);
      result.files = {
        count: result.files.length,
        index: path.join(result.packageRoot, "package-index.json"),
      };
      break;
    case "setup":
      result = setupProject(root, project, { write });
      break;
    case "doctor":
      result = doctor(root, project);
      break;
    default:
      throw Error(
        "Usage: node plugin/cli.cjs validate|build|setup|doctor [--project PATH] [--write (setup only)]",
      );
  }
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
  if (result.status === "failed") process.exitCode = 1;
}
if (require.main === module) {
  try {
    main();
  } catch (error) {
    process.stderr.write("KLCode: " + error.message + "\n");
    process.exitCode = 1;
  }
}
module.exports = { main };
