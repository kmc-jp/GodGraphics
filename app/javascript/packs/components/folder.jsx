import React from 'react'
import ReactDOM from 'react-dom'
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import api from "./api";

const styles = theme => ({
    root: {
        position: "absolute",
        top: 96,
        textAlign: "center",
        width: "98%",
    },
});

class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: {},
            loading: true
        }
    }

    componentDidMount() {
        api('./folders/' + this.props.match.params.id, { method: 'get' }).then(data => {
            this.setState({
                folder: data,
                loading: false
            });
        });
    }

    render() {
        const { classes } = this.props;
        if (this.state.loading) return null;
        const images = this.state.folder.images;
        const folder = this.state.folder;
        const user = this.state.folder.user;
        var views = [];
        for (var i in images) {
            const image = images[i];
            views.push(
                <div key={i}>
                    <Button href={image.url.original}>
                        <img src={image.url.large} />
                    </Button>
                </div>
            );
        }
        var tags = [];
        for (var i in folder.tags) {
            const tag = folder.tags[i];
            tags.push(
                <Button key={i} component={Link} to={"/tags/" + tag.id}>
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
                        <Button component={Link} to={user.path}>
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
}

export default withStyles(styles)(Folder)
