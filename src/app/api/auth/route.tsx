import { NextResponse } from 'next/server';
import { connectDb, registerUser } from '@/helpers/db';
import { hashPassword } from '@/helpers/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  type newUser = {
    email: string;
    password: string;
  };

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    return NextResponse.json(
      {
        message: 'Invalid data',
      },
      {
        status: 422,
      }
    );
  } else {
    let client;

    try {
      client = await connectDb();
    } catch (error) {
      return NextResponse.json(
        {
          message: 'Connection to db failed',
        },
        {
          status: 500,
        }
      );
    }

    try {
      const hashedPassword = await hashPassword(password);

      const newUser: newUser = {
        email,
        password: hashedPassword,
      };

      const result = await registerUser(client, newUser);

      return NextResponse.json(
        {
          message: 'Message Sent',
          data: { ...newUser, id: result.insertedId },
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: 'Sign up failed',
        },
        {
          status: 500,
        }
      );
    } finally {
      client.close();
    }
  }
}
