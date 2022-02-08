import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import Graph from './Graph';
import Description from './Description';
import Converter from './Converter';
import Indicators from './Indicators';

const useStyles = makeStyles({
  grid: {
    marginTop: '130px',
    height: '100%',
    padding: 0,

  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: 2,
    margin: '5px',

  },
  gridSubItem: {
    maxWidth: '100%',
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
      {!loading && (
        <div className="">
          <Box
            sx={{
              p: 1, m: 1, borderRadius: 5, textAlign: 'justify', fontSize: '0.875rem', fontWeight: '700',
            }}
            container
            rowSpacing={{ xs: 1, md: 2 }}
            justifyContent="space-evenly"
            className={classes.grid}
          >
            <Container maxWidth="100%" sx={{ display: 'flex', marginTop: '7%', gridAutoFlow: 'row' }}>
              <Grid sx={{ boxShadow: 4 }} item xs={12} className={classes.gridItem}>
                <Grid item xs={11} md={6} className={classes.gridSubItem}>
                  <Description
                    sx={{ gridAutoRows: '100px' }}
                    data={data}
                  />
                </Grid>
              </Grid>
              <Container sx={{ boxShadow: 4, width: '40%' }} className={classes.gridItem}>
                <Grid item xs={4} className={classes.gridSubItem}>
                  <Indicators
                    data={data}
                  />
                </Grid>
                {/* <Divider sx={{ width: "100%", mt: 2, mb: 2 }}></Divider> */}
                <Grid item xs={4} md={5.5} className={classes.gridSubItem}>
                  <Converter />
                </Grid>
              </Container>
            </Container>
            <Container sx={{ display: 'flex' }}>
              <Grid item xs={12} md={12}>
                <Graph
                  sx={{ display: 'flex', width: '100%' }}
                  chart={chart}
                  data={data}
                />
              </Grid>
            </Container>
          </Box>
        </div>
      )}
    </>
  );
}

export default CryptoDetails;
