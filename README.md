# Convo Stack

Convo Stack Readme.

# Getting started

```bash
# From repo root, install dependencies
npm i

# Enter dev backend example
cd examples/be-example-express-sqlite
# Init dev sqlite db
npm run migrate
# Setup dev backend .env
cp .env.example .env
# Run the dev backend
npm run dev

# Enter dev frontend example
cd examples/fe-example-react
# Run the dev frontend
npm run dev
```

# Changeset

```bash
# Add a new changeset
changeset

# Create new versions of packages
changeset version

# Publish all changed packages to npm
changeset publish
```
