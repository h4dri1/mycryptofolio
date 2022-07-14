import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

import { Container, Link, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../../../actions/user';

export default function TestAvatar() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { nickname, avatar } = useSelector((state) => state.user);

  const { darkMode } = useSelector((state) => state.settings);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
    else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Container>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <Avatar
            src={avatar}
            alt={nickname}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            sx={{ width: 56, height: 56, boxShadow: 10 }}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            sx={{width: {xs: '100%', md: 'auto'}, zIndex: 99999}}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'bottom' : 'top',
                }}
              >
                <Paper sx={{marginTop: 1, backgroundColor: !darkMode ? 'white' : '#00244F'}}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                        <Link
                          component={RouterLink}
                          to="/profil"
                          underline="none"
                        >
                          <Avatar sx={{ bgcolor: darkMode ? 'secondary.light' : 'secondary.main'}} src={nickname} alt={nickname}/>
                        </Link>
                        <Link
                          component={RouterLink}
                          to="/profil"
                          underline="none"
                          sx={{ color: !darkMode ? 'primary.dark' : '#07f3d5', paddingLeft: '0.5rem' }}
                        >
                        Profil
                        </Link>
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemIcon>
                          <AccountBalanceWalletIcon fontSize="small" sx={{color: !darkMode ? 'primary.dark' : '#07f3d5'}}/>
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to="/portfolio"
                          underline="none"
                          sx={{ color: !darkMode ? 'primary.dark' : '#07f3d5' }}
                        >
                          Portfolio
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <SavedSearchIcon fontSize="small" sx={{color: !darkMode ? 'primary.dark' : '#07f3d5'}}/>
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to="/"
                          underline="none"
                          sx={{ color: !darkMode ? 'primary.dark' : '#07f3d5' }}
                        >
                          Watchlist
                        </Link>
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" sx={{color: !darkMode ? 'primary.dark' : '#07f3d5'}}/>
                        </ListItemIcon>
                        <Link
                          onClick={handleLogout}
                          component={RouterLink}
                          to="/"
                          underline="none" // redirection to HOME when click on LOGOUT
                          sx={{ color: !darkMode ? 'primary.dark' : '#07f3d5' }}
                        >
                          Logout
                        </Link>

                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </Container>
  );
}
