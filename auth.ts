import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email)
          .trim()
          .toLowerCase();

        const password = String(credentials.password);

        try {
          const { env } = await getCloudflareContext();

          const db = env.DB;

          const user = await db
            .prepare(
              `
              SELECT id, name, email, password
              FROM users
              WHERE email = ?
              LIMIT 1
              `
            )
            .bind(email)
            .first<{
              id: string;
              name: string;
              email: string;
              password: string;
            }>();

          if (!user) {
            return null;
          }

          const passwordValid = await bcrypt.compare(
            password,
            user.password
          );

          if (!passwordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("AUTH ERROR:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
});