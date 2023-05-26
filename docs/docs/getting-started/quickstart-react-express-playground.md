# Quickstart: ConvoStack Playground (React, Express, TypeScript)

The ConvoStack Playground is the fastest way to start exploring ConvoStack. If you like learning by example, then this is the quick start for you!

By following this guide, you will end up with a runnable version of the [playground](https://playground.convostack.ai) on your own machine. We estimate that you can go from git clone to running in a couple of minutes.

# TODO screenshot/video of the playground

The playground monorepo includes the following TypeScript apps that you are free to copy, customize, and reference for your own development:

### Express/TypeScript backend ([source](https://github.com/ConvoStack/playground/tree/master/apps/backend))
* SQLite support for easy dev and setup
  * Postgres and MySQL support for production
* In-memory caching and pub/sub for dev
  * Redis support for production
* Multiple ConvoStack 'agent' implementations:
  * Super-simple "Echo Agent" showcases a barebones ConvoStack Agent implementation (`convostack/agent-echo.AgentEcho`)
    * Free and no API keys required!
  * "ChatGPT" demo based on OpenAI and Langchain
    * Requires `OPENAI_API_KEY` to be set
  * Langchain `ConversationalRetrievalQAChain` powered by OpenAI
    * Requires `OPENAI_API_KEY` to be set
  * Web crawler and chat QA chain based on Pinecone, OpenAI, and Langchain ([adapted from Pinecone.io](https://www.pinecone.io/learn/javascript-chatbot/))
    * Production-ready "chat with my docs/help center"
    * Powers the chat on [ConvoStack.ai](https://convostack.ai/) and this docs site!
    * Requires `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, and `PINECONE_INDEX` to be set
* Deploys to [Fly.io](https://fly.io/) for free and easy hosting [fly.toml](https://github.com/ConvoStack/playground/blob/master/apps/backend/fly.toml)
* Optional [docker-compose.yml](https://github.com/ConvoStack/playground/blob/master/docker-compose.yml) configuration for Postgres, MySQL, and Redis local dev 

### React/TypeScript frontend ([source](https://github.com/ConvoStack/playground/tree/master/apps/frontend))
* Implements the core ConvoStack React Components:
  * Widget (like the one on this docs site!)
  * Embedded
* Does not persist login data, so your conversations will clear on reload
  * Optionally, edit the `ConvoStackWrapper` configuration in `apps/frontend/src/main.tsx` to persist user data between sessions or even just hardcode a demo user!
* Uses [Vite](https://vitejs.dev/) for bundling
* Build script exports to the backend server for simple hosting (no need for separate static site hosting)

## Live demo (hosted)

If you'd like to check out the playground without setting it up yourself, click [here](https://playground.convostack.ai) for a live demo!

## Requirements

Click [here](../README.md#requirements) to see the basic requirements for running ConvoStack locally.

## Getting started script

If you don't want to read the details of each step, you can copy/paste the steps from directly the GitHub repo [README](https://github.com/ConvoStack/playground#quickstart).

## Installation

Clone the [repo](https://github.com/ConvoStack/playground):

```bash
# Clone the repo
git clone https://github.com/ConvoStack/playground convostack-playground

# Enter the project root directory
cd convostack-playground
```

From the root of the monorepo, let's install our dependencies:

```bash
# Install all dependencies
npm install
```

## Configuration

The playground backend server uses [dotenv](https://github.com/motdotla/dotenv) to load environment variables a `.env` file in the `apps/backend` directory.

You do not have to customize any parameters to run the playground, but you will need to copy the `.env.example` file over to `.env` to get up and running: 

```bash
# Setup your backend .env using the example provided
# Optionally, edit the apps/backend/.env file to set your OpenAI and/or Pinecone API keys to try some of the more advanced demos
cd apps/backend
cp .env.example .env
```

To learn more about the configuration options, use any text editor to view your new `apps/backend/.env` file.

## Migrations

ConvoStack requires a persistent storage engine that implements `convostack/models.IStorageEngine` in order to work.

Conveniently, ConvoStack comes with pre-built implementations of `IStorageEngine` so that you don't need to write any boilerplate database code.

The default storage backend for the playground SQLite, which means you don't need to run any databases yourself to run the playground, but you will still need to run migrations to setup the SQLite `.db` file:

```bash
# **Make sure that you're still in the apps/backend directory** #

# Run the SQLite migrations
npm run migrate-sqlite
```

After finishing the migrations, you are ready to run the demo locally!

## Running locally

```bash
# Get back into the root of the project. If you were running migrations earlier, run:
cd ../..

# Start the full-stack demo from the root of the project
npm run dev

# 🚀 See the demo running now on http://localhost:5173/ (GraphQL server on http://localhost:3000/graphql)
```

## Project layout

The playground monorepo is organized into two distinct applications in the `apps` workspace: `apps/backend` and `apps/frontend`.

### Backend

* The ConvoStack backend is initialized in the `apps/backend/src/server.ts` file
  * The agents are connected to the backend in this file
  * The Express server is defined here
* All ConvoStack agent implementations live in the `apps/backend/src/agents` directory
  * All agent logic lives in the agent files
  * There are no limitations on what frameworks, resources, etc. that a ConvoStack agent can use, as long as it implements the `reply` method of `convostack/agent.IAgent`

### Frontend

# TODO - RYAN

### Detailed project structure

```bash
./
  ├── apps/ # Monorepo apps workspace
  │   ├── backend/ # Typescript Express server
  │   │   ├── mysql-storage/... # Auto-generated MySQL Storage Backend migrations, schema, etc.
  │   │   ├── postgres-storage/... # Auto-generated Postgres Storage Backend migrations, schema, etc.
  │   │   ├── sqlite-storage/... # Auto-generated SQLite Storage Backend migrations, schema, etc.
  │   │   ├── scripts/... # Data loading and utility scripts
  │   │   ├── datasets/... # Demo data for the various agents
  │   │   ├── src/ # Express server source
  │   │   │   ├── agents/... # ConvoStack agents for playground demos
  │   │   │   ├── utils/... # Server and agent utils
  │   │   │   └── server.ts # Server entrypoint <--- ConvoStackBackend is configured and initialized here
  │   │   ├── Dockerfile # Production deployment Dockerfile (compatible with Fly.io)
  │   │   ├── fly.toml # Fly.io deployment spec
  │   │   ├── package.json # Server dependencies and scripts
  │   │   └── tsconfig.json # Server TypeScript config
  │   └── frontend/ # TypeScript React Client
  │       ├── public/... # Public assets
  │       ├── src/ # React client source
  │       │   ├── api/... # Playground configuration API
  │       │   ├── components/... # Playground React components
  │       │   ├── types/... # Playground types
  │       │   ├── App.tsx # React app component
  │       │   ├── index.css # Playground client styles
  │       │   ├── main.tsx # Client entrypoint <--- ConvoStackWrapper is configured and initialized here
  │       ├── index.html # Client base index.html file
  │       ├── package.json # Client dependencies and scripts
  │       ├── postcss.config.js # PostCSS config
  │       ├── tailwind.config.js # Tailwind config
  │       ├── tsconfig.json # Client (browser) TypeScript config
  │       ├── tsconfig.node.json # Client (node) TypeScript config
  │       └── vite.config.ts # Vite config
  ├── docker-compose.yml # Optional Postgres, MySQL, and Redis docker-compose local configuration
  ├── package.json # Monorepo package.json configuration, dependencies, and global scripts
  └── turbo.json # Monorepo (Turbo) configuration and global scripts
```
