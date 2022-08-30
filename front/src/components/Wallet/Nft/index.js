import {
    Chart as ChartJS, ArcElement, Tooltip, Legend,
  } from 'chart.js';
  import { Container, Typography, useMediaQuery, Box, Card, CardMedia, CardContent, Skeleton } from '@mui/material';

  import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

  import PhotoIcon from '@mui/icons-material/Photo';

  import { useSelector } from 'react-redux';

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

    if (collection.length > 0 && !collection[0].nft) {
      var img_url = [];

      for (const nft of collection) {
        if (JSON.parse(nft.metadata)) {
          if (JSON.parse(nft.metadata).image) {
            img_url.push({'image': JSON.parse(nft.metadata).image, 'name': nft.name});
          } else if (JSON.parse(nft.metadata).image_url) {
            img_url.push({'image': JSON.parse(nft.metadata).image_url, 'name': nft.name});
          }
        }
      }
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

    const NFTList = () => {
      return (
        collection[0].nft ? (<Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 2}}>
            <ImageNotSupportedIcon sx={{color: !darkMode ? "neutral.contrastText" : 'white', fontSize: '4em', textAlign: 'center', width: '100%'}}/>
            <Typography sx={{color: !darkMode ? "neutral.contrastText" : 'custom.main', textAlign: 'center', width: '100%', fontSize: '0.8em'}}>No NFT to display</Typography>
          </Container>) : (
            (img_url.map((nft, index) => (
              <Card key={index} sx={{marginBottom: 2, boxShadow: 4, maxWidth: '150px', maxHeight: '210px'}}>
                  <CardMedia
                      component="img"
                      image={(nft.image).replace('ipfs://', 'https://ipfs.io/ipfs/')}
                      alt={nft.name}
                      sx={{width: '150px', height: '150px'}}/>
                  <CardContent sx={{backgroundColor: 'custom.main'}}>
                      <Box sx={{fontSize:'0.8em', color: 'primary.dark', textAlign: 'center'}}>
                          {nft.name}
                      </Box>
                  </CardContent>

              </Card>
          ))
        )
          )
      )
    }

    return (
      <Container disableGutters sx={{ borderRadius: '10px', height: 'auto' }}>
        <Container sx={{ display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center' }}>
            <PhotoIcon sx={{color: !darkMode ? 'secondary.dark' : '#07f3d5'}}/><Typography sx={{ fontWeight: 'bold' }}>NFT</Typography>
        </Container>
        <Container sx={{
          marginTop: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto', justifyContent: 'space-around',
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
        {collection.length >  0 ? <NFTList/> : <Container sx={{display: 'flex', justifyContent: 'space-around', marginBottom: 4}}>
          <Skeleton variant="rectangle" width={150} height={210}/>
          <Skeleton variant="rectangle" width={150} height={210}/>
        </Container>}
        </Container>        
      </Container>
    );
  }
  