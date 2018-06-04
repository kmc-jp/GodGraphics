import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import LimitedInput from './limited_input'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        position: 'absolute',
        top: 96,
        right: 64,
        left: 64
    }
});

class EditUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.displayName
        }
    }
    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.root}>
                <Typography>
                    {this.props.name}
                </Typography>
                <LimitedInput
                    label='表示名'
                    max={12}
                    value={this.state.displayName}
                    updateInput={() => { }}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(EditUserForm);