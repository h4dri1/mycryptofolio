/* eslint-disable react/function-component-definition */
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
    grid: {
        // border: 'solid 2px red',
        marginTop: '7%',
        height: '100%',
        // maxWidth: '100%',

    },
    gridItem: {
        // borderStyle: 'solid',
        borderColor: '#E7EBF0',
        borderRadius: 2,
        // minHeight: '50vh',
        margin: '10px',

    },
    gridSubItem: {
        // border: 'solid 2px gold',
        // height: '100%',
    },
});

export default function Contact() {

    const classes = useStyles();

    return (

        <Grid display="flex" maxHeight={'80%'} container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>


            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    alt="photo-avatar"
                    // url="https://github.com/h4dri1"
                    sx={{ mt: 3, display: "flex", alignItems: 'center', width: 56, height: 56 }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Hadrien
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Lead dev back et product owner de MyCryptoFolio
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    alt="photo-avatar"
                    url=""
                    sx={{ mt: 3, display: "flex", alignItems: 'center', width: 56, height: 56 }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Augustin
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Lead dev front de MyCryptoFolio
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    alt="photo-avatar"
                    url=""
                    sx={{ mt: 3, display: "flex", alignItems: 'center', width: 56, height: 56 }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Vincent
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Dev front & Git master de MyCryptoFolio
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                    alt="photo-avatar"
                    url=""
                    sx={{ mt: 3, display: "flex", alignItems: 'center', width: 56, height: 56 }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}  >
                        Grégory
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                        Dev front & Scrum master de MyCryptoFolio
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

        </Grid >
    );
}
