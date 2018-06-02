import React from 'react'
import ReactDOM from 'react-dom'
import Folder from "./components/folder"

class FolderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: {
                user: {
                    display_name: ""
                }
            }
        }
    }

    componentDidMount() {

        fetch(this.props.detail_path, { method: 'get' }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({
                folder: json
            });
        });

    }

    render() {
        return (
            <Folder folder={this.state.folder} />
        );
    }
}


ReactDOM.render(
    <FolderPage detail_path={document.getElementById('folderpage').getAttribute('data-detail-path')} />,
    document.getElementById('folderpage')
);