npx nuxi init nuxt3-pothos-yoga

npm install -D @nuxtjs/tailwindcss @tailwindcss/forms @tailwindcss/line-clamp @tailwindcss/typography
npx tailwindcss init

++++++++++++++++++++++++++++ Prisma ORM +++++++++++++++++++++++++++++++++++++++++++++++++

npm install prisma ts-node @types/node --save-dev
npm install -D @prisma/client prisma
npx prisma init

npx prisma migrate dev --name initial-migration

npx prisma db push

 "postinstall": "prisma generate"

"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
npx prisma db seed

si on veut faire un reset du db
npx prisma migrate reset

pour mettre en production, prisma risque de perdre le .env
npm install -D dotenv

yarn prisma studio
++++++++++++++++++++++++ Pothos GraphQl-yoga ++++++++++++++++++++++++++++++++++++++++++++++++

yarn add @pothos/core @graphql-yoga/node
@pothos/plugin-prisma: For prisma based type definitions, and efficient queries
yarn add @pothos/plugin-prisma

generator pothos {
  provider     = "prisma-pothos-types"
  // Match client output location from above
  clientOutput = "./client"     
  output       = "./generated.d.ts"
}

clientOutput: Where the generated code will import the PrismaClient from. The default is the full path of wherever the client is generated. If you are checking in the generated file, using @prisma/client is a good option.

generator pothos {
  provider = "prisma-pothos-types"
  clientOutput = "@prisma/client"
  output = "./pothos-types.ts"
}

!Important: Exécutez la commande suivante pour regénérer le client et créer les nouveaux types
npx prisma generate

pothos plugin "simple-objects, scope-auth"
yarn add @pothos/plugin-scope-auth
yarn add @pothos/plugin-simple-objects