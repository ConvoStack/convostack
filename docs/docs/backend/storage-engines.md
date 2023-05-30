---
sidebar_position: 0.3
---

# Storage Engines

This documentation provides information about the storage engines available in the ConvoStack backend system. The
ConvoStack backend supports the following storage engines:

- `convostack/storage-engine-prisma-mysql`
- `convostack/storage-engine-prisma-postgres`
- `convostack/storage-engine-prisma-sqlite`

You are free to build your own custom storage engine by implementing the `convostack/models.IStorageEngine` interface.

## Integration

The ConvoStack backend requires a storage engine. To connect one of the default storage engines, please refer to the
example code below:

The URL format for each storage engine is as follows:

- **SQLite**: `"file:path/to/database.sqlite"`
- **MySQL**: `"mysql://user:password@host:port/database"`
- **PostgreSQL**: `"postgresql://user:password@host:port/database"`

For more details on the URL structure and available options, refer to
the [Prisma documentation](https://www.prisma.io/docs/reference/database-reference/connection-urls).

Here's an example code snippet demonstrating the initialization of different storage engines based on env vars:

```typescript
import { StorageEnginePrismaSQLite } from "convostack/storage-engine-prisma-sqlite";
import { StorageEnginePrismaPostgres } from "convostack/storage-engine-prisma-postgres";
import { StorageEnginePrismaMySQL } from "convostack/storage-engine-prisma-mysql";

// Select and init a storage backend depending on the configuration
let storage;
switch (process.env.STORAGE_ENGINE) {
  case "sqlite":
    storage = new StorageEnginePrismaSQLite(process.env.DATABASE_URL);
    await storage.init();
    break;
  case "postgres":
    storage = new StorageEnginePrismaPostgres(process.env.DATABASE_URL);
    await storage.init();
    break;
  case "mysql":
    storage = new StorageEnginePrismaMySQL(process.env.DATABASE_URL);
    await storage.init();
    break;
  default:
    throw new Error(`Invalid storage engine: ${process.env.STORAGE_ENGINE}`);
}

// Setup the ConvoStack backend
const backend = new ConvoStackBackendExpress({
  storage,
  // ...
});
```

## Storage Implementations

The default storage engines use Prisma, a Node ORM, to manage database schemas, migrations, connections, and operations.

Each default storage engine is packaged with a CLI, named `convostack-storage-engine-prisma-<type of db>`, that manages
setting up the Prisma client and migrations. We recommend adding the `package.json` reference scripts below to your
application to make it simple to set up the engines.

We suggest planning to keep a separate database for ConvoStack, to keep your own application's schema, migrations, and
data separate from the ConvoStack logic. Running the migration script as ConvoStack is updated will ensure your database
schema is kept up to date.

## `package.json` Reference Scripts

The following scripts can be added to the `package.json` file `script` property to perform various operations related to
the storage engines:

### Migrate SQLite

```json
"migrate-sqlite": "npx convostack-storage-engine-prisma-sqlite migrate --dir ./sqlite-storage --db-url \"file:./dev.db\""
```

This script is used to run database migrations for the SQLite storage engine. It migrates the database schema using the
specified migration directory and database URL.

### Studio SQLite

```json
"studio-sqlite": "npx convostack-storage-engine-prisma-sqlite studio --dir ./sqlite-storage --db-url \"file:./dev.db\""
```

This script opens the Prisma Studio tool for the SQLite storage engine. It allows you to interactively explore and
manage the data in the database using a web-based UI.

### Migrate PostgreSQL

```json
"migrate-postgres": "source .env && npx convostack-storage-engine-prisma-postgres migrate --dir ./postgres-storage --db-url \"$DATABASE_URL\" --shadow-db-url \"$SHADOW_DATABASE_URL\""
```

This script is used to run database migrations for the PostgreSQL storage engine. It migrates the database schema using
the specified migration directory and database URLs.

### Studio PostgreSQL

```json
"studio-postgres": "source .env && npx convostack-storage-engine-prisma-postgres studio --dir ./postgres-storage --db-url \"$DATABASE_URL\" --shadow-db-url \"$SHADOW_DATABASE_URL\""
```

This script opens the Prisma Studio tool for the PostgreSQL storage engine. It allows you to interactively explore and
manage the data in the database using a web-based UI.

### Migrate MySQL

```json
"migrate-mysql": "source .env && npx convostack-storage-engine-prisma-mysql migrate --dir ./mysql-storage --db-url \"$DATABASE_URL\" --shadow-db-url \"$SHADOW_DATABASE_URL\""
```

This script is used to run database migrations for the MySQL storage engine. It migrates the database schema using the
specified migration directory and database URLs.

### Studio MySQL

```json
"studio-mysql": "source .env && npx convostack-storage-engine-prisma-mysql studio --dir ./mysql-storage --db-url \"$DATABASE_URL\" --shadow-db-url \"$SHADOW_DATABASE_URL\""
```

This script opens the Prisma Studio tool for the MySQL storage engine. It allows you to interactively explore and manage
the data in the database using a web-based UI.
