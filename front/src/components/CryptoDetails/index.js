import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Converter from './Converter';
import Description from './Description';
import Graph from './Graph';
import Indicators from './Indicators';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCryptoData } from 'src/actions/cryptoDetails';

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

const CryptoDetails = ({ }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCryptoData());
    }, []);

    return (
        <div className="">
            <Grid container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
                <Container sx={{ display: 'flex', gridAutoFlow: 'row' }}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Grid item xs={11} md={6} className={classes.gridSubItem}>
                            <Description sx={{ gridAutoRows: '100px' }}
                                description={data.description}
                            />
                        </Grid>
                    </Grid>
                    <Container className={classes.gridItem}>
                        <Grid item xs={4} className={classes.gridSubItem}>
                            <Indicators
                                symbol={data.symbol}
                                name={data.name}
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
                        <Graph sx={{ width: "100%" }} />
                    </Grid>
                </Container>
            </Grid>
        </div>
    );
};

// CryptoDetails.propTypes = {
//     crypto: PropTypes.arrayOf(PropTypes.shape({
//         description: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         symbol: PropTypes.string.isRequired,
//         id: PropTypes.number.isRequired,
//     })).isRequired,
// };

export default CryptoDetails;
