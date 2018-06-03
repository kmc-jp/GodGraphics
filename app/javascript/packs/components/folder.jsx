import React from 'react'
import ReactDOM from 'react-dom'
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        position: "absolute",
        top: 96,
        textAlign: "center",
        width: "98%",
    },
});

function Folder(props) {
    const { classes } = props;
    const images = props.folder.images;
    const folder = props.folder;
    const user = props.folder.user;
    var views = [];
    for (var i in images) {
        const image = images[i];
        views.push(
            <div key={i}>
                <Button href={image.path}>
                    <img src={image.url.large} />
                </Button>
            </div>
        );
    }
    var tags = [];
    for (var i in folder.tags) {
        const tag = folder.tags[i];
        tags.push(
            <Button key={i} href={"/tags/" + tag.name}>
                {tag.name}
            </Button>
        )
    }
    return (
        <Paper className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="title">
                        <p>{folder.title}</p>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <p>{folder.caption}</p>
                </Grid>
                <Grid item xs={12}>
                    {tags}
                </Grid>
                <Grid item xs={12}>
                    <Button href={user.path}>
                        {user.display_name}
                    </Button>
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12}>
                    {views}
                </Grid>
            </Grid>
        </Paper >
    );
}

export default withStyles(styles)(Folder)
