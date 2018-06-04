import React from 'react';
import Paper from '@material-ui/core/Paper';
import Folders from './folders';
import { withStyles } from '@material-ui/core/styles';
import { decode } from 'punycode';
import api from "./api";

const styles = theme => ({

})

class Tag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: []
        }
        this.loadFolders = this.loadFolders.bind(this);
    }

    componentDidMount() {
        this.loadFolders();
    }

    loadFolders() {
        var folders = [];
        api("./tags/" + this.props.match.params.id, { method: "get" }).then(json => {
            this.setState(json);
        });
    }

    render() {
        return (
            <Paper style={{ position: "absolute", top: "96px", width: "96%", padding: 16 }}>
                <Folders
                    label={this.state.name}
                    folders={this.state.folders}
                    history={this.props.history}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(Tag)
