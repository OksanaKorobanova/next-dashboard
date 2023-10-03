import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: 'You are not logged in' },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    { email: session.user?.email },
    {
      status: 201,
    }
  );
}
