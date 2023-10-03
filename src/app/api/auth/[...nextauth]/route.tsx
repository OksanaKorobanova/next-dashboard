import { verifyPassword } from '@/helpers/auth';
import { connectDb, getUser } from '@/helpers/db';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ObjectId } from 'mongodb';

declare module 'next-auth' {
  interface User {
    id: ObjectId;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
