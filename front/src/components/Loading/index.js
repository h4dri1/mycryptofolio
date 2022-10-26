import {
  CircularProgress, Backdrop, Fade,
} from '@mui/material';
import { useSelector } from 'react-redux';

export default function SimpleBackdrop() {
  const open = useSelector((state) => state.settings.pending);

  return (
    <div>
      <Fade timeout={{ enter: 2000, exit: 0 }} in={open}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Fade>
    </div>
  );
}
