import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Indicators = () => {
    return (
        <>
            <Container
                disableGutters
                sx={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                <Typography
                    variant="subtitle"
                    component="div"
                    sx={{
                        display: 'inline-flex',
                        // m: 0.5,
                        // p: 0,
                        fontSize: '1rem',
                        fontWeight: '300',
                    }}
                >
                    Total Market Cap. :
                </Typography>

                <Typography
                    sx={{
                        display: 'inline-flex',
                        m: 0.8,
                        // p: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'normal',
                    }}
                >
                    $2,007,030,607,506
                </Typography>

                <Typography
                    variant="subtitle"
                    component="div"
                    sx={{
                        display: 'inline-flex',
                        ml: 1.5,
                        // p: 0,
                        fontSize: '1rem',
                        fontWeight: '300',
                    }}
                >
                    24h Vol :
                </Typography>

                <Typography
                    sx={{
                        display: 'inline-flex',
                        ml: 1.5,
                        // p: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'normal',
                    }}
                >
                    $51,271,689,599
                </Typography>

                <Typography
                    variant="subtitle"
                    component="div"
                    sx={{
                        display: 'inline-flex',
                        ml: 1.5,
                        // p: 0,
                        fontSize: '1rem',
                        fontWeight: '300',
                    }}
                >
                    Dominance :
                </Typography>

                <Typography
                    sx={{
                        display: 'inline-flex',
                        m: 0.8,
                        // p: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'normal',
                    }}
                >
                    BTC: 40.2%
                </Typography>
            </Container>
        </>
    );
};
export default Indicators;
