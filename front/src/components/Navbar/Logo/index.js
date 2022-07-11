import logoOrigine from 'src/assets/logo/logo_MyCryptoFolio.png';
import logoWhite from 'src/assets/logo/logo_MyCryptoFolio_white.png';
import logoRadial from 'src/assets/logo/logo_MyCryptoFolio_radial.png';
import logoLinear from 'src/assets/logo/logo_MyCryptoFolio_linear.png';
import logoColor from 'src/assets/logo/logo_MyCryptoFolio_color.png';
import logoNB from 'src/assets/logo/logo_MyCryptoFolio_linear-removebg.png';
import Avatar from '@mui/material/Avatar';
import { useMediaQuery } from '@mui/material';

export default function Logo() {

  const hide = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Avatar
        alt="logo MyCryptoFolio"
        src={logoNB}
        sx={{
          width: hide ? 30 : 70,
          height: hide ? 30 : 70,
          ml: 1,
          borderRadius: '1rem'
        }}
        variant="square"
      />
    </>
  );
}
