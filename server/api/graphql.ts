import { createServer } from '@graphql-yoga/node';
import { schema } from '../schema'

function getUserFromAuthHeader(authorization: string | undefined): any {
  throw new Error('Function not implemented.');
}

const server = createServer({
  schema,
  // context: async ({ req }) => ({
  //   // This part is up to you!
  //   currentUser: await getUserFromAuthHeader(req.headers.authorization),
  // }),
});


server.start().catch((error) => {
  console.error(error);
});

