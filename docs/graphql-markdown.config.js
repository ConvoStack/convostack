module.exports = {
  schema: "../packages/schema-graphql/schema.graphql",
  rootPath: "./docs",
  baseURL: "graphql-api",
  homepage: "static/graphql-api/index.md",
  loaders: {
    GraphQLFileLoader: "@graphql-tools/graphql-file-loader"
  },
  docOptions: {
    pagination: false,
    toc: false,
    index: true,
  },
  printTypeOptions: {
    deprecated: "group",
  },
};
