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

const EditOrDeleteItem = ({
  editItem, deleteItem, positionAbsolute, itemId,
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

  const handleEditItem = () => {
    return editItem(itemId);
  };

  const displayConfirmDelete = () => {
    return deleteItem();
  };

  return (
    <Box sx={{right: '0', height:'50px', width:'50px', display: 'flex', justifyItems:'center' }}>
      <Button sx={{color:'primary.light'}} ref={anchorRef} onClick={handleButtonToggle}>
        <ExpandMoreIcon />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <ListItemButton onClick={handleEditItem}>Modifier</ListItemButton>
            <ListItemButton onClick={displayConfirmDelete}>Supprimer</ListItemButton>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

EditOrDeleteItem.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  itemId: PropTypes.number,
};

EditOrDeleteItem.defaultProps = {
  itemId: null,
};

export default EditOrDeleteItem;
