#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
const command = args[0];

function setup(dirPath) {
  const dir = path.resolve(dirPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
  const destPath = path.join(dir, "schema.prisma");

  fs.copyFileSync(schemaPath, destPath);
  return dir;
}

if (command === "migrate") {
  const dbUrlIndex = args.indexOf("--db-url");
  const dirIndex = args.indexOf("--dir");
  const dbUrl = dbUrlIndex !== -1 ? args[dbUrlIndex + 1] : null;
  let dir = dirIndex !== -1 ? args[dirIndex + 1] : null;

  if (!dbUrl) {
    console.error("Missing required argument: --db-url");
    process.exit(1);
  }

  if (!dir) {
    console.error("Missing required argument: --dir");
    process.exit(1);
  }

  dir = setup(dir);

  const migrateProcess = spawn("npx", ["prisma", "migrate", "dev", `--schema=${path.join(dir, "schema.prisma")}`], {
    env: {
      ...process.env,
      __CONVOSTACK_PRISMA_SQLITE_DATABASE_URL: dbUrl
    },
    stdio: "inherit"
  });

  migrateProcess.on("error", (err) => {
    console.error(err);
  });

  migrateProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
} else {
  console.error(`Invalid command: ${command}`);
}
