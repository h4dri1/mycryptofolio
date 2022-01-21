import logo from 'src/assets/logo/logo_MyCryptoFolio.png';
import Avatar from '@mui/material/Avatar';

export default function Logo() {
    return (
        <>
            <Avatar
                alt="logo MyCryptoFolio"
                src={logo}
                sx={{ width: 65, height: 65 }}
                variant="square"
            />
        </>
    );
}