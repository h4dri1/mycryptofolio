import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { useDispatch } from 'react-redux';

import { toggleCreatePortfolioModal } from 'src/actions/portfolio';

import AddPortfolio from './AddPortfolio';

const portfolios = [
  {
    name: 'Daily trading',
    holdings: '7830',
  },
  {
    name: 'HODL',
    holdings: '23968',
  },
  {
    name: 'Long term',
    holdings: '2892',
  },
  {
    name: 'Mid term',
    holdings: '1000',
  }, {
    name: 'Savings 1',
    holdings: '7810',
  },
  {
    name: 'Savings 2',
    holdings: '5000',
  }, {
    name: 'Savings 3',
    holdings: '250',
  },
];

const WalletsNav = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ListItemButton sx={{ paddingBottom: '0px' }}>
            <Box
              component="span"
              sx={[{
                width: '30%',
                maxWidth: '40vw',
                borderRadius: '60%',
                border: 'solid 2px #1976D2',
                background: '#1976D2',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              {
                '::after': {
                  display: 'block',
                  paddingBottom: '100%',
                  content: '""',
                },
              },
              ]}
            ><Typography>$52,637.35</Typography>
            </Box>
          </ListItemButton>
        </Grid>
        <Grid item xs={12} sx={{ overflowY: 'auto', maxHeight: '30vh' }}>
          <List>
            {
              portfolios.map((portfolio) => (
                <ListItemButton key={portfolio.name}>
                  <Box sx={{
                    display: 'flex', width: '100%', alignItems: 'center', position: 'relative',
                  }}
                  >
                    <Box
                      component="span"
                      sx={[{
                        width: '20%',
                        maxWidth: '40vw',
                        borderRadius: '50%',
                        border: 'solid 2px #1976D2',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '5%',
                        marginRight: '10px',
                      },
                      {
                        '::after': {
                          display: 'block',
                          paddingBottom: '100%',
                          content: '""',
                        },
                      },
                      {
                        '::before': {
                          display: 'block',
                          borderLeft: '2px solid #1976D2',
                          position: 'absolute',
                          top: '-50%',
                          zIndex: '-1',
                          height: '50%',
                          content: "''",
                        },
                      },
                      ]}
                    ><Typography variant="body2">{`$${portfolio.holdings}`}</Typography>
                    </Box>
                    <Typography>{portfolio.name}</Typography>
                  </Box>
                </ListItemButton>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <IconButton sx={{ marginLeft: '12%', padding: '1%' }} onClick={() => dispatch(toggleCreatePortfolioModal())}>
            <AddCircleIcon sx={{ color: '#1976D2' }} fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <AddPortfolio />
    </>
  );
};

export default WalletsNav;
