import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

export default function Description({ data }) {
  // SANITIZE the HTML crypto description
  const createMarkup = (textBrut) => ({
    __html: DOMPurify.sanitize(textBrut, { ALLOWED_TAGS: [] }),
  });
  
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Box sx={{ padding: '1em 2em', display: 'flex', flexDirection: 'column', minWidth: '100%'}}>
      <Typography sx={{marginBottom: 2, color: !darkMode ? 'primary.main' : '#07f3d5'}} variant="h5" component="h1">What is {data.name}?</Typography>
      <Box
        sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 'small' }}
        dangerouslySetInnerHTML={createMarkup(data.description)}
      />
    </Box>
  );
}

Description.propTypes = {
  data: PropTypes.object.isRequired,
};
