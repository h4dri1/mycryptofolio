/* eslint-disable react/jsx-no-useless-fragment */
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import Graph from './Graph';
import Description from './Description';
import Converter from './Converter';
import Indicators from './Indicators';

import Loading from '../Loading';

const useStyles = makeStyles({
  grid: {
    marginTop: '140px',
    height: '100%',
    padding: 0,
  },
  gridItem: {
    borderRadius: 2,
  },
});

function CryptoDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, chart, loading } = useSelector((state) => state.cryptoDetails);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchCryptoData(slug));
  }, []);

  return (
    <>
      <Loading />
      {!loading && (
        <Box
          sx={{
            p: 1, borderRadius: 5, fontSize: '0.875rem', fontWeight: '700', margin: '0 auto 50px auto',
          }}
          container
          rowSpacing={{ xs: 1, md: 2 }}
          className={classes.grid}
        >
          <Grid container sx={{ display: 'flex', marginTop: '7%', gridAutoFlow: 'row', justifyContent: 'space-evenly' }}>
            <Grid item xs={12} md={6.5} sx={{ boxShadow: 4 }} className={classes.gridItem}>
              <Description
                sx={{ gridAutoRows: '100px' }}
                data={data}
              />
            </Grid>
            <Grid item xs={12} md={4.5} sx={{ boxShadow: 4 }} className={classes.gridItem}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} className={classes.gridSubItem}>
                  <Indicators
                    data={data}
                  />
                </Grid>
                {/* <Divider sx={{ width: "100%", mt: 2, mb: 2 }}></Divider> */}
                {/* <Grid item xs={4} md={5.5} className={classes.gridSubItem}>
                  <Converter />
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11} sx={{ margin: '0 auto' }}>
            <Graph
              chart={chart}
              data={data}
            />
          </Grid>
        </Box>
      )}
    </>
  );
}

export default CryptoDetails;
