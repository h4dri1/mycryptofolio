import { useSelector } from 'react-redux';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

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

export default function TopNFT() {

    const { list: nfts } = useSelector((state) => state.nft.NFTList);

    const { darkMode } = useSelector((state) => state.settings);

    const { colorTheme } = useSelector((state) => state.settings);

    if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    } else if (colorTheme === 'original') {
        if (!darkMode) {
            var color = 'rgb(58,12,163)'
            var image = 'linear-gradient(180deg, rgba(58,12,163,1) 0%, rgba(96,50,201,1) 100%)'
        } else {
            var color = 'rgba(2,50,107)'
            var image = 'linear-gradient(180deg, rgba(0,47,84,1) 0%, rgba(2,50,107,1) 100%)'
        }
    } else {
        var color = colorTheme
    }
    
    const hide500 = useMediaQuery('(max-width:600px)');

    return (
<Box
        sx={{
            width: 'auto',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            flexWrap: 'wrap',
            marginTop: '20px',
            borderRadius: '10px',
            backgroundColor: image ? '#FF3CAC' : color,
            backgroundImage: image
        }}
        >
            <Container sx={{ marginBottom: 3 }}>
                <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center' }}>
                    <InsertPhotoIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Top NFT</Typography>
                </Container>
                { nfts.length > 0 ? (
                    <TableContainer component={Paper} sx={{backgroundColor: !darkMode ? '#EAE3FF' : '#002F54', borderRadius: '10px', width: hide500 ? '320px' : '472px' }}>
                        <Table size='small' aria-label="a dense table">
                            <TableHead sx={{backgroundColor: '#B197FF'}}>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {nfts.map((nft) => (
                                <TableRow 
                                key={nft.rank}
                                hover
                                >
                                <TableCell sx={{borderBottom: 0 }}>
                                <Box component={RouterLink} to={`/nft/${nft.productPath.replaceAll('-', '')}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                                    <Avatar src={nft.iconUrl} alt={nft.contractName} sx={{ width: 38, height: 38, marginLeft: 1 }} />
                                </Box>
                                </TableCell>
                                <TableCell sx={{borderBottom: 0 }}>{nft.contractName}</TableCell>
                                <TableCell sx={{borderBottom: 0 }}>${Math.round(nft.valueUSD).toLocaleString()}</TableCell>
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
        </Box>
    );
}