/* eslint-disable react/function-component-definition */
import * as React from 'react';

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { deleteUser } from '../../actions/user';

import axios  from 'axios';

import {
    Grid,
    Link
  } from '@mui/material';

import { makeStyles } from '@mui/styles';
import Password from './password';

const useStyles = makeStyles({
    grid: {
      minHeight: '84vh',
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

export default function Profil(){

  const dispatch = useDispatch();

  const classes = useStyles();

  const navigate = useNavigate();

  const { token } = useParams();

  const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;
  
 useEffect(() => {
    axios({
      method: 'get',
      baseURL,
      url: `/jwt/login/check/${token}`
    })
      .then((res) => {
        if (res.status === 204) {
          navigate('/reset');
        }
      })
  }, []);

    return (
        <Grid
            container
            display={'flex'}
            direction={'column'}
            alignItems={'center'}
            className={classes.grid}
        >
            <Grid className={classes.grid}>
              <Password/>
            </Grid>
        </Grid >
    );
}
