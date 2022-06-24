import { builder } from '../schema';
import { db } from '../../prisma/db';
export const UserSchema = () => { 

builder.prismaNode("User", {
  // This is used to load the node by id
  findUnique: (id) => ({ id }), // the findUnique function now only receives an id. This is to support relays ability to load nodes by id.
  // This is used to get the id from a node 
  id: { resolve: (user) => user.id }, //there is a new id option that mirrors the id option from node method of the relay plugin, and must contain a resolve function that returns the id from an instance of the node. 
    
  fields: (t) => ({
      name: t.exposeString('name', { nullable: true, }),
      email: t.exposeString('email', { nullable: true, }),
      emailVerified: t.string({ 
            resolve: (parent) => parent.emailVerified?.toDateString(),
            nullable: true, 
            }),
      image: t.exposeString('image', { nullable: true, }),
      role: t.exposeString('role'),
      // Load posts as list field.
      postsConnection: t.relatedConnection('posts', {
        cursor: 'id',
        args: {
          oldestFirst: t.arg.boolean(),
        },
      // Define custom query options that are applied when
      // loading the post relation
      query: (args, context) => ({
        orderBy: {
          createdAt: args.oldestFirst ? 'asc' : 'desc',
        },
      }),
    }),    
  }),
});

builder.queryField("users", (t) =>
t.prismaConnection({
  type: "User",  
  cursor: "id",
  totalCount: () => db.user.count(),
  resolve: (query, _parent) => db.user.findMany({ ...query }),
}),
);

builder.queryField("me", (t) =>
t.prismaField({
  type: 'User',
  nullable: true,
  resolve: async (query, root, args, ctx, info) =>
    db.user.findUnique({
      // the `query` argument will add in `include`s or `select`s to
      // resolve as much of the request in a single query as possible
      ...query,
      rejectOnNotFound: true,
      where: { id: "cl4plib3000004wu8jszvb633" },
    }),
  }));

builder.queryField("user", (t) =>
t.prismaField({
  type: 'User',
  nullable: true,
  args: {
    id: t.arg.id({ required: true }),
  },
  resolve: (query, root, args) =>
    db.user.findUnique({
      ...query,
      where: { id: String(args.id) },
    }),
}),);

builder.mutationField("userCreate", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, { email, name }) =>
      db.user.create({ ...query, data: { email, name }}),
  }),
  );
}

