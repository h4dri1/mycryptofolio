import * as React from 'react';
import { CircularProgress, Backdrop, Fade } from '@mui/material';
import { useSelector } from 'react-redux';

export default function SimpleBackdrop() {
  const open = useSelector((state) => state.settings.pending);

  return (
    <div>
      <Fade timeout={2000} in={open}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      </Fade>
    </div>
  );
}