import React from 'react'
import Folders from './folders'
import Grid from '@material-ui/core/Grid'
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
    root: {
        position: "absolute",
        top: "96px",
        left: 16,
        right: 16
    },
    paper: {
        padding: 16
    }
});

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                folders: []
            }
        }
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        var folders = [];
        fetch("/users/" + this.props.id + "/detail", { method: "get" }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(json);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container padding={24}>
                        <Grid item sm={12}>
                            <Typography variant="title">
                                {this.state.user.display_name}
                            </Typography>
                            <Typography>
                                投稿枚数: {this.state.user.post_num}
                            </Typography>
                        </Grid>
                    </Grid>
                </ Paper>
                <Paper className={classes.paper}>
                    <Folders label="投稿画像" folders={this.state.user.folders} onDelete={this.loadUser} deletable={this.state.is_login_user} />
                </ Paper>
            </div>
        );
    }
}

export default withStyles(styles)(User);