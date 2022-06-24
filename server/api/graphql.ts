import { createServer } from "@graphql-yoga/node";
import { schema } from '../schema'

function getUserFromAuthHeader(authorization: string | undefined): any {
  throw new Error('Function not implemented.');
}

export default defineEventHandler(async (event) => {
const server = createServer({
  graphiql: {
    defaultQuery: `{ version }`,
    endpoint: "/api/graphql",
    //subscriptionsProtocol: "WS",
  },
  schema,
  // context: async ({ req }) => ({
  //   // This part is up to you!
  //   currentUser: await getUserFromAuthHeader(req.headers.authorization),
  // }),
});

// server.start().catch((error) => {
//   console.error(error);
// });
return server.handle(event.req, event.res);
})

