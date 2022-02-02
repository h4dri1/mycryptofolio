import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import { Box } from '@mui/system';

export default function Description({ data }) {

    // SANITIZE the HTML crypto description
    const createMarkup = () => ({
        __html: DOMPurify.sanitize(data.description, { ALLOWED_TAGS: [] }),
    });

    return (
        <div className="">
            <Box sx={{ flexDirection: 'row', mx: 1, gridRow: '1', color: 'text.secondary', fontSize: 12, fontWeight: 'small' }}>
                <Box sx={{ flexDirection: 'row', alignItems: 'center', mt: 2, }}>
                    <img
                        src={`${data.image.small}?w=248&fit=crop&auto=format`}
                        srcSet={`${data.image.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={`logo ${data.id}`}
                        loading="lazy"
                    />
                </Box>
                <Box>
                    {/* <p  */}
                    {data.description}
                    {/* dangerouslySetInnerHTML={createMarkup()}  */}
                    {/* /> */}
                </Box>
            </Box>
        </div >
    );
}

Description.propTypes = {
    data: PropTypes.object.isRequired,
};