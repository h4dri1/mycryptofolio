import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Description({ data }) {
  // SANITIZE the HTML crypto description
  const createMarkup = (textBrut) => ({
    __html: DOMPurify.sanitize(textBrut, { ALLOWED_TAGS: [] }),
  });

  return (
    <Box sx={{ padding: '1em 2em', display: 'flex', flexDirection: 'column', minWidth: '100%'}}>
      <Typography sx={{marginBottom: 2}} color='primary.main' variant="h5" component="h1">What is {data.name}?</Typography>
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
