/* eslint-disable react/function-component-definition */
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
    grid: {
        marginTop: '20%',
        height: '100%',
    },
    gridItem: {
        borderColor: '#E7EBF0',
        borderRadius: 2,
        margin: '10px',
    }
});

export default function Contact() {

    const classes = useStyles();

    return (

        <Grid display="flex" maxHeight={'100%'} container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>

            <Card sx={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="https://github.com/h4dri1">
                    <Avatar
                        alt="photo-avatar"
                        src="https://avatars.githubusercontent.com/u/89306281?v=4"
                        sx={{ mt: 3, display: "flex", alignItems: 'center', width: 70, height: 70 }}
                    />
                </Link>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Hadrien
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Lead dev back & Product owner
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>

            <Card sx={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="https://github.com/Augustin-Holguin">
                    <Avatar
                        alt="photo-avatar"
                        src="https://avatars.githubusercontent.com/u/25201511?v=4"
                        sx={{ mt: 3, display: "flex", alignItems: 'center', width: 70, height: 70 }}
                    />
                </Link>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Augustin
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Lead dev front
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>

            <Card sx={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="https://github.com/vmingam">
                    <Avatar
                        alt="photo-avatar"
                        src="https://avatars.githubusercontent.com/u/7131900?v=4"
                        sx={{ mt: 3, display: "flex", alignItems: 'center', width: 70, height: 70 }}
                    />
                </Link>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Vincent
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Dev front & Git master
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
                </CardActions>
            </Card>

            <Card sx={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="https://github.com/GregoryTannier">
                    <Avatar
                        alt="photo-avatar"
                        src="https://avatars.githubusercontent.com/u/77966553?v=4"
                        sx={{ mt: 3, display: "flex", alignItems: 'center', width: 70, height: 70 }}
                    />
                </Link>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Grégory
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Dev front & Scrum master
                    </Typography>
                </CardContent>
                <CardActions>
                    {/* <Buttsn size="small">Learn More</Button> */}
                </CardActions>
            </Card>

        </Grid >
    );
}
