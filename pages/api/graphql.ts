import { ApolloServer, gql } from "apollo-server-micro";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getManifestBySlug, getRootCollection } from "./iiif";

const rootCollection = process.env.rootCollection;

const typeDefs = gql`
  type Query {
    manifests: [Manifest]
    allManifests: [Manifest]
    getManifest(slug: ID): Manifest
  }

  type Collection {
    collectionId: String
    id: ID
    label: String
  }

  type Manifest {
    collectionId: ID
    id: String
    label: String
    metadata: [Metadata]
    slug: ID
  }

  type Metadata {
    manifestId: ID
    label: [String]
    value: [String]
  }
`;

const resolvers = {
  Query: {
    allManifests: async (_, __, context) => {
      return getRootCollection(rootCollection);
    },
    getManifest: async (_, { slug }, context) => {
      return getManifestBySlug(rootCollection, slug);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
  ssrMode: true,
  ssrForceFetchDelay: 100,
});

export const getGraphQL = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);