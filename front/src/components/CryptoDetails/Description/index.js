import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

export default function Description({ }) {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getDescription());
    // }, []);


    return (
        <div className="">Description</div>
    );
}

// Description.propTypes = {
//     crypto: PropTypes.arrayOf(PropTypes.shape({
//         description: PropTypes.string.isRequired,
//     })).isRequired,
// };