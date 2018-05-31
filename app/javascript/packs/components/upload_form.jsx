import React from 'react'
import MultipleFileForm from './multiple_file_form'
import Button from "material-ui/Button";

export default class UploadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            caption: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        const images = this.refs.ImageComponent.getImages();
        for (var i in images) {
            formData.append("images[]", images[i]);
        }
        formData.append("title", this.state.title);
        formData.append("caption", this.state.caption);
        fetch('./upload', {
            body: formData, // must match 'Content-Type' header
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }).then(response => {
            window.location.href = response.url;
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <MultipleFileForm ref='ImageComponent' />
                    <div>
                        <label>タイトル</label>
                        <input type="text" name="title" required value={this.state.title} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>キャプション</label>
                        <textarea name="caption" value={this.state.caption} onChange={this.handleInputChange} cols="30" rows="10" />
                    </div>
                    <Button color="primary" variant="raised" type="submit">投稿</Button>
                </form>
            </div>
        );
    }
}