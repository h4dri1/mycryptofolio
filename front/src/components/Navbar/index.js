import { Box } from '@mui/material';
import NavbarDesktop from './indexDesktop';
import NavbarMobile from './indexMobile';

export default function Navbar() {
  return (
    <Box>
      <Box sx={{ display: { xs: 'none', md: 'inline' } }}>
        <NavbarDesktop />
      </Box>
      <Box sx={{ display: { xs: 'inline', md: 'none' } }}>
        <NavbarMobile />
      </Box>
    </Box>
  );
}
