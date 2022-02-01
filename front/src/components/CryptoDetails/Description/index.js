import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { getCryptoDescription } from 'src/actions/cryptoDetails';

import { Box } from '@mui/system';

export default function Description({ }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCryptoDescription());
    }, []);

    const { crypto } = useSelector((state) => state.cryptoDetails);
    // console.log(crypto.description.en);

    return (
        <div className="">
            <Box sx={{ gridRow: '1', color: 'text.secondary', fontSize: 12, fontWeight: 'small' }}>
                <p>{crypto.description.en}</p>
            </Box>
        </div >
    );
}

// Description.propTypes = {
//     crypto: PropTypes.arrayOf(PropTypes.shape({
//         description: PropTypes.string.isRequired,
//     })).isRequired,
// };