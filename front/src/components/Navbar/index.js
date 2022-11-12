import { Box, useMediaQuery } from '@mui/material';
import { Suspense, lazy } from 'react';

const NavbarDesktop = lazy(() => import('./desktop'));
const NavbarMobile = lazy(() => import('./mobile'));

export default function Navbar() {
  const mobileSize = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      {mobileSize
        ? (
          <Suspense fallback={<></>}>
            <NavbarMobile />
          </Suspense>
        )
        : (
          <Suspense fallback={<></>}>
            <NavbarDesktop />
          </Suspense>
        )}
    </Box>
  );
}
