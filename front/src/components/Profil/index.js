/* eslint-disable react/function-component-definition */
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Link,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { deleteUser } from '../../actions/user';

import colors from '../../services/getColors';

import AvatarP from './avatar';
import ProfilP from './profil';
import Password from './password';

const useStyles = makeStyles({
  grid: {
    minHeight: '84vh',
    marginTop: '20px',
  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: 2,
    margin: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridSubItem: {
    border: 'solid 2px gold',
    height: '100%',
  },
});

export default function Profil() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.settings);

  const { color } = colors();

  const handleClick = () => {
    dispatch(deleteUser());
    navigate('/');
  };

  return (

    <Grid
      container
      display="flex"
      direction="column"
      alignItems="center"
      className={classes.grid}
    >
      <Grid item xs={12} className={classes.gridItem} />
      <AvatarP />
      <Grid />
      <Grid className={classes.gridItem}>
        <ProfilP color={color} />
        <Password color={color} />
      </Grid>
      <Link
        sx={{ marginTop: '50px', color: darkMode ? 'custom.main' : 'primary.main' }}
        component="button"
        underline="none"
        variant="body2"
        onClick={() => {
          handleClick();
        }}
      >
        Supprimer mon compte
      </Link>
    </Grid>
  );
}
