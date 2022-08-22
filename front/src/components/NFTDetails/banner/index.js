import * as React from 'react';

import { Avatar, Paper } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function AvatarP() {

    const { list } = useSelector((state) => state.nftDetails.data);
    
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