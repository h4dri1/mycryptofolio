import { Box, useMediaQuery } from '@mui/material';
import { Suspense, lazy } from 'react';

const NavbarDesktop = lazy(() => import('./indexDesktop'));
const NavbarMobile = lazy(() => import('./indexMobile'));

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
