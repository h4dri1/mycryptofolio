import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
  toggleCreateWalletModal, updateSelectedWallet, fetchSpecificPortfolio, fetchPortfolio,
  deleteWallet, toggleUpdateWalletModal,
} from 'src/actions/portfolio';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import AddWallet from './AddWallet';
import EditWallet from './EditWallet';

const WalletsNav = ({ wallets, selectedWallet }) => {
  const dispatch = useDispatch();

  const toSlug = (walletFullName) => walletFullName.split(' ').join('-').toLowerCase();

  const handleLinkClick = (walletId) => {
    dispatch(updateSelectedWallet(walletId));
    dispatch(fetchSpecificPortfolio(walletId));
  };

  const handleMainLinkClick = () => {
    dispatch(updateSelectedWallet(''));
    dispatch(fetchPortfolio());
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Link to="/portfolio" style={{ textDecoration: 'none' }} onClick={() => handleMainLinkClick()}>
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
              >
                <Typography>{wallets.length > 0
                  && `$${Math.round(wallets.reduce((total, wallet) => total + wallet.sum, 0))
                    .toLocaleString()}`}
                </Typography>
              </Box>
            </ListItemButton>
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ overflowY: 'auto', maxHeight: '30vh' }}>
          <List>
            {
              wallets.map((wallet) => (
                <Link key={wallet.id} to={toSlug(wallet.label)} style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleLinkClick(wallet.id)}>
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
                          backgroundColor: 'white',
                          marginLeft: '5%',
                          ...(wallet.id === selectedWallet && {
                            backgroundColor: 'primary.light', color: 'black', width: '25%', marginLeft: '2.5%', fontWeight: 'bold',
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
                      ><Typography variant="body2">{`$${Math.round(wallet.sum).toLocaleString()}`}</Typography>
                      </Box>
                      <Typography sx={{ color: 'neutral.main' }}>{wallet.label}</Typography>
                    </Box>
                    <EditOrDeleteItem
                      positionAbsolute
                      editItem={toggleUpdateWalletModal}
                      deleteItem={deleteWallet}
                      itemId={wallet.id}
                    />
                  </ListItemButton>
                </Link>
              ))
            }
          </List>
        </Grid>
        <Grid item xs={12}>
          <IconButton sx={{ marginLeft: '11.5%', padding: '1%' }} onClick={() => dispatch(toggleCreateWalletModal())}>
            <AddCircleIcon sx={{ color: 'primary.main' }} fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <AddWallet />
      <EditWallet />
    </>
  );
};

WalletsNav.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedWallet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]).isRequired,
};

export default WalletsNav;
