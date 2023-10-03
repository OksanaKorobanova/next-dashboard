'use client';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import DemoDashboard from '@/components/dashboard/DemoDashboard';

const Dashboard = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <Box>Loading...</Box>;
  }

  return <DemoDashboard />;
};

export default Dashboard;
