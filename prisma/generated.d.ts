import type { Prisma, Post, Account, Session, User, VerificationToken } from "@prisma/client";
export default interface PrismaTypes {
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        Where: Prisma.PostWhereUniqueInput;
        Fields: "author";
        RelationName: "author";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User | null;
                Types: PrismaTypes["User"];
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        Where: Prisma.AccountWhereUniqueInput;
        Fields: "user";
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        Where: Prisma.SessionWhereUniqueInput;
        Fields: "user";
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "accounts" | "sessions" | "posts";
        RelationName: "accounts" | "sessions" | "posts";
        ListRelations: "accounts" | "sessions" | "posts";
        Relations: {
            accounts: {
                Shape: Account[];
                Types: PrismaTypes["Account"];
            };
            sessions: {
                Shape: Session[];
                Types: PrismaTypes["Session"];
            };
            posts: {
                Shape: Post[];
                Types: PrismaTypes["Post"];
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        Where: Prisma.VerificationTokenWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}