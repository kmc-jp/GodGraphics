import React from 'react'
import ReactDOM from 'react-dom'
import Folders from './components/folders'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core';

class Toppage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: []
        }
        this.loadAll = this.loadAll.bind(this);
    }

    componentDidMount() {
        this.loadAll();
    }

    loadAll() {
        var folders = [];
        fetch("/folders", { method: "get" }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({ folders: json });
        });
    }

    render() {
        return (
            <Paper style={{ position: "absolute", top: "96px", width: "96%", padding: 16 }}>
                <Folders label="アップロードされた画像" folders={this.state.folders} />
            </Paper>
        );
    }
}

ReactDOM.render(
    <Toppage />,
    document.getElementById("toppage")
)