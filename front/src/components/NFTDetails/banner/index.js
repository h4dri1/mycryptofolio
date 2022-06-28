import * as React from 'react';

import { Avatar, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { change_avatar, saveUser } from '../../../actions/user';

import axios from 'axios';

  const avatarStyle = {
    border: "2px solid #7932a8",
    boxShadow: 20,
    mt: 3, width: 150, height: 150 
  };

export default function AvatarP() {
    const uploadInputRef = useRef(null);

    const dispatch = useDispatch();

    const { list, loading } = useSelector((state) => state.nftDetails.data);
    
    const avatarNFT = list.image_url ? list.image_url : 'https://mycryptofolio.fr/favicon.ico';
    const banner = list.banner_image_url ? list.banner_image_url : '';


    return (
      <Fragment>
        <Paper sx={{boxShadow: 5, borderRadius: '10px', alignItems: 'center', display: 'flex', backgroundImage: `url(${banner})`, 
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '90%', minheight: '30vh',
                    justifyContent: 'center', marginTop: 2}}>
            <Avatar src={avatarNFT} sx={{ display: 'flex', boxShadow: 5, border: '0.1px solid lightgray', minWidth: 200, minHeight: 200, top:'100px'}} />
        </Paper>
      </Fragment>
    );
}