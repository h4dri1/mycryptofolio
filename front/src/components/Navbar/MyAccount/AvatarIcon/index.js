import {
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Stack,
  Avatar,
  Divider,
  ListItemIcon,
  Container,
  Link,
  useMediaQuery,
} from '@mui/material';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import Logout from '@mui/icons-material/Logout';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  useState, useRef, useEffect, Fragment,
} from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { logout } from '../../../../actions/user';

export default function TestAvatar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
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

  const hide500 = useMediaQuery('(max-width:900px)');

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
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
          {!hide500
            && (
            <Avatar
              src={avatar}
              alt={nickname}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{
                display: { xs: 'none', md: 'flex' }, backgroundColor: 'primary.light', width: 56, height: 56, boxShadow: 10, border: darkMode ? '1px solid #07f3d5' : '1px solid #7932a8', cursor: 'pointer',
              }}
            />
            )}

          {hide500 && <MenuIcon ref={anchorRef} onClick={handleToggle} sx={{ display: { md: 'none' } }} />}
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            sx={{ width: { xs: '100%', md: 'auto' }, zIndex: 99999, position: 'sticky' }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'bottom' : 'top',
                }}
              >
                <Paper sx={{
                  marginTop: { xs: 4, md: 1 }, backgroundColor: 'secondary.light', boxShadow: 4, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',
                }}
                >
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
                          <Avatar sx={{ bgcolor: 'primary.light' }} src={hide500 ? avatar : nickname} alt={nickname} />
                        </Link>
                        <Link
                          component={RouterLink}
                          to="/profil"
                          underline="none"
                          sx={{ paddingLeft: '0.5rem' }}
                        >
                          Profil
                        </Link>
                      </MenuItem>
                      <Divider color="primary.main" />
                      <MenuItem>
                        <ListItemIcon>
                          <AccountBalanceWalletIcon fontSize="small" sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to="/portfolio"
                          underline="none"
                        >
                          Portfolio
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <SavedSearchIcon fontSize="small" sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <Link
                          component={RouterLink}
                          to="/watchlist"
                          underline="none"
                        >
                          Watchlist
                        </Link>
                      </MenuItem>
                      <Divider color="primary.main" />
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" sx={{ color: 'primary.main' }} />
                        </ListItemIcon>
                        <Link
                          onClick={handleLogout}
                          component={RouterLink}
                          to="/"
                          underline="none" // redirection to HOME when click on LOGOUT
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
