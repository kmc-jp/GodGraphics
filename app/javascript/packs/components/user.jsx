import React from 'react'
import Folders from './folders'
import Grid from '@material-ui/core/Grid'
import { Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import api from "./api";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
        const id = (!this.props.id || this.props.id < 1) ? this.props.match.params.id : this.props.id;
        if (!id) return;
        api("./users/" + id, { method: "get" }).then(json => {
            try {
                this.setState({
                    user: json.user,
                    is_login_user: json.is_login_user
                });
            } catch (ex) {
            }
        });
    }

    render() {
        const { classes } = this.props;

        let EditButton = () => {
            if (this.state.is_login_user) {
                return (
                    <Button
                        component={Link}
                        to={this.props.match.url + '/edit'}
                        color='primary'
                        variant='raised'
                    >
                        編集
                    </ Button>
                );
            } else return null;
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container padding={24}>
                        <Grid item sm={12}>
                            <Typography variant="title">
                                {this.state.user.display_name}
                            </Typography>
                            <Typography>
                                投稿枚数 : {this.state.user.post_num}
                            </Typography>
                            <EditButton />
                        </Grid>
                    </Grid>
                </ Paper>
                <Paper className={classes.paper}>
                    <Folders
                        label="投稿画像"
                        folders={this.state.user.folders}
                        onDelete={this.loadUser}
                        deletable={this.state.is_login_user}
                        history={this.props.history}
                    />
                </ Paper>
            </div>
        );
    }
}

export default withStyles(styles)(User);