import { TOGGLE_DARK_MODE } from 'src/actions';

export const initialState = {
    darkMode: false,
};

const settings = (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE: {
            return ({
                ...state,
                darkMode: !state.darkMode,
            });
        }

        default:
            return state;
    }
};

export default settings;