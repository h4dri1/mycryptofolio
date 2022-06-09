/* eslint-disable react/function-component-definition */
import * as React from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
    Grid
  } from '@mui/material';

import { makeStyles } from '@mui/styles';
import AvatarP from './avatar'
import ProfilP from './profil'
import Password from './password'

const useStyles = makeStyles({
    grid: {
      minHeight: '80vh',
      marginTop: '100px'
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


export default function Profil({ logged }) {

  const classes = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate('/login?continue=/profil');
    }
    else {
      navigate('/profil');
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

            <Grid item xs={12} className={classes.gridItem}></Grid>   
              <AvatarP />
            <Grid/>
            <Grid className={classes.gridItem}>
              <ProfilP/>
              <Password/>
            </Grid>

        </Grid >
    );
}
