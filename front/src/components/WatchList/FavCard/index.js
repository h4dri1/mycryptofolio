import { Box, Button, Grid, Link, Typography, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function FavCard({ crypto }) {

 return (
    <Container disableGutters sx={{ borderRadius: '10px', height: 'auto', marginBottom: 2}}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
        <StarIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontSize: '0.8em', fontWeight: 'bold', color:'primaryTextColor.main' }}>{crypto.coin_id}</Typography>
      </Container>
      <Container sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflowY: 'auto', 
        justifyContent: 'center'
      }}>
        
        <Typography sx={{ fontSize: '0.8em', fontWeight: 'bold', color:'primaryTextColor.main' }}></Typography>
      </Container>
    </Container>
 )   
}