/* eslint-disable max-len */
import { makeStyles } from '@mui/styles';

import {
  Container,
} from '@mui/material';

import FullTable from './Table/FullTable';
import MoreCryptosButton from './moreCryptosButton';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTableCell-head': {
      backgroundColor: '#00b2cc',
    },
  },
  cryptoList: {
    margin: '0% 1% 3% 1%',
  },
}));

export default function MainContainer(props) {
  const {
    noButton, favoritePage, cryptoListLoading,
  } = props;
  const classes = useStyles();
  return (
    <Container
      className={classes.root}
      sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <FullTable {...props} />
      {!favoritePage && !noButton && (
      <MoreCryptosButton cryptoListLoading={cryptoListLoading} />
      )}
    </Container>
  );
}
