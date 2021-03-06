/* eslint-disable react/function-component-definition */
import * as React from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { deleteUser } from '../../actions/user';

import Loading from '../Loading';

import { setDisplaySnackBar } from 'src/actions/settings';


import {
    Grid,
    Link
  } from '@mui/material';

import { makeStyles } from '@mui/styles';
import AvatarP from './avatar'
import ProfilP from './profil'
import Password from './password'

const useStyles = makeStyles({
    grid: {
      minHeight: '84vh',
      marginTop: '20px'
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: 2,
      margin: '10px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    gridSubItem: {
      border: 'solid 2px gold',
      height: '100%',
    },
  });


export default function Profil({ logged, verify }) {

  const dispatch = useDispatch();

  const classes = useStyles();

  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.settings);

  const handleClick = () => {
    dispatch(deleteUser());
    navigate('/');
  }

  useEffect(() => {
    if (!logged) {
      navigate('/login?continue=/profil');
    }
  }, []);

    return (

        <Grid
            container
            display={'flex'}
            direction={'column'}
            alignItems={'center'}
            className={classes.grid}
        >
            <Loading />
            <Grid item xs={12} className={classes.gridItem}></Grid>   
              <AvatarP />
            <Grid/>
            <Grid className={classes.gridItem}>
              <ProfilP/>
              <Password/>
            </Grid>
            <Link
              sx={{ marginTop: '50px', color: darkMode ? 'custom.main' : 'secondary.main'}}
              component="button"
              underline='none'
              variant="body2"
              onClick={() => {
                handleClick();
              }}
            >
              Supprimer mon compte
            </Link>
        </Grid >
    );
}
