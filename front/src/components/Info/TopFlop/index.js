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
    Skeleton
} from '@mui/material';

const Loading = (props) => {
    return (
        <Skeleton sx={{margin: '0px 1px 0px 1px', borderRadius: props.br, width: {xs: props.wxs, md: props.wmd}}} variant={props.variant} height={props.h} />
    )
}

const CryptoMap = (props) => {
    const size = props.pixelRatio > 1 ? '0.8em' : '0.9em'
    const cutCryptos = props.loading ? Array.from(new Array(7)) : props.cryptos.coins.slice(0,7)

    return (
        cutCryptos.map((crypto, index) => (
            <TableRow 
                key={index}
                hover
            >
                <TableCell sx={{borderBottom: 0 }}>
                    { !props.loading ?
                    <Box component={RouterLink} to={`/crypto/${crypto.item.id}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                        <Avatar loading='lazy' src={crypto.item.small} alt={crypto.item.name} sx={{ mr: 2, width: 20, height: 20, marginLeft: 1 }} /> 
                        <Typography sx={{color: 'secondary.dark'}}>{crypto.item.symbol}</Typography>
                    </Box> : <Box sx={{ display: 'flex', alignItems: 'center', margin: { xs: ' 0 -16px', sm: '0px' } }}><Loading variant='circular' h={20} wxs={20} wmd={20} /><Loading variant='text' h={20} wxs={30} wmd={30} /></Box>
                    }
                </TableCell>
                <TableCell sx={{borderBottom: 0, fontSize: size }}>{!props.loading ? (crypto.item.id.length > 13 ? `${crypto.item.id.slice(0,10)}...` : crypto.item.id) : <Loading variant='text' h={20} wxs={40} wmd={40} />}</TableCell>
                <TableCell sx={{borderBottom: 0 }}>{!props.loading ? (crypto.item.market_cap_rank) : <Loading variant='text' h={20} wxs={20} wmd={20} />}</TableCell>
            </TableRow >
        ))
    )
}

const CryptoArray = (props) => {

    return (
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
                <CryptoMap cryptos={props.cryptos} loading={props.loading}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default function TopFlop({pixelRatio}) {
    const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);
    
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
            { cryptos.coins ? (
                <CryptoArray cryptos={cryptos} pixelRatio={pixelRatio}/>
            ) : (
                <CryptoArray loading={true} pixelRatio={pixelRatio}/>
            )
            }
      </Container>
    </Container>
    );
}

