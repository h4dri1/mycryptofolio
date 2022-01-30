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

import { toggleCreateWalletModal, updateSelectedWallet } from 'src/actions/portfolio';

import AddWallet from './AddWallet';

const WalletsNav = () => {
  const dispatch = useDispatch();
  const { walletName } = useParams();
  const { wallet: wallets, selectedWallet } = useSelector((state) => state.portfolio);

  const data = 'Portefeuille 1';

  const walletSlug = data.split(' ').join('-').toLowerCase();
  console.log(walletSlug);

  useEffect(() => {
    dispatch(updateSelectedWallet(walletName));
  }, [walletName]);

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
                  bgcolor: 'primary.main',
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
              wallets.map((wallet) => (
                <Link key={wallet.id} to={wallet.label.split(' ').join('-').toLowerCase()} style={{ textDecoration: 'none', color: 'black' }}>
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
                          ...(wallet.label === selectedWallet && {
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
                      ><Typography variant="body2">{`$${Math.round(wallet.sum)}`}</Typography>
                      </Box>
                      <Typography sx={{ color: 'neutral.main' }}>{wallet.label}</Typography>
                    </Box>
                  </ListItemButton>
                </Link>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <IconButton sx={{ marginLeft: '12%', padding: '1%' }} onClick={() => dispatch(toggleCreateWalletModal())}>
            <AddCircleIcon sx={{ color: "primary.main" }} fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <AddWallet />
    </>
  );
};

export default WalletsNav;
