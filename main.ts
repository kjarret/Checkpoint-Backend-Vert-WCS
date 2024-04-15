import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { AppDataSource } from "./src/db/data-source";
import { PaysResolver } from "./src/resolvers/PaysResolver";

async function startServer() {
  await AppDataSource.initialize().catch((error) => {
    console.error("Erreur d'initialisation de data-source", error);
  });

  const schema = await buildSchema({
    resolvers: [PaysResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });

  await startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
