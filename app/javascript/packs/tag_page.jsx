import React from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Folders from './components/folders';

class TagPage extends React.Component {
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
        fetch("/tags/" + this.props.id + "/folders", { method: "get" }).then(response => {
            return response.json();
        }).then(json => {
            this.setState({ folders: json });
        });
    }

    render() {
        return (
            <Paper style={{ position: "absolute", top: "96px", width: "96%", padding: 16 }}>
                <Folders
                    label={this.props.name}
                    folders={this.state.folders}
                />
            </Paper>
        );
    }
}

var dom = document.querySelector("#container");

ReactDOM.render(
    <TagPage
        id={dom.getAttribute("data-id")}
        name={dom.getAttribute("data-name")}
    />,
    document.querySelector("#container")
);