#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
const command = args[0];

function setup(dirPath, shadowDbUrl) {
    const dir = path.resolve(dirPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
    const destPath = path.join(dir, "schema.prisma");

    // Read the file synchronously
    let data = fs.readFileSync(schemaPath, 'utf8');

    // Replace the text
    const clientPathRegex = new RegExp('"../src/generated/client"', 'g');
    data = data.replace(clientPathRegex, '"./tmpgen"');

    if (shadowDbUrl) {
        const dbRegex = /env\("__CONVOSTACK_PRISMA_DATABASE_URL"\)/g;
        data = data.replace(dbRegex, 'env("__CONVOSTACK_PRISMA_DATABASE_URL")\n  shadowDatabaseUrl = env("__CONVOSTACK_PRISMA_SHADOW_DATABASE_URL")');
    }

    // Write the file synchronously
    fs.writeFileSync(destPath, data);

    return dir;
}

function cleanup(dirPath) {
    const dir = path.resolve(dirPath);
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, {recursive: true, force: true});
    }
}

if (command === "migrate" || command === "studio") {
    const dbUrlIndex = args.indexOf("--db-url");
    const shadowDbUrlIndex = args.indexOf("--shadow-db-url");
    const dirIndex = args.indexOf("--dir");
    const dbUrl = dbUrlIndex !== -1 ? args[dbUrlIndex + 1] : null;
    let shadowDbUrl = shadowDbUrlIndex !== -1 ? args[shadowDbUrlIndex + 1] : null;
    let dir = dirIndex !== -1 ? args[dirIndex + 1] : null;

    if (!dbUrl) {
        console.error("Missing required argument: --db-url");
        process.exit(1);
    }

    if (!dir) {
        console.error("Missing required argument: --dir");
        process.exit(1);
    }

    if (command === 'migrate') {
        dir = setup(dir, shadowDbUrl);

        const migrateProcess = spawn("npx", ["prisma", "migrate", "dev", `--schema=${path.join(dir, "schema.prisma")}`], {
            env: {
                ...process.env,
                __CONVOSTACK_PRISMA_DATABASE_URL: dbUrl,
                __CONVOSTACK_PRISMA_SHADOW_DATABASE_URL: shadowDbUrl,
            },
            stdio: "inherit"
        });

        migrateProcess.on("error", (err) => {
            cleanup(path.join(dir, './tmpgen'))
            console.error(err);
        });

        migrateProcess.on("close", (code) => {
            cleanup(path.join(dir, './tmpgen'))
        });
    } else {
        const studioProcess = spawn("npx", ["prisma", "studio", `--schema=${path.join(dir, "schema.prisma")}`], {
            env: {
                ...process.env,
                __CONVOSTACK_PRISMA_DATABASE_URL: dbUrl
            },
            stdio: "inherit"
        });
    }
} else {
    console.error(`Invalid command: ${command}`);
}
