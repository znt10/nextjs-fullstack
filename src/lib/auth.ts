import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        
        const envEmail = process.env.ADMIN_EMAIL;
        const envPassword = process.env.ADMIN_PASSWORD;

        if (credentials?.email === envEmail && credentials?.password === envPassword) {
          return { id: "admin-id", email: envEmail!, name: "Admin", role: "admin" };
        }
          
        await dbConnect();
        
        const user = await User.findOne({ email: credentials?.email }).select("+password");
        if (!user) throw new Error("Usuário não encontrado");

        // 2. Verificar senha
        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Senha incorreta");

        // 3. Retornar usuário para sessão
        return { id: user._id.toString(), email: user.email, name: user.name , role: user.role};
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Passo 1: O User (retornado no authorize) entra no Token JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Passa o role do User para o Token
        token.id = user.id;     // Passa o ID do User para o Token
      }
      return token;
    },
    
    // Passo 2: O Token entra na Sessão (que o front-end vê)
    async session({ session, token }) {
      if (session.user) {
        // Precisamos usar 'as any' ou criar tipos personalizados (veja abaixo)
        (session.user as any).id = token.id;
        (session.user as any).role = token.role; // <--- ADICIONADO: Disponibiliza na sessão
      }
      return session;
    }
  }
};