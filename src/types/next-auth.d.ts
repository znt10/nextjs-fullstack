import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    role?: "admin" | "user" | string;
  }

  interface Session extends DefaultSession {
    user: {
      id?: string;
      role?: "admin" | "user" | string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}