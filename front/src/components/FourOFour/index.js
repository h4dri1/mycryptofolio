/* eslint-disable react/function-component-definition */
import fourOfour from 'src/assets/images/404.jpg';
import Box from '@mui/material/Box';

const FourOFour = () => (
  <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
    <img src={fourOfour} style={{ maxWidth: '90vw', maxHeight: '80vh' }} alt="404" />
  </Box>
);

export default FourOFour;
