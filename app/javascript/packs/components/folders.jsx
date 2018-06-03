import React from 'react'
import ReactDOM from 'react-dom'
import FolderCard from './folder_card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: "100%"
    }
});

class Folders extends React.Component {

    constructor(props) {
        super(props);
        this.deleteFolder = this.deleteFolder.bind(this);
    }

    deleteFolder(folder) {
        fetch("./folders/" + folder.id, {
            method: "delete"
        }).then(response => {
            if (this.props.onDelete) this.props.onDelete();
        });
    }

    render() {
        const { classes } = this.props;
        var folders = this.props.folders.sort((a, b) => {
            if (a.created_at > b.created_at) return -1;
            if (a.created_at < b.created_at) return 1;
            return 0;
        });
        var cards = [];
        for (var i in folders) {
            const folder = folders[i];
            cards.push(
                <Grid item xs={4} sm={3} key={i}>
                    <FolderCard folder={folder} key={i} onDelete={this.deleteFolder} deletable={this.props.deletable} />
                </Grid>
            );
        }
        return (
            <div classes={classes.root} padding={20}>
                <div style={{ padding: 8 }} >
                    <Typography variant="title" style={{ textAlign: "center" }}>
                        {this.props.label}
                    </Typography>
                </div>
                <Divider />
                <Grid container spacing={24} style={{ padding: 8 }}>
                    {cards}
                </Grid>
            </div >
        );
    }
}

export default withStyles(styles)(Folders);