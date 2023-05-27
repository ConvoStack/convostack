# Deploy ConvoStack on Fly.io

Deploying a ConvoStack application to Fly.io is free, but requires a few accounts and tools to get started:

## Prerequisites

1. Register an account on Fly.io
2. Install the Fly.io CLI (`flyctl`)
3. Register an account on [Neon](https://neon.tech/)

## Set up a PostgreSQL DB on Neon

1. Create a new Project on Neon. Make sure to keep the connection string, or you won't have the password for connecting
   the database later on.
2. Create a DB within the project from the dashboard for ConvoStack (e.g., `convostackdb`)
3. Create another DB within the same project that will serve as a "Shadow DB" for tracking migrations. You might ask why
   do we need this? Well, our default storage engines use Prisma as an ORM, and Prisma uses this DB for migrations.
   Typically, Prisma would silently create and delete this DB when running migrations, but Neon doesn't allow users to
   create DBs on the fly, so we have to manually create this once and Prisma will con. To learn more about how the
   Shadow DB works, check out the relevant Prisma
   docs [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database).
4. Copy the URL

# TODO finish docs

## Deploy to Fly.io

1. Enter the directory of your backend server project
2. Run `fly launch` (optionally, setup your own `Dockerfile` and `fly.toml` first)

## Example Fly Configuration

To deploy ConvoStack using Fly.io, you can reference the following example deploy file from
the [playground](https://github.com/ConvoStack/playground) repo.

```toml
# fly.toml app configuration file generated for convostack-getting-started on 2023-05-25T01:11:00-04:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = "convostack-getting-started"
primary_region = "iad"

[env]
  ALLOW_ANONYMOUS_USERS = "true"
  CORS_ALLOWED_ORIGINS = "http://localhost:3000,http://localhost:5173,https://studio.apollographql.com,https://convostack-getting-started.fly.dev,https://convostack.ai,https://docs.convostack.ai,https://playground.convostack.ai"
  HOST = "0.0.0.0"
  PORT = "3000"
  REQUIRE_USER_VERIFICATION_HASH = "false"
  STORAGE_ENGINE = "postgres"
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

```

The example deploy file showcases the necessary configuration for deploying ConvoStack on the Fly.io platform. It
includes settings for scaling, networking, and any other required parameters. For a detailed guide on deploying
applications with Fly.io, refer to the Fly.io documentation.

##   