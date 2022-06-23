import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import { db } from '../prisma/db';
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '../prisma/generated';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes;}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {  client: db, },
});

