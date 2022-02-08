import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';

export default function Description({ data }) {
  // SANITIZE the HTML crypto description
  const createMarkup = (textBrut) => ({
    __html: DOMPurify.sanitize(textBrut, { ALLOWED_TAGS: [] }),
  });

  return (
    <Box sx={{ padding: '1em 2em' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <img
            src={`${data.image.small}?w=248&fit=crop&auto=format`}
            //   srcSet={`${data.image.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={`logo ${data.id}`}
            loading="lazy"
          />
        </Box>
        <Box sx={{ fontSize: '2em', marginLeft: '.75em' }}>{data.name}</Box>
        <Box sx={{ fontSize: '1.5em', marginLeft: '.5em', color: 'primary.light', mb: '-5px' }}>{data.symbol}</Box>
      </Box>

      <Box
        sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 'small' }}
        dangerouslySetInnerHTML={createMarkup(data.description)}
      />
      {!data.description && `More info: ${data.links}`}
    </Box>
  );
}

Description.propTypes = {
  data: PropTypes.object.isRequired,
};
