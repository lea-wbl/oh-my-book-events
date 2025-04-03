import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(
          "coucou",
          process.env.ADMIN_EMAIL,
          process.env.ADMIN_PASSWORD_HASH
        );

        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHashedPassword = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminHashedPassword) {
          console.error(
            "Missing environment variables: ADMIN_EMAIL or ADMIN_PASSWORD_HASH"
          );
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          adminHashedPassword
        );

        if (credentials.email === adminEmail && passwordMatch) {
          return { id: "1", name: "Admin", email: adminEmail, role: "admin" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token?.role,
        },
      };
    },
  },
  pages: {
    signIn: "/adminDashboard/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
