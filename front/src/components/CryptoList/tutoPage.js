import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  Box,
  Typography,
  Backdrop,
  Slide,
  Fade,
} from '@mui/material';

import MainContainer from './mainContainer';

export default function TutoPage(props) {
  const {
    toggleBackdrop,
  } = props;
  const handleBackdrop = () => toggleBackdrop();

  return (
    <Backdrop
      sx={{
        display: 'flex', justifyContent: 'left', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
      onClick={handleBackdrop}
    >
      <Box sx={{ display: 'flex' }}>
        <Fade
          in
          sx={{
            color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 2, height: '0px', mt: { xs: 25, md: 11.5 }, ml: 2,
          }}
          timeout={{ enter: 3000, exit: 1 }}
        >
          <Typography>Ajouter d'abord des favoris</Typography>
        </Fade>
        <Slide direction="right" in mountOnEnter unmountOnExit timeout={{ enter: 1000, exit: 1 }}>
          <ArrowForwardIcon sx={{ fontSize: 50, marginTop: { xs: 29, md: 10.5 }, marginRight: { xs: 0, md: 1 } }} />
        </Slide>
        <MainContainer noButton {...props} />
      </Box>
    </Backdrop>
  );
}
