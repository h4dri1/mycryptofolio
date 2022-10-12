import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

const AddWalletOrTransac = ({
  addWallet, addTransaction
}) => {
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
          <Paper>
            <ListItemButton onClick={handleAddWallet}>Add wallet</ListItemButton>
            <ListItemButton onClick={handleAddTransaction}>Add transaction</ListItemButton>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default AddWalletOrTransac;
