import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleCreatePortfolioModal, updateSelectedPortfolio } from 'src/actions/portfolio';

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
  const { portfolioName } = useParams();
  const { selectedPortfolio } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(updateSelectedPortfolio(portfolioName));
  }, [portfolioName]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Link to="/portfolio" style={{ textDecoration: 'none' }}>
            <ListItemButton sx={{ paddingBottom: '0px' }}>
              <Box
                component="span"
                sx={[{
                  width: '30%',
                  maxWidth: '40vw',
                  borderRadius: '60%',
                  border: 'solid 2px primary.main',
                  bgcolor: "primary.main",
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
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ overflowY: 'auto', maxHeight: '30vh' }}>
          <List>
            {
              portfolios.map((portfolio) => (
                <Link key={portfolio.name} to={portfolio.name} style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItemButton>
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
                          border: 'solid 2px',
                          borderColor: 'primary.light',
                          background: 'white',
                          marginLeft: '5%',
                          ...(portfolio.name === selectedPortfolio && {
                            bgcolor: 'primary.light', color: 'black', width: '25%', marginLeft: '2.5%', fontWeight: 'bold'
                          }),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                            borderLeft: '2px solid',
                            borderColor: 'primary.light',
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
                      <Typography sx={{ color: 'neutral.main' }}>{portfolio.name}</Typography>
                    </Box>
                  </ListItemButton>
                </Link>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <IconButton sx={{ marginLeft: '12%', padding: '1%' }} onClick={() => dispatch(toggleCreatePortfolioModal())}>
            <AddCircleIcon sx={{ color: "primary.main" }} fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <AddPortfolio />
    </>
  );
};

export default WalletsNav;
