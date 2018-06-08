import React from 'react';
import UploadForm from "./upload_form";
import api from "./api";

class EditFolderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: {},
            loading: true
        }
    }

    componentDidMount() {
        api('./folders/' + this.props.match.params.id, { method: 'get' }).then(data => {
            if (this.props.login_id != data.user.id) this.props.history.push('/');
            else {
                try {
                    this.setState({
                        folder: data,
                        loading: false
                    })
                } catch (ex) {
                }
            }
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