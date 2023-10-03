'use client';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import Copyright from '../Copyright';

export default function DemoHome() {
  const { status, data: session } = useSession();

  return (
    <>
      <AppBar position='relative'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' color='inherit' noWrap>
            Demo layout
          </Typography>

          {status === 'unauthenticated' && (
            <Button
              component={Link}
              variant='contained'
              href='/login'
              color='secondary'>
              Log in
            </Button>
          )}
          {status === 'authenticated' && (
            <Button
              component={Link}
              variant='contained'
              href='/dashboard'
              color='secondary'>
              Go to Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}>
          <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom>
              Auth demo
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='text.secondary'
              paragraph>
              Next.js app router + Typescript
            </Typography>
            {session?.user?.email && (
              <Typography
                variant='h6'
                align='center'
                color='text.secondary'
                paragraph>
                {`Hello, ${session?.user?.email}`}
              </Typography>
            )}
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'>
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}
