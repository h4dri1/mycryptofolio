import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Indicators from './Indicators';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Converter from './Converter';
import Description from './Description';
import Graph from './Graph';
// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from 'src/actions/cryptoDetails';

const useStyles = makeStyles({
    grid: {
        // border: 'solid 2px red',
        marginTop: '0.1px',
        height: '100%',
        // maxWidth: '100%',
    },
    gridItem: {
        borderStyle: 'solid',
        // minHeight: '50vh',
        margin: '5px',
    },
    gridSubItem: {
        // border: 'solid 2px gold',
        // height: '100%',
        maxWidth: '100%',
    },
});

const CryptoDetails = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const { data, chart, loading } = useSelector((state) => state.cryptoDetails);
    const { slug } = useParams();

    useEffect(() => {

        dispatch(fetchCryptoData(slug));
    }, []);

    return (
        <>
            {!loading && (
                <div className="">
                    <Grid container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
                        <Container maxWidth={'100%'} sx={{ display: 'flex', gridAutoFlow: 'row' }}>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Grid item xs={11} md={6} className={classes.gridSubItem}>
                                    <Description sx={{ gridAutoRows: '100px' }}
                                        data={data}
                                    />
                                </Grid>
                            </Grid >
                            <Container sx={{ width: "30%" }} className={classes.gridItem}>
                                <Grid item xs={4} className={classes.gridSubItem}>
                                    <Indicators
                                        data={data}
                                    />
                                </Grid>
                                <Divider sx={{ width: "100%", mt: 2, mb: 2 }}></Divider>
                                <Grid item xs={4} md={5.5} className={classes.gridSubItem}>
                                    <Converter />
                                </Grid>
                            </Container>
                        </Container>
                        <Container >
                            <Grid item xs={12} md={12} className={classes.gridItem}>
                                <Graph sx={{ width: "100%" }}
                                    chart={chart}
                                    data={data}
                                />
                            </Grid>
                        </Container>
                    </Grid>
                </div>
            )}
        </>
    )
};


export default CryptoDetails;
