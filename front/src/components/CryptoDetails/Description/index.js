import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { getCryptoDescription } from 'src/actions/cryptoDetails';
import DOMPurify from 'dompurify';

import { Box } from '@mui/system';

export default function Description({ }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCryptoDescription());
    }, []);

    const createMarkup = () => ({
        __html: DOMPurify.sanitize(crypto.description.en, { ALLOWED_TAGS: [] }),
    });

    const { crypto } = useSelector((state) => state.cryptoDetails);
    // console.log(crypto.description.en);

    return (
        <div className="">
            <Box sx={{ flexDirection: 'row', mx: 1, gridRow: '1', color: 'text.secondary', fontSize: 12, fontWeight: 'small' }}>
                <Box sx={{ flexDirection: 'row', alignItems: 'center', mt: 2, }}>
                    <img
                        src={`${crypto.image.small}?w=248&fit=crop&auto=format`}
                        srcSet={`${crypto.image.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={`logo ${crypto.id}`}
                        loading="lazy"
                    />
                </Box>
                <p {...crypto.description.en} dangerouslySetInnerHTML={createMarkup()} />
            </Box>
        </div >
    );
}

// Description.propTypes = {
//     crypto: PropTypes.arrayOf(PropTypes.shape({
//         description: PropTypes.string.isRequired,
//     })).isRequired,
// };