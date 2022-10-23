import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Popper, ListItemButton, Paper, Button, ClickAwayListener } from '@mui/material';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { updateSelectedTransaction } from '../../actions/portfolio';

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
    dispatch(updateSelectedTransaction(itemId));
    dispatch(editItem(itemId));
  };

  const displayConfirmDelete = () => {
    dispatch(deleteItem());
  };

  return (
    <Box sx={{right: '0', height:'50px', width:'50px', display: 'flex', justifyItems:'center' }}>
      <Button sx={{color:'primary.light'}} ref={anchorRef} onClick={handleButtonToggle}>
        <ExpandMoreIcon />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{backgroundColor: 'secondary.dark', boxShadow: 4}}>
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
