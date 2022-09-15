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

export default function TopNFT(colors) {

    const { list: nfts } = useSelector((state) => state.nft.NFTList);

    const { darkMode } = useSelector((state) => state.settings);

    const { color, image } = colors
    
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
                    <InsertPhotoIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Trending NFT</Typography>
                </Container>
                { nfts.length > 0 ? (
                    <TableContainer component={Paper} sx={{backgroundColor: !darkMode ? '#EAE3FF' : '#002F54', borderRadius: '10px', width: hide500 ? '320px' : '472px' }}>
                        <Table size='small' aria-label="a dense table">
                            <TableHead sx={{backgroundColor: '#B197FF'}}>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Nom</TableCell>
                                    <TableCell>Owners</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {nfts.map((nft) => (
                                <TableRow 
                                key={nft.attributes.address}
                                hover
                                >
                                <TableCell sx={{borderBottom: 0 }}>
                                <Box component={RouterLink} to={`#`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                                    <Avatar loading='lazy' src={nft.attributes.image_preview_icon_url} alt={nft.attributes.name} sx={{ width: 38, height: 38, marginLeft: 1 }} />
                                </Box>
                                </TableCell>
                                <TableCell sx={{borderBottom: 0 }}>{nft.attributes.name}</TableCell>
                                <TableCell sx={{borderBottom: 0 }}>{nft.attributes.unique_owners}</TableCell>
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