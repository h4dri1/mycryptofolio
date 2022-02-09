

export default function Contact() {
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
    return (

        <Grid maxHeight={'80%'} container rowSpacing={{ xs: 1, md: 2 }} justifyContent="space-evenly" className={classes.grid}>
            <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>Hadrien
                <Grid container sx={{ padding: 0 }}>
                    <Grid item xs={12} md={6} className={classes.gridSubItem}></Grid>
                </Grid>
            </Grid>
            <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>Vince</Grid>
            <Grid sx={{ boxShadow: 4 }} item xs={12} md={5.5} className={classes.gridItem}>Augustin</Grid>
            <Grid sx={{ boxShadow: 4 }} item xs={11} md={5.5} className={classes.gridItem}>Grégory</Grid>
        </Grid>
    );
}
