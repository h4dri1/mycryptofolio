import { Box, ClickAwayListener } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeColor } from 'src/actions/settings'
import { BlockPicker } from 'react-color'
import { useState } from 'react';

export default function chooseColor() {
    const dispatch = useDispatch();

    const [ color, setColor ] = useState('#ba68c8');
    const [ display, setDisplay ] = useState(false);

    const handleChangeComplete = (color) => {
        dispatch(changeColor(color.hex));
    }

    const handleClick = () => {
        dispatch(changeColor('gradient'))
    }

    return (
        <Box sx={{display: 'flex'}}>
            {display && <Box sx={{position: 'absolute',
                zIndex: '10'}}>
                <ClickAwayListener onClickAway={() => setDisplay(!display)}>
                    <Box sx={{position: 'fixed',
                        top: '40px',
                        right: '20px',
                        bottom: '0px',
                        height: '200px'
                    }}>
                        <BlockPicker color={color} onChangeComplete={(color) => handleChangeComplete(color)} onChange={(color) => setColor(color.hex)}></BlockPicker>
                    </Box>
                </ClickAwayListener>
            </Box>
            }
            <Box onClick={() => setDisplay(!display)} sx={{ cursor: 'pointer', backgroundColor: `${color}`, borderRadius: '50%', border: 1, width: "20px", height: "20px", marginRight: 1 }} />
            <Box onClick={handleClick} sx={{ cursor: 'pointer', marginRight: 1, backgroundColor: '#FF3CAC', backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)', borderRadius: '50%', border: 1, width: "20px", height: "20px" }} />
        </Box>
    );
} 