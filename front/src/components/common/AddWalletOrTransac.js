import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Popper, ListItemButton, Paper, Button, ClickAwayListener } from '@mui/material';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

const AddWalletOrTransac = ({ addWallet, addTransaction }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const handleButtonToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWallet = () => {
    dispatch(addWallet());
  };

  const handleAddTransaction = () => {
    return addTransaction();
  };

  return (
    <Box sx={{right: '0' }}>
      <Button sx={{color:'primary.light'}} ref={anchorRef} onClick={handleButtonToggle}>
        <AddCircleIcon sx={{ color: 'secondary.light' }} fontSize="large" />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{backgroundColor: 'secondary.dark', boxShadow: 4}}>
            <ListItemButton onClick={handleAddWallet}>Add wallet</ListItemButton>
            <ListItemButton onClick={handleAddTransaction}>Add transaction</ListItemButton>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default AddWalletOrTransac;
