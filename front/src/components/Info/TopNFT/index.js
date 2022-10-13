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

    const { color, image } = colors
    
    const hide500 = useMediaQuery('(max-width:600px)');

    return (
<Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2}}>
      <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
        <InsertPhotoIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Trending NFT</Typography>
      </Container>
      <Container sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflowY: 'auto', 
        justifyContent: 'center'
      }}>
                { nfts.length > 0 ? (
                    <TableContainer component={Paper} sx={{backgroundColor: 'neutral.main', borderRadius: '10px'}}>
                        <Table size='small' aria-label="a dense table">
                            <TableHead sx={{backgroundColor: 'secondary.dark'}}>
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
        </Container>
    );
}

