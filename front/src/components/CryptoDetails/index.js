import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolio } from 'src/actions/portfolio';
import Converter from './Converter';
import Description from './Description';
import Graph from './Graph';
import Indicators from './Indicators';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles({
    grid: {
        // border: 'solid 2px red',
        marginTop: '0.1px',
        height: '100%',
    },
    gridItem: {
        borderStyle: 'solid',
        // minHeight: '50vh',
        margin: '5px',
    },
    gridSubItem: {
        // border: 'solid 2px gold',
        // height: '100%',
    },
});

const CryptoDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    //   const { distribution } = useSelector((state) => state.portfolio);

    // useEffect(() => {
    //     dispatch(fetchPortfolio());
    // }, []);

    return (
        <div className="">
            <Grid container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
                <Container sx={{
                    display: 'flex',
                    gridAutoFlow: 'row',
                }}>
                    <Grid item xs={8} className={classes.gridItem}>
                        <Grid item xs={11} md={6} className={classes.gridSubItem}>
                            <Description sx={{
                                // display: 'flex',
                                // gridAutoFlow: 'row',
                                // gridTemplateColumns: 'repeat(5, 1fr)',
                                // gridTemplateRows: 'repeat(2, 200px)',
                                // gap: 1,
                                gridAutoRows: '100px'
                            }}
                            />
                        </Grid>

                    </Grid>
                    <Container className={classes.gridItem}>
                        {/* <Grid container > */}
                        <Grid item xs={4} className={classes.gridSubItem}>
                            <Indicators
                            // distribution={distribution} 
                            />
                        </Grid>
                        <Divider sx={{ width: "100%" }}></Divider>
                        <Grid item xs={4} md={5.5} className={classes.gridSubItem}>
                            <Converter />
                        </Grid>
                    </Container>
                    {/* </Grid> */}
                </Container>
                <Container >
                    <Grid item xs={12} md={12} className={classes.gridItem}>
                        <Graph sx={{ width: "100%" }} />
                    </Grid>
                </Container>
            </Grid>
        </div>
    );
};

export default CryptoDetails;
