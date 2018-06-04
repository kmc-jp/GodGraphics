import React from 'react';
import UploadForm from "./upload_form";

class EditFolderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: {},
            loading: true
        }
    }

    componentDidMount() {
        fetch('./', { method: 'get' }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                folder: data,
                loading: false
            })
        });
    }

    render() {
        if (this.state.loading) return null;
        return (
            <UploadForm
                folder={this.state.folder}
                history={this.props.history}
                editMode
            />
        );
    }
}

export default EditFolderForm;