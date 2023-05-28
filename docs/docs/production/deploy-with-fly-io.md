# Deploy ConvoStack on Fly.io

Deploying a ConvoStack application to Fly.io is free, but requires a few accounts and tools to get started.

This tutorial has some details that are specific to the structure of
the [playground](https://github.com/ConvoStack/playground) project. In particular, the naming of environment variables,
use and location of the `.env` file, and the use of the `STORAGE_ENGINE` env var to select the storage backend type are
specific to some of the boilerplate code provided in the playground project. If you're using this guide to deploy your
own ConvoStack-dependant backend, make sure to adapt the steps that reference those variables to your own requirements.
For example, if you're not selecting a storage backend based on the `STORAGE_ENGINE` env var, you could simply skip that
step.

## Prerequisites

1. Register an account on Fly.io
2. Install the Fly.io CLI (`flyctl`)
3. Register an account on [Neon](https://neon.tech/)

## Set up a PostgreSQL DB on Neon

1. Create a new Project on Neon. Make sure to keep the connection string, or you won't have the password for connecting
   the database later on.
2. Create a DB within the project from the dashboard for ConvoStack (e.g., `convostackdb`)
3. Create another DB, e.g., `shadowdb`, within the same project that will serve as a "Shadow DB" for tracking
   migrations. You might ask why
   do we need this? Well, our default storage engines use Prisma as an ORM, and Prisma uses this DB for migrations.
   Typically, Prisma would silently create and delete this DB when running migrations, but Neon doesn't allow users to
   create DBs on the fly, so we have to manually create this once and Prisma will con. To learn more about how the
   Shadow DB works, check out the relevant Prisma
   docs [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database).
4. Copy the connection URL for the ConvoStack DB created in Step 2 into the `DATABASE_URL` value in your `.env`
5. Then the connection URL for the Shadow DB created in Step 3 into the `SHADOW_DATABASE_URL` value in your `.env`
6. Run `npm run migrate-postgres` to apply migrations to your new Postgres DB. This script will source the DB URLs from
   the .env file. If you're running this in the playground, make sure that you run this command from the `apps/backend`
   directory where the backend `package.json` and corresponding `.env` file are located. If you're running this in your
   own project, please reference the `migrate-postgres` from the playground and adapt as necessary.
7. At this point, your database should be ready to go!

## Launch fly.io

1. From the backend directory, run `flyctl launch`. Follow the steps to name and configure your app based on the
   existing `fly.toml`. When asked if you want to create a Postgres DB, you should skip (unless you would rather use
   Fly's Postgres service). When asked if you'd like to create a Redis, make sure to respond yes. We'll use the Redis DB
   soon. If you skip this step, please consult the Fly.io docs about creating an Upstash Redis instance from the
   dashboard or CLI after your app is created. Since we have to setup more env vars and secrets, do not deploy the app
   just yet.
2. Check out the `fly.toml` file and edit the `[env]` block as you need to correspond to the configuration want. In particular, make sure to update the CORS origins and any authentication configuration options. Do not set any sensitive values here.
3. For all of your secrets, use `flyctl secrets set XXX=VALUE` to set them. At a minimum, make sure to set `DATABASE_URL`, `JWT_SECRET`, and `REDIS_URL`. You should have all of these values (if you need to get the redis URL, run ` flyctl redis status <your fly app name>`).
4. You're finally ready to deploy! Run `flyctl deploy` to get your app online. After the deploy completes, your application should be accessible on a `fly.dev` domain!

## Fly Dockerfile

For an example Fly.io Dockerfile, please check out this [guide](backend-dockerfile).

## Example Fly Configuration

To deploy ConvoStack using Fly.io, you can reference the following example deploy file from
the [playground](https://github.com/ConvoStack/playground) repo.

### Healthcheck

The healthcheck in the `fly.toml` below calls `[GET] /api/agents` which is an endpoint implemented by the playground
code, not the ConvoStack backend itself. If you'd like to use an HTTP healthcheck, you should add an endpoint to your
Express server that will respond to `GET` requests with `200 OK`.

```toml
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

[[services]]
  internal_port = 3000
  protocol = "tcp"
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

  [[services.ports]]
    handlers = ["http"]
    port = "80"

  [[services.ports]]
    handlers = ["tls", "http"]
    port = "443"

  [services.http_checks]
    path = "/api/agents"
    interval = "15s"
    timeout = "5s"

```

The example deploy file showcases the necessary configuration for deploying ConvoStack on the Fly.io platform. It
includes settings for scaling, networking, and any other required parameters. For a detailed guide on deploying
applications with Fly.io, refer to the Fly.io documentation.
