---
id: "index"
title: "Overview"
sidebar_label: "Overview"
sidebar_position: 0.1
---

# Contributing to ConvoStack

As an open-source project, we welcome and greatly appreciate your contributions as GitHub pull requests!

Please find more details below on how to set up and start working with
the [ConvoStack monorepo](https://github.com/ConvoStack/convostack) below:

## Monorepo setup

```bash
# Clone the monorepo
https://github.com/ConvoStack/convostack

# Install all dependencies (from root)
npm install

# Build
turbo build

# Watch
turbo dev

# Run codegen (only necessary after GraphQL or Prisma schema changes)
turbo codegen
```

## Changeset Workflow

```bash
# Add a new changeset
changeset

# Create new versions of packages
changeset version

# Publish all changed packages to npm
changeset publish
```

## Add a monorepo package to the main convostack package

All `convostack/*` packages live in the `packages/` directory and follow the `convostack-package-name` folder naming
convention. To add a new package, reference one of the many existing packages.

Just because a package has been defined in the `packages/` directory does NOT mean that it will automatically available
in the main `convostack` NPM package.

In order to add a package to the main `convostack` package, you must:

1. Add a new folder with the following naming convention to the `packages/convostack/src` folder. For example, for a
   package named `convostack/example-subpackage`, you would create the
   directory `packages/convostack/src/example-subpackage` and a corresponding `index.ts`
   file `packages/convostack/src/example-subpackage/index.ts` that would serve to re-export your original package from
   within the parent `convostack` package. The `index.ts` file should only contain one
   line: `export * from 'convostack/example-subpackage';`
2. Add your package to the dependencies of `convostack`. Using the example from above, you would
   add `"convostack/example-subpackage": "*"` to `packages/convostack/package.json`'s `dependencies`. Please note that
   for all of this to work for end users, you must publicly publish the `convostack/example-subpackage` package to NPM,
   since `convostack` does not actually bundle these dependencies internally.
3. To ensure that the entrypoints for imports are properly generated, you must also add your package to
   the `entrypoints` defined in the `packages/convostack/scripts/create-entrypoints.js` file. Using the example from
   above,
   you would add `"example-subpackage": "example-subpackage/index",` to the `entrypoints` map.
4. When you run `turbo build` in the root of the monorepo, it will now automatically build and properly provide your
   package via the main`convostack` package.
