import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);

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
