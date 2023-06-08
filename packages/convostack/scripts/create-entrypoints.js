import * as fs from "fs";
import * as path from "path";

// This lists all the entrypoints for the library. Each key corresponds to an
// importable path, eg. `import { AgentExecutor } from "convostack/agent"`.
// The value is the path to the file in `src/` that exports the entrypoint.
// This is used to generate the `exports` field in package.json.
// Order is not important.
const entrypoints = {
    agent: "agent/index",
    "agent-echo": "agent-echo/index",
    "agent-sse": "agent-sse/index",
    "agent-sse-echo-server": "agent-sse-echo-server/index",
    auth: "auth/index",
    "auth-jwt": "auth-jwt/index",
    "backend-express": "backend-express/index",
    "langchain-memory": "langchain-memory/index",
    "langchain-agent": "langchain-agent/index",
    "playground": "playground/index",
    "agent-http": "agent-http/index",
    "frontend-react": "frontend-react/index",
    models: "models/index",
    shared: "shared/index",
    "storage-engine-prisma-sqlite": "storage-engine-prisma-sqlite/index",
    "storage-engine-prisma-postgres": "storage-engine-prisma-postgres/index",
    "storage-engine-prisma-mysql": "storage-engine-prisma-mysql/index",
};

// Entrypoints in this list will
// 1. Be excluded from the documentation
// 2. Be only available in Node.js environments (for backwards compatibility)
const deprecatedNodeOnly = [];

// Entrypoints in this list require an optional dependency to be installed.
// Therefore they are not tested in the generated test-exports-* packages.
const requiresOptionalDependency = [];

// List of test-exports-* packages which we use to test that the exports field
// works correctly across different JS environments.
// Each entry is a tuple of [package name, import statement].
const testExports = [
    [
        "test-exports-esm",
        (p) => `import * as ${p.replace(/\//g, "_")} from "convostack/${p}";`,
    ],
    [
        "test-exports-cjs",
        (p) => `const ${p.replace(/\//g, "_")} = require("convostack/${p}");`,
    ],
    ["test-exports-cf", (p) => `export * from "convostack/${p}";`],
    ["test-exports-cra", (p) => `export * from "convostack/${p}";`],
    ["test-exports-vercel", (p) => `export * from "convostack/${p}";`],
    ["test-exports-vite", (p) => `export * from "convostack/${p}";`],
];

const updateJsonFile = (relativePath, updateFunction) => {
    const contents = fs.readFileSync(relativePath).toString();
    const res = updateFunction(JSON.parse(contents));
    fs.writeFileSync(relativePath, JSON.stringify(res, null, 2) + "\n");
};

const generateFiles = () => {
    const files = [...Object.entries(entrypoints), ["index", "index"]].flatMap(
        ([key, value]) => {
            const nrOfDots = key.split("/").length - 1;
            const relativePath = "../".repeat(nrOfDots) || "./";
            const compiledPath = `${relativePath}dist/${value}.js`;
            return [
                [
                    `${key}.cjs`,
                    `module.exports = require('${relativePath}dist/${value}.cjs');`,
                ],
                [`${key}.js`, `export * from '${compiledPath}'`],
                [`${key}.d.ts`, `export * from '${compiledPath}'`],
            ];
        }
    );

    return Object.fromEntries(files);
};

const updateConfig = () => {
    // Update tsconfig.json `typedocOptions.entryPoints` field
    updateJsonFile("./tsconfig.json", (json) => ({
        ...json,
        typedocOptions: {
            ...json.typedocOptions,
            entryPoints: [...Object.keys(entrypoints)]
                .filter((key) => !deprecatedNodeOnly.includes(key))
                .map((key) => `src/${entrypoints[key]}.ts`),
        },
    }));

    const generatedFiles = generateFiles();
    const filenames = Object.keys(generatedFiles);

    // Update package.json `exports` and `files` fields
    updateJsonFile("./package.json", (json) => ({
        ...json,
        exports: Object.assign(
            Object.fromEntries(
                ["index", ...Object.keys(entrypoints)].map((key) => {
                    let entryPoint = {
                        types: `./${key}.d.ts`,
                        import: `./${key}.js`,
                        require: `./${key}.cjs`,
                    };

                    if (deprecatedNodeOnly.includes(key)) {
                        entryPoint = {
                            node: entryPoint,
                        };
                    }

                    return [key === "index" ? "." : `./${key}`, entryPoint];
                })
            ),
            { "./package.json": "./package.json" }
        ),
        files: ["dist/", ...filenames],
    }));

    // Write generated files
    Object.entries(generatedFiles).forEach(([filename, content]) => {
        fs.mkdirSync(path.dirname(filename), { recursive: true });
        fs.writeFileSync(filename, content);
    });

    // Update .gitignore
    fs.writeFileSync("./.gitignore", filenames.join("\n") + "\n");

    // Update test-exports-*/entrypoints.js
    const entrypointsToTest = Object.keys(entrypoints)
        .filter((key) => !deprecatedNodeOnly.includes(key))
        .filter((key) => !requiresOptionalDependency.includes(key));
    // TODO bring this back
    // testExports.forEach(([pkg, importStatement]) => {
    //     const contents =
    //         entrypointsToTest.map((key) => importStatement(key)).join("\n") + "\n";
    //     fs.writeFileSync(`../${pkg}/src/entrypoints.js`, contents);
    // });
};

const cleanGenerated = () => {
    const filenames = Object.keys(generateFiles());
    filenames.forEach((fname) => {
        try {
            fs.unlinkSync(fname);
        } catch {
            // ignore error
        }
    });
};

const command = process.argv[2];

if (command === "clean") {
    cleanGenerated();
} else {
    updateConfig();
}