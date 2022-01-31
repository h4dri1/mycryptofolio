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
                <Grid item xs={11} md={5.5} className={classes.gridItem}>
                    <Grid item xs={11} md={6} className={classes.gridSubItem}>
                        <Description />
                    </Grid>
                </Grid>
                <Container >
                    <Grid container >
                        <Grid item xs={11} md={6} className={classes.gridSubItem}>
                            <Indicators
                            // distribution={distribution} 
                            />
                        </Grid>
                        <Grid item xs={11} md={5.5} className={classes.gridItem}>
                            <Converter />
                        </Grid>
                    </Grid>
                </Container>
                <Grid item xs={11} md={5.5} className={classes.gridItem}>
                    <Graph />
                </Grid>
            </Grid>
        </div>
    );
};

export default CryptoDetails;
