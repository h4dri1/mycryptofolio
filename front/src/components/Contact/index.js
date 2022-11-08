/* eslint-disable react/function-component-definition */
import {
  Card, Grid, CardActions, CardContent, Typography, Link, Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  grid: {
    marginTop: '20vh',
    height: '62vh',
  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: 2,
    margin: '10px',
  },
});

export default function Contact() {
  const classes = useStyles();

  return (

    <Grid display="flex" container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>

      <Link href="https://github.com/h4dri1" underline="none">
        <Card sx={{
          boxShadow: 4, borderRadius: '10px', justifyContent: 'center', height: 300, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.light', border: 1,
        }}
        >
          <Avatar
            alt="photo-avatar"
            src="https://avatars.githubusercontent.com/u/89306281?v=4"
            sx={{
              mt: 3, display: 'flex', alignItems: 'center', width: 120, height: 120,
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Hadrien Vuillaume
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Actual developer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Front / Back / DevOps
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Link>

      <Link href="https://github.com/Augustin-Holguin" underline="none">
        <Card sx={{
          boxShadow: 4, borderRadius: '10px', justifyContent: 'center', height: 300, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.light', border: 1,
        }}
        >
          <Avatar
            alt="photo-avatar"
            src="https://avatars.githubusercontent.com/u/25201511?v=4"
            sx={{
              mt: 3, display: 'flex', alignItems: 'center', width: 120, height: 120,
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Augustin Holguín
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Dev front 
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Link>

      <Link href="https://github.com/vmingam" underline="none">
        <Card sx={{
          boxShadow: 4, borderRadius: '10px', justifyContent: 'center', height: 300, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.light', border: 1,
        }}
        >
          <Avatar
            alt="photo-avatar"
            src="https://avatars.githubusercontent.com/u/7131900?v=4"
            sx={{
              mt: 3, display: 'flex', alignItems: 'center', width: 120, height: 120,
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Vincent Mingam
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Dev front
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Link>

      <Link href="https://github.com/GregoryTannier" underline="none">
        <Card sx={{
          boxShadow: 4, borderRadius: '10px', justifyContent: 'center', height: 300, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.light', border: 1,
        }}
        >
          <Avatar
            alt="photo-avatar"
            src="https://avatars.githubusercontent.com/u/77966553?v=4"
            sx={{
              mt: 3, display: 'flex', alignItems: 'center', width: 120, height: 120,
            }}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Grégory Tannier
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              Dev front
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Link>

    </Grid>
  );
}
