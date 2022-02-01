import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

const EditOrDeleteItem = ({ editItem, deleteItem, itemId }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const dispatch = useDispatch();

  const handleButtonToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditItem = () => {
    dispatch(editItem());
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem(itemId));
  };

  return (
    <Box sx={{ position: 'absolute', right: '0' }}>
      <Button ref={anchorRef} onClick={handleButtonToggle}>
        <ExpandMoreIcon />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <ListItemButton onClick={handleEditItem}>Modifier</ListItemButton>
            <ListItemButton onClick={handleDeleteItem}>Supprimer</ListItemButton>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

EditOrDeleteItem.defaultProps = {
  itemId: undefined,
};

EditOrDeleteItem.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  itemId: PropTypes.number,
};

export default EditOrDeleteItem;
