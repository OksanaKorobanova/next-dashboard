'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import FormSide from '@/components/FormSide';

const Login = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Box>Loading...</Box>;
  }

  if (status === 'authenticated') {
    redirect('/dashboard');
  }
  return <FormSide isLogin />;
};

export default Login;
