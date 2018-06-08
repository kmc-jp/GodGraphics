import React from 'react'
import ReactDOM from 'react-dom'
import Folders from './folders'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import api from './api'

const styles = theme => ({

});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: []
        }
    }
    componentDidMount() {
        var folders = [];
        var path = "./folders/" + ((this.props.id) ? this.props.id : '');

        api(path, { method: "get" }).then(json => {
            try {
                this.setState({ folders: json });
            } catch (ex) { }
        });
    }

    render() {
        return (
            <Paper style={{ position: "absolute", top: "96px", width: "96%", padding: 16 }}>
                <Folders
                    label="アップロードされた画像"
                    folders={this.state.folders}
                    history={this.props.history}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(Home);