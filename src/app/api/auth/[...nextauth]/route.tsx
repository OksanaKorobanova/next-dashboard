import { verifyPassword } from '@/helpers/auth';
import { connectDb, getUser } from '@/helpers/db';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' }, // default
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const client = await connectDb();

        const user = await getUser(client, email);

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          client.close();
          throw new Error('Incorrect user password');
        }
        client.close();
        return { id: user._id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log('jwt callback', { token, user, session });

      // example how to update name
      if (trigger === 'update' && session.name) {
        return {
          ...token,
          name: session.name,
        };
      }

      if (user) {
        // pass user data (id, email) to token
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log('session callback', { session, token, user });
      // pass user data ( id, email) to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
