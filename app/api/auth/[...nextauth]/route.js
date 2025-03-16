import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials"; // Add the Credentials provider
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // For password hashing and comparison
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user doesn't exist, throw an error
        if (!user) {
          throw new Error("No user found with this email.");
        }

        // If user signed up with a social provider (no password), throw an error
        if (!user.password) {
          throw new Error("Please sign in using your social provider.");
        }

        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If password is invalid, throw an error
        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }

        // If everything is valid, return the user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret defined in your environment variables
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
