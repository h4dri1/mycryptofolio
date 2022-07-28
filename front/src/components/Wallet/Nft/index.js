import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import { Pie } from 'react-chartjs-2';
  import Container from '@mui/material/Container';
  import { TableContainer, Paper } from '@mui/material';
  import Table from '@mui/material/Table';
  import TableHead from '@mui/material/TableHead';
  import TableBody from '@mui/material/TableBody';
  import TableRow from '@mui/material/TableRow';
  import TableCell from '@mui/material/TableCell';
  import Divider from '@mui/material/Divider';
  import Typography from '@mui/material/Typography';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardHeader from '@mui/material/CardHeader';
  import CardMedia from '@mui/material/CardMedia';
  import CardContent from '@mui/material/CardContent';
  import CardActions from '@mui/material/CardActions';
  import Collapse from '@mui/material/Collapse';
  import Avatar from '@mui/material/Avatar';
  import IconButton from '@mui/material/IconButton';
  import { red } from '@mui/material/colors';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import ShareIcon from '@mui/icons-material/Share';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import MoreVertIcon from '@mui/icons-material/MoreVert';


  import PaidIcon from '@mui/icons-material/Paid';

  import PhotoIcon from '@mui/icons-material/Photo';
  
  import PropTypes from 'prop-types';
  import { useSelector } from 'react-redux';

  import { ethers } from 'ethers';

  import { Link as RouterLink } from 'react-router-dom';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default function Nft({collection}) {
    const {selectedCurrency} = useSelector((state) => state.cryptos.cryptoList);
    const { darkMode } = useSelector((state) => state.settings);
    let sum = 0;
    let sum24h = 0;

    const dayChange = ((sum - sum24h) / sum) * 100;

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

    var img_url = [];

    for (const nft of collection) {
        img_url.push(JSON.parse(nft.metadata).image_url);
    }
    
    //const labelsList = distribution.map((item) => (
    //  item.symbol
    //));
  //
    //const dataList = distribution.map((item) => (
    //  item.distribution
    //));
  
    // OPTIONS PIE GRAPH
    //const options = {
    //  plugins: {
    //    legend: {
    //      display: false,
    //    },
    //  },
    //};
  
    // DATA PIE GRAPH
    //const data = {
  //
    //  // TODO: LABEL à dynamiser
    //  labels: labelsList,
    //  // labels: ['BTC', 'ETH',...]
    //  datasets: [
    //    {
    //      label: '% of assets',
    //      // TODO: DATA à dynamiser
    //      data: dataList,
    //      backgroundColor: [
    //        'rgba(255, 99, 132, 0.2)',
    //        'rgba(54, 162, 235, 0.2)',
    //        'rgba(255, 206, 86, 0.2)',
    //        'rgba(75, 192, 192, 0.2)',
    //        'rgba(153, 102, 255, 0.2)',
    //        'rgba(255, 159, 64, 0.2)',
    //      ],
    //      borderColor: [
    //        'rgba(255, 99, 132, 1)',
    //        'rgba(54, 162, 235, 1)',
    //        'rgba(255, 206, 86, 1)',
    //        'rgba(75, 192, 192, 1)',
    //        'rgba(153, 102, 255, 1)',
    //        'rgba(255, 159, 64, 1)',
    //      ],
    //      borderWidth: 2,
    //    },
    //  ],
    //};
  //

    const hide500 = useMediaQuery('(max-width:600px)');

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: 'auto' }}>
        <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
            <PhotoIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold' }}>NFT</Typography>
        </Container>
        <Container sx={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto', justifyContent: 'space-around',
          '&::-webkit-scrollbar': {
            width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)', 
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#7f5cce',
            outline: '1px solid slategrey'
          }
        }}
        >
            {collection.map((nft) => (
                <Card key={nft.name} sx={{marginBottom: 2, boxShadow: 4}}>
                    <CardMedia
                        component="img"
                        image={JSON.parse(nft.metadata).image_url}
                        alt={JSON.parse(nft.metadata).image}
                        sx={{width: '180px', height: '180px'}}/>
                    <CardContent sx={{backgroundColor: 'custom.main'}}>
                        <Typography sx={{fontSize:'0.8em', justifyContent: 'center', display: 'flex', color: 'primary.dark'}}>
                            {nft.name}
                        </Typography>
                    </CardContent>
 
                </Card>
            ))}
        </Container>
      </Container>
    );
  }
  