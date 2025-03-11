
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import { prisma } from './db';
import { NextAuthOptions } from 'next-auth';

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: Record<"email" | "password", string> | undefined) {

            if(!credentials || !credentials.email || !credentials.password) {
              return null;
            }

            const user = await prisma.user.findUnique({where: {email: credentials.email}});

            if(!user || !user.password) {
              return null;
            }

            const validPasswd = await bcrypt.compare(credentials.password, user.password);
            if(!validPasswd) {
              return null;
            }

              return {
                id: user.id,
                email: user.email,
                name: user.name
              };
          },
        }),
    ],
    callbacks: {
      jwt: async ({ user, token }) => {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token?.id) {
          session.user.id = token.id;
        }
        return session;
      }
    },
    pages: {
      signIn: "/signin", 
    },
  }