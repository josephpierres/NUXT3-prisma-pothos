import { builder } from './builder';
import { db } from '../prisma/db';

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

builder.prismaNode('Post', {
  findUnique: (id) => ({ id }),
  id: { resolve: (post) => post.id },
  fields: (t) => ({
    title: t.exposeString('title'),
    author: t.relation('author'),
  }),
});


builder.queryType({
  fields: (t) => ({
    post: t.prismaField({
      type: 'Post',
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (query, root, args) =>
        db.post.findUnique({
          ...query,
          where: { id: String(args.id)}
          //where: { id: Number.parseInt(String(args.id), 10) },
        }),
    }),
    postsConnection: t.prismaConnection({
      type: 'Post',
      cursor: 'id',
      args: {
        take: t.arg.int(),
        skip: t.arg.int(),
      },
      resolve: (query, root, args) =>
        db.post.findMany({
          ...query,
          take: args.take ?? 5,  //DEFAULT_PAGE_SIZE,
          skip: args.skip ?? 0,
        }),
    }),
    me: t.prismaField({
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
    }),
    user: t.prismaField({
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
    }),
  }),
});

export const schema = builder.toSchema({});