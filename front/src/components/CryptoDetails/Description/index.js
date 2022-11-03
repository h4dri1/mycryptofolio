import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { Box, Typography } from '@mui/material';

export default function Description({ data }) {
  // SANITIZE the HTML crypto description
  const createMarkup = (textBrut) => ({
    __html: DOMPurify.sanitize(textBrut, { ALLOWED_TAGS: [] }),
  });

  return (
    <Box sx={{
      padding: '1em 2em', display: 'flex', flexDirection: 'column', minWidth: '100%',
    }}
    >
      <Typography sx={{ marginBottom: 2, color: 'secondary.dark' }} variant="h5" component="h1">What is {data.name}?</Typography>
      <Box
        sx={{ color: 'primaryTextColor.main', fontSize: 12, fontWeight: 'small' }}
        dangerouslySetInnerHTML={createMarkup(data.description)}
      />
    </Box>
  );
}

Description.propTypes = {
  data: PropTypes.object.isRequired,
};
