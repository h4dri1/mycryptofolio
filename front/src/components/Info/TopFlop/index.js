import { useSelector } from 'react-redux';

import WhatshotIcon from '@mui/icons-material/Whatshot';

import { Link as RouterLink } from 'react-router-dom';

import { 
    Typography, 
    Box,
    Container,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableCell,
    TableBody,
    Avatar,
    useMediaQuery,
    Skeleton
} from '@mui/material';

export default function TopFlop({pixelRatio}) {

    const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);
    const size = pixelRatio > 1 ? '0.8em' : '0.9em'

    const newCryptos = []

    for (const crypto in cryptos.coins) {
        newCryptos.push(cryptos.coins[crypto].item);
    }
    
    const hide500 = useMediaQuery('(max-width:600px)');
    
    return (
<Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2}}>
      <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
        <WhatshotIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Trending Cryptos</Typography>
      </Container>
      <Container sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflowY: 'auto', 
        justifyContent: 'center'
      }}>
            { newCryptos.length > 0 ? (
                <TableContainer component={Paper} sx={{backgroundColor: 'neutral.main', borderRadius: '10px'}}>
                    <Table size='small' aria-label="a dense table">
                        <TableHead sx={{backgroundColor: 'secondary.dark'}}>
                            <TableRow>
                                <TableCell ></TableCell>
                                <TableCell>Nom</TableCell>
                                <TableCell>Rang</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {newCryptos.slice(0,7).map((crypto) => (
                            <TableRow 
                            key={crypto.id}
                            hover
                            >
                            <TableCell sx={{borderBottom: 0 }}>
                            <Box component={RouterLink} to={`/crypto/${crypto.id}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                                <Avatar loading='lazy' src={crypto.small} alt={crypto.name} sx={{ mr: 2, width: 20, height: 20, marginLeft: 1 }} />
                                <Typography sx={{color: 'secondary.dark'}}>{crypto.symbol.toUpperCase()}</Typography>
                            </Box>
                            </TableCell>
                            <TableCell sx={{borderBottom: 0, fontSize: size }}>{crypto.id.length > 13 ? `${crypto.id.slice(0,10)}...` : crypto.id}</TableCell>
                            <TableCell sx={{borderBottom: 0 }}>{crypto.market_cap_rank}</TableCell>
                            </TableRow >
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Skeleton sx={{borderRadius: '10px'}} variant="rectangle" width={hide500 ? '320px' : '472px'} height='289px' />
            )
            }
      </Container>
    </Container>
    );
}

