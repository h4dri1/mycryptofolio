import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeColor } from 'src/actions/settings'
import { useState } from 'react';
import React, { Suspense, lazy } from 'react';

const BlockPicker = lazy(() => import('react-color').then(module => ({ default: module.BlockPicker })));
const ClickAwayListener = lazy(() => import('@mui/material').then(module => ({ default: module.ClickAwayListener })));

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
                <Suspense fallback={<></>}>
                <ClickAwayListener onClickAway={() => setDisplay(!display)}>
                    <Box sx={{position: 'fixed',
                        top: '40px',
                        right: '20px',
                        bottom: '0px',
                        height: '200px'
                    }}>
                        <Suspense fallback={<></>}>
                            <BlockPicker color={color} onChangeComplete={(color) => handleChangeComplete(color)} onChange={(color) => setColor(color.hex)}></BlockPicker>
                        </Suspense>
                    </Box>
                </ClickAwayListener>
                </Suspense>
            </Box>
            }
            <Box onClick={() => setDisplay(!display)} sx={{ cursor: 'pointer', backgroundColor: `${color}`, borderRadius: '50%', border: 1, width: "20px", height: "20px", marginRight: 1 }} />
        </Box>
    );
} 