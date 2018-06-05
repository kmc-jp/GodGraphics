import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LimitedInput from './limited_input';
import Typography from '@material-ui/core/Typography';
import api from './api';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        position: 'absolute',
        top: 96,
        right: 64,
        left: 64,
        padding: 16
    }
});

class EditUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            input: {
                is_valid: true
            }
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const id = (!this.props.id || this.props.id < 1) ? this.props.match.params.id : this.props.id;
        if (this.props.login_id != id) this.props.history.push('/');
    }

    componentDidMount() {
        const id = (!this.props.id || this.props.id < 1) ? this.props.match.params.id : this.props.id;
        if (!id) return;
        api("./users/" + id, { method: "get" }).then(json => {
            this.setState({
                user: json.user,
                is_login_user: json.is_login_user,
                input: {
                    text: json.user.display_name
                },
                loading: false
            });
        });
    }

    updateInput(name, value) {
        this.setState({
            input: value
        })
    }

    handleClick(e) {
        api('./users/' + this.state.user.id + '/update', {
            body: JSON.stringify({
                display_name: this.state.input.text
            }),
            method: 'post'
        }).then(response => {
            if (this.state.is_login_user) {
                this.props.history.push('/mypage');
            } else {
                this.props.history.push('/users/' + this.state.user.id);
            }
        });
    }

    render() {
        const { classes } = this.props
        const user = this.state.user;
        if (this.state.loading) return null;
        return (
            <Paper className={classes.root}>
                <Typography>
                    {user.name}
                </Typography>
                <LimitedInput
                    label='表示名'
                    max={16}
                    text={this.state.input.text}
                    updateInput={this.updateInput}
                />
                <Button onClick={this.handleClick} disabled={!this.state.input.is_valid} color="primary" variant="raised">
                    確定
                </Button>
            </Paper>
        )
    }
}

export default withStyles(styles)(EditUserForm);