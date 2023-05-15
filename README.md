# ConvoStack

ConvoStack is a plug and play embeddable AI chatbot widget and backend deployment framework.

To learn more about the project and compatible technologies, check out [ConvoStack.ai](https://convostack.ai/).

## Getting started with ConvoStack

To get started with ConvoStack, check out our getting started repo [here](https://github.com/ConvoStack/getting-started)!

## Developing ConvoStack

Only follow these instructions if you're looking to contribute to ConvoStack development. If you're looking to use ConvoStack in your own app, check out the getting started repo [here](https://github.com/ConvoStack/getting-started) instead.

### Monorepo setup

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

### Changeset Workflow

```bash
# Add a new changeset
changeset

# Create new versions of packages
changeset version

# Publish all changed packages to npm
changeset publish
```
