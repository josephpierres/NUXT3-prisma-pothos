
import { config } from "dotenv";
//import { PrismaClient } from '../prisma/client'; d'apres ce quu'on a declare dans le schema
import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;

// Load process.env.DATABASE_URL from .env
config();

export const db = new PrismaClient();
export const readOnlydb = new PrismaClient({
    datasources: {
      db: {
        url: process.env.READ_ONLY_REPLICA_URL,
      },
    },
  });
