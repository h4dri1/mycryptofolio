import * as React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { change_password } from '../../../actions/user';

import { setDisplaySnackBar } from 'src/actions/settings';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { Link as RouterLink } from 'react-router-dom';

import { 
    TextField, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Box,
    Container,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table,
    TableCell,
    TableBody,
    Avatar
} from '@mui/material';

export default function TopNFT() {

    const dispatch = useDispatch();

    const { list: nfts } = useSelector((state) => state.nft.NFTList);

    const { darkMode } = useSelector((state) => state.settings);

    const { colorTheme } = useSelector((state) => state.settings);

    if (colorTheme === 'white') {
        var color = 'white';
    } else if (colorTheme === 'secondary') {
        var color = 'secondary.main'
    } else if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(125deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    }

    return (
<Box
        sx={{
            width: '400px',
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
                    <InsertPhotoIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color: color === 'white' ? 'primary.main' : 'white' }}>Top NFT</Typography>
                </Container>
                <TableContainer component={Paper} sx={{backgroundColor: !darkMode ? '#fdecf7' : '', borderRadius: '10px' }}>
                    <Table size='small' aria-label="a dense table">
                        <TableHead sx={{backgroundColor: '#e1a2d8'}}>
                            <TableRow>
                                <TableCell ></TableCell>
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
            </Container>
        </Box>
    );
}