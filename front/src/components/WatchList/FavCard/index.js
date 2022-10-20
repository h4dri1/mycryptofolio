import { Typography, Container, Avatar, Skeleton, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';

export default function FavCard({ crypto }) {
    const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);

    if (selectedCurrency === 'BTC') {
        var curParams = {
          maximumSignificantDigits: 4
        }
        var cryptoSym = '₿'
      } else if (selectedCurrency === 'ETH') {
        var curParams = {
          maximumSignificantDigits: 4
        }
        var cryptoSym = 'Ξ'
      } else {
        var curParams = {
          style: "currency",
          currency: selectedCurrency,
          maximumSignificantDigits: 4
        }
        var cryptoSym = ''
      }

    return (
        <Container 
            disableGutters 
            sx={{ 
                borderRadius: '10px', 
                height: '100%'
            }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                <StarIcon sx={{color: 'secondary.dark'}}/>{crypto?.name ? <Typography sx={{ fontSize: '0.8em', fontWeight: 'bold', color:'primaryTextColor.main' }}>{crypto.name.length > 12 ? `${crypto.name.slice(0,12)}...` : crypto.name}</Typography> : <Skeleton variant="text" width={60} />}
            </Container>
            <Container sx={{
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              overflowY: 'auto', 
              justifyContent: 'space-between',
              mb: 2,
              mt: 2
            }}>
                {crypto?.current_price ? <Box sx={{...(crypto.price_change_percentage_24h > 0 ? { backgroundColor: '#1cb344' } : { backgroundColor: '#eb3b5a' }), display: 'flex', alignItem:'center', justifyContent: 'center', borderRadius: '50%', width: '50px', height: '50px'}}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7em', fontWeight: 'bold'}}>{`${cryptoSym}${crypto.current_price.toLocaleString("en-US", curParams)}`}</Typography>
                </Box> : <Skeleton variant="circular" width={50} height={50} />}
                {crypto?.image ? <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar loading='lazy' src={crypto.image.replace('large', 'small')} alt={crypto.name} sx={{ display: {xs: 'none', md: 'inline-block'} ,width:{xs:'30px', md: '40px'}, height:{xs:'30px', md: '41px'} }} />            
                </Box> : <Skeleton variant="circular" width={40} height={40} />}
                {crypto?.price_change_percentage_24h ? <Box sx={{...(crypto.price_change_percentage_24h > 0 ? { backgroundColor: '#1cb344' } : { backgroundColor: '#eb3b5a' }), display: 'flex', alignItem:'center', justifyContent: 'center', borderRadius: '50%', width: '50px', height: '50px'}}>
                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7em', fontWeight: 'bold'}}>{crypto.price_change_percentage_24h.toFixed(2)}%</Typography>
                </Box> : <Skeleton variant="circular" width={50} height={50} />}
                
            </Container>
        </Container>
    )   
}