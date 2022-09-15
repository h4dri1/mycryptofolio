import { CircularProgress, Backdrop, Fade, Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function SimpleBackdrop() {
  const open = useSelector((state) => state.settings.pending);

  return (
  <div>
    <Fade timeout={{enter: 2000, exit: 0}} in={open}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fade>
    </div>
  );
}