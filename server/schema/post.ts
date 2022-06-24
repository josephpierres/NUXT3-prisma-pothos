import { builder } from '../schema';
import { db } from '../../prisma/db';
 
 export const PostSchema = () => {

  builder.prismaNode('Post', {
    findUnique: (id) => ({ id }),
    id: { resolve: (post) => post.id },
    fields: (t) => ({
      title: t.exposeString('title'),
      author: t.relation('author'),
    }),
  }); 

  builder.queryField("post", (t) =>
  t.prismaField({
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
  }),);

  builder.queryField("postsConnection", (t) => 
  t.prismaConnection({
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
    }),);
}
