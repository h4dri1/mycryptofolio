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

    const { list: nfts } = useSelector((state) => state.cryptos.NFTTrend);

    return (
<Box
        sx={{
            minWidth: '27vw',
            height: 'auto',
            boxShadow: 5,
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            flexWrap: 'wrap',
            marginTop: '20px',
            borderRadius: '10px'
        }}
        >
            <Container sx={{ marginBottom: 3 }}>
            <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, width: 'auto', justifyContent: 'center' }}>
                <InsertPhotoIcon color="primary"/><Typography sx={{ fontWeight: 'bold' }}>Top NFT</Typography>
            </Container>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 10 }} size='small' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {nfts.slice(0, 5).map((nft) => (
                        <TableRow 
                        key={nft.rank}
                        >
                        <TableCell sx={{borderBottom: 0 }}>
                        <Box component={RouterLink} to={`/nft/${nft.contractName}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
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