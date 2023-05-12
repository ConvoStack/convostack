import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../schema-graphql/schema.graphql",
  documents: ["./graphql/**/*.graphql"],
  generates: {
    "./graphql/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: 'graphql-request'
      },
    },
  },
};

export default config;
