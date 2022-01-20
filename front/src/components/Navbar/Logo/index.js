import logo from 'src/assets/logo/logo_MyCryptoFolio.png';

export default function Logo() {
    return (
        <>
            <img src={logo} alt="logo MyCryptoFolio"
                sx={{ width: 500, height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            />
        </>
    );
}